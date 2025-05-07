// src/pages/admin/categories/CategoryEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import CategoryForm from '../../../components/admin/forms/CategoryForm';

const CategoryEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    setTimeout(() => {
      // Dữ liệu mẫu
      const categoryData = {
        id: parseInt(id),
        name: 'Điện thoại',
        description: 'Các loại điện thoại di động',
        status: 'Hiển thị',
        parent_id: null
      };
      
      setCategory(categoryData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleSubmit = (formData) => {
    // Xử lý logic cập nhật danh mục
    console.log('Cập nhật danh mục:', formData);
    
    // Chuyển hướng về trang danh sách danh mục
    navigate('/admin/categories');
  };

  if (loading) {
    return (
     
        <div className="loading">Đang tải...</div>
  
    );
  }

  return (
 
      <div className="category-edit">
        <CategoryForm 
          category={category}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>

  );
};

export default CategoryEdit;