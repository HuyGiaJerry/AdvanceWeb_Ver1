using BE_Fashion.DTOs;
using BE_Fashion.Repositories;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private readonly VnPayService _vnPayService;
        private readonly IOrderRepository _orderRepository;
        private readonly IRedisCartService _redisCartService;

        public VnPayController(
            VnPayService vnPayService,
            IOrderRepository orderRepository,
            IRedisCartService redisCartService)
        {
            _vnPayService = vnPayService;
            _orderRepository = orderRepository;
            _redisCartService = redisCartService;
        }

        [HttpPost("create-payment-url")]
        public async Task<IActionResult> CreatePaymentUrl([FromBody] CheckoutRequest request)
        {
            Console.WriteLine($"Request: {System.Text.Json.JsonSerializer.Serialize(request)}");
            if (request == null || request.PaymentMethod != "VNPAY")
            {
                Console.WriteLine("Validation failed: request is null or PaymentMethod is not VNPAY");
                return BadRequest("Invalid payment details or payment method.");
            }

            try
            {
                var response = await _vnPayService.CheckoutVNPayAsync(request, HttpContext);
                return Ok(new { response.OrderId, response.PaymentUrl });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return BadRequest($"Error creating payment URL: {ex.Message}");
            }
        }

        [HttpGet("vnpay-callback")]
        public async Task<IActionResult> VnPayCallback()
        {
            try
            {
                var vnpayData = Request.Query.ToDictionary(
                    q => q.Key,
                    q => q.Value.ToString()
                );

                var vnpaySignature = vnpayData.GetValueOrDefault("vnp_SecureHash");
                if (string.IsNullOrEmpty(vnpaySignature))
                {
                    return BadRequest("Missing secure hash.");
                }

                bool isValid = _vnPayService.ValidateSignature(vnpaySignature, vnpayData);
                if (!isValid)
                {
                    return BadRequest("Invalid payment signature.");
                }

                var orderId = Guid.Parse(vnpayData["vnp_TxnRef"]);
                var responseCode = vnpayData["vnp_ResponseCode"];

                var order = await _orderRepository.GetOrderByIdAsync(orderId);
                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                if (order.Payment == null)
                {
                    return BadRequest("Payment record not found for this order.");
                }

                if (responseCode == "00") // Thanh toán thành công
                {
                    order.Status = "confirmed";
                    order.Payment.Status = "completed";
                    order.Payment.TransactionId = vnpayData.GetValueOrDefault("vnp_TransactionNo");
                    order.UpdatedAt = DateTime.UtcNow;

                    await _orderRepository.UpdateOrderAsync(order);
                    await _redisCartService.ClearCartAsync(order.UserId ?? -1);

                    return Ok("Payment success.");
                }
                else // Thanh toán thất bại
                {
                    order.Status = "cancelled";
                    order.Payment.Status = "failed";
                    order.UpdatedAt = DateTime.UtcNow;

                    await _orderRepository.UpdateOrderAsync(order);

                    return BadRequest("Payment failed.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error processing callback: {ex.Message}");
            }
        }

        [HttpGet("return")]
        public async Task<IActionResult> Return()
        {
            try
            {
                var query = Request.Query.ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.ToString()
                );

                var vnp_SecureHash = query.GetValueOrDefault("vnp_SecureHash");
                if (string.IsNullOrEmpty(vnp_SecureHash))
                    return BadRequest("Missing signature.");

                bool isValid = _vnPayService.ValidateSignature(vnp_SecureHash, query);
                if (!isValid)
                    return BadRequest("Invalid signature.");

                var orderId = Guid.Parse(query["vnp_TxnRef"]);
                var responseCode = query["vnp_ResponseCode"];

                var order = await _orderRepository.GetOrderByIdAsync(orderId);
                if (order == null)
                    return NotFound("Order not found.");

                if (order.Payment == null)
                    return BadRequest("Payment record not found for this order.");

                if (responseCode == "00")
                {
                    if (order.Status != "confirmed")
                    {
                        order.Status = "confirmed";
                        order.Payment.Status = "completed";
                        order.Payment.TransactionId = query.GetValueOrDefault("vnp_TransactionNo");
                        order.UpdatedAt = DateTime.UtcNow;

                        await _orderRepository.UpdateOrderAsync(order);
                        await _redisCartService.ClearCartAsync(order.UserId ?? -1);
                    }
                    return Ok("Giao dịch thành công!");
                }
                else
                {
                    if (order.Status != "cancelled")
                    {
                        order.Status = "cancelled";
                        order.Payment.Status = "failed";
                        order.UpdatedAt = DateTime.UtcNow;

                        await _orderRepository.UpdateOrderAsync(order);
                    }
                    return BadRequest("Giao dịch thất bại hoặc không hợp lệ.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error processing return: {ex.Message}");
            }
        }
    }
}