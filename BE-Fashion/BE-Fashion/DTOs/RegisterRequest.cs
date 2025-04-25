using System.ComponentModel.DataAnnotations;

namespace BE_Fashion.DTOs
{
    public class RegisterRequest : IValidatableObject
    {
        public string? Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$", ErrorMessage = "Mật khẩu phải có ít nhất 6 ký tự, gồm chữ hoa, chữ thường và số")]
        public string Password { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^[\p{L} ]+$", ErrorMessage = "Tên không hợp lệ")]
        public string FullName { get; set; } = string.Empty;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrWhiteSpace(Email) && string.IsNullOrWhiteSpace(PhoneNumber))
            {
                yield return new ValidationResult("Phải cung cấp Email hoặc Số điện thoại", new[] { nameof(Email), nameof(PhoneNumber) });
            }

            if (!string.IsNullOrWhiteSpace(Email) &&
                !new EmailAddressAttribute().IsValid(Email))
            {
                yield return new ValidationResult("Email không hợp lệ", new[] { nameof(Email) });
            }

            if (!string.IsNullOrWhiteSpace(PhoneNumber) &&
                !System.Text.RegularExpressions.Regex.IsMatch(PhoneNumber, @"^0\d{9}$"))
            {
                yield return new ValidationResult("Số điện thoại không hợp lệ (phải bắt đầu bằng 0 và có 10 chữ số)", new[] { nameof(PhoneNumber) });
            }
        }
    }
}
