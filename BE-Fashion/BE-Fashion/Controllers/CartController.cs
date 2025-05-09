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
        private readonly IRedisCartService _cartService;

        public CartController(IRedisCartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetCart(int userId)
        {
            var cart = await _cartService.GetCartAsync(userId);
            return Ok(cart);
        }

        [HttpPost("{userId}")]
        public async Task<IActionResult> AddToCart(int userId, [FromBody] CartItemDto item)
        {
            await _cartService.AddOrUpdateItemAsync(userId, item);
            return Ok();
        }

        [HttpDelete("{userId}/{variantId}")]
        public async Task<IActionResult> RemoveItem(int userId, int variantId)
        {
            await _cartService.RemoveItemAsync(userId, variantId);
            return Ok();
        }
    }
}
