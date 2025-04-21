using BE_Fashion.Data;
using BE_Fashion.DTOs;
using Microsoft.AspNetCore.Mvc;
using BE_Fashion.Helpers;
using BE_Fashion.Models;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using BE_Fashion.Services;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IJwtService _jwtService;
        private readonly AppDbContext _context;

        public UserController(IJwtService jwtService, AppDbContext context)
        {
            _jwtService = jwtService;
            _context = context;
        }

        // Action business register
        [HttpPost("register")]
        public IActionResult Register(RegisterRequestDTO requestDTO)
        {
            // Kiểm tra nếu username đã tồn tại
            if (_context.Users.Any(u => u.UserName == requestDTO.UserName))
            {
                return BadRequest("Username already exists.");
            }

            if (string.IsNullOrWhiteSpace(requestDTO.UserName) || string.IsNullOrWhiteSpace(requestDTO.Password))
            {
                return BadRequest("Username and Password cannot be empty.");
            }

            // Tạo salt và mã hóa mật khẩu
            string salt = PasswordHelper.CreateSalt();
            string passwordHash = PasswordHelper.HashPasswordWithSalt(requestDTO.Password, salt);

            // Tạo người dùng mới
            User user = new User
            {
                UserName = requestDTO.UserName,
                Email = requestDTO.Email,
                PasswordHash = passwordHash,
                Salt = salt
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            // Trả về thông tin người dùng đã đăng ký
            var response = new RegisterResponseDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role
            };
            return Ok(response);
        }

        // Đăng nhập và trả về JWT token
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO requestDTO)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == requestDTO.UserName);
            if (user == null)
            {
                return Unauthorized("Invalid username or password.");
            }

            string hashedPassword = PasswordHelper.HashPasswordWithSalt(requestDTO.Password, user.Salt);
            Console.WriteLine("Password hass:" + hashedPassword);
            if (hashedPassword != user.PasswordHash)
            {
                return Unauthorized("False.");
            }

            var token = _jwtService.GenerateToken(user);
            var response = new LoginResponseDTO
            {
                Token = token,
                Username = user.UserName,
                Email = user.Email,
                Role = user.Role
            };

            return Ok(response);
        }
    }
}
