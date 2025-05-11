import React, { useState, useEffect } from "react";
import Table from "../../../components/admin/Table";
import "../../../assets/styles/ModalCustomer.scss";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        //gửi request đến API  fetch , async/await 
        const response = await fetch("https://localhost:7123/api/Category");
        if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu danh mục");

        const data = await response.json();
        const formatted = data.map((category) => ({
          id: category.categoryId,
          name: category.name,
          description: category.subCategories
            ? `Bao gồm: ${category.subCategories.map((sub) => sub.name).join(", ")}`
            : "Không có danh mục con",
          products: category.productCount || 0,
          status: "Kích hoạt", // Giả sử mặc định là "Kích hoạt"
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      }
    };

    fetchCategories();
  }, []);

  const columns = [
    { key: "name", name: "Tên danh mục", sortable: true },
    { key: "description", name: "Mô tả", sortable: false },
    { key: "products", name: "Số sản phẩm", sortable: true },
    { key: "status", name: "Trạng thái", sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter((category) => category.id !== id));
      toast.success("Xóa danh mục thành công!");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleSaveStatus = (newStatus) => {
    const updated = categories.map((c) =>
      c.id === editingCategory.id ? { ...c, status: newStatus } : c
    );
    setCategories(updated);
    setShowModal(false);

    toast.success("Cập nhật trạng thái thành công!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="category-list">
      <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: "20px" }}>
        Danh mục sản phẩm
      </h1>
      <Table
        columns={columns}
        data={categories.map((c) => ({
          ...c,
          onEdit: () => handleEdit(c),
        }))}
        onDelete={handleDelete}
        editUrl={null}
        createUrl="/admin/categories/create"
        title="Danh mục sản phẩm"
        showActions={true}
        showAddButton={false}
      />

      {showModal && editingCategory && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Chỉnh sửa trạng thái danh mục</h2>
            <p>
              Danh mục: <strong>{editingCategory.name}</strong>
            </p>
            <div className="modal-buttons">
              <button className="active" onClick={() => handleSaveStatus("Kích hoạt")}>
                Kích hoạt
              </button>
              <button className="blocked" onClick={() => handleSaveStatus("Ngừng kích hoạt")}>
                Ngừng kích hoạt
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

export default CategoryList;
