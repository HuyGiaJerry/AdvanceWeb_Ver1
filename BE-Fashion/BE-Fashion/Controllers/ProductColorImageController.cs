using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductColorImageController : ControllerBase
    {
        private readonly ProductColorImageService _service;

        public ProductColorImageController(ProductColorImageService service)
        {
            _service = service;
        }

        [HttpGet("products")]
        public async Task<IActionResult> GetAllProduct(int pageNumber, int pageSize)
        {
            var products = await _service.GetProductListAsync(pageNumber, pageSize);
            return Ok(products);
        }
    }
}
