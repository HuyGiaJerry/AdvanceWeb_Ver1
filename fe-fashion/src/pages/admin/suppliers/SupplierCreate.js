// src/pages/admin/suppliers/SupplierCreate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import SupplierForm from '../../../components/admin/forms/SupplierForm';

const SupplierCreate = () => {
  const navigate = useNavigate();

  const handleSubmit = (formData) => {
    // Xử lý logic thêm nhà cung cấp
    console.log('Thêm nhà cung cấp mới:', formData);
    
    // Chuyển hướng về trang danh sách nhà cung cấp
    navigate('/admin/suppliers');
  };

  return (
  
      <div className="supplier-create">
        <SupplierForm 
          onSubmit={handleSubmit}
          formType="create"
        />
      </div>
  );
};

export default SupplierCreate;