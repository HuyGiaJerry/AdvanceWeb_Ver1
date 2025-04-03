using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BE_Fashion.Models;
using BE_Fashion.Data;
using BE_Fashion.Services;

namespace BE_Fashion.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IJwtService _jwtService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IJwtService jwtService,AppDbContext context, ILogger<AuthController> logger)
        {
            _jwtService = jwtService;
            _context = context;
            _logger = logger;
        }

        // 1. Chuyển hướng người dùng đến Google để đăng nhập
        [HttpGet("external-login")]
        public IActionResult ExternalLogin(string provider)
        {
            //var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Auth", null, Request.Scheme);
            //var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            //return Challenge(properties, provider);
            _logger.LogInformation("ExternalLogin called with provider: {Provider}", provider);
            var redirectUrl = Url.Action(nameof(ExternalLoginCallback), "Auth", null, Request.Scheme);
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            return Challenge(properties, "Google");
        }

        // 2. Xử lý callback từ Google
        [HttpGet("signin-google")]
        public async Task<IActionResult> ExternalLoginCallback()
        {
            var authResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            if (!authResult.Succeeded)
            {
                _logger.LogError("Google authentication failed.");
                return BadRequest("Google authentication failed.");
            }

            var claims = authResult.Principal.Identities.FirstOrDefault()?.Claims;
            var email = claims?.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Email)?.Value;
            var name = claims?.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.Name)?.Value;
            var providerId = claims?.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;

            if (email == null || providerId == null)
            {
                _logger.LogError("Không lấy được thông tin tài khoản.");
                return BadRequest("Không lấy được thông tin tài khoản.");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
            {
                user = new User
                {
                    Email = email,
                    UserName = name ?? email.Split('@')[0],
                    Provider = "Google",
                    ProviderId = providerId,
                    Role = "Customer",
                    CreatedAt = DateTime.UtcNow
                };
                _context.Users.Add(user);
            }
            else
            {
                if (string.IsNullOrEmpty(user.ProviderId))
                {
                    user.Provider = "Google";
                    user.ProviderId = providerId;
                }
            }

            await _context.SaveChangesAsync();

            var token = _jwtService.GenerateToken(user);
            _logger.LogInformation("Generated token: {Token}", token);

            return Redirect($"http://localhost:5173?token={token}");
        }


    }
}
