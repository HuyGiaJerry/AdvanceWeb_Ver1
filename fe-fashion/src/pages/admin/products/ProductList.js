import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';

const ProductList = () => {
  // Dữ liệu mẫu cho bảng sản phẩm
  const [products, setProducts] = useState([
    { id: 1, name: 'iPhone 15 Pro Max', category: 'Điện thoại', supplier: 'Apple', price: '32,990,000đ', stock: 45 },
    { id: 2, name: 'Samsung Galaxy S24', category: 'Điện thoại', supplier: 'Samsung', price: '25,990,000đ', stock: 60 },
    { id: 3, name: 'MacBook Pro M3', category: 'Laptop', supplier: 'Apple', price: '52,990,000đ', stock: 30 },
    { id: 4, name: 'Airpods Pro 2', category: 'Phụ kiện', supplier: 'Apple', price: '5,990,000đ', stock: 75 },
    { id: 5, name: 'Samsung Galaxy Tab S9', category: 'Máy tính bảng', supplier: 'Samsung', price: '18,990,000đ', stock: 35 },
  ]);

  const columns = [
    { key: 'name', name: 'Tên sản phẩm', sortable: true },
    { key: 'category', name: 'Danh mục', sortable: true },
    { key: 'supplier', name: 'Nhà cung cấp', sortable: true },
    { key: 'price', name: 'Giá bán', sortable: true },
    { key: 'stock', name: 'Tồn kho', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <Layout>
      <div className="product-list">
        <Table 
          columns={columns} 
          data={products} 
          onDelete={handleDelete}
          editUrl="/admin/products/edit"
          createUrl="/admin/products/create"
          title="Danh sách sản phẩm"
        />
      </div>
    </Layout>
  );
};

export default ProductList;