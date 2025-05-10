using BE_Fashion.Models;

namespace BE_Fashion.Repositories
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetCategoriesAsync();
    }
}
