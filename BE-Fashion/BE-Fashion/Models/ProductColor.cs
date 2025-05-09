using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductColor
{
    public int ColorId { get; set; }

    public int ProductId { get; set; }

    public string ColorName { get; set; } = null!;

    public string ColorSku { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;

    public virtual ICollection<ProductColorImage> ProductColorImages { get; set; } = new List<ProductColorImage>();

    public virtual ICollection<ProductVariant> ProductVariants { get; set; } = new List<ProductVariant>();
}
