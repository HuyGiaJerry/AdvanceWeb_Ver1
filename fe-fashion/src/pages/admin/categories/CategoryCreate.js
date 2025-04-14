// src/pages/admin/categories/CategoryCreate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import CategoryForm from '../../../components/admin/forms/CategoryForm';

const CategoryCreate = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (formData) => {
    // Xử lý logic thêm danh mục
    console.log('Thêm danh mục mới:', formData);
    
    // Chuyển hướng về trang danh sách danh mục
    navigate('/admin/categories');
  };

  return (
    <Layout>
      <div className="category-create">
        <CategoryForm 
          onSubmit={handleSubmit}
          formType="create"
        />
      </div>
    </Layout>
  );
};

export default CategoryCreate;