using BE_Fashion.DTOs;
using BE_Fashion.Models;
using BE_Fashion.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BE_Fashion.Services
{
    public class OrderService :IOrderService
    {
        private readonly IOrderRepository _repo;
        private readonly IRedisCartService _redisCartService;
        public OrderService(IOrderRepository orderRepository, IRedisCartService redisCartService)
        {
            _repo = orderRepository;
            _redisCartService = redisCartService;
        }

        // Xử lý thanh toán COD
        public async Task<Guid> CheckoutAsync(CheckoutRequest request)
        {
            if (!request.UserId.HasValue)
            {
                request.UserId = -1; // Giá trị mặc định cho khách vãng lai
            }

            if (request.PaymentMethod != "COD")
            {
                throw new InvalidOperationException("Phương thức thanh toán không hợp lệ. Chỉ hỗ trợ COD trong phương thức này.");
            }

            var orderGuid = Guid.NewGuid();
            

            // Lấy giỏ hàng từ Redis
            var cartItems = await _redisCartService.GetCartAsync(request.UserId.Value);
            if (cartItems == null || !cartItems.Any())
                throw new InvalidOperationException("Giỏ hàng trống.");

            var total = cartItems.Sum(i => i.Price * i.Quantity);

            // Tạo đơn hàng
            var order = new Order
            {
                OrderId = orderGuid,
                UserId = request.UserId.Value,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                ShippingAddress = request.ShippingAddress,
                TotalAmount = total,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Status = "pending"
            };

            var items = cartItems.Select(i => new OrderItem
            {
                OrderId = orderGuid,
                VariantId = i.VariantId,
                Quantity = i.Quantity,
                UnitPrice = i.Price,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            var payment = new Payment
            {
                OrderId = orderGuid,
                Amount = total,
                Status = "pending",
                PaymentMethod = "COD",
                CreatedAt = DateTime.UtcNow
            };

            // Lưu đơn hàng và thanh toán COD
            await _repo.CreateOrderAsync(order, items, payment);
            await _redisCartService.ClearCartAsync(request.UserId.Value);

            return orderGuid;
        }
        public async Task<CancelOrderResult> CancelOrderAsync(Guid orderId)
        {
            var order = await _repo.GetOrderByIdAsync(orderId);
            if (order == null)
            {
                return new CancelOrderResult
                {
                    Success = false,
                    Message = "Đơn hàng không tồn tại."
                };
            }

            if (order.Status != "pending")
            {
                return new CancelOrderResult
                {
                    Success = false,
                    Message = "Chỉ có thể hủy đơn hàng khi chưa được xác nhận."
                };
            }

            order.Status = "cancelled";
            order.UpdatedAt = DateTime.UtcNow;
            await _repo.UpdateOrderAsync(order);

            return new CancelOrderResult
            {
                Success = true,
                Message = "Đã hủy đơn hàng thành công."
            };
        }
        public async Task<bool> UpdateOrderStatusAsync(UpdateOrderStatusDto dto)
        {
            var order = await _repo.GetOrderByIdWithItemsAsync(dto.OrderId); // cần bao gồm OrderItems
            if (order == null) return false;

            order.Status = dto.Status;
            order.UpdatedAt = DateTime.UtcNow;

            if (dto.Status == "confirmed")
            {
                // Giảm tồn kho cho từng sản phẩm trong đơn
                foreach (var item in order.OrderItems)
                {
                    if (!item.VariantId.HasValue)
                        throw new InvalidOperationException("Thiếu VariantId trong OrderItem.");

                    var success = await _repo.DecreaseStockAsync(item.VariantId.Value, item.Quantity);
                    if (!success)
                    {
                        // Tùy chọn: rollback hoặc throw
                        throw new InvalidOperationException($"Không đủ hàng cho sản phẩm có ID {item.VariantId}");
                    }
                }
            }

            _repo.UpdateAsync(order);
            await _repo.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<OrderDto>> GetOrdersByStatusAsync(string status, int? userId)
        {
            IEnumerable<Order> orders;

            if (userId.HasValue)
            {
                // Use the new repository method to filter by userId and status
                orders = await _repo.GetOrdersByStatusAsync(status, userId.Value);
            }
            else if (string.IsNullOrEmpty(status) || status.ToLower() == "all")
            {
                // Fetch all orders if no userId and status is "all"
                orders = await _repo.GetAllOrdersAsync();
            }
            else
            {
                // Fetch orders by status only (no userId)
                orders = await _repo.GetOrdersByStatusAsync(status.ToLower(), null);
            }

            return orders.Select(o => new OrderDto
            {
                Id = o.OrderId,
                Status = o.Status ?? string.Empty,
                PaymentStatus = o.Payment?.Status ?? string.Empty,
                TotalAmount = o.TotalAmount,
                CreatedAt = o.CreatedAt ?? DateTime.MinValue
            });
        }

    }
}
