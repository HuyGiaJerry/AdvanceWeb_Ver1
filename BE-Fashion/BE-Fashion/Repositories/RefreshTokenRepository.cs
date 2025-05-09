using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly DbtestContext _context;
        public RefreshTokenRepository(DbtestContext context)
        {
            _context = context;
        }
        // Thêm Refresh Token vào cơ sở dữ liệu
        public async Task AddAsync(RefreshToken refreshToken)
        {
            await _context.RefreshTokens.AddAsync(refreshToken);
            await _context.SaveChangesAsync();
        }

        // Lấy Refresh Token theo token
        public async Task<RefreshToken?> GetByTokenAsync(string token)
        {
            return await _context.RefreshTokens
                                 .FirstOrDefaultAsync(t => t.Token == token && t.Revoked == false);
        }
        public async Task UpdateAsync(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Update(refreshToken);  // Cập nhật thông tin refresh token
            await _context.SaveChangesAsync();
        }
        // Đánh dấu Refresh Token là đã bị thu hồi
        public async Task RevokeAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens
                                              .FirstOrDefaultAsync(t => t.Token == token);
            if (refreshToken != null)
            {
                refreshToken.Revoked = true;
                await _context.SaveChangesAsync();
            }
        }

        // Xóa Refresh Token khỏi cơ sở dữ liệu
        public async Task DeleteAsync(string token)
        {
            var refreshToken = await _context.RefreshTokens
                                              .FirstOrDefaultAsync(t => t.Token == token);
            if (refreshToken != null)
            {
                _context.RefreshTokens.Remove(refreshToken);
                await _context.SaveChangesAsync();
            }
        }
    }
}
