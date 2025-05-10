using BE_Fashion.DTOs;
using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class ProductColorRepository : IProductColorRepository
    {
        private readonly DbtestContext _context;
        public ProductColorRepository(DbtestContext context)
        {
            _context = context;
        }

        // Lấy tất cả các màu sắc
        public async Task<List<AllColorDto>> GetAllColorsAsync()
        {
            return await _context.ProductColors
                .Select(color => new AllColorDto
                {
                    ColorName = color.ColorName,
                })
                .Distinct()
                .ToListAsync();
        }

        // Lấy tất cả các size
        public async Task<List<SizeDto>> GetAllSizesAsync()
        {
            return await _context.ProductVariants
                .Select(variant => new SizeDto
                {
                    Size = variant.Size
                })
                .Distinct() 
                .ToListAsync();
        }
    }
}
