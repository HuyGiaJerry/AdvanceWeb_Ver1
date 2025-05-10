import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from '../../pages/admin/products/ProductList';
import ProductForm from './forms/ProductForm';
import { dataProduct, addProduct } from '../../../services/test';

const ProductManager = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(dataProduct);
  const [categories, setCategories] = useState([
    { category_id: 1, name: 'Điện thoại' },
    { category_id: 2, name: 'Máy tính' },
    { category_id: 3, name: 'Phụ kiện' }
  ]);

  // Xử lý khi tạo sản phẩm mới
  const handleCreateProduct = (productData) => {
    const newProduct = addProduct(productData);
    setProducts([...products, newProduct]);
    navigate('/admin/products');
  };

  return (
    <Routes>
      <Route path="/" element={<ProductList products={products} />} />
      <Route 
        path="/create" 
        element={
          <ProductForm 
            categories={categories} 
            onSubmit={handleCreateProduct}
            formType="create"
          />
        } 
      />
      <Route 
        path="/edit/:id" 
        element={
          <ProductForm 
            categories={categories}
            onSubmit={(data) => {
              // Logic cập nhật sản phẩm ở đây
              navigate('/admin/products');
            }}
            formType="edit"
          />
        } 
      />
    </Routes>
  );
};

export default ProductManager;
