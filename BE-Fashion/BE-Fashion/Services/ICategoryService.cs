using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategoriesAsync();
    }
}
