using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IAuthService
    {
        Task<(bool IsSuccess, string Message, Auth Auth)> LoginAsync(LoginRequest dto);
        Task<(bool IsSuccess, string Message, Auth Auth)> GoogleLoginAsync(string idToken);
    }
}
