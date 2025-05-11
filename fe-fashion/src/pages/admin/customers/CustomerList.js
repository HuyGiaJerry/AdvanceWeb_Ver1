import React, { useState, useEffect } from "react";
import Table from "../../../components/admin/Table";
import SearchBar from "../../../components/admin/SearchBar";
import { dataCustomers } from "../../../services/dataCustomers";
import "../../../assets/styles/ModalCustomer.scss";
import "../../../assets/styles/SearchBar.scss";
import { toast } from "react-toastify";

const CustomerList = () => {
  // State để lưu trữ dữ liệu khách hàng gốc
  const [allCustomers, setAllCustomers] = useState([]);
  // State để lưu trữ dữ liệu khách hàng đã lọc (sẽ được truyền vào Table)
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  // State cho tìm kiếm
  const [searchTerm, setSearchTerm] = useState("");
  // States cho chức năng sửa
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Khởi tạo dữ liệu khách hàng
// Gọi API để lấy danh sách khách hàng
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://localhost:7123/api/User/customers");
        const data = await response.json();

        if (response.ok) {
          const formattedCustomers = data.map((customer) => ({
            id: customer?.userId?.toString() || "N/A",
            userId: customer?.userId?.toString() || "N/A",
            fullName: customer?.fullName || "Không có dữ liệu",
            email: customer?.email || "Không có email",
            phoneNumber: customer?.phoneNumber || "Không có số điện thoại",
            isActive: customer?.isActive ? "✅ Đang hoạt động" : "❌ Bị khóa",
            avatar: customer?.avatarUrl ? (
              <img
                src={require(`../../../assets/images/${customer.avatarUrl}`)}
                alt={customer.fullName}
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
            ) : "Không có ảnh"
          }));

          setAllCustomers(formattedCustomers);
          setFilteredCustomers(formattedCustomers);
        } else {
          console.error("Lỗi khi lấy dữ liệu khách hàng:", data.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      }
    };

    fetchCustomers();
  }, []);


  // Cập nhật danh sách khách hàng đã lọc mỗi khi searchTerm thay đổi
  useEffect(() => {
    filterCustomers();
  }, [searchTerm, allCustomers]);

  // Hàm lọc khách hàng dựa trên searchTerm
  const filterCustomers = () => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) {
      // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
      setFilteredCustomers(allCustomers);
    } else {
      // Nếu có từ khóa, lọc theo tên hoặc ID
      const filtered = allCustomers.filter((customer) => {
        const name = (customer.fullName || "").toLowerCase();
        const id = (customer.userId || "").toString().toLowerCase();
        return name.includes(term) || id.includes(term);
      });
      setFilteredCustomers(filtered);
    }
  };

  // Xử lý khi người dùng nhập vào ô tìm kiếm
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

const handleSaveStatus = (newStatus) => {
  // Cập nhật trạng thái trong danh sách gốc
  const updatedCustomers = allCustomers.map((c) =>
    c.userId === editingCustomer.userId ? { ...c, isActive: newStatus } : c
  );
  setAllCustomers(updatedCustomers);

  // Áp dụng bộ lọc hiện tại
  filterCustomers();

  // Thông báo thành công
  toast.success("Cập nhật trạng thái thành công!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  setShowModal(false);
};


  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      const updatedCustomers = allCustomers.filter((customer) => customer.userId !== id);
      setAllCustomers(updatedCustomers);
      // Việc lọc lại sẽ tự động xảy ra thông qua useEffect
    }
  };

 const columns = [
  { key: "avatar", name: "Ảnh đại diện", sortable: false },
  { key: "userId", name: "User ID", sortable: true },
  { key: "fullName", name: "Tên khách hàng", sortable: true },
  { key: "email", name: "Email", sortable: true },
  { key: "phoneNumber", name: "Số điện thoại", sortable: true },
  { key: "isActive", name: "Trạng thái", sortable: true },
];

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: "20px" }}>
        Danh sách khách hàng
      </h1>
 <div className="search-bar-container"  >
 <SearchBar
        placeholder="Tìm theo tên hoặc ID..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

 </div>
     
      <Table
        columns={columns}
        data={filteredCustomers.map((customer) => ({
          ...customer,
          onEdit: () => handleEdit(customer),
        }))}
        onDelete={handleDelete}
        editUrl={null}
        createUrl="/admin/customers/create"
        
  showAddButton={false}
      />

      {showModal && editingCustomer && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Chỉnh sửa trạng thái</h2>
            <p>
              Khách hàng: <strong>{editingCustomer.fullName}</strong>
            </p>
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