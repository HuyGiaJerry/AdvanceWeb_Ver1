namespace BE_Fashion.DTOs
{
    public class VariantDto
    {
        public int VariantId { get; set; }
        public string Size { get; set; } = string.Empty;
        public int StockQuantity { get; set; }
        public string VariantSku { get; set; } = string.Empty;
    }
}
