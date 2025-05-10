namespace BE_Fashion.DTOs
{
    public class CreateUser
    {
        public int UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }

        public string Role {  get; set; } = string.Empty;
        public string OauthProvider { get; set; } = string.Empty; // "google", "Facebook"
        public string OauthId { get; set; } = string.Empty;
    }
}
