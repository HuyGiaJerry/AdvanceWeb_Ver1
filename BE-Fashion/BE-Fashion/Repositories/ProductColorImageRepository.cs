using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class ProductColorImageRepository : IRepository<ProductColorImage>
    {
        private readonly DbtestContext _context;

        public ProductColorImageRepository(DbtestContext context)
        {
            _context = context;
        }
        public async Task<ProductColorImage?> GetByIdAsync(int id)
        {
            return await _context.ProductColorImages.FirstOrDefaultAsync(pci => pci.Id == id);
        }
        public async Task<IEnumerable<ProductColorImage>> GetAllAsync(int pageNumber, int pageSize)
        {
            return await _context.ProductColorImages
                .Where(pci => pci.IsPrimary == true)
                .Include(pci => pci.Color)
                    .ThenInclude(c => c.Product)
                .OrderBy(pci => pci.Color.ColorName)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        public async Task AddAsync(ProductColorImage entity)
        {
            await _context.ProductColorImages.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(ProductColorImage entity)
        {
            _context.ProductColorImages.Update(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _context.ProductColorImages.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}
