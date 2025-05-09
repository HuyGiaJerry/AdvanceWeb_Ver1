using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IProductService
    {
        Task<int> GetTotalPagesAsync(int pageSize);
        Task<IEnumerable<ProductListDto>> GetAllProductsAsync();
        Task<ProductDetailDto?> GetProductDetailAsync(int productId);
    }
}
