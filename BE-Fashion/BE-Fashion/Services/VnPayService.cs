using BE_Fashion.DTOs;
using BE_Fashion.Helpers;
namespace BE_Fashion.Services
{
    public class VnPayService
    {
        private readonly IConfiguration _config;
        public VnPayService(IConfiguration configuration)
        {
            _config = configuration;
        }

        public string CreatePaymentUrl(VnPayRequestDto model, HttpContext httpContext)
        {
            var timeNow = DateTime.Now;
            var tick = DateTime.UtcNow.Ticks.ToString();

            var pay = new VnPayLibrary();
            pay.AddRequestData("vnp_Version", VnPayLibrary.VERSION);
            pay.AddRequestData("vnp_Command", "pay");
            pay.AddRequestData("vnp_TmnCode", _config["VnPay:TmnCode"] ?? throw new Exception("Missing VnPay:TmnCode"));
            pay.AddRequestData("vnp_Amount", ((int)model.Amount * 100).ToString());
            pay.AddRequestData("vnp_CreateDate", timeNow.ToString("yyyyMMddHHmmss"));
            pay.AddRequestData("vnp_CurrCode", "VND");
            var ipAddress = httpContext.Connection.RemoteIpAddress?.ToString() ?? "127.0.0.1";
            pay.AddRequestData("vnp_IpAddr", ipAddress);
            pay.AddRequestData("vnp_Locale", "vn");
            pay.AddRequestData("vnp_OrderInfo", model.OrderDescription);
            pay.AddRequestData("vnp_OrderType", "other");
            pay.AddRequestData("vnp_ReturnUrl", _config["VnPay:ReturnUrl"] ?? throw new Exception("Missing VnPay:ReturnUrl"));
            pay.AddRequestData("vnp_TxnRef", model.OrderId);

            var paymentUrl = pay.CreateRequestUrl(
                    _config["VnPay:Url"] ?? throw new Exception("Missing VnPay:Url"),
                    _config["VnPay:HashSecret"] ?? throw new Exception("Missing VnPay:HashSecret"));
            return paymentUrl;
        }
        public bool ValidateSignature(string inputHash, Dictionary<string, string> responseData)
        {
            if (string.IsNullOrEmpty(inputHash))
            {
                throw new ArgumentNullException(nameof(inputHash), "Input hash cannot be null or empty.");
            }

            var secretKey = _config["VnPay:HashSecret"];
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new ArgumentNullException(nameof(secretKey), "Secret key cannot be null or empty.");
            }

            var pay = new VnPayLibrary();
            foreach (var item in responseData)
            {
                if (!string.IsNullOrEmpty(item.Value))
                {
                    pay.AddResponseData(item.Key, item.Value);
                }
            }

            return pay.ValidateSignature(inputHash, secretKey);
        }
    }
}
