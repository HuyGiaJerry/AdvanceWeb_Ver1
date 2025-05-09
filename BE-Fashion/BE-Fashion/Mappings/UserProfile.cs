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
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                // dest.PasswordHash of User, src data user enter when register
                .ForMember(dest => dest.PasswordHash,opt => opt.MapFrom(src =>  BCrypt.Net.BCrypt.HashPassword(src.Password)));
            // Mapping User -> LoginRequest
            CreateMap<User, LoginRequest>();
            CreateMap<User, CreateUser>();
            CreateMap<User, LoginResponse>()
                 .ForMember(dest => dest.IsGoogleLinked, opt =>
                    opt.MapFrom(src => src.OauthProvider == "google" && !string.IsNullOrEmpty(src.OauthId)));
            CreateMap<CreateUser, User>();
            CreateMap<RefreshToken, RefreshTokenResponse>();
        }
    }
}
