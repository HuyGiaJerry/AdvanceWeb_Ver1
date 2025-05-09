namespace BE_Fashion.DTOs
{
    public class UserDto
    {
        public int UserId { get; set; }               // user_id
        public string? Email { get; set; }            // email
        public string? PhoneNumber { get; set; }       // phone_number
        public string FullName { get; set; } = string.Empty;         // full_name
        public string? AvatarUrl { get; set; }        // avatar_url
        public string Role { get; set; } = "customer";           // role
        public bool IsActive { get; set; }            // is_active
        public DateTime CreatedAt { get; set; }       // created_at
        public DateTime UpdatedAt { get; set; }       // updated_at
    }
}
