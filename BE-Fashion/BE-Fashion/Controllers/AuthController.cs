using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using BE_Fashion.Services;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var result = await _authService.GoogleLoginWithCodeAsync(request.Code);
            if (!result.IsSuccess)
                return BadRequest(result.Message);

            return Ok(result.Auth);
        }
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] string request)
        {
            var result = await _authService.RefreshLoginAsync(request);

            if (result.IsSuccess)
            {
                // Trả về đối tượng DTO trực tiếp từ kết quả Auth
                return Ok(new RefreshTokenResponse
                {
                    AccessToken = result.Auth.AccessToken,
                    RefreshToken = result.Auth.RefreshToken,
                });
            }

            return BadRequest(result.Message); // Trả về thông báo lỗi nếu không thành công
        }
    }
}
