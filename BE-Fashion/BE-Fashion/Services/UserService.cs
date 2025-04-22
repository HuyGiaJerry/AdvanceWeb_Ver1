using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Services
{
    public class UserService
    {
        private readonly UserRepository _userRepository;
        private readonly IMapper _mapper;
        
        public UserService(UserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public async Task<(bool isSuccess, string Message)> RegisterAsync(RegisterRequest dto)
        {
            dto.Email = string.IsNullOrWhiteSpace(dto.Email) ? null : dto.Email.Trim();
            dto.PhoneNumber = string.IsNullOrWhiteSpace(dto.PhoneNumber) ? null : dto.PhoneNumber.Trim();

            var existingUser = await _userRepository.GetByEmailOrPhoneAsync(dto);
            if (existingUser != null)
            {
                return (false, "Email or Phone number already exist");
            }

            var user = _mapper.Map<User>(dto);
            await _userRepository.AddAsync(user);
            return (true, "Register successful");
        }
        public async Task<(bool isSuccess,string message, LoginRequest dto)> LoginAsync(LoginRequest dto)
        {
            var user = await _userRepository.GetByCredentialsAsync(dto);
            if (user == null)
            {
                return (false, "Invalid credentials", dto);
            }
            Console.WriteLine($"User found: {user.Role}");
            var userInfo = _mapper.Map<LoginRequest>(user);
            Console.WriteLine($"Mapped Role: {userInfo.Role}");
            return (true, "Login successful", userInfo); 
        }
        public async Task<(bool isSuccess, string message, CreateUser? dto)> CheckEmailExistsAsync(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
            {
                return (false, "Email không hợp lệ", null);
            }

            // Chuẩn hóa email
            email = email.Trim();

            // Gọi repository để kiểm tra
            var existingUser = await _userRepository.GetByEmailAsync(email);

            if (existingUser != null)
            {
                // Ánh xạ User sang UserDto
                var userDto = _mapper.Map<CreateUser>(existingUser);
                return (true, "Email đã tồn tại", userDto);
            }

            return (false, "Email chưa tồn tại", null);
        }

      
    }
}
