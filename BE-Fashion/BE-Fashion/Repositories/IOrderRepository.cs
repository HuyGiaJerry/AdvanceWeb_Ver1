using BE_Fashion.Models;

namespace BE_Fashion.Repositories
{
    public interface IOrderRepository
    {
        Task CreateOrderAsync(Order order, List<OrderItem> items, Payment payment);
        Task<Order> GetOrderByIdAsync(Guid orderId);
        Task UpdateOrderAsync(Order order);
    }
}
