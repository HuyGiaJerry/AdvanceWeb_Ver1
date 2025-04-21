using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class LoyaltyPoint
{
    public int PointId { get; set; }

    public int? UserId { get; set; }

    public int Points { get; set; }

    public string? TransactionType { get; set; }

    public int? OrderId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Order? Order { get; set; }

    public virtual User? User { get; set; }
}
