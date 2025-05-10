using BE_Fashion.DTOs;
using BE_Fashion.Models;
using LinqKit;
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

        public async Task<IEnumerable<Product>> GetFilteredProductsAsync(
            List<PriceRangeDto>? priceRanges,
            List<int>? categoryIds,
            List<string>? colors,
            List<string>? sizes)
        {
            var query = _context.Products
                .Include(p => p.ProductColors)
                    .ThenInclude(c => c.ProductColorImages)
                        .ThenInclude(i => i.Color)
                .Include(p => p.ProductVariants)
                    .ThenInclude(v => v.Color)
                .AsQueryable();


            // Lọc theo khoảng giá
            var predicate = PredicateBuilder.New<Product>(p => true);

            if (priceRanges?.Any() == true)
            {
                foreach (var range in priceRanges)
                {
                    predicate = predicate.And(p => p.BasePrice >= range.MinPrice && p.BasePrice <= range.MaxPrice);
                }
            }

            query = query.Where(predicate);
            // Lọc theo danh mục (bao gồm danh mục con)
            if (categoryIds?.Any() == true)
            {
                var allCategoryIds = new List<int>();
                foreach (var catId in categoryIds)
                {
                    allCategoryIds.Add(catId);
                    var subCategoryIds = await GetSubCategoryIdsAsync(catId);
                    allCategoryIds.AddRange(subCategoryIds);
                }
                query = query.Where(p => p.CategoryId != null && allCategoryIds.Contains(p.CategoryId.Value));
            }

            // Lọc theo màu sắc
            if (colors?.Any() == true)
            {
                query = query.Where(p => p.ProductColors.Any(c => colors.Contains(c.ColorName)));
            }

            // Lọc theo kích thước
            if (sizes?.Any() == true)
            {
                query = query.Where(p => p.ProductVariants.Any(v => sizes.Contains(v.Size)));
            }

            var filteredProducts = await query
                .Select(p => new Product
                {
                    ProductId = p.ProductId,
                    Name = p.Name,
                    BasePrice = p.BasePrice,
                    DiscountPrice = p.DiscountPrice ?? 0, // Xử lý DiscountPrice nullable
                    ProductColors = p.ProductColors
                        .Where(c => colors == null || colors.Contains(c.ColorName))
                        .Select(c => new ProductColor
                        {
                            ColorId = c.ColorId,
                            ColorName = c.ColorName,
                            ProductColorImages = c.ProductColorImages
                                .Where(i => i.IsPrimary == true)
                                .ToList()
                        }).ToList(),
                    ProductVariants = p.ProductVariants
                        .Where(v => sizes == null || sizes.Contains(v.Size))
                        .Select(v => new ProductVariant
                        {
                            VariantId = v.VariantId,
                            Size = v.Size,
                            ColorId = v.ColorId,
                            StockQuantity = v.StockQuantity
                        }).ToList()
                })
                .ToListAsync();
            foreach (var product in filteredProducts)
            {
                Console.WriteLine($"ProductId: {product.ProductId}, BasePrice: {product.BasePrice}");
            }

            return filteredProducts ?? Enumerable.Empty<Product>();
        }
        private async Task<List<int>> GetSubCategoryIdsAsync(int categoryId)
        {
            var subCategoryIds = new List<int>();
            var queue = new Queue<int>();
            queue.Enqueue(categoryId);

            while (queue.Any())
            {
                var currentId = queue.Dequeue();
                var subCategories = await _context.Categories
                    .Where(c => c.ParentId == currentId)
                    .Select(c => c.CategoryId)
                    .ToListAsync();
                subCategoryIds.AddRange(subCategories);
                foreach (var subId in subCategories)
                {
                    queue.Enqueue(subId);
                }
            }

            return subCategoryIds;
        }
    }
}
