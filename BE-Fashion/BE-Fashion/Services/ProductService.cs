using AutoMapper;
using BE_Fashion.DTOs;
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
        public async Task<IEnumerable<ProductList>> GetAllProductsAsync(int pageNumber, int pageSize)
        {
            // Get paginated products from repository
            var products = await _productRepository.GetAllAsync(pageNumber, pageSize);

            // Use AutoMapper to convert Product to ProductList
            var productList = _mapper.Map<IEnumerable<ProductList>>(products);
            return (productList);
        }

    }
}
