using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductVariantImage
{
    public int Id { get; set; }

    public int VariantColorId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool? IsPrimary { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ProductVariantColor VariantColor { get; set; } = null!;
}
