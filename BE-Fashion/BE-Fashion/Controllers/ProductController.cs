using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ILogger<ProductController> _logger;
        public ProductController(IProductService productService, ILogger<ProductController> logger)
        {
            _productService = productService;
            _logger = logger;
        }
        // API return page number
        [HttpGet("total-pages")]
        public async Task<IActionResult> GetTotalPages(int pageSize)
        {
            var totalPages = await _productService.GetTotalPagesAsync(pageSize);
            return Ok(new { TotalPages = totalPages });
        }
        [HttpGet("products")]
        //public async Task<IActionResult> GetAllProducts(int pageNumber,int pageSize)
        //{
        //    var products = await _productService.GetAllProductsAsync(pageNumber, pageSize);
        //    return Ok(products);
        //}
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _productService.GetAllProductsAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductDetail(int id)
        {
            var productDetail = await _productService.GetProductDetailAsync(id);
            if (productDetail == null)
            {
                return NotFound();
            }
            return Ok(productDetail);
        }
        [HttpGet("filter")]
        public async Task<IActionResult> GetFilteredProducts(
                    [FromQuery] List<PriceRangeDto> priceRanges,
                    [FromQuery] List<int>? categoryIds,
                    [FromQuery] List<string>? colors,
                    [FromQuery] List<string>? sizes)
        {
            _logger.LogInformation("Received priceRanges: {@PriceRanges}", priceRanges);
            // Kiểm tra khoảng giá
            if (priceRanges?.Any(r => r.MinPrice > r.MaxPrice) == true)
            {
                return BadRequest("MinPrice phải nhỏ hơn hoặc bằng MaxPrice.");
            }

            var products = await _productService.GetFilteredProductsAsync(
                priceRanges, categoryIds, colors, sizes);

            if (!products.Any())
            {
                return NotFound("Không tìm thấy sản phẩm phù hợp với bộ lọc.");
            }

            return Ok(products);
        }
    }
}
