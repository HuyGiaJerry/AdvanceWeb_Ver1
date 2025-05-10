using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Mappings
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile() 
        {
            CreateMap<Category, CategoryDto>();
        }
    }
}
