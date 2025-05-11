using BE_Fashion.Models;
using Microsoft.EntityFrameworkCore;

namespace BE_Fashion.Repositories
{
    public class OrderRepository : IOrderRepository
    { 
        private readonly DbtestContext _context;

        public OrderRepository(DbtestContext context)
        {
            _context = context;
        }

        public async Task CreateOrderAsync(Order order, List<OrderItem> items, Payment payment)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                await _context.Orders.AddAsync(order);
                await _context.OrderItems.AddRangeAsync(items);
                await _context.Payments.AddAsync(payment);
                await _context.SaveChangesAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw; // ném lại lỗi để service xử lý
            }
        }
        public async Task<Order> GetOrderByIdAsync(Guid orderId)
        {
            var order = await _context.Orders
                .Include(o => o.Payment)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);

            if (order == null)
            {
                throw new Exception($"Order with ID {orderId} not found.");
            }

            return order;
        }

        public async Task UpdateOrderAsync(Order order)
        {
            _context.Orders.Update(order);
            if (order.Payment != null)
            {
                _context.Payments.Update(order.Payment);
            }
            await _context.SaveChangesAsync();
        }
    }
}
