import React from 'react';
import Layout from '../../../components/admin/Layout';
import Card from '../../../components/admin/Card';
import Chart from '../../../components/admin/Chart';
import { FaMoneyBillWave, FaShoppingCart, FaPercentage, FaArrowUp, FaArrowDown } from 'react-icons/fa';

const SalesDashboard = () => {
  // Dữ liệu mẫu cho biểu đồ doanh thu
  const revenueData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Doanh thu (triệu VNĐ)',
        data: [30, 45, 60, 70, 65, 80, 90, 85, 100, 110, 105, 120],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
      },
      {
        label: 'Lợi nhuận (triệu VNĐ)',
        data: [10, 15, 25, 30, 28, 35, 40, 38, 45, 50, 48, 55],
        borderColor: '#f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        fill: true,
      },
    ],
  };

  // Dữ liệu mẫu cho biểu đồ phân tích sản phẩm
  const productCategoryData = {
    labels: ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện', 'Khác'],
    datasets: [
      {
        label: 'Doanh thu theo danh mục (%)',
        data: [40, 30, 15, 10, 5],
        backgroundColor: [
          'rgba(76, 175, 80, 0.7)',
          'rgba(33, 150, 243, 0.7)',
          'rgba(255, 152, 0, 0.7)',
          'rgba(156, 39, 176, 0.7)',
          'rgba(244, 67, 54, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
   
      <div className="sales-dashboard">
        <h1>Quản lý bán hàng</h1>
        
        <div className="dashboard-summary">
          <Card 
            title="Tổng doanh thu" 
            value="425,000,000đ" 
            icon={<FaMoneyBillWave />} 
            color="#4caf50"
            subtitle={<span className="trend-up"><FaArrowUp /> 12% so với tháng trước</span>}
          />
          <Card 
            title="Lợi nhuận" 
            value="168,000,000đ" 
            icon={<FaMoneyBillWave />} 
            color="#f44336"
            subtitle={<span className="trend-up"><FaArrowUp /> 8% so với tháng trước</span>}
          />
          <Card 
            title="Đơn hàng" 
            value="285" 
            icon={<FaShoppingCart />} 
            color="#2196f3"
            subtitle={<span className="trend-down"><FaArrowDown /> 3% so với tháng trước</span>}
          />
          <Card 
            title="Tỷ lệ chuyển đổi" 
            value="8.5%" 
            icon={<FaPercentage />} 
            color="#ff9800"
            subtitle={<span className="trend-up"><FaArrowUp /> 5% so với tháng trước</span>}
          />
        </div>
        
        <div className="chart-row">
          <div className="chart-container">
            <h2>Biểu đồ doanh thu và lợi nhuận</h2>
            <Chart data={revenueData} />
          </div>
          <div className="chart-container">
            <h2>Doanh thu theo danh mục</h2>
            <Chart data={productCategoryData} type="pie" />
          </div>
        </div>
        
        <div className="recent-data">
          <div className="recent-orders">
            <h2>Đơn hàng mới nhất</h2>
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Phương thức thanh toán</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>Nguyễn Văn A</td>
                  <td>10/04/2025</td>
                  <td>Thẻ tín dụng</td>
                  <td><span className="status completed">Hoàn thành</span></td>
                  <td>2,500,000đ</td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Trần Thị B</td>
                  <td>09/04/2025</td>
                  <td>COD</td>
                  <td><span className="status pending">Đang xử lý</span></td>
                  <td>1,800,000đ</td>
                </tr>
                <tr>
                  <td>#ORD003</td>
                  <td>Lê Văn C</td>
                  <td>08/04/2025</td>
                  <td>Chuyển khoản</td>
                  <td><span className="status shipping">Đang giao</span></td>
                  <td>3,200,000đ</td>
                </tr>
                <tr>
                  <td>#ORD004</td>
                  <td>Phạm Thị D</td>
                  <td>07/04/2025</td>
                  <td>Thẻ tín dụng</td>
                  <td><span className="status completed">Hoàn thành</span></td>
                  <td>1,500,000đ</td>
                </tr>
              </tbody>
            </table>
            <div className="view-all">
              <a href="/admin/orders">Xem tất cả đơn hàng</a>
            </div>
          </div>
        </div>
      </div>
 
  );
};

export default SalesDashboard;
