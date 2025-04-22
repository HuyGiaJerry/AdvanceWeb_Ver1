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
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest dto)
        {
            var (success, message, auth) = await _authService.GoogleLoginAsync(dto.IdToken);
            if (!success)
                return BadRequest(new { message });
            return Ok(auth);
        }

    }
}
