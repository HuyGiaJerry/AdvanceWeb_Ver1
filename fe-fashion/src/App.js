import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Các route người dùng */}
          <Route path="/*" element={<UserRoutes />} />

          {/* Các route admin */}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;