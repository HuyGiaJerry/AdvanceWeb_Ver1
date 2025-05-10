namespace BE_Fashion.DTOs
{
    public class CheckoutRequest
    {
        public int? UserId { get; set; } // null nếu khách vãng lai
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerEmail { get; set; } = string.Empty;
        public string CustomerPhone { get; set; } = string.Empty;
        public string ShippingAddress { get; set; } = string.Empty;
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        public string PaymentMethod { get; set; } = string.Empty;
    }
}
