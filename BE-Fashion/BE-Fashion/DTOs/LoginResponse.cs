namespace BE_Fashion.DTOs
{
    public class LoginResponse
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        public string AvatarUrl { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        public bool IsGoogleLinked { get; set; } 
    }
}
