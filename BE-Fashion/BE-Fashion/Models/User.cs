namespace BE_Fashion.Models
{
    public class User
    {
        public int Id { get; set; }
        
        public string? Email { get; set; }

        public string? Phone {  get; set; }
        public string? PasswordHash { get; set; } = string.Empty;

        public string? Salt {  get; set; } = string.Empty;
        public string Role {  get; set; } = "Customer"; // Role Default

        public string? Provider { get; set; } // Google, Facebook
        public string? ProviderId { get; set; } // ID from google, facebook

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
