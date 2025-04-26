// src/pages/admin/promotions/PromotionEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import PromotionForm from '../../../components/admin/forms/PromotionForm';

const PromotionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState(null);
  
  // Dữ liệu mẫu cho danh sách sản phẩm áp dụng khuyến mãi
  const products = [
    { id: 1, name: 'iPhone 15 Pro Max' },
    { id: 2, name: 'Samsung Galaxy S24' },
    { id: 3, name: 'MacBook Pro M3' },
    { id: 4, name: 'Airpods Pro 2' },
    { id: 5, name: 'Samsung Galaxy Tab S9' },
  ];

  // Mô phỏng việc lấy dữ liệu khuyến mãi theo id
  useEffect(() => {
    // Trong thực tế, đây sẽ là API call để lấy dữ liệu khuyến mãi
    const mockPromotion = {
      id: parseInt(id),
      name: 'Sale Tháng 4',
      discount_type: 'percentage',
      discount_value: 20,
      start_date: '2025-04-01',
      end_date: '2025-04-30',
      description: 'Khuyến mãi tháng 4 giảm giá các sản phẩm công nghệ',
      applicable_products: [1, 3, 4], // IDs của sản phẩm áp dụng khuyến mãi
      status: 'active'
    };
    
    // Mô phỏng loading từ API
    setTimeout(() => {
      setPromotion(mockPromotion);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (formData) => {
    // Xử lý logic cập nhật khuyến mãi
    console.log('Cập nhật khuyến mãi:', formData);
    
    // Chuyển hướng về trang danh sách khuyến mãi
    navigate('/admin/promotions');
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading">Đang tải dữ liệu...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="promotion-edit">
        <PromotionForm 
          promotion={promotion}
          products={products}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>
    </Layout>
  );
};

export default PromotionEdit;