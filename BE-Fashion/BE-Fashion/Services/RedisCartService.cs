using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
using System.Text.Json;

namespace BE_Fashion.Services
{
    public class RedisCartService : IRedisCartService
    {
        private readonly IDatabase _redisDb;

        public RedisCartService(IConnectionMultiplexer redis)
        {
            _redisDb = redis.GetDatabase();
        }

        private string GetCartKey(int userId) => $"cart:user:{userId}";

        public async Task<List<CartItemDto>> GetCartAsync(int userId)
        {
            var key = GetCartKey(userId);
            var data = await _redisDb.StringGetAsync(key);
            if (string.IsNullOrEmpty(data)) return new List<CartItemDto>();

            return JsonSerializer.Deserialize<List<CartItemDto>>(data) ?? new();
        }

        public async Task AddOrUpdateItemAsync(int userId, CartItemDto item)
        {
            var cart = await GetCartAsync(userId);
            var existingItem = cart.FirstOrDefault(x => x.VariantId == item.VariantId);

            if (existingItem != null)
            {
                existingItem.Quantity += item.Quantity;
            }
            else
            {
                cart.Add(item);
            }

            await _redisDb.StringSetAsync(GetCartKey(userId), JsonSerializer.Serialize(cart));
        }

        public async Task RemoveItemAsync(int userId, int variantId)
        {
            var cart = await GetCartAsync(userId);
            cart.RemoveAll(x => x.VariantId == variantId);

            await _redisDb.StringSetAsync(GetCartKey(userId), JsonSerializer.Serialize(cart));
        }

        public async Task ClearCartAsync(int userId)
        {
            await _redisDb.KeyDeleteAsync(GetCartKey(userId));
        }

        public async Task MergeCartAsync(int userId, List<CartItemDto> guestCart)
        {
            var existingCart = await GetCartAsync(userId);

            foreach (var item in guestCart)
            {
                var existing = existingCart.FirstOrDefault(x => x.VariantId == item.VariantId);
                if (existing != null)
                    existing.Quantity += item.Quantity;
                else
                    existingCart.Add(item);
            }

            await _redisDb.StringSetAsync(GetCartKey(userId), JsonSerializer.Serialize(existingCart));
        }
    }
}
