using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class RefreshToken
{
    public int TokenId { get; set; }

    public int UserId { get; set; }

    public string Provider { get; set; } = null!;

    public string Token { get; set; } = null!;

    public DateTime? ExpiresAt { get; set; }

    public DateTime IssuedAt { get; set; }

    public bool Revoked { get; set; }

    public virtual User User { get; set; } = null!;
}
