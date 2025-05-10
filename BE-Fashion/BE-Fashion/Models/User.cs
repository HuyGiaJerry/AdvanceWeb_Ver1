using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Email { get; set; }

    public string? PhoneNumber { get; set; }

    public string? PasswordHash { get; set; }

    public string? FullName { get; set; }

    public string? AvatarUrl { get; set; }

    public string? Role { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? OauthProvider { get; set; }

    public string? OauthId { get; set; }

    public bool? TwoFactorEnabled { get; set; }

    public string? TwoFactorSecret { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Otp> Otps { get; set; } = new List<Otp>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();

    public virtual ICollection<Wishlist> Wishlists { get; set; } = new List<Wishlist>();
}
