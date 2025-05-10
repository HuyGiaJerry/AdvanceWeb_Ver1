using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;


namespace BE_Fashion.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly DbtestContext _context;
        public CategoryRepository(DbtestContext context)
        {
            _context = context;
        }

        public Task<List<Category>> GetCategoriesAsync()
        {
            return _context.Categories
                .Where(c => c.ParentId == null)
                .ToListAsync();
        }
    }
}
