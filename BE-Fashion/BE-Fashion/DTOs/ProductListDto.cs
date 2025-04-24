namespace BE_Fashion.DTOs
{
    public class ProductListDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal DiscountPrice { get; set; }
        public List<ProductImageDto> Images { get; set; } = new();
    }
}
