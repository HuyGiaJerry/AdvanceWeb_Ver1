// src/pages/admin/products/ProductEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import ProductForm from '../../../components/admin/forms/ProductForm';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    setTimeout(() => {
      // Dữ liệu mẫu cho sản phẩm
      const productData = {
        id: parseInt(id),
        name: 'iPhone 15 Pro Max',
        category_id: 1,
        supplier_id: 1,
        price: 32990000,
        stock: 45,
        description: 'iPhone 15 Pro Max mới nhất với nhiều tính năng đột phá.'
      };
      
      // Dữ liệu mẫu cho danh mục
      const categoriesData = [
        { id: 1, name: 'Điện thoại' },
        { id: 2, name: 'Laptop' },
        { id: 3, name: 'Máy tính bảng' },
        { id: 4, name: 'Phụ kiện' },
      ];
      
      // Dữ liệu mẫu cho nhà cung cấp
      const suppliersData = [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Samsung' },
        { id: 3, name: 'Xiaomi' },
        { id: 4, name: 'Dell' },
      ];
      
      setProduct(productData);
      setCategories(categoriesData);
      setSuppliers(suppliersData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleSubmit = (formData) => {
    // Xử lý logic cập nhật sản phẩm
    console.log('Cập nhật sản phẩm:', formData);
    
    // Chuyển hướng về trang danh sách sản phẩm
    navigate('/admin/products');
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Đang tải...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="product-edit">
        <ProductForm 
          product={product}
          categories={categories}
          suppliers={suppliers}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>
    </Layout>
  );
};

export default ProductEdit;