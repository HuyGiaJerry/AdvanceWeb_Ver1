using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class ProductRepository : IRepository<Product>
    {
        private readonly DbtestContext _context;

        public ProductRepository(DbtestContext context)
        {
            _context = context;
        }
        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                .Include(p => p.ProductImages)
                .Include(p => p.ProductVariants)
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }
        public async Task<int> GetTotalPagesAsync(int pageSize)
        {
            var totalCount = await _context.Products.CountAsync(); // get total product
            return (int)Math.Ceiling((double)totalCount / pageSize); // calculator page size
        }
        // Get all products
        public async Task<IEnumerable<Product>> GetAllAsync(int pageNumber, int pageSize)
        {
            return await _context.Products
                .Include(p => p.ProductImages)
                .Select(p => new Product
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    BasePrice = p.BasePrice,
                    DiscountPrice = p.DiscountPrice,
                    ProductImages = p.ProductImages
                })
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
       

        // Add new product
        public async Task AddAsync(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
        }

        // Update existing product
        public async Task UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
        }

        // Delete product by ID
        public async Task DeleteAsync(int id)
        {
            var product = await GetByIdAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}
