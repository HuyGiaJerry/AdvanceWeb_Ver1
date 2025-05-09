// src/pages/admin/promotions/PromotionCreate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import PromotionForm from '../../../components/admin/forms/PromotionForm';

const PromotionCreate = () => {
  const navigate = useNavigate();
  
  // Dữ liệu mẫu cho danh sách sản phẩm áp dụng khuyến mãi
  const products = [
    { id: 1, name: 'iPhone 15 Pro Max' },
    { id: 2, name: 'Samsung Galaxy S24' },
    { id: 3, name: 'MacBook Pro M3' },
    { id: 4, name: 'Airpods Pro 2' },
    { id: 5, name: 'Samsung Galaxy Tab S9' },
  ];

  const handleSubmit = (formData) => {
    // Xử lý logic thêm khuyến mãi
    console.log('Thêm khuyến mãi mới:', formData);
    
    // Chuyển hướng về trang danh sách khuyến mãi
    navigate('/admin/promotions');
  };

  return (
      <div className="promotion-create">
        <PromotionForm 
          products={products}
          onSubmit={handleSubmit}
          formType="create"
        />
      </div>
  );
};

export default PromotionCreate;