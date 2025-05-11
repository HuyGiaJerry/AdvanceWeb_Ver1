using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class Order
{
    public Guid OrderId { get; set; }

    public int? UserId { get; set; }

    public string? CustomerEmail { get; set; }

    public string? CustomerPhone { get; set; }

    public decimal TotalAmount { get; set; }

    public string? Status { get; set; }

    public string ShippingAddress { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public string? CustomerName { get; set; }

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Payment? Payment { get; set; }

    public virtual User? User { get; set; }
}
