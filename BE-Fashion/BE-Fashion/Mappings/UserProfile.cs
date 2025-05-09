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
            CreateMap<User, CreateUser>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email ?? ""))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber ?? ""))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName ?? ""))
                .ForMember(dest => dest.PasswordHash, opt => opt.MapFrom(src => src.PasswordHash))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role ?? "customer"))
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.AvatarUrl ?? ""))
                .ForMember(dest => dest.OauthProvider, opt => opt.MapFrom(src => src.OauthProvider ?? ""))
                .ForMember(dest => dest.OauthId, opt => opt.MapFrom(src => src.OauthId ?? ""));
            
            CreateMap<User, LoginResponse>()
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => src.FullName))
                .ForMember(dest => dest.Role, opt => opt.MapFrom(src => src.Role))
                .ForMember(dest => dest.AvatarUrl, opt => opt.MapFrom(src => src.AvatarUrl))
                .ForMember(dest => dest.IsGoogleLinked, opt =>
                    opt.MapFrom(src => src.OauthProvider == "google" && !string.IsNullOrEmpty(src.OauthId)));
            CreateMap<CreateUser, User>();
            CreateMap<RefreshToken, RefreshTokenResponse>();
        }
    }
}
