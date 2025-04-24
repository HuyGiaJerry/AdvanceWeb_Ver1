import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";

const ProductList = () => {
  const [products, setProducts] = useState([
    {
      product_id: 1,
      name: "iPhone 15 Pro Max",
      description: "Latest iPhone with advanced features",
      base_price: 32990000,
      discount_price: 31990000,
      sku: "IP15PM-256-BLK",
      category_id: 1,
      created_at: "2025-04-20 10:30:00",
      updated_at: "2025-04-20 10:30:00",
    },
    {
      product_id: 2,
      name: "Samsung Galaxy S24",
      description: "Latest Samsung flagship phone",
      base_price: 25990000,
      discount_price: 24990000,
      sku: "SGS24-256-WHT",
      category_id: 1,
      created_at: "2025-04-19 15:45:00",
      updated_at: "2025-04-19 15:45:00",
    },
  ]);

  const columns = [
    { key: "product_id", name: "ID", sortable: true },
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "sku", name: "SKU", sortable: true },
    { key: "base_price", name: "Giá gốc", sortable: true },
    { key: "discount_price", name: "Giá khuyến mãi", sortable: true },
    { key: "category_id", name: "Danh mục ID", sortable: true },
    { key: "updated_at", name: "Cập nhật lúc", sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.product_id !== id));
    }
  };

  // Styles viết ngay trong file
  const styles = {
    createBtn: {
      backgroundColor: "#4caf50",
      color: "white",
      padding: "8px 16px",
      borderRadius: "4px",
      textDecoration: "none",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.3s",
    },
    createBtnHover: {
      backgroundColor: "#388e3c",
    },
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
          
        </div>

        <Table
  columns={columns}
  data={products}
  onDelete={handleDelete}
  editUrl="/admin/products/edit"
  createUrl="/admin/products/create"
/>
      </div>
    </Layout>
  );
};

export default ProductList;