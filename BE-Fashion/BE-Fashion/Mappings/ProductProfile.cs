using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile() 
        {
            // Ánh xạ ProductColorImage sang ProductImageDTO
            CreateMap<ProductColorImage, ProductImageDto>();

            // Ánh xạ Product sang ProductListDto
            CreateMap<Product, ProductListDto>()
                .ForMember(dest => dest.Images, opt => opt.MapFrom(src =>
                    src.ProductColors
                        .Where(c => c.ProductColorImages != null && c.ProductColorImages.Any())
                        .SelectMany(c => c.ProductColorImages)
                        .Where(i => i.IsPrimary == true)
                        .Select(i => new ProductImageDto
                        {
                            ImageUrl = i.ImageUrl,
                            ColorName = i.Color.ColorName != null && i.Color.ColorName != null ? i.Color.ColorName : "Default Color"

                        })
                        .ToList()));
        }
    }
}
