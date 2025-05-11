using BE_Fashion.DTOs;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> Checkout([FromBody] CheckoutRequest request)
        {
            if (request.Items == null || !request.Items.Any())
                return BadRequest("Giỏ hàng trống");

            var orderId = await _orderService.CheckoutAsync(request);
            return Ok(new { OrderId = orderId });
        }
        [HttpDelete("{orderId}/cancel")]
        public async Task<IActionResult> CancelOrder(Guid orderId)
        {
            var result = await _orderService.CancelOrderAsync(orderId);

            if (!result.Success)
                return BadRequest(new { message = result.Message });

            return Ok(new { message = result.Message });
        }
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateOrderStatus([FromBody] UpdateOrderStatusDto dto)
        {
            var result = await _orderService.UpdateOrderStatusAsync(dto);
            if (!result)
                return NotFound(new { message = "Order not found" });

            return Ok(new { message = "Order status updated successfully" });
        }
        [HttpGet("filter-by-status")]
        public async Task<IActionResult> GetOrdersByStatus([FromQuery] string status)
        {
            try
            {
                var orders = await _orderService.GetOrdersByStatusAsync(status);
                return Ok(orders);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }
        }

    }
}
