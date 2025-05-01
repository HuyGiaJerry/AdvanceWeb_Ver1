import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/user/header/Header';
import MainShop from './pages/user/main_shop';
import Home from './pages/user/home';
import Detail from './pages/user/detail';
import AdminRoutes from './routes/AdminRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import UserRoutes from './routes/UserRoutes';
// Kiểm tra đường dẫn và chỉ hiển thị Header cho các route không phải admin
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  return (
    <>
      {/* Hiển thị Header chỉ khi không phải là trang admin */}
      {!isAdminRoute && <Header />}
      
      <div className={!isAdminRoute ? 'main-content' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<MainShop />} />
          <Route path="/shop/product/detail/:id" element={<Detail />} />
          
          {/* Tất cả các route admin được định nghĩa trong AdminRoutes */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Router>
        <AppContent />


        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;