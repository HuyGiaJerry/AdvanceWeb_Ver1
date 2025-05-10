using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class OrderItem
{
    public int OrderItemId { get; set; }

    public Guid? OrderId { get; set; }

    public int? VariantId { get; set; }

    public int Quantity { get; set; }

    public decimal UnitPrice { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Order? Order { get; set; }

    public virtual ProductVariant? Variant { get; set; }
}
