namespace BE_Fashion.DTOs
{
    public class ProductDetailDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string Sku { get; set; } = string.Empty;

        public int CategoryId { get; set; } // Đảm bảo có trường này
        
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<ColorDto> Colors { get; set; } = new();
    }
    
}
