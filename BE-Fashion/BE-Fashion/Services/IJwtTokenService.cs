using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Services
{
    public interface IJwtTokenService
    {
        string GenerateAccessToken(CreateUser user);
        string GenerateRefreshToken();
    }
}
