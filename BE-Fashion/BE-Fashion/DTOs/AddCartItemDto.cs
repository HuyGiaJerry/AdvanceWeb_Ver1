using System.ComponentModel.DataAnnotations;

namespace BE_Fashion.DTOs
{
    public class AddCartItemDto
    {
        [Required]
        public int VariantId { get; set; }

        public int Quantity { get; set; }
    }
}
