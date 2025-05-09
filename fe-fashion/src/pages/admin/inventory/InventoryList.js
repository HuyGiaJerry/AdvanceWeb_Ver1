import React, { useState } from "react";
import Table from "../../../components/admin/Table";
import "../../../assets/styles/InventoryList.scss";
import { FaSearch, FaFilter } from "react-icons/fa";
import dataProduct from "../../../services/test"; // Import products data

const InventoryList = () => {
  // Transform dataProduct into inventory format
  const inventoryData = dataProduct.flatMap((product) =>
    product.colors.flatMap((color) =>
      color.variants.map((variant) => ({
        id: variant.variantId,
        code: product.productId,
        name: `${product.name} (${color.colorName}, ${variant.size})`,
        category: `Category ${product.categoryId}`, // You can modify this with actual category data if available
        stock: variant.stockQuantity,
        minStock: 10, // Default minimum stock; adjust as needed
        status: variant.stockQuantity <= 10 ? "Cần nhập thêm" : "Tốt",
      }))
    )
  );

  const [inventory, setInventory] = useState(inventoryData);

  const columns = [
    { key: "code", name: "Mã SP", sortable: true },
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "category", name: "Danh mục", sortable: true },
    { key: "stock", name: "Tồn kho", sortable: true },
    { key: "minStock", name: "Tồn kho tối thiểu", sortable: true },
    { key: "status", name: "Trạng thái", sortable: true },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter inventory based on search and filter criteria
  const filteredInventory = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.code.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "lowStock" && item.stock <= item.minStock);

    return matchesSearch && matchesFilter;
  });

  const handleAdjustStock = (id) => {
    const newStock = window.prompt("Nhập số lượng tồn kho mới:");
    if (newStock !== null) {
      setInventory(
        inventory.map((item) => {
          if (item.id === id) {
            const updatedStock = parseInt(newStock);
            return {
              ...item,
              stock: updatedStock,
              status: updatedStock <= item.minStock ? "Cần nhập thêm" : "Tốt",
            };
          }
          return item;
        })
      );
    }
  };

  return (
 
      <div className="inventory-list">
        <div className="page-header">
          <h1>Quản lý tồn kho</h1>
          <div className="header-actions">
            <div className="search-bar">
              <FaSearch />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FaFilter />
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Tất cả sản phẩm</option>
                <option value="lowStock">Sản phẩm cần nhập thêm</option>
              </select>
            </div>
            {/* <button className="import-btn">Nhập hàng</button> */}
          </div>
        </div>

        <div className="inventory-summary">
          <div className="summary-box">
            <h3>Tổng sản phẩm</h3>
            <p>{inventory.length}</p>
          </div>
          <div className="summary-box">
            <h3>Cần nhập thêm</h3>
            <p>{inventory.filter((item) => item.stock <= item.minStock).length}</p>
          </div>
          <div className="summary-box">
            <h3>Tổng giá trị tồn kho</h3>
            <p>1,250,000,000đ</p>
          </div>
        </div>

        <div className="inventory-table">
          <Table
            columns={columns}
            data={filteredInventory.map((item) => ({
              ...item,
              status: (
                <span
                  className={`status ${
                    item.status === "Cần nhập thêm" ? "warning" : "good"
                  }`}
                >
                  {item.status}
                </span>
              ),
            }))}
            onDelete={() => {}}
            customAction={(id) => (
              <button
                className="adjust-btn"
                onClick={() => handleAdjustStock(id)}
              >
                Điều chỉnh
              </button>
            )}
            title="Danh sách tồn kho"
          />
        </div>
      </div>

  );
};

export default InventoryList;