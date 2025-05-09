import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import '../../assets/styles/Layout.scss';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [adminUser, setAdminUser] = useState({ name: 'Admin User' });
  const navigate = useNavigate();
  
  useEffect(() => {
    // Lấy thông tin admin từ localStorage
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setAdminUser(JSON.parse(storedUser));
    }
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleLogout = () => {
    // Xóa token và thông tin người dùng khi đăng xuất
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Chuyển hướng về trang đăng nhập
    navigate('/admin/login');
  };

  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content">
        <div className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className={`fas ${sidebarCollapsed ? 'fa-bars' : 'fa-times'}`}></i>
            </button>
            <h2 className="page-title">Admin Dashboard</h2>
          </div>
          <div className="user-info">
            <div className="admin-avatar">
              <img src="/logo512.png" alt="Admin" />
            </div>
            <div className="admin-details">
              <span className="admin-name">{adminUser.name}</span>
              <button className="logout-btn" onClick={handleLogout}>Đăng xuất</button>
            </div>
          </div>
        </div>
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;