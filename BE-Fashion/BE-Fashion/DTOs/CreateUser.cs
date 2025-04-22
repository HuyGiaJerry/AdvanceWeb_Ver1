namespace BE_Fashion.DTOs
{
    public class CreateUser
    {
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string AvatarUrl { get; set; } = string.Empty;

        public string Role {  get; set; } = string.Empty;
        public string OauthProvider { get; set; } = string.Empty; // "google", "facebook"
        public string OauthId { get; set; } = string.Empty;
    }
}
