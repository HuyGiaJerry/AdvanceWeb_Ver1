import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/admin/Table";
import { dataCustomers } from "../../../services/dataCustomers"; // Import dữ liệu đã chuyển đổi

const CustomerList = () => {
  const navigate = useNavigate();
  
  const [customers, setCustomers] = useState(
    dataCustomers?.map((customer) => ({
      userId: customer?.userId || "N/A",
      fullName: customer?.fullName || "Không có dữ liệu",
      email: customer?.email || "Không có email",
      phoneNumber: customer?.phoneNumber || "Không có số điện thoại",
      role: customer?.role || "Không rõ",
      isActive: customer?.isActive === 1 ? "✅ Đang hoạt động" : "❌ Bị khóa", // Chuyển đổi trạng thái rõ hơn
      totalSpent: customer?.totalSpent ? `$${customer.totalSpent.toFixed(2)}` : "$0.00",
      loyaltyPoints: customer?.loyaltyPoints || 0,
      lastLogin: customer?.lastLogin ? new Date(customer.lastLogin).toLocaleString("vi-VN") : "Không có dữ liệu",
      createdAt: customer?.createdAt ? new Date(customer.createdAt).toLocaleString("vi-VN") : "Không có dữ liệu",
      updatedAt: customer?.updatedAt ? new Date(customer.updatedAt).toLocaleString("vi-VN") : "Không có dữ liệu",
    })) || []
  );
  const columns = [
    { key: "userId", name: "User ID", sortable: true },
    { key: "fullName", name: "Tên khách hàng", sortable: true },
    { key: "email", name: "Email", sortable: true },
    { key: "phoneNumber", name: "Số điện thoại", sortable: true },
    { key: "role", name: "Vai trò", sortable: true },
    { key: "isActive", name: "Trạng thái", sortable: true },
    { key: "totalSpent", name: "Tổng chi tiêu", sortable: true },
    { key: "loyaltyPoints", name: "Điểm thưởng", sortable: true },
    { key: "lastLogin", name: "Lần đăng nhập cuối", sortable: true },
    { key: "createdAt", name: "Ngày đăng ký", sortable: true },
    { key: "updatedAt", name: "Cập nhật lúc", sortable: true },
  ];

  const handleRowClick = (id) => {
    navigate(`/admin/customers/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      setCustomers(customers.filter((customer) => customer.userId !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách khách hàng</h1>
      </div>
      
      <Table 
        columns={columns} 
        data={customers.map((customer) => ({
          ...customer,
          onClick: () => handleRowClick(customer.userId),
        }))}
        onDelete={handleDelete}
        editUrl="/admin/customers/edit"
        createUrl="/admin/customers/create"
      />
    </div>
  );
};

export default CustomerList;