using BE_Fashion.DTOs;
using BE_Fashion.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VnPayController : ControllerBase
    {
        private readonly VnPayService _vnPayService;
        public VnPayController(VnPayService vpnPayService)
        {
            _vnPayService = vpnPayService;
        }
        [HttpPost("create-payment-url")]
        public IActionResult CreatePaymentUrl([FromBody] VnPayRequestDto model)
        {
            if (model == null)
                return BadRequest("Invalid payment details.");

            try
            {
                var paymentUrl = _vnPayService.CreatePaymentUrl(model, HttpContext);
                return Ok(new { PaymentUrl = paymentUrl });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating payment URL: {ex.Message}");
            }
        }
        [HttpPost("vnpay-callback")]
        public IActionResult VnPayCallback(IFormCollection formCollection)
        {
            try
            {
                // Kiểm tra signature của VnPay
                var vnpaySignature = formCollection["vnp_SecureHash"].ToString();

                // Kiểm tra nếu vnpaySignature là null hoặc rỗng
                if (string.IsNullOrEmpty(vnpaySignature))
                {
                    return BadRequest("Signature is missing.");
                }

                var inputData = formCollection.ToDictionary(x => x.Key, x => x.Value.ToString());

                // Kiểm tra null cho inputHash
                if (string.IsNullOrEmpty(vnpaySignature))
                {
                    return BadRequest("Signature is invalid.");
                }

                bool isValid = _vnPayService.ValidateSignature(vnpaySignature, inputData); // validate signature

                if (isValid)
                {
                    // Xử lý kết quả thanh toán
                    return Ok("Payment success.");
                }
                else
                {
                    return BadRequest("Invalid payment signature.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest($"Error processing callback: {ex.Message}");
            }
        }
        [HttpGet("return")]
        public IActionResult Return()
        {
            var query = HttpContext.Request.Query.ToDictionary(kvp => kvp.Key, kvp => kvp.Value.ToString());

            var vnp_SecureHash = query.ContainsKey("vnp_SecureHash") ? query["vnp_SecureHash"] : null;

            if (string.IsNullOrEmpty(vnp_SecureHash))
                return BadRequest("Missing signature.");

            bool isValid = _vnPayService.ValidateSignature(vnp_SecureHash, query);

            if (isValid && query["vnp_ResponseCode"] == "00")
            {
                // Giao dịch thành công
                return Ok("Giao dịch thành công!");
            }
            else
            {
                // Giao dịch thất bại hoặc bị giả mạo
                return BadRequest("Giao dịch thất bại hoặc không hợp lệ.");
            }
        }
    }
}
