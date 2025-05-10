namespace BE_Fashion.DTOs
{
    public class VnPayRequestDto
    {
        public string OrderId { get; set; } = string.Empty;
        public string OrderDescription { get; set; } = string.Empty;
        public decimal Amount { get; set; }
    }
}
