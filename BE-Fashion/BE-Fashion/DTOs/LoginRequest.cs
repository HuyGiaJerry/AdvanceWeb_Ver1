using System.ComponentModel.DataAnnotations;

namespace BE_Fashion.DTOs
{
    public class LoginRequest : IValidatableObject
    {
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; } = string.Empty;


        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            bool hasEmail = !string.IsNullOrWhiteSpace(Email);
            bool hasPhone = !string.IsNullOrWhiteSpace(PhoneNumber);

            if (!hasEmail && !hasPhone)
            {
                yield return new ValidationResult("You must provide either an Email or a Phone number.", new[] { nameof(Email), nameof(PhoneNumber) });
            }
            else if (hasEmail && hasPhone)
            {
                yield return new ValidationResult("Please provide only one: either Email or Phone number, not both.", new[] { nameof(Email), nameof(PhoneNumber) });
            }

            if (hasEmail && !new EmailAddressAttribute().IsValid(Email))
            {
                yield return new ValidationResult("Invalid email format.", new[] { nameof(Email) });
            }

            if (hasPhone && !System.Text.RegularExpressions.Regex.IsMatch(PhoneNumber!, @"^0\d{9}$"))
            {
                yield return new ValidationResult("Invalid phone number (must start with 0 and have 10 digits).", new[] { nameof(PhoneNumber) });
            }
        }
    }
}
