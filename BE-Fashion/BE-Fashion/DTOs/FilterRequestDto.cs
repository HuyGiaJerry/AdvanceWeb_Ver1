namespace BE_Fashion.DTOs
{
    public class FilterRequestDto
    {
        public List<PriceRangeDto>? PriceRanges { get; set; }
        public List<int>? CategoryIds { get; set; }
        public List<string>? Colors { get; set; }
        public List<string>? Sizes { get; set; }
    }
}
