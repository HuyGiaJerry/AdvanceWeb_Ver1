import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Chart from '../../../components/admin/Chart';
import { FaDownload, FaFilter } from 'react-icons/fa';
import '../../../assets/styles/SalesAndInventoryReport.scss';
const InventoryReport = () => {
  // Dữ liệu mẫu cho biểu đồ tồn kho theo danh mục
  const inventoryByCategoryData = {
    labels: ['Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện', 'Khác'],
    datasets: [
      {
        label: 'Giá trị tồn kho (triệu VNĐ)',
        data: [450, 380, 200, 120, 100],
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

  // Dữ liệu mẫu cho biểu đồ tồn kho theo thời gian
  const inventoryTrendData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Giá trị tồn kho (triệu VNĐ)',
        data: [1000, 1100, 1050, 1200, 1150, 1300, 1250, 1400, 1350, 1500, 1450, 1250],
        borderColor: '#2196f3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
      },
    ],
  };

  // Dữ liệu mẫu cho báo cáo chi tiết
  const detailedData = [
    { category: 'Điện thoại', products: 32, totalItems: 530, avgValue: '15,500,000đ', totalValue: '450,000,000đ' },
    { category: 'Laptop', products: 25, totalItems: 150, avgValue: '25,300,000đ', totalValue: '380,000,000đ' },
    { category: 'Máy tính bảng', products: 18, totalItems: 120, avgValue: '16,600,000đ', totalValue: '200,000,000đ' },
    { category: 'Phụ kiện', products: 45, totalItems: 680, avgValue: '1,800,000đ', totalValue: '120,000,000đ' },
    { category: 'Khác', products: 20, totalItems: 250, avgValue: '4,000,000đ', totalValue: '100,000,000đ' },
  ];

  return (
    <Layout>
      <div className="inventory-report">
        <div className="report-header">
          <h1>Báo cáo tồn kho</h1>
          <div className="report-actions">
            <div className="report-filter">
              <FaFilter /> 
              <select>
                <option value="current">Hiện tại</option>
                <option value="quarter">Quý này</option>
                <option value="year">Năm nay</option>
              </select>
            </div>
            <button className="download-btn"><FaDownload /> Xuất báo cáo</button>
          </div>
        </div>
        
        <div className="report-summary">
          <div className="summary-card">
            <h3>Tổng sản phẩm</h3>
            <div className="summary-value">140</div>
          </div>
          <div className="summary-card">
            <h3>Tổng số lượng</h3>
            <div className="summary-value">1,730</div>
          </div>
          <div className="summary-card">
            <h3>Giá trị tồn kho</h3>
            <div className="summary-value">1,250,000,000đ</div>
          </div>
          <div className="summary-card">
            <h3>Sản phẩm cần nhập</h3>
            <div className="summary-value">12</div>
          </div>
        </div>
        
        <div className="chart-row">
          <div className="chart-container">
            <h2>Giá trị tồn kho theo danh mục</h2>
            <Chart data={inventoryByCategoryData} type="pie" />
          </div>
          <div className="chart-container">
            <h2>Xu hướng tồn kho theo thời gian</h2>
            <Chart data={inventoryTrendData} />
          </div>
        </div>
        
        <div className="report-detail">
          <h2>Chi tiết tồn kho theo danh mục</h2>
          <table className="report-table">
            <thead>
              <tr>
                <th>Danh mục</th>
                <th>Số sản phẩm</th>
                <th>Tổng số lượng</th>
                <th>Giá trị trung bình</th>
                <th>Tổng giá trị</th>
              </tr>
            </thead>
            <tbody>
              {detailedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.products}</td>
                  <td>{item.totalItems}</td>
                  <td>{item.avgValue}</td>
                  <td>{item.totalValue}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>Tổng</strong></td>
                <td><strong>140</strong></td>
                <td><strong>1,730</strong></td>
                <td>-</td>
                <td><strong>1,250,000,000đ</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default InventoryReport;