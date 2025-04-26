import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/user/header/Header';
import Login from './pages/user/login';
import MainShop from './pages/user/main_shop'; // Adjust path as needed
import Register from './pages/user/signup'; // Adjust path as needed
import DealTheMonth from './pages/user/deal';
import Detail from './pages/user/detail';
import AdminRoutes from '../src/routes/AdminRoutes';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Main_Shop />} />

            <Route path="product/detail/:id" element={<Detail />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;