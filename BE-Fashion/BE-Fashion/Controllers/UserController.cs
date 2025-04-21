using BE_Fashion.DTOs;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var (isSuccess, message) = await _userService.RegisterAsync(dto);
            if (!isSuccess)
            {
                return BadRequest( new {message} );
            }
            return Ok(new { message });
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var (isSuccess, message, userInfo) = await _userService.LoginAsync(dto);

            if (!isSuccess)
                return Unauthorized(message);

            return Ok(userInfo);
        }
    }
}
