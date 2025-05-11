using BE_Fashion.DTOs;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var (isSuccess, message) = await _userService.RegisterAsync(dto);
        if (!isSuccess)
            return BadRequest(new { message });

        return Ok(new { message });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var (isSuccess, message, userInfo) = await _userService.LoginAsync(dto);
        if (!isSuccess)
            return Unauthorized(new { message });

        return Ok(userInfo);
    }
    //[Authorize(Roles = "admin")]
    [HttpGet("customers")]
    public async Task<IEnumerable<UserDto>> GetAllCustomer()
    {
        var customers = await _userService.GetAllCustomersAsync();
        return customers;
    }
    [HttpPost("login-admin")]
    public async Task<IActionResult> LoginAdmin([FromBody] LoginRequest loginRequest)
    {
        var result = await _userService.LoginAdminAsync(loginRequest);

        if (result.isSuccess)
        {
            return Ok(new { message = result.message, user = result.dto });
        }
        return BadRequest(new { message = result.message });
    }
}
