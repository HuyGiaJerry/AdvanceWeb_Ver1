using BE_Fashion.DTOs;
using BE_Fashion.Repositories;

namespace BE_Fashion.Services
{
    public class ProductColorService : IProductColorService
    {
        private readonly IProductColorRepository _repository;

        public ProductColorService(IProductColorRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<AllColorDto>> GetAllColorsAsync()
        {
            return await _repository.GetAllColorsAsync();
        }

        public async Task<List<SizeDto>> GetAllSizesAsync()
        {
            return await _repository.GetAllSizesAsync();
        }
    }
}
