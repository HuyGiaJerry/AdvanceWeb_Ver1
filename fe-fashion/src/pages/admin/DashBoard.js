import React, { useState, useEffect } from "react";
import { FaDownload, FaFilter } from 'react-icons/fa';
import dataDashboard from "../../services/dataDashboard";
import DashboardSummary from "../../components/admin/DashboardSummary";
import RecentSalesChart from "../../components/admin/RecentSalesChart";
import RecentOrders from "../../components/admin/RecentOrders";
import BestSellingProducts from "../../components/admin/BestSellingProducts";
import LowStockAlert from "../../components/admin/LowStockAlert";
import jsPDF from 'jspdf';
// import { saveAs } from "file-saver";

const Dashboard = () => {
  // Original data from dataDashboard
  const originalData = {
    summary: dataDashboard.summary,
    recentSales: dataDashboard.recentSales,
    recentOrders: dataDashboard.recentOrders,
    bestSellingProducts: dataDashboard.bestSellingProducts,
    lowStockAlert: dataDashboard.lowStockAlert,
  };

  // State to hold filtered data
  const [filteredData, setFilteredData] = useState(originalData);
  // State to track current filter
  const [currentFilter, setCurrentFilter] = useState("current");

  // Function to filter data based on selected time period
  const filterData = (filterType) => {
    // In a real application, you would fetch data from an API with the filter parameter
    // For this demo, we'll simulate different data for different filters
    
    // Get current date for filtering
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let filteredSummary = { ...originalData.summary };
    let filteredRecentSales = [...originalData.recentSales];
    let filteredRecentOrders = [...originalData.recentOrders];
    let filteredBestSellingProducts = [...originalData.bestSellingProducts];
    
    // Apply filter logic based on filter type
    switch (filterType) {
      case "today":
        // Filter for today's data
        // For demo purposes, reduce numbers to simulate filtering
        filteredSummary = {
          ...filteredSummary,
          totalRevenue: filteredSummary.totalRevenue * 0.15,
          totalOrders: Math.floor(filteredSummary.totalOrders * 0.15),
          newCustomers: Math.floor(filteredSummary.newCustomers * 0.15)
        };
        
        // Filter sales for today
        filteredRecentSales = filteredRecentSales.slice(-1);
        
        // Filter orders for today
        filteredRecentOrders = filteredRecentOrders.filter(order => {
          const orderDate = new Date(order.date);
          return orderDate.getDate() === currentDay &&
                 orderDate.getMonth() === currentMonth &&
                 orderDate.getFullYear() === currentYear;
        });
        
        // Filter best selling products for today
        filteredBestSellingProducts = filteredBestSellingProducts.map(product => ({
          ...product,
          unitsSold: Math.floor(product.unitsSold * 0.15),
          revenue: product.revenue * 0.15
        }));
        break;
        
      case "week":
        // Filter for this week's data
        filteredSummary = {
          ...filteredSummary,
          totalRevenue: filteredSummary.totalRevenue * 0.35,
          totalOrders: Math.floor(filteredSummary.totalOrders * 0.35),
          newCustomers: Math.floor(filteredSummary.newCustomers * 0.35)
        };
        
        // Filter sales for this week
        filteredRecentSales = filteredRecentSales.slice(-7);
        
        // Filter orders for this week
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        filteredRecentOrders = filteredRecentOrders.filter(order => {
          const orderDate = new Date(order.date);
          return orderDate >= oneWeekAgo;
        });
        
        // Filter best selling products for this week
        filteredBestSellingProducts = filteredBestSellingProducts.map(product => ({
          ...product,
          unitsSold: Math.floor(product.unitsSold * 0.35),
          revenue: product.revenue * 0.35
        }));
        break;
        
      case "month":
        // Filter for this month's data
        filteredSummary = {
          ...filteredSummary,
          totalRevenue: filteredSummary.totalRevenue * 0.65,
          totalOrders: Math.floor(filteredSummary.totalOrders * 0.65),
          newCustomers: Math.floor(filteredSummary.newCustomers * 0.65)
        };
        
        // Filter orders for this month
        filteredRecentOrders = filteredRecentOrders.filter(order => {
          const orderDate = new Date(order.date);
          return orderDate.getMonth() === currentMonth &&
                 orderDate.getFullYear() === currentYear;
        });
        
        // Filter best selling products for this month
        filteredBestSellingProducts = filteredBestSellingProducts.map(product => ({
          ...product,
          unitsSold: Math.floor(product.unitsSold * 0.65),
          revenue: product.revenue * 0.65
        }));
        break;
        
      case "quarter":
        // Filter for this quarter's data
        filteredSummary = {
          ...filteredSummary,
          totalRevenue: filteredSummary.totalRevenue * 0.85,
          totalOrders: Math.floor(filteredSummary.totalOrders * 0.85),
          newCustomers: Math.floor(filteredSummary.newCustomers * 0.85)
        };
        
        // Filter orders for this quarter
        const currentQuarter = Math.floor(currentMonth / 3);
        const quarterStartMonth = currentQuarter * 3;
        const quarterEndMonth = quarterStartMonth + 2;
        
        filteredRecentOrders = filteredRecentOrders.filter(order => {
          const orderDate = new Date(order.date);
          const orderMonth = orderDate.getMonth();
          return orderDate.getFullYear() === currentYear &&
                 orderMonth >= quarterStartMonth &&
                 orderMonth <= quarterEndMonth;
        });
        
        // Filter best selling products for this quarter
        filteredBestSellingProducts = filteredBestSellingProducts.map(product => ({
          ...product,
          unitsSold: Math.floor(product.unitsSold * 0.85),
          revenue: product.revenue * 0.85
        }));
        break;
        
      case "year":
        // Filter for this year's data
        // For demo purposes, use almost full data
        filteredRecentOrders = filteredRecentOrders.filter(order => {
          const orderDate = new Date(order.date);
          return orderDate.getFullYear() === currentYear;
        });
        break;
        
      case "current":
      default:
        // Default case, use original data
        break;
    }
    
    // Update filtered data state
    setFilteredData({
      summary: filteredSummary,
      recentSales: filteredRecentSales,
      recentOrders: filteredRecentOrders,
      bestSellingProducts: filteredBestSellingProducts,
      lowStockAlert: originalData.lowStockAlert, // Low stock alert doesn't change with time filter
    });
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setCurrentFilter(filterValue);
    filterData(filterValue);
  };

  // Export to PDF function
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Báo cáo Tổng quan", 20, 20);
    
    // Add filter information to the PDF
    doc.text(`Thời gian: ${getFilterLabel(currentFilter)}`, 20, 30);
    
    // Add summary data
    doc.text("Tổng quan:", 20, 40);
    doc.text(`Tổng doanh thu: ${filteredData.summary.totalRevenue.toLocaleString('vi-VN')}đ`, 25, 50);
    doc.text(`Tổng đơn hàng: ${filteredData.summary.totalOrders}`, 25, 60);
    doc.text(`Tổng sản phẩm: ${filteredData.summary.totalProducts}`, 25, 70);
    doc.text(`Khách hàng mới: ${filteredData.summary.newCustomers}`, 25, 80);
    
    doc.save("Báo_cáo.pdf");
  };

  // Function to get filter label for display
  const getFilterLabel = (filter) => {
    switch (filter) {
      case "today":
        return "Hôm nay";
      case "week":
        return "Tuần này";
      case "month":
        return "Tháng này";
      case "quarter":
        return "Quý này";
      case "year":
        return "Năm nay";
      case "current":
      default:
        return "Hiện tại";
    }
  };

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <div className="report-header" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "20px" 
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333" }}>
          Tổng quan hệ thống - {getFilterLabel(currentFilter)}
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
            <select 
              value={currentFilter}
              onChange={handleFilterChange}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "14px"
              }}
            >
              <option value="current">Hiện tại</option>
              <option value="today">Hôm nay</option>
              <option value="week">Tuần này</option>
              <option value="month">Tháng này</option>
              <option value="quarter">Quý này</option>
              <option value="year">Năm nay</option>
            </select>
          </div>
          <div className="report-actions" style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <button onClick={exportToPDF} style={{
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
              <FaDownload />  Xuất báo cáo
            </button>
          </div>
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
        <DashboardSummary summary={filteredData.summary} />
        <RecentSalesChart recentSales={filteredData.recentSales} />
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
          <BestSellingProducts bestSellingProducts={filteredData.bestSellingProducts} />
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
          {/* Low Stock Alert */}
          <LowStockAlert lowStockAlert={filteredData.lowStockAlert} />
        </div>
      </div>
      <RecentOrders recentOrders={filteredData.recentOrders} />

    </div>
  );
};

export default Dashboard;