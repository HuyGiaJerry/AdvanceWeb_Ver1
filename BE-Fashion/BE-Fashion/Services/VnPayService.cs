using BE_Fashion.DTOs;
using BE_Fashion.Helpers;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE_Fashion.Services
{
    public class VnPayService
    {
        private readonly IConfiguration _config;
        private readonly IOrderRepository _orderRepository;
        private readonly IRedisCartService _redisCartService;

        public VnPayService(
            IConfiguration configuration,
            IOrderRepository orderRepository,
            IRedisCartService redisCartService)
        {
            _config = configuration;
            _orderRepository = orderRepository;
            _redisCartService = redisCartService;
        }

        public async Task<CheckoutResponse> CheckoutVNPayAsync(CheckoutRequest request, HttpContext httpContext)
        {
            if (!request.UserId.HasValue)
            {
                request.UserId = -1; // Giá trị mặc định cho khách vãng lai
            }

            if (request.PaymentMethod != "VNPAY")
            {
                throw new InvalidOperationException("Phương thức thanh toán không hợp lệ. Chỉ hỗ trợ VNPAY.");
            }

            var orderGuid = Guid.NewGuid();
            var orderIdString = orderGuid.ToString();

            // Lấy giỏ hàng từ Redis
            var cartItems = await _redisCartService.GetCartAsync(request.UserId.Value);
            if (cartItems == null || !cartItems.Any())
                throw new InvalidOperationException("Giỏ hàng trống.");

            var exchangeRate = 2500; // Tỷ giá USD/VND
            var total = cartItems.Sum(i => i.Price * i.Quantity * exchangeRate);

            // Tạo đơn hàng
            var order = new Order
            {
                OrderId = Guid.Parse(orderIdString),
                UserId = request.UserId.Value,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                ShippingAddress = request.ShippingAddress,
                TotalAmount = total,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = "pending"
            };

            var items = cartItems.Select(i => new OrderItem
            {
                OrderId = Guid.Parse(orderIdString),
                VariantId = i.VariantId,
                Quantity = i.Quantity,
                UnitPrice = i.Price,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            var payment = new Payment
            {
                OrderId = Guid.Parse(orderIdString),
                Amount = total,
                PaymentMethod = "VNPAY",
                Status = "pending",
                CreatedAt = DateTime.UtcNow
            };

            // Lưu đơn hàng tạm thời
            await _orderRepository.CreateOrderAsync(order, items, payment);

            // Tạo URL thanh toán VNPay
            var vnPayRequest = new VnPayRequestDto
            {
                OrderId = orderIdString,
                Amount = total,
                CustomerPhone = request.CustomerPhone
            };

            var paymentUrl = CreatePaymentUrl(vnPayRequest, httpContext);

            // Không xóa giỏ hàng, đợi callback xác nhận thanh toán
            return new CheckoutResponse
            {
                OrderId = orderGuid,
                PaymentUrl = paymentUrl
            };
        }

        public string CreatePaymentUrl(VnPayRequestDto model, HttpContext httpContext)
        {
            var timeNow = DateTime.Now;
            var tick = DateTime.UtcNow.Ticks.ToString();

            var pay = new VnPayLibrary();
            pay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            pay.AddRequestData("vnp_Command", "pay");
            pay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"] ?? throw new Exception("Missing VnPay:TmnCode"));
            pay.AddRequestData("vnp_Amount", ((int)model.Amount * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", "VND");
            var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
            pay.AddRequestData("vnp_IpAddr", ipAddress);
            pay.AddRequestData("vnp_Locale", "vn");
            pay.AddRequestData("vnp_OrderInfo", model.CustomerPhone);
            pay.AddRequestData("vnp_OrderType", "other");
            pay.AddRequestData("vnp_ReturnUrl", _config["VnPay:ReturnUrl"] ?? throw new Exception("Missing VnPay:ReturnUrl"));
            pay.AddRequestData("vnp_TxnRef", model.OrderId);

            var paymentUrl = pay.CreateRequestUrl(
                    _config["VnPay:Url"] ?? throw new Exception("Missing VnPay:Url"),
                    _config["VnPay:HashSecret"] ?? throw new Exception("Missing VnPay:HashSecret"));
            return paymentUrl;
        }

        public bool ValidateSignature(string inputHash, Dictionary<string, string> responseData)
        {
            if (string.IsNullOrEmpty(inputHash))
            {
                throw new ArgumentNullException(nameof(inputHash), "Input hash cannot be null or empty.");
            }

            var secretKey = _config["VnPay:HashSecret"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new ArgumentNullException(nameof(secretKey), "Secret key cannot be null or empty.");
            }

            var pay = new VnPayLibrary();
            foreach (var item in responseData)
            {
                if (!string.IsNullOrEmpty(item.Value))
                {
                    pay.AddResponseData(item.Key, item.Value);
                }
            }

            return pay.ValidateSignature(inputHash, secretKey);
        }
    }
}