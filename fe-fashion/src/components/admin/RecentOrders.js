import React from "react";
import Table from "../../components/admin/Table";

const RecentOrders = ({ recentOrders }) => {
  const columns = [
    { key: "orderId", name: "Mã đơn", sortable: true },
    { key: "customerName", name: "Khách hàng", sortable: true },
    { key: "date", name: "Ngày đặt", sortable: true },
    { key: "status", name: "Trạng thái", sortable: false },
    { key: "totalAmount", name: "Tổng tiền", sortable: true },
  ];

  const formattedData = recentOrders.map((order) => ({
    ...order,
    date: new Date(order.date).toLocaleDateString("vi-VN"),
    totalAmount: order.totalAmount.toLocaleString("vi-VN") + "₫",
    status: <span className={`status ${order.status}`}>{order.status}</span>,
  }));

  return (
    <div className="recent-orders">
      <h2>Đơn hàng gần đây</h2>
      <Table columns={columns} data={formattedData} itemsPerPage={5} />
    </div>
  );
};

export default RecentOrders;