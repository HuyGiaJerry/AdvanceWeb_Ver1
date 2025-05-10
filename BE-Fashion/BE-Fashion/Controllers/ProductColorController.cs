using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductColorController : ControllerBase
    {
        private readonly IProductColorService _productColorService;

        public ProductColorController(IProductColorService productColorService)
        {
            _productColorService = productColorService;
        }

        // API để lấy tất cả màu sắc
        [HttpGet("colors")]
        public async Task<IActionResult> GetColors()
        {
            var colors = await _productColorService.GetAllColorsAsync();
            return Ok(colors);
        }

        // API để lấy tất cả kích thước
        [HttpGet("sizes")]
        public async Task<IActionResult> GetSizes()
        {
            var sizes = await _productColorService.GetAllSizesAsync();
            return Ok(sizes);
        }
    }
}
