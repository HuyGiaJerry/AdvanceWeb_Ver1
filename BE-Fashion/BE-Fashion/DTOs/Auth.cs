namespace BE_Fashion.DTOs
{
    public class Auth
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string Provider { get; set; } = string.Empty;

        public string AvatarUrl { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
}
