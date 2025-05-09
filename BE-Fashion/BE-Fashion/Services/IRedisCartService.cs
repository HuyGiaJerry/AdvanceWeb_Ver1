using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Services
{
    public interface IRedisCartService
    {
        Task<List<CartItemDto>> GetCartAsync(int userId);
        Task AddOrUpdateItemAsync(int userId, CartItemDto item);
        Task RemoveItemAsync(int userId, int variantId);
        Task ClearCartAsync(int userId);
        Task MergeCartAsync(int userId, List<CartItemDto> guestCart);
    }
}
