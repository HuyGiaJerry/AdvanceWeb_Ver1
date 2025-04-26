import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/user/header/Header';
import Login from './pages/user/login';
import MainShop from './pages/user/main_shop'; // Adjust path as needed
import Register from './pages/user/signup'; // Adjust path as needed
import DealTheMonth from './pages/user/deal';
import Detail from './pages/user/detail';
const App = () => {
  const [user, setUser] = useState({
    isLoggedIn: false,
    fullName: ''
  });

  return (
    <Router>
      <Header isLoggedIn={user.isLoggedIn} fullName={user.fullName} setUser={setUser} />
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/main_shop" element={<MainShop />} />
        <Route path="/home" element={<div>Home Page</div>} /> {/* Placeholder */}
        <Route path="/deal" element={<DealTheMonth />} />
        <Route path="/main_shop/product/detail/:id" element={<Detail />} />
        <Route path="/" element={<div>Welcome Page</div>} /> {/* Placeholder */}
      </Routes>
    </Router>
  );
};

export default App;