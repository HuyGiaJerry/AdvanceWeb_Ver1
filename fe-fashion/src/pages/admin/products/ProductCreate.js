import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import ProductForm from '../../../components/admin/forms/ProductForm';

const ProductCreate = () => {
  const navigate = useNavigate();
  
  // Dữ liệu mẫu cho danh mục và nhà cung cấp
  const categories = [
    { id: 1, name: 'Điện thoại' },
    { id: 2, name: 'Laptop' },
    { id: 3, name: 'Máy tính bảng' },
    { id: 4, name: 'Phụ kiện' },
  ];
  
  const suppliers = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Samsung' },
    { id: 3, name: 'Xiaomi' },
    { id: 4, name: 'Dell' },
  ];

  const handleSubmit = (formData) => {
    // Xử lý logic thêm sản phẩm
    console.log('Thêm sản phẩm mới:', formData);
    
    // Chuyển hướng về trang danh sách sản phẩm
    navigate('/admin/products');
  };

  return (
    <Layout>
      <div className="product-create">
        <ProductForm 
          categories={categories}
          suppliers={suppliers}
          onSubmit={handleSubmit}
          formType="create"
        />
      </div>
    </Layout>
  );
};

export default ProductCreate;