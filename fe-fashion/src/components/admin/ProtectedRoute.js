import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Layout from '../../components/admin/Layout';

const ProtectedRoute = () => {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const isAuthenticated = localStorage.getItem('adminToken') !== null;
  
  // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Nếu đã đăng nhập, render layout và các route con
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;