using AutoMapper;
using AutoMapper.QueryableExtensions;
using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Services
{
    public class ProductService
    {
        private readonly ProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductService(ProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }
        public async Task<int> GetTotalPagesAsync(int pageSize)
        {
            // calculator page number
            return await _productRepository.GetTotalPagesAsync(pageSize);
        }
        public async Task<IEnumerable<ProductListDto>> GetAllProductsAsync(int pageNumber, int pageSize)
        {
            var products = await _productRepository.GetAllAsync(pageNumber, pageSize);
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

    }
}
