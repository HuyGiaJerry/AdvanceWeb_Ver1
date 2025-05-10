using AutoMapper;
using AutoMapper.QueryableExtensions;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<int> GetTotalPagesAsync(int pageSize)
        {
            // calculator page number
            return await _productRepository.GetTotalPagesAsync(pageSize);
        }
        //public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        //{
        //    var products = await _productRepository.GetAllAsync(pageNumber, pageSize);
        //    return _mapper.Map<IEnumerable<ProductListDto>>(products);
        //}
        public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<ProductListDto>>(products);
        }
        //public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        //{
        //    // Get paginated products from repository
        //    var products = await _productRepository.GetAllAsync(pageNumber, pageSize);

        //    // Use AutoMapper to convert Product to ProductList
        //    var productList = _mapper.Map<IEnumerable<ProductListDto>>(products);
        //    return (productList);
        //}
        //public async Task<ProductDetail?> GetProductDetailAsync(int productId)
        //{
        //    var product = await _productRepository.GetByIdAsync(id);
        //    if (product == null)
        //        return null;

        //    return _mapper.Map<ProductDetailDto>(product);
        //}
        public async Task<ProductDetailDto?> GetProductDetailAsync(int productId)
        {
            var rawData = await _productRepository.GetProductDetailRawAsync(productId);

            if (rawData.Length == 0)
            {
                return null;
            }

            var productDetail = rawData.GroupBy(x => x.Product)
                .Select(g => new ProductDetailDto
                {
                    ProductId = g.Key.ProductId,
                    Name = g.Key.Name,
                    Description = g.Key.Description ?? string.Empty,
                    BasePrice = g.Key.BasePrice,
                    DiscountPrice = g.Key.DiscountPrice,
                    Sku = g.Key.Sku,
                    CategoryId = g.Key.CategoryId ?? 0,
                    CreatedAt = g.Key.CreatedAt ?? DateTime.MinValue,
                    UpdatedAt = g.Key.UpdatedAt ?? DateTime.Now,
                    Colors = g.Where(x => x.Color != null)
                              .GroupBy(x => x.Color)
                              .Select(c => new ColorDto
                              {
                                  ColorId = c.Key.ColorId,
                                  ColorName = c.Key.ColorName,
                                  ColorSku = c.Key.ColorSku,
                                  Variants = c.Where(x => x.Variant != null)
                                              .GroupBy(v => v.Variant.VariantId)
                                              .Select(vg => new VariantDto
                                              {
                                                  VariantId = vg.Key,
                                                  Size = vg.First().Variant.Size,
                                                  StockQuantity = vg.First().Variant.StockQuantity ?? 0,
                                                  VariantSku = vg.First().Variant.VariantSku,
                                              })
                                              .OrderBy(v => v.Size)
                                              .ToList(),
                                  Images = c.Where(x => x.Image != null)
                                            .GroupBy(i => i.Image.Id)
                                            .Select(ig => new ImageDto
                                            {
                                                ImageId = ig.Key,
                                                ImageUrl = ig.First().Image.ImageUrl,
                                                IsPrimary = ig.First().Image.IsPrimary ?? false
                                            })
                                            .OrderByDescending(i => i.IsPrimary)
                                            .ThenBy(i => i.ImageId)
                                            .ToList()
                              })
                              .OrderBy(c => c.ColorId)
                              .ToList()
                })
                .FirstOrDefault();

            return productDetail;
        }
        //public async Task<IEnumerable<ProductListDto>> GetFilteredProductsAsync(
        //            List<(decimal MinPrice, decimal MaxPrice)> priceRanges,
        //            List<int>? categoryIds,
        //            List<string>? colors,
        //            List<string>? sizes) 
        //{
        //    // Lấy các sản phẩm đã lọc từ repository
        //    var products = await _productRepository.GetFilteredProductsAsync(
        //        priceRanges,
        //        categoryIds,
        //        colors,
        //        sizes);

        //    // Chuyển đổi danh sách sản phẩm sang DTO
        //    var productList = _mapper.Map<IEnumerable<ProductListDto>>(products);

        //    // Kiểm tra xem danh sách sản phẩm đã được ánh xạ đúng chưa
        //    foreach (var product in productList)
        //    {
        //        // Kiểm tra null cho Images
        //        if (product.Images != null)
        //        {
        //            product.Images = product.Images.Where(img => img != null).ToList();
        //        }
        //    }

        //    return productList;
        //}
        public async Task<IEnumerable<ProductListDto>> GetFilteredProductsAsync(
            List<PriceRangeDto>? priceRanges,
            List<int>? categoryIds,
            List<string>? colors,
            List<string>? sizes)
        {
            var products = await _productRepository.GetFilteredProductsAsync(
                priceRanges, categoryIds, colors, sizes);

            // Ánh xạ thủ công từ Product sang ProductListDto
            var productDtos = products.Select(p => new ProductListDto
            {
                ProductId = p.ProductId,
                Name = p.Name ?? string.Empty,
                BasePrice = p.BasePrice,
                DiscountPrice = p.DiscountPrice ?? 0, // Xử lý decimal? sang decimal
                Images = p.ProductColors
                    .Where(c => c.ProductColorImages != null && c.ProductColorImages.Any(i => i.IsPrimary == true))
                    .SelectMany(c => c.ProductColorImages)
                    .Where(i => i.IsPrimary == true) // Giả định IsPrimary là bool
                    .Select(i => new ProductImageDto
                    {
                        ImageUrl = i.ImageUrl ?? string.Empty,
                        ColorName = i.Color != null ? i.Color.ColorName ?? string.Empty : string.Empty
                    })
                    .ToList()
            }).ToList();

            return productDtos;
        }
    }
}
