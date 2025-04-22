namespace BE_Fashion.DTOs
{
    public class ProductDetail
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal? DiscountPrice { get; set; }
        public string Sku { get; set; } = string.Empty;
        public int CategoryId { get; set; }

        public List<ImageDetail> Images { get; set; } = new();
        public List<VariantDetail> Variants { get; set; } = new();
    }
    
}
