import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";
import dataProduct from "../../../services/test"; // Import dataProduct

const ProductList = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  // Initialize the product data from `dataProduct`
  const [products, setProducts] = useState(
    dataProduct.map((product) => ({
      product_id: product.productId,
      name: product.name,
      sku: product.sku,
      base_price: product.basePrice,
      discount_price: product.discountPrice,
      category_id: product.categoryId,
      updated_at: product.updatedAt,
    }))
  );

  const columns = [
    { key: "product_id", name: "ID", sortable: true },
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "sku", name: "SKU", sortable: true },
    { key: "base_price", name: "Giá gốc", sortable: true },
    { key: "discount_price", name: "Giá khuyến mãi", sortable: true },
    { key: "category_id", name: "Danh mục ID", sortable: true },
    { key: "updated_at", name: "Cập nhật lúc", sortable: true },
  ];

  const handleRowClick = (id) => {
    navigate(`/shop/product/detail/${id}`); // Navigate to the detail page with the product ID
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.product_id !== id));
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
        </div>

        <Table
          columns={columns}
          data={products.map((product) => ({
            ...product,
            onClick: () => handleRowClick(product.product_id), // Add onClick handler to each product
          }))}
          onDelete={handleDelete}
          editUrl="/admin/products/edit"
          createUrl="/admin/products/create"
        />
      </div>
    </Layout>
  );
};

export default ProductList;