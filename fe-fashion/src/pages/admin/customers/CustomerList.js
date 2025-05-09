import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/admin/Table";
import SearchBar from "../../../components/admin/SearchBar"; // thêm dòng này
import { dataCustomers } from "../../../services/dataCustomers";
import "../../../assets/styles/ModalCustomer.scss";

const CustomerList = () => {
  const navigate = useNavigate();
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };
  const handleSaveStatus = (newStatus) => {
    const updated = customers.map((c) =>
      c.userId === editingCustomer.userId
        ? { ...c, isActive: newStatus }
        : c
    );
    setCustomers(updated);
    setShowModal(false);
  };
 
  
  const originalCustomers = dataCustomers?.map((customer) => ({
    userId: customer?.userId || "N/A",
    fullName: customer?.fullName || "Không có dữ liệu",
    email: customer?.email || "Không có email",
    phoneNumber: customer?.phoneNumber || "Không có số điện thoại",
    role: customer?.role || "Không rõ",
    isActive: customer?.isActive === 1 ? "✅ Đang hoạt động" : "❌ Bị khóa",
    totalSpent: customer?.totalSpent ? `$${customer.totalSpent.toFixed(2)}` : "$0.00",
    loyaltyPoints: customer?.loyaltyPoints || 0,
    lastLogin: customer?.lastLogin ? new Date(customer.lastLogin).toLocaleString("vi-VN") : "Không có dữ liệu",
    createdAt: customer?.createdAt ? new Date(customer.createdAt).toLocaleString("vi-VN") : "Không có dữ liệu",
    updatedAt: customer?.updatedAt ? new Date(customer.updatedAt).toLocaleString("vi-VN") : "Không có dữ liệu",
  })) || [];

  const [customers, setCustomers] = useState(originalCustomers);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter((customer) =>
    customer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.userId.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { key: "userId", name: "User ID", sortable: true },
    { key: "fullName", name: "Tên khách hàng", sortable: true },
    { key: "email", name: "Email", sortable: true },
    { key: "phoneNumber", name: "Số điện thoại", sortable: true },
    { key: "role", name: "Vai trò", sortable: true },
    { key: "isActive", name: "Trạng thái", sortable: true },
  ];

  const handleRowClick = (id) => {
    navigate(`/admin/customers/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      const updated = customers.filter((customer) => customer.userId !== id); // Sử dụng `userId`
      setCustomers(updated);
      setSearchTerm(""); // Reset tìm kiếm để đảm bảo danh sách cập nhật
    }
  };
  
  
  

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách khách hàng</h1>
      </div>
  
      {/* Search Bar */}
  
        <SearchBar
          placeholder="Tìm theo tên hoặc ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
    
    <Table
  columns={columns}
  data={filteredCustomers.map((customer) => ({
    ...customer,
    onClick: () => handleRowClick(customer.userId),
    onEdit: () => handleEdit(customer),
    onDelete: () => handleDelete(customer.userId), // 👈 Kiểm tra ID có đúng không
  }))}
  onDelete={handleDelete}
  onEdit={handleEdit}
  editUrl={null}
  createUrl="/admin/customers/create"
/>


  
      {/* Modal sửa trạng thái */}
      {showModal && editingCustomer && (
  <div className="modal-overlay">
    <div className="modal-container">
      <h2>Chỉnh sửa trạng thái</h2>
      <p>Khách hàng: <strong>{editingCustomer.fullName}</strong></p>
      <div className="modal-buttons">
        <button className="active" onClick={() => handleSaveStatus("✅ Đang hoạt động")}>
          Đang hoạt động
        </button>
        <button className="blocked" onClick={() => handleSaveStatus("❌ Bị khóa")}>
          Bị khóa
        </button>
      </div>
      <div className="modal-cancel" onClick={() => setShowModal(false)}>
        Hủy bỏ
      </div>
    </div>
  </div>
)}

    </div>
  );
  
};

export default CustomerList;
