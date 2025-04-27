import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/user/header/Header';
import MainShop from './pages/user/main_shop';
import Home from './pages/user/home'
import Detail from './pages/user/detail';
import AdminRoutes from '../src/routes/AdminRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/shop" element={<MainShop />} />

            <Route path="/shop/product/detail/:id" element={<Detail />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>

      </Router>
    </div>
  );
};

export default App;