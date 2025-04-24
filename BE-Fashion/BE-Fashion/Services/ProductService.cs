using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;

namespace BE_Fashion.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(ProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<int> GetTotalPagesAsync(int pageSize)
        {
            // calculator page number
            return await _productRepository.GetTotalPagesAsync(pageSize);
        }
        public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        {
            var products = await _productRepository.GetAllAsync(pageNumber, pageSize);
            return _mapper.Map<IEnumerable<ProductListDto>>(products);
        }
        //public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        //{
        //    // Get paginated products from repository
        //    var products = await _productRepository.GetAllAsync(pageNumber, pageSize);

        //    // Use AutoMapper to convert Product to ProductList
        //    var productList = _mapper.Map<IEnumerable<ProductListDto>>(products);
        //    return (productList);
        //}
        //public async Task<ProductDetail?> GetProductDetailAsync(int productId)
        //{
        //    var product = await _productRepository.GetByIdAsync(id);
        //    if (product == null)
        //        return null;

        //    return _mapper.Map<ProductDetailDto>(product);
        //}
    }
}
