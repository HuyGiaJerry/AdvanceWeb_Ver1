using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Services
{
    public interface IRedisCartService
    {
        Task<List<CartItemDto>> GetCartAsync(int userId);
        Task<CartItemResultDto> AddOrUpdateItemAsync(int userId, CartItemDto item);

        Task RemoveItemAsync(int userId, int variantId);
        Task ClearCartAsync(int userId);
        Task MergeCartAsync(int userId, List<CartItemDto> guestCart);
        Task<CartItemResultDto> DecreaseItemQuantityAsync(int userId, int variantId, int quantityToDecrease);
        Task<CartItemResultDto> IncreaseItemQuantityAsync(int userId, int variantId, int quantityToDecrease);

    }
}
