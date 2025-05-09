using BE_Fashion.Models;

namespace BE_Fashion.DTOs
{
    public class CartDto
    {
        public int UserId { get; set; }
        public List<CartItemDto> CartItems { get; set; } = new List<CartItemDto>();
    }
}
