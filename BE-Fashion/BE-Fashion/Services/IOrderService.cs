using BE_Fashion.DTOs;

namespace BE_Fashion.Services
{
    public interface IOrderService
    {
        Task<Guid> CheckoutAsync(CheckoutRequest request);
        Task<CancelOrderResult> CancelOrderAsync(Guid orderId);

    }
}
    