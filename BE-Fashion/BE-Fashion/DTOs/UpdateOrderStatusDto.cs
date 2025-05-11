namespace BE_Fashion.DTOs
{
    public class UpdateOrderStatusDto
    {
        public Guid OrderId { get; set; }
        public string Status { get; set; } = null!;
    }
}
