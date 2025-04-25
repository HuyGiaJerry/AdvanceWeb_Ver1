using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _productService;
        public ProductController(ProductService productService)
        {
            _productService = productService;
        }
        // API return page number
        [HttpGet("total-pages")]
        public async Task<IActionResult> GetTotalPages(int pageSize)
        {
            var totalPages = await _productService.GetTotalPagesAsync(pageSize);
            return Ok(new { TotalPages = totalPages });
        }
        [HttpGet("products")]
        public async Task<IActionResult> GetAllProducts(int pageNumber,int pageSize)
        {
            var products = await _productService.GetAllProductsAsync(pageNumber, pageSize);
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
        //public async Task<IActionResult> GetProductDetail(int productId)
        //{
        //    var productDetail = await _productService.GetProductDetailAsync(productId);

        //    if (productDetail == null)
        //    {
        //        return NotFound(new { message = "Product not found" });
        //    }

        //    return Ok(productDetail);
        //}

    }
}
