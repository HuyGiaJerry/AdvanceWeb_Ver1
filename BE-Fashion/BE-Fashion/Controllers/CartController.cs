using BE_Fashion.DTOs;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IRedisCartService _redisCartService;

        public CartController(IRedisCartService cartService)
        {
            _redisCartService = cartService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _redisCartService.GetCartAsync(userId);
            return Ok(cart);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> AddToCart(int userId, [FromBody] CartItemDto item)
        {
            var result = await _redisCartService.AddOrUpdateItemAsync(userId, item);
            return Ok(result);
        }

        [HttpDelete("{userId}/{variantId}")]
        public async Task<IActionResult> RemoveItem(int userId, int variantId)
        {
            await _redisCartService.RemoveItemAsync(userId, variantId);
            return Ok();
        }
        [HttpPut("{userId}/decrease/{variantId}")]
        public async Task<IActionResult> DecreaseItemQuantity(int userId, int variantId, [FromQuery] int quantity)
        {
            try
            {
                var updatedCart = await _redisCartService.DecreaseItemQuantityAsync(userId, variantId, quantity);
                return Ok(updatedCart);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost("merge/{userId}")]
        public async Task<IActionResult> MergeCart(int userId, [FromBody] List<CartItemDto> guestCart)
        {
            try
            {
                await _redisCartService.MergeCartAsync(userId, guestCart);
                return Ok(new { message = "Đã gộp giỏ hàng thành công." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPut("{userId}/increase/{variantId}")]
        public async Task<IActionResult> IncreaseItemQuantity(int userId, int variantId, [FromQuery] int quantity)
        {
            try
            {
                // Gọi service để tăng số lượng
                var result = await _redisCartService.IncreaseItemQuantityAsync(userId, variantId, quantity);
                return Ok(new { message = "Đã tăng số lượng sản phẩm trong giỏ hàng.", result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
