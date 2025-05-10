using BE_Fashion.DTOs;
using BE_Fashion.Repositories;
using BE_Fashion.Services;
using StackExchange.Redis;
using System.Text.Json;

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

    private async Task SaveCartAsync(int userId, List<CartItemDto> cart)
    {
        var key = GetCartKey(userId);
        var serialized = JsonSerializer.Serialize(cart);
        await _redisDb.StringSetAsync(key, serialized, TimeSpan.FromDays(7)); // TTL = 7 ngày
    }

    public async Task<CartItemResultDto> AddOrUpdateItemAsync(int userId, CartItemDto item)
    {
        if (item.Quantity <= 0)
        {
            throw new InvalidOperationException("Số lượng sản phẩm phải lớn hơn 0.");
        }

        var lockAcquired = await AcquireLockAsync(userId);
        if (!lockAcquired)
        {
            throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
        }

        try
        {
            var cart = await GetCartAsync(userId);
            var existingItem = cart.FirstOrDefault(x => x.VariantId == item.VariantId);
            int newQuantity = item.Quantity + (existingItem?.Quantity ?? 0);

            int stock = await _productRepository.GetStockQuantityAsync(item.VariantId);
            if (newQuantity > stock)
            {
                throw new InvalidOperationException($"Chỉ còn lại {stock} sản phẩm trong kho.");
            }

            bool isNewItem = existingItem == null;

            if (isNewItem)
            {
                cart.Add(item);
            }
            else
            {
                existingItem!.Quantity = newQuantity;
            }

            await SaveCartAsync(userId, cart);

            return new CartItemResultDto
            {
                VariantId = item.VariantId,
                QuantityInCart = newQuantity,
            };
        }
        finally
        {
            await ReleaseLockAsync(userId);
        }
    }


    public async Task RemoveItemAsync(int userId, int variantId)
    {
        var lockAcquired = await AcquireLockAsync(userId);
        if (!lockAcquired)
        {
            throw new InvalidOperationException("Giỏ hàng đang được xử lý. Vui lòng thử lại sau.");
        }

        try
        {
            var cart = await GetCartAsync(userId);
            cart.RemoveAll(x => x.VariantId == variantId);
            await SaveCartAsync(userId, cart);
        }
        finally
        {
            await ReleaseLockAsync(userId);
        }
    }

    public async Task ClearCartAsync(int userId)
    {
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
            await ReleaseLockAsync(userId);
        }
    }

    public async Task MergeCartAsync(int userId, List<CartItemDto> guestCart)
    {
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

            await SaveCartAsync(userId, existingCart);
        }
        finally
        {
            await ReleaseLockAsync(userId);
        }
    }

    public async Task<CartItemResultDto> DecreaseItemQuantityAsync(int userId, int variantId, int quantityToDecrease)
    {
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

            int stock = await _productRepository.GetStockQuantityAsync(variantId);

            if (item.Quantity <= quantityToDecrease)
            {
                cart.Remove(item);
                await SaveCartAsync(userId, cart);
                return new CartItemResultDto
                {
                    VariantId = variantId,
                    QuantityInCart = 0,
                };
            }
            else
            {
                item.Quantity -= quantityToDecrease;
                await SaveCartAsync(userId, cart);
                return new CartItemResultDto
                {
                    VariantId = variantId,
                    QuantityInCart = item.Quantity,
                };
            }
        }
        finally
        {
            await ReleaseLockAsync(userId);
        }
    }
}
