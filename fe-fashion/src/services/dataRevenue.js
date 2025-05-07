// Giả lập dữ liệu từ database
const orders = [
    { order_id: 1, created_at: '2025-01-15', total_amount: 1200 },
    { order_id: 2, created_at: '2025-02-10', total_amount: 1500 },
    { order_id: 3, created_at: '2025-03-05', total_amount: 2000 },
    { order_id: 4, created_at: '2025-04-20', total_amount: 1800 },
  ];
//   - orders → Chứa tổng tiền (total_amount) của từng đơn hàng
// - order_items → Chứa số lượng (quantity) và giá (unit_price) của từng sản phẩm

  // Hàm tính tổng doanh thu theo tháng
  const calculateRevenueByMonth = () => {
    const revenue = {};
  
    orders.forEach(order => {
      const month = new Date(order.created_at).getMonth() + 1; // Lấy tháng từ ngày tạo đơn
      revenue[`Tháng ${month}`] = (revenue[`Tháng ${month}`] || 0) + order.total_amount;
    });
  
    return Object.keys(revenue).map(month => ({
      name: month,
      doanhThu: revenue[month],
    }));
  };
  
  // Xuất dữ liệu cho biểu đồ
  export const data = calculateRevenueByMonth();