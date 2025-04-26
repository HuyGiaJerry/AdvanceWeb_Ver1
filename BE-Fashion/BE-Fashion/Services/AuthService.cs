using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Google.Apis.Auth;

namespace BE_Fashion.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(
            UserRepository userRepository,
            IMapper mapper,
            IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jwtTokenService = jwtTokenService;
        }

        public async Task<(bool IsSuccess, string Message, Auth Auth)> LoginAsync(LoginRequest dto)
        {
            var user = await _userRepository.GetByCredentialsAsync(dto);
            if (user == null)
                return (false, "Invalid credentials", null!);

            var userDto = _mapper.Map<CreateUser>(user);
            var auth = new Auth
            {
                AccessToken = _jwtTokenService.GenerateAccessToken(userDto),
                RefreshToken = _jwtTokenService.GenerateRefreshToken(),
                FullName = userDto.FullName,
                Role = userDto.Role
            };

            return (true, "Login successful", auth);
        }

        public async Task<(bool IsSuccess, string Message, Auth Auth)> GoogleLoginAsync(string idToken)
        {
            try
            {
                // Validate token and get payload
                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken);

                // Retrieve or create user
                var user = await _userRepository.GetByEmailAsync(payload.Email);
                if (user == null)
                {
                    user = new User
                    {
                        Email = payload.Email,
                        FullName = payload.Name,
                        AvatarUrl = payload.Picture ?? string.Empty,
                        OauthProvider = "google",
                        OauthId = payload.Subject,
                        Role = "customer"
                    };
                    await _userRepository.AddAsync(user);
                }

                // Map and generate tokens
                var userDto = _mapper.Map<CreateUser>(user);
                var auth = new Auth
                {
                    AccessToken = _jwtTokenService.GenerateAccessToken(userDto),
                    RefreshToken = _jwtTokenService.GenerateRefreshToken(),
                    FullName = userDto.FullName,
                    Role = userDto.Role
                };

                return (true, "Google login successful", auth);
            }
            catch (InvalidJwtException ex)
            {
                return (false, "Invalid Google token: " + ex.Message, null!);
            }
        }

    }
}
