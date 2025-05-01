import React from "react";
import { FaUsers, FaBoxes, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import Card from "../../components/admin/Card";

const DashboardSummary = ({ summary }) => {
  return (
    <div className="dashboard-summary">
      <Card
        title="Tổng doanh thu"
        value={summary.totalRevenue.toLocaleString("vi-VN") + "₫"}
        icon={<FaMoneyBillWave />}
        color="#4caf50"
        percentage={15} // Example growth percentage
      />
      <Card
        title="Tổng đơn hàng"
        value={summary.totalOrders}
        icon={<FaShoppingCart />}
        color="#2196f3"
        percentage={10} // Example growth percentage
      />
      <Card
        title="Sản phẩm"
        value={summary.totalProducts}
        icon={<FaBoxes />}
        color="#ff9800"
        percentage={5} // Example growth percentage
      />
      <Card
        title="Khách hàng mới"
        value={summary.newCustomers}
        icon={<FaUsers />}
        color="#9c27b0"
        percentage={20} // Example growth percentage
      />
    </div>
  );
};

export default DashboardSummary;