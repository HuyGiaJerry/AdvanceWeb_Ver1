using AutoMapper;
using BE_Fashion.DTOs;
using BE_Fashion.Repositories;

namespace BE_Fashion.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        public CategoryService(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetAllCategoriesAsync()
        {
            var categories = await _repository.GetCategoriesAsync();

            var categoryDtos = _mapper.Map<List<CategoryDto>>(categories);

            return categoryDtos;
        }
    }
}
