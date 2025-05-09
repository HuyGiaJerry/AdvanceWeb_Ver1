using BE_Fashion.DTOs;
using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DbtestContext _context;

        public ProductRepository(DbtestContext context)
        {
            _context = context;
        }
        public async Task<Product?> GetByIdAsync(int id)
        {
            return await _context.Products
                        .Include(p => p.ProductColors)
                            .ThenInclude(pc => pc.ProductColorImages) // Lấy tất cả ảnh, không lọc IsPrimary
                        .Include(p => p.ProductVariants)
                        .FirstOrDefaultAsync(p => p.ProductId == id);
        }
        public async Task<int> GetTotalPagesAsync(int pageSize)
        {
            var totalCount = await _context.Products.CountAsync(); // get total product
            return (int)Math.Ceiling((double)totalCount / pageSize); // calculator page size
        }
        // Get all products
        //public async Task<IEnumerable<Product>> GetAllAsync(int pageNumber, int pageSize)
        //{
        //    return await _context.Products
        //        .Include(p => p.ProductColors)
        //            .ThenInclude(pc => pc.ProductColorImages)
        //        .OrderBy(p => p.ProductId)
        //        .Skip((pageNumber - 1) * pageSize)
        //        .Take(pageSize)
        //        .ToListAsync();
        //}
        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products
                .Include(p => p.ProductColors)
                    .ThenInclude(pc => pc.ProductColorImages)
                .OrderBy(p => p.ProductId)
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
        public async Task<ProductDetailRawDto[]> GetProductDetailRawAsync(int productId)
        {
            var query = from p in _context.Products
                        join pc in _context.ProductColors on p.ProductId equals pc.ProductId into pcGroup
                        from pc in pcGroup.DefaultIfEmpty()
                        join pv in _context.ProductVariants on new { pc.ProductId, pc.ColorId } equals new { pv.ProductId, pv.ColorId } into pvGroup
                        from pv in pvGroup.DefaultIfEmpty()
                        join pci in _context.ProductColorImages on pc.ColorId equals pci.ColorId into pciGroup
                        from pci in pciGroup.DefaultIfEmpty()
                        where p.ProductId == productId
                        select new ProductDetailRawDto
                        {
                            Product = p,
                            Color = pc,
                            Variant = pv,
                            Image = pci
                        };

            return await query.ToArrayAsync();
        }
        public async Task<ProductVariant?> GetVariantByIdAsync(int variantId)
        {
            return await _context.ProductVariants
                .AsNoTracking()
                .FirstOrDefaultAsync(v => v.VariantId == variantId);
        }

        public async Task<bool> HasEnoughStockAsync(int variantId, int quantity)
        {
            var variant = await GetVariantByIdAsync(variantId);
            return variant != null && variant.StockQuantity >= quantity;
        }

        public async Task<decimal> GetPriceAsync(int variantId)
        {
            var variant = await _context.ProductVariants
                .AsNoTracking()
                .Include(v => v.Product)
                .FirstOrDefaultAsync(v => v.VariantId == variantId);

            return variant?.Product.DiscountPrice ?? variant?.Product.BasePrice ?? 0;
        }
        public async Task<int> GetStockQuantityAsync(int variantId)
        {
            var stockQuantity = await _context.ProductVariants
                    .Where(v => v.VariantId == variantId)
                    .Select(v => v.StockQuantity)
                    .FirstOrDefaultAsync();

            return stockQuantity ?? 0;
        }
    }
}
