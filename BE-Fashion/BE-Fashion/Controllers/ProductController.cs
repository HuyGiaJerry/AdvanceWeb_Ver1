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
        [HttpPost("filter")]
        public async Task<IActionResult> GetFilteredProducts(
                    [FromBody] FilterRequestDto filterRequest)
        {
            _logger.LogInformation("Filtering products with price range from {MinPrice} to {MaxPrice}",
     filterRequest?.PriceRanges?.FirstOrDefault()?.MinPrice,
     filterRequest?.PriceRanges?.FirstOrDefault()?.MaxPrice);

            // Kiểm tra khoảng giá
            if (filterRequest?.PriceRanges?.Any(r => r.MinPrice > r.MaxPrice) == true)
            {
                return BadRequest("MinPrice phải nhỏ hơn hoặc bằng MaxPrice.");
            }

            var products = await _productService.GetFilteredProductsAsync(
                filterRequest?.PriceRanges,
                filterRequest?.CategoryIds,
                filterRequest?.Colors,
                filterRequest?.Sizes
            );

            if (!products.Any())
            {
                return NotFound("Không tìm thấy sản phẩm phù hợp với bộ lọc.");
            }

            return Ok(products);
        }
        [HttpGet("productName")]
        [ProducesResponseType(typeof(IEnumerable<ProductListDto>), 200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> GetAllProducts([FromQuery] string? searchTerm = null)
        {
            try
            {
                var products = await _productService.GetAllProductsAsync(searchTerm);
                return Ok(products);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Lỗi xảy ra khi lấy danh sách sản phẩm với từ khóa: {SearchTerm}", searchTerm);
                return StatusCode(500, new { message = "Đã xảy ra lỗi khi lấy danh sách sản phẩm." });
            }
        }
    }
}
