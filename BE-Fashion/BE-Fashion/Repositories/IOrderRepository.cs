using BE_Fashion.Models;

namespace BE_Fashion.Repositories
{
    public interface IOrderRepository
    {
        Task CreateOrderAsync(Order order, List<OrderItem> items, Payment payment);
        Task<Order> GetOrderByIdAsync(Guid orderId);
        Task UpdateOrderAsync(Order order);

        void UpdateAsync(Order order);
        Task SaveChangesAsync();

        Task<IEnumerable<Order>> GetAllOrdersAsync();

        Task<IEnumerable<Order>> GetOrdersByStatusAsync(string status, int? userId);

        Task<Order?> GetOrderByIdWithItemsAsync(Guid orderId); // Lấy luôn cả OrderItems
        Task<bool> DecreaseStockAsync(int variantId, int quantity); // Trừ tồn kho
    }
}
