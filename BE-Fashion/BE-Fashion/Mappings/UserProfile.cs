using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BCrypt;

namespace BE_Fashion.Mappings
{
    public class UserProfile : AutoMapper.Profile
    {
        public UserProfile() 
        {
            // Destination, Option
            // Mapping RegisterRequest -> User
            CreateMap<RegisterRequest, User>()
                // dest.PasswordHash of User, src data user enter when register
                .ForMember(dest => dest.PasswordHash,opt => opt.MapFrom(src =>  BCrypt.Net.BCrypt.HashPassword(src.Password)));
            // Mapping User -> LoginRequest
            CreateMap<User, LoginRequest>();
            CreateMap<User, CreateUser>();
        }
    }
}
