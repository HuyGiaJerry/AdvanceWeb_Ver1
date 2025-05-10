using BE_Fashion.Models;

namespace BE_Fashion.DTOs
{
    public class CartItemDto
    {
        public int VariantId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public int ColorId { get; set; }
        public string ColorName { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }
    }
}
