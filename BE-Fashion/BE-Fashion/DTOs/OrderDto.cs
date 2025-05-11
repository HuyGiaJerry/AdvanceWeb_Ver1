namespace BE_Fashion.DTOs
{
    public class OrderDto
    {
        public Guid Id { get; set; }
        public string Status { get; set; } = string.Empty;      // pending, delivering, success, cancelled
        public string PaymentStatus { get; set; } = string.Empty; // completed, failed, ...
        public decimal TotalAmount { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
