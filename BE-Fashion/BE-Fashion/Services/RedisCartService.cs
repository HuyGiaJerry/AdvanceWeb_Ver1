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
        private readonly IProductRepository _productRepository;
        private readonly IConnectionMultiplexer _redis;

        public RedisCartService(IConnectionMultiplexer redis, IProductRepository productRepository)
        {
            _redisDb = redis.GetDatabase();
            _redis = redis;
            _productRepository = productRepository;
        }

        private string GetCartKey(int userId) => $"cart:user:{userId}";
        private string GetLockKey(int userId) => $"cart_lock:user:{userId}";

        private async Task<bool> AcquireLockAsync(int userId, int timeoutInSeconds = 10)
        {
            var lockKey = GetLockKey(userId);
            var lockValue = Guid.NewGuid().ToString();
            var isLockAcquired = await _redisDb.LockTakeAsync(lockKey, lockValue, TimeSpan.FromSeconds(timeoutInSeconds));
            return isLockAcquired;
        }

        private async Task ReleaseLockAsync(int userId)
        {
            var lockKey = GetLockKey(userId);
            var lockValue = await _redisDb.StringGetAsync(lockKey);
            if (!lockValue.IsNullOrEmpty)
            {
                await _redisDb.LockReleaseAsync(lockKey, lockValue);
            }
        }

        public async Task<List<CartItemDto>> GetCartAsync(int userId)
        {
            var key = GetCartKey(userId);
            var data = await _redisDb.StringGetAsync(key);
            if (string.IsNullOrEmpty(data)) return new List<CartItemDto>();

            return JsonSerializer.Deserialize<List<CartItemDto>>(data!) ?? new();
        }

        public async Task AddOrUpdateItemAsync(int userId, CartItemDto item)
        {
            // Cố gắng lấy lock trước khi thực hiện thao tác
            var lockAcquired = await AcquireLockAsync(userId);
            if (!lockAcquired)
            {
                throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
            }

            try
            {
                var key = GetCartKey(userId);
                var cart = await GetCartAsync(userId);

                var existingItem = cart.FirstOrDefault(x => x.VariantId == item.VariantId);

                int newQuantity = item.Quantity;
                if (existingItem != null)
                {
                    newQuantity += existingItem.Quantity;
                }

                // Kiểm tra kho trước khi thêm vào giỏ
                int stock = await _productRepository.GetStockQuantityAsync(item.VariantId);
                if (newQuantity > stock)
                {
                    throw new InvalidOperationException($"Chỉ còn lại {stock} sản phẩm trong kho.");
                }

                //await Task.Delay(3000); // Thêm 3 giây trễ
                // Nếu hợp lệ thì cập nhật hoặc thêm mới
                if (existingItem != null)
                {
                    existingItem.Quantity += item.Quantity;
                }
                else
                {
                    cart.Add(item);
                }

                var serialized = JsonSerializer.Serialize(cart);
                await _redisDb.StringSetAsync(key, serialized);
            }
            finally
            {
                // Giải phóng lock
                await ReleaseLockAsync(userId);
            }
        }

        public async Task RemoveItemAsync(int userId, int variantId)
        {
            // Cố gắng lấy lock trước khi thực hiện thao tác
            var lockAcquired = await AcquireLockAsync(userId);
            if (!lockAcquired)
            {
                throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
            }

            try
            {
                var cart = await GetCartAsync(userId);
                cart.RemoveAll(x => x.VariantId == variantId);

                await _redisDb.StringSetAsync(GetCartKey(userId), JsonSerializer.Serialize(cart));
            }
            finally
            {
                // Giải phóng lock
                await ReleaseLockAsync(userId);
            }
        }

        public async Task ClearCartAsync(int userId)
        {
            // Cố gắng lấy lock trước khi thực hiện thao tác
            var lockAcquired = await AcquireLockAsync(userId);
            if (!lockAcquired)
            {
                throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
            }

            try
            {
                await _redisDb.KeyDeleteAsync(GetCartKey(userId));
            }
            finally
            {
                // Giải phóng lock
                await ReleaseLockAsync(userId);
            }
        }

        public async Task MergeCartAsync(int userId, List<CartItemDto> guestCart)
        {
            // Cố gắng lấy lock trước khi thực hiện thao tác
            var lockAcquired = await AcquireLockAsync(userId);
            if (!lockAcquired)
            {
                throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
            }

            try
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
            finally
            {
                // Giải phóng lock
                await ReleaseLockAsync(userId);
            }
        }

        public async Task DecreaseItemQuantityAsync(int userId, int variantId, int quantityToDecrease)
        {
            // Cố gắng lấy lock trước khi thực hiện thao tác
            var lockAcquired = await AcquireLockAsync(userId);
            if (!lockAcquired)
            {
                throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
            }

            try
            {
                var cart = await GetCartAsync(userId);
                var item = cart.FirstOrDefault(x => x.VariantId == variantId);

                if (item == null)
                {
                    throw new InvalidOperationException("Sản phẩm không có trong giỏ hàng.");
                }

                if (item.Quantity <= quantityToDecrease)
                {
                    // Nếu trừ nhiều hơn hoặc bằng số lượng hiện có, thì xóa khỏi giỏ
                    cart.Remove(item);
                }
                else
                {
                    // Giảm số lượng
                    item.Quantity -= quantityToDecrease;
                }

                // Cập nhật Redis
                var serialized = JsonSerializer.Serialize(cart);
                await _redisDb.StringSetAsync(GetCartKey(userId), serialized);
            }
            finally
            {
                // Giải phóng lock
                await ReleaseLockAsync(userId);
            }
        }
    }
}
