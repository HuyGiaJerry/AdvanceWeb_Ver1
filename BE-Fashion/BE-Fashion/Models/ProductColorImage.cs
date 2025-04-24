using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductColorImage
{
    public int Id { get; set; }

    public int ColorId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool? IsPrimary { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ProductColor Color { get; set; } = null!;
}
