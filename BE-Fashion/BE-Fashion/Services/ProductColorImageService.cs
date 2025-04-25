using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;

namespace BE_Fashion.Services
{
    public class ProductColorImageService
    {
        private readonly ProductColorImageRepository _repository;
        private readonly IMapper _mapper;

        public ProductColorImageService(ProductColorImageRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ProductListDto>> GetProductListAsync(int pageNumber,int pageSize)
        {
            var producs = await _repository.GetAllAsync(pageNumber, pageSize);

            var productListDTO = _mapper.Map<IEnumerable<ProductListDto>>(producs);

            return productListDTO;
        }

    }
}
