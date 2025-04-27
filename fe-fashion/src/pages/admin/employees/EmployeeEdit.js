// src/pages/admin/employees/EmployeeEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import EmployeeForm from '../../../components/admin/forms/EmployeeForm';

const EmployeeEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Giả lập việc lấy dữ liệu từ API
    setTimeout(() => {
      // Dữ liệu mẫu
      const employeeData = {
        id: parseInt(id),
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        phone: '0901234567',
        position: 'Quản lý',
        department: 'Kinh doanh',
        hire_date: '2024-01-15',
        status: 'Đang làm việc',
        address: 'Số 123, Đường Lê Lợi, Q.1, TP.HCM'
      };
      
      setEmployee(employeeData);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleSubmit = (formData) => {
    // Xử lý logic cập nhật nhân viên
    console.log('Cập nhật nhân viên:', formData);
    
    // Chuyển hướng về trang danh sách nhân viên
    navigate('/admin/employees');
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
      <div className="employee-edit">
        <EmployeeForm 
          employee={employee}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>
    </Layout>
  );
};

export default EmployeeEdit;