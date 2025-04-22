namespace BE_Fashion.DTOs
{
    public class VariantDetail
    {
        public int VariantId { get; set; }
        public string Size { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public int StockQuantity { get; set; }
        public decimal AdditionalPrice { get; set; }
    }
}
