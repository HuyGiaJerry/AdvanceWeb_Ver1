using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IAuthService
    {
        Task<(bool IsSuccess, string Message, Auth Auth)> RefreshLoginAsync(string token);
        Task<(bool IsSuccess, string Message, LoginResponse loginResponse)> GoogleLoginWithCodeAsync(string idToken);
    }
}
