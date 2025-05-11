namespace BE_Fashion.DTOs
{
    public class CheckoutResponse
    {
        public Guid OrderId { get; set; }
        public string? PaymentUrl { get; set; }
    }
}
