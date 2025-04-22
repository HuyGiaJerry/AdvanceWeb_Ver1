using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Mappings
{
    public class ProductProfile : Profile
    {
        public ProductProfile() 
        {
            CreateMap<Product, ProductList>().ForMember(dest => dest.PrimaryImageUrl, opt => opt.MapFrom(
                                                        src => src.ProductImages
                                                        .Where(i => i.IsPrimary == true)
                                                        .Select(i => i.ImageUrl)
                                                        .FirstOrDefault()
                                                        ));
        }
    }
}
