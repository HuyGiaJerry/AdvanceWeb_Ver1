// src/pages/admin/employees/EmployeeCreate.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import EmployeeForm from '../../../components/admin/forms/EmployeeForm';

const EmployeeCreate = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (formData) => {
    // Xử lý logic thêm nhân viên
    console.log('Thêm nhân viên mới:', formData);
    
    // Chuyển hướng về trang danh sách nhân viên
    navigate('/admin/employees');
  };

  return (
    <Layout>
      <div className="employee-create">
        <EmployeeForm 
          onSubmit={handleSubmit}
          formType="create"
        />
      </div>
    </Layout>
  );
};

export default EmployeeCreate;