import React from "react";
import { FaDownload, FaFilter } from 'react-icons/fa';
import dataDashboard from "../../services/dataDashboard";
import DashboardSummary from "../../components/admin/DashboardSummary";
import RecentSalesChart from "../../components/admin/RecentSalesChart";
import RecentOrders from "../../components/admin/RecentOrders";
import BestSellingProducts from "../../components/admin/BestSellingProducts";
import LowStockAlert from "../../components/admin/LowStockAlert";

const Dashboard = () => {
  const {
    summary,
    recentSales,
    recentOrders,
    bestSellingProducts,
    lowStockAlert,
  } = dataDashboard;

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <div className="report-header" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "20px" 
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
          Tổng quan hệ thống
        </h1>
        <div className="report-actions" style={{ 
          display: "flex", 
          gap: "15px",
          alignItems: "center" 
        }}>
          <div className="report-filter" style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            backgroundColor: "white",
            padding: "8px 12px",
            borderRadius: "4px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" 
          }}>
            <FaFilter /> 
            <select style={{
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "14px"
            }}>
              <option value="current">Hiện tại</option>
              <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
          <button className="download-btn" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
          }}>
            <FaDownload /> Xuất báo cáo
          </button>
        </div>
      </div>

      <div
        className="recent-data"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
          marginTop: "30px",
        }}
      >
        {/* Dashboard Summary */}
        <DashboardSummary summary={summary} />
        <RecentSalesChart recentSales={recentSales} />
      </div>
      <div
        className="recent-data"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "24px",
          marginBottom: "24px",
          marginTop: "30px",
        }}
      >
        <div
          className="top-products"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <BestSellingProducts bestSellingProducts={bestSellingProducts} />
        </div>
        <div
          className="recent-orders"
          style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <RecentOrders recentOrders={recentOrders} />
        </div>
      </div>
      {/* Low Stock Alert */}
      <LowStockAlert lowStockAlert={lowStockAlert} />
    </div>
  );
};

export default Dashboard;