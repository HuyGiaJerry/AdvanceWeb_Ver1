namespace BE_Fashion.DTOs
{
    public class ColorDto
    {
        public int ColorId { get; set; }
        public string ColorName { get; set; } = string.Empty;
        public string ColorSku { get; set; } = string.Empty;
        public List<VariantDto> Variants { get; set; } = new();
        public List<ImageDto> Images { get; set; } = new();
    }
}
