import React from "react";
import Table from "../../components/admin/Table";

const LowStockAlert = ({ lowStockAlert }) => {
  const columns = [
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "color", name: "Màu sắc", sortable: true },
    { key: "size", name: "Kích cỡ", sortable: true },
    { key: "stock", name: "Tồn kho", sortable: true },
  ];

  const formattedData = lowStockAlert.map((product) => ({
    ...product,
    stock: (
      <span className={product.stock === 0 ? "out-of-stock" : "low-stock"}>
        {product.stock}
      </span>
    ),
  }));

  return (
    <div className="low-stock-alert">
      <h2>Sản phẩm sắp hết hàng</h2>
      <Table columns={columns} data={formattedData} itemsPerPage={5} showActions={false}
  showAddButton={false} />
    </div>
  );
};

export default LowStockAlert;