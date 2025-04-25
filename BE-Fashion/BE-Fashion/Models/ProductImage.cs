using System;
using System.Collections.Generic;

namespace BE_Fashion.Models;

public partial class ProductImage
{
    public int ImageId { get; set; }

    public string ImageUrl { get; set; } = null!;

    public bool? IsPrimary { get; set; }

    public DateTime? CreatedAt { get; set; }
}
