using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IUserService
    {
        Task<(bool isSuccess, string message)> RegisterAsync(RegisterRequest dto);
        Task<(bool isSuccess, string message, LoginResponse? dto)> LoginAsync(LoginRequest dto);
        Task<(bool isSuccess, string message, CreateUser? dto)> CheckEmailExistsAsync(string email);
    }
}
