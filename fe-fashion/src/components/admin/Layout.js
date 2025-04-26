import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../../assets/styles/Layout.scss';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
              <span className="admin-name">Admin User</span>
              <button className="logout-btn">Đăng xuất</button>
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