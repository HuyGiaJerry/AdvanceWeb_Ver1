using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductVariantColor
{
    public int Id { get; set; }

    public int VariantId { get; set; }

    public string? Color { get; set; }

    public int? StockQuantity { get; set; }

    public string ColorSku { get; set; } = null!;

    public virtual ICollection<ProductVariantImage> ProductVariantImages { get; set; } = new List<ProductVariantImage>();

    public virtual ProductVariant Variant { get; set; } = null!;
}
