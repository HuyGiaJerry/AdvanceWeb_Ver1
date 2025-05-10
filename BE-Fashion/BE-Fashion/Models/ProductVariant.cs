using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductVariant
{
    public int VariantId { get; set; }

    public int ProductId { get; set; }

    public string Size { get; set; } = null!;

    public int ColorId { get; set; }

    public int? StockQuantity { get; set; }

    public string VariantSku { get; set; } = null!;

    public virtual ProductColor Color { get; set; } = null!;

    public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    public virtual Product Product { get; set; } = null!;
}
