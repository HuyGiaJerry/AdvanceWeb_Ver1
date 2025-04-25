using BE_Fashion.Models;

namespace BE_Fashion.DTOs
{
    public class ProductDetailRawDto
    {
        public Product Product { get; set; } = new();
        public ProductColor Color { get; set; } = new();
        public ProductVariant Variant { get; set; } = new();
        public ProductColorImage Image { get; set; } = new();
    }
}
