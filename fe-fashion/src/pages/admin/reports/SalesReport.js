import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Chart from '../../../components/admin/Chart';
import { FaDownload, FaFilter } from 'react-icons/fa';
import '../../../assets/styles/SalesAndInventoryReport.scss';

const SalesReport = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  
  // Dữ liệu mẫu cho báo cáo doanh thu
  const salesData = {
    month: {
      labels: ['01/04', '05/04', '10/04', '15/04', '20/04', '25/04', '30/04'],
      datasets: [
        {
          label: 'Doanh thu (triệu VNĐ)',
          data: [3.5, 4.8, 5.2, 7.5, 6.8, 8.2, 9.5],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
        },
      ],
    },
    quarter: {
      labels: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
      datasets: [
        {
          label: 'Doanh thu (triệu VNĐ)',
          data: [85, 120, 150],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
        },
      ],
    },
    year: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Doanh thu (triệu VNĐ)',
          data: [350, 420, 480, 520],
          borderColor: '#4caf50',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          fill: true,
        },
      ],
    },
  };

  // Dữ liệu mẫu cho báo cáo chi tiết
  const detailedData = [
    { date: '01/04/2025', orders: 12, revenue: '14,500,000đ', profit: '5,800,000đ' },
    { date: '02/04/2025', orders: 15, revenue: '18,200,000đ', profit: '7,280,000đ' },
    { date: '03/04/2025', orders: 10, revenue: '12,800,000đ', profit: '5,120,000đ' },
    { date: '04/04/2025', orders: 18, revenue: '22,500,000đ', profit: '9,000,000đ' },
    { date: '05/04/2025', orders: 14, revenue: '16,300,000đ', profit: '6,520,000đ' },
    { date: '06/04/2025', orders: 16, revenue: '19,500,000đ', profit: '7,800,000đ' },
    { date: '07/04/2025', orders: 20, revenue: '25,800,000đ', profit: '10,320,000đ' },
  ];

  return (
  
      <div className="sales-report">
        <div className="report-header">
          <h1>Báo cáo doanh thu</h1>
          <div className="report-actions">
            <div className="report-filter">
              <FaFilter /> 
              <select 
                value={reportPeriod} 
                onChange={(e) => setReportPeriod(e.target.value)}
              >
                <option value="month">Tháng này</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm nay</option>
              </select>
            </div>
            {/* <button className="download-btn"><FaDownload /> Xuất báo cáo</button> */}
          </div>
        </div>
        
        <div className="report-summary">
          <div className="summary-card">
            <h3>Tổng doanh thu</h3>
            <div className="summary-value">425,000,000đ</div>
            <div className="summary-comparison up">+12% so với kỳ trước</div>
          </div>
          <div className="summary-card">
            <h3>Tổng lợi nhuận</h3>
            <div className="summary-value">168,000,000đ</div>
            <div className="summary-comparison up">+8% so với kỳ trước</div>
          </div>
          <div className="summary-card">
            <h3>Tổng đơn hàng</h3>
            <div className="summary-value">285</div>
            <div className="summary-comparison down">-3% so với kỳ trước</div>
          </div>
          <div className="summary-card">
            <h3>Giá trị đơn trung bình</h3>
            <div className="summary-value">1,490,000đ</div>
            <div className="summary-comparison up">+15% so với kỳ trước</div>
          </div>
        </div>
        
        <div className="report-chart">
          <h2>Biểu đồ doanh thu {reportPeriod === 'month' ? 'tháng này' : reportPeriod === 'quarter' ? 'quý này' : 'năm nay'}</h2>
          <Chart data={salesData[reportPeriod]} />
        </div>
        
        <div className="report-detail">
          <h2>Chi tiết doanh thu theo ngày</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Số đơn hàng</th>
                <th>Doanh thu</th>
                <th>Lợi nhuận</th>
              </tr>
            </thead>
            <tbody>
              {detailedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.orders}</td>
                  <td>{item.revenue}</td>
                  <td>{item.profit}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Tổng</strong></td>
                <td><strong>105</strong></td>
                <td><strong>129,600,000đ</strong></td>
                <td><strong>51,840,000đ</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

  );
};

export default SalesReport;