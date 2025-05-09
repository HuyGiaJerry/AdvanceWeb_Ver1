using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.Extensions.Logging;

namespace BE_Fashion.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly ILogger<UserService> _logger;
        private readonly IRefreshTokenRepository _refreshTokenRepository;
        private readonly IJwtTokenService _jwtService;

        public UserService(IUserRepository userRepository, IMapper mapper, ILogger<UserService> logger, IRefreshTokenRepository refreshTokenRepository, IJwtTokenService jwtTokenService)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
            _refreshTokenRepository = refreshTokenRepository;
            _jwtService = jwtTokenService;
        }

        public async Task<(bool isSuccess, string message)> RegisterAsync(RegisterRequest dto)
        {
            try
            {
                dto.Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim();
                dto.PhoneNumber = string.IsNullOrWhiteSpace(dto.PhoneNumber) ? null : dto.PhoneNumber.Trim();

                var existingUser = await _userRepository.GetByEmailOrPhoneAsync(dto.Email, dto.PhoneNumber);

                if (existingUser != null)
                {
                    return (false, "Email or Phone number already exist");
                }

                var user = _mapper.Map<User>(dto);
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

                await _userRepository.AddAsync(user);
                return (true, "Register successful"); 
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during registration. Email: {Email}, PhoneNumber: {PhoneNumber}", dto.Email, dto.PhoneNumber);
                return (false, $"An error occurred during registration: {ex.Message}");
            }
        }


        public async Task<(bool isSuccess, string message, LoginResponse? dto)> LoginAsync(LoginRequest dto)
        {
            try
            {
                var loginIdentifier = !string.IsNullOrEmpty(dto.Email) ? dto.Email : dto.PhoneNumber;

                if (string.IsNullOrEmpty(loginIdentifier))
                {
                    return (false, "Email or phone number is required", null);
                }

                var user = await _userRepository.GetByCredentialsAsync(loginIdentifier, dto.Password);

                if (user == null)
                {
                    return (false, "Invalid credentials", null);
                }
                var createUserDto = _mapper.Map<CreateUser>(user);

                var accessToken = _jwtService.GenerateAccessToken(createUserDto);  // Truyền CreateUser
                var refreshToken = _jwtService.GenerateRefreshToken();

                // Lưu refresh token vào DB
                await _refreshTokenRepository.AddAsync(new RefreshToken
                {
                    UserId = user.UserId,
                    Token = refreshToken,
                    IssuedAt = DateTime.UtcNow,
                    ExpiresAt = DateTime.UtcNow.AddDays(7), // Thời gian hết hạn refresh token
                    Provider = "local", // Nếu sử dụng OAuth provider, có thể chỉnh sửa lại trường này
                });
                var userInfo = _mapper.Map<LoginResponse>(user);

                // Gán token vào DTO trả về
                userInfo.AccessToken = accessToken;
                userInfo.RefreshToken = refreshToken;
                return (true, "Login successful", userInfo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during login attempt");
                return (false, "An error occurred during login", null);
            }
        }

        public async Task<(bool isSuccess, string message, CreateUser? dto)> CheckEmailExistsAsync(string email)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(email))
                {
                    return (false, "Email không hợp lệ", null);
                }

                email = email.Trim();

                var existingUser = await _userRepository.GetByEmailAsync(email);

                if (existingUser != null)
                {
                    var userDto = _mapper.Map<CreateUser>(existingUser);
                    return (true, "Email đã tồn tại", userDto);
                }

                return (false, "Email chưa tồn tại", null);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while checking email existence");
                return (false, "An error occurred while checking email", null);
            }
        }
        public async Task<IEnumerable<LoginResponse>> GetAllCustomersAsync()
        {
            try
            {
                var users = await _userRepository.GetAllAsync();
                var customers = users.ToList();

                _logger.LogInformation("Retrieved {Count} customers", customers.Count);
                return _mapper.Map<IEnumerable<LoginResponse>>(customers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all customers");
                throw; // Hoặc return Enumerable.Empty<CustomerDto>() nếu muốn xử lý nhẹ nhàng hơn
            }
        }
    }
}
