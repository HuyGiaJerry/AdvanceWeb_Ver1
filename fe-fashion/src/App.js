import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from '../src/routes/AdminRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserRoutes from './routes/UserRoutes';
function App() {
  return (
    <div className="App">
      <Router>


        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>


      </Router>
    </div>
  );
};

export default App;