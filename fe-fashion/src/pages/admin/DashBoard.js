import React from "react";
import Layout from "../../components/admin/Layout";
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
      <h1 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "24px", color: "#333" }}>
          Tổng quan hệ thống
        </h1>
        <div
          className="recent-data"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
            gap: "24px",
            marginBottom: "24px",
            marginTop: "50px",
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
            marginTop: "50px",
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
        {/* Recent Orders and Best Selling Products in one row */}
       
        {/* Low Stock Alert */}
        <LowStockAlert lowStockAlert={lowStockAlert} />
      </div>
  );
};

export default Dashboard;