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

        public UserService(IUserRepository userRepository, IMapper mapper, ILogger<UserService> logger)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _logger = logger;
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
                _logger.LogError(ex, "Error occurred during registration");
                return (false, "An error occurred during registration");  
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

                var userInfo = _mapper.Map<LoginResponse>(user);
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
    }
}
