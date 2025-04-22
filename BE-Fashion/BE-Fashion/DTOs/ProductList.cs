namespace BE_Fashion.DTOs
{
    public class ProductList
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = string.Empty;
        public decimal BasePrice { get; set; }
        public decimal DiscountPrice { get; set; }
        public string PrimaryImageUrl { get; set; } = string.Empty;
    }
}
