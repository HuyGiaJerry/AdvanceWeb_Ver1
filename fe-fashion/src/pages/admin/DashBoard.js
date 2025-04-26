import React from 'react';
import Layout from '../../components/admin/Layout';
import Card from '../../components/admin/Card';
import Chart from '../../components/admin/Chart';
import { FaUsers, FaBoxes, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import '../../assets/styles/DashBoard.scss';

const Dashboard = () => {
  // Dữ liệu mẫu cho biểu đồ doanh thu
  const revenueData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Doanh thu (triệu VNĐ)',
        data: [30, 45, 60, 70, 65, 80],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
      },
    ],
  };

  // Dữ liệu mẫu cho biểu đồ đơn hàng
  const ordersData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
    datasets: [
      {
        label: 'Số đơn hàng',
        data: [50, 75, 90, 105, 95, 120],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <Layout>
      <div className="dashboard">
        <h1>Tổng quan hệ thống</h1>
        
        <div className="dashboard-summary">
          <Card 
            title="Tổng doanh thu" 
            value="425,000,000đ" 
            icon={<FaMoneyBillWave />} 
            color="#4caf50"
          />
          <Card 
            title="Tổng đơn hàng" 
            value="535" 
            icon={<FaShoppingCart />} 
            color="#2196f3"
          />
          <Card 
            title="Sản phẩm" 
            value="120" 
            icon={<FaBoxes />} 
            color="#ff9800"
          />
          <Card 
            title="Nhân viên" 
            value="25" 
            icon={<FaUsers />} 
            color="#9c27b0"
          />
        </div>
        
        <div className="chart-row">
          <div className="chart-container">
            <h2>Biểu đồ doanh thu</h2>
            <Chart data={revenueData} />
          </div>
          <div className="chart-container">
            <h2>Biểu đồ đơn hàng</h2>
            <Chart data={ordersData} />
          </div>
        </div>
        
        <div className="recent-data">
          <div className="recent-orders">
            <h2>Đơn hàng gần đây</h2>
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>Nguyễn Văn A</td>
                  <td>10/04/2025</td>
                  <td><span className="status completed">Hoàn thành</span></td>
                  <td>2,500,000đ</td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Trần Thị B</td>
                  <td>09/04/2025</td>
                  <td><span className="status pending">Đang xử lý</span></td>
                  <td>1,800,000đ</td>
                </tr>
                <tr>
                  <td>#ORD003</td>
                  <td>Lê Văn C</td>
                  <td>08/04/2025</td>
                  <td><span className="status shipping">Đang giao</span></td>
                  <td>3,200,000đ</td>
                </tr>
                <tr>
                  <td>#ORD004</td>
                  <td>Phạm Thị D</td>
                  <td>07/04/2025</td>
                  <td><span className="status completed">Hoàn thành</span></td>
                  <td>1,500,000đ</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="top-products">
            <h2>Sản phẩm bán chạy</h2>
            <ul>
              <li>
                <div className="product-info">
                  <span className="product-name">Iphone 15 Pro Max</span>
                  <span className="product-category">Điện thoại</span>
                </div>
                <div className="product-stats">
                  <span className="product-sold">Đã bán: 45</span>
                  <span className="product-revenue">9,000,000đ</span>
                </div>
              </li>
              <li>
                <div className="product-info">
                  <span className="product-name">Macbook Pro M3</span>
                  <span className="product-category">Laptop</span>
                </div>
                <div className="product-stats">
                  <span className="product-sold">Đã bán: 28</span>
                  <span className="product-revenue">7,500,000đ</span>
                </div>
              </li>
              <li>
                <div className="product-info">
                  <span className="product-name">Samsung Galaxy S24</span>
                  <span className="product-category">Điện thoại</span>
                </div>
                <div className="product-stats">
                  <span className="product-sold">Đã bán: 35</span>
                  <span className="product-revenue">6,800,000đ</span>
                </div>
              </li>
              <li>
                <div className="product-info">
                  <span className="product-name">Airpods Pro 2</span>
                  <span className="product-category">Phụ kiện</span>
                </div>
                <div className="product-stats">
                  <span className="product-sold">Đã bán: 50</span>
                  <span className="product-revenue">3,500,000đ</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;