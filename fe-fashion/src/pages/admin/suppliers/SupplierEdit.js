// src/pages/admin/suppliers/SupplierEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import SupplierForm from '../../../components/admin/forms/SupplierForm';

const SupplierEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [supplier, setSupplier] = useState(null);

  // Mô phỏng việc lấy dữ liệu nhà cung cấp theo id
  useEffect(() => {
    // Trong thực tế, đây sẽ là API call để lấy dữ liệu nhà cung cấp
    const mockSupplier = {
      id: parseInt(id),
      name: 'Apple',
      contact_person: 'John Smith',
      email: 'john@apple.example.com',
      phone: '0901234567',
      address: '123 Apple Street, Silicon Valley, CA',
      tax_code: '10012345',
      status: 'active',
      description: 'Nhà cung cấp sản phẩm công nghệ Apple'
    };
    
    // Mô phỏng loading từ API
    setTimeout(() => {
      setSupplier(mockSupplier);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSubmit = (formData) => {
    // Xử lý logic cập nhật nhà cung cấp
    console.log('Cập nhật nhà cung cấp:', formData);
    
    // Chuyển hướng về trang danh sách nhà cung cấp
    navigate('/admin/suppliers');
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
      <div className="supplier-edit">
        <SupplierForm 
          supplier={supplier}
          onSubmit={handleSubmit}
          formType="edit"
        />
      </div>
    </Layout>
  );
};

export default SupplierEdit;