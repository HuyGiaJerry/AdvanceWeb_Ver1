using BE_Fashion.Models;
using System.Threading.Tasks;

namespace BE_Fashion.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task AddAsync(RefreshToken refreshToken);
        Task<RefreshToken?> GetByTokenAsync(string token);
        Task UpdateAsync(RefreshToken refreshToken);
        Task RevokeAsync(string token);
        Task DeleteAsync(string token);
    }
}
