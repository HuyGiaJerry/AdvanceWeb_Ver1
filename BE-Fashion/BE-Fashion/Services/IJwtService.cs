using BE_Fashion.Models;
namespace BE_Fashion.Services
{
    public interface IJwtService
    {
        string GenerateToken(User user);
    }
}
