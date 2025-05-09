using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class Otp
{
    public int OtpId { get; set; }

    public int? UserId { get; set; }

    public string Code { get; set; } = null!;

    public DateTime ExpiresAt { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual User? User { get; set; }
}
