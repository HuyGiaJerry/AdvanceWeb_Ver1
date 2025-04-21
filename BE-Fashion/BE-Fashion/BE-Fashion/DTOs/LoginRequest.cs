using System.ComponentModel.DataAnnotations;

namespace BE_Fashion.DTOs
{
    public class LoginRequest : IValidatableObject
    {
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;

        public string AvatarUrl { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

        // dependencies IValidatableObject
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext) 
        {
            if (string.IsNullOrWhiteSpace(Email) && string.IsNullOrWhiteSpace(PhoneNumber))
            {
                yield return new ValidationResult(
                    "Either Email or PhoneNumber must be provided.",
                    new[] { nameof(Email), nameof(PhoneNumber) });
            }
        }
    }
}
