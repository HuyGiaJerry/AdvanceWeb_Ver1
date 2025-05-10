using BE_Fashion.DTOs;
using BE_Fashion.Models;

namespace BE_Fashion.Repositories
{
    public interface IProductRepository
    {
        Task<Product?> GetByIdAsync(int id);
        Task<int> GetTotalPagesAsync(int pageSize);
        Task<IEnumerable<Product>> GetAllAsync();
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task<ProductDetailRawDto[]> GetProductDetailRawAsync(int productId);
        Task<ProductVariant?> GetVariantByIdAsync(int variantId);
        Task<bool> HasEnoughStockAsync(int variantId, int quantity);
        Task<decimal> GetPriceAsync(int variantId);
        Task<int> GetStockQuantityAsync(int variantId);
        Task<IEnumerable<Product>> GetFilteredProductsAsync(
                        List<PriceRangeDto>? priceRanges,
                        List<int>? categoryIds,
                        List<string>? colors,
                        List<string>? sizes
                        );
    }
}
