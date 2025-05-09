import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/AdminLogin.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu đã đăng nhập rồi thì chuyển hướng đến dashboard
    const isAdminLoggedIn = localStorage.getItem('adminToken');
    if (isAdminLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Giả lập đăng nhập (thay thế bằng API thực tế sau)
    if (username === 'admin' && password === 'admin123') {
      // Lưu token vào localStorage (hoặc có thể dùng Redux)
      localStorage.setItem('adminToken', 'admin-token-example');
      localStorage.setItem('adminUser', JSON.stringify({
        name: 'Admin User',
        role: 'Super Admin'
      }));
      
      // Chuyển hướng đến dashboard sau khi đăng nhập
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      setLoading(false);
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        <div className="login-left">
          <div className="login-overlay"></div>
          <div className="login-content">
            <h1>FASCO</h1>
            <h2>Fashion Store Admin</h2>
            <p>Quản lý cửa hàng của bạn một cách hiệu quả với bảng điều khiển quản trị toàn diện.</p>
          </div>
        </div>
        <div className="login-right">
          <div className="login-form-container">
            <div className="login-header">
              <div className="logo-container">
                <div className="logo">
                  <span>F</span>
                </div>
              </div>
              <h2>Đăng nhập vào Admin Dashboard</h2>
              <p>Nhập thông tin đăng nhập của bạn để truy cập bảng điều khiển</p>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-group">
                <label htmlFor="username">Tên đăng nhập</label>
                <div className="input-with-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nhập tên đăng nhập"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <div className="input-with-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    required
                  />
                </div>
              </div>
              
              <div className="form-options">
                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                </div>
                <a href="#forgot" className="forgot-password">Quên mật khẩu?</a>
              </div>
              
              <button 
                type="submit" 
                className={`login-button ${loading ? 'loading' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : 'Đăng nhập'}
              </button>
            </form>
            
            <div className="login-footer">
              <p>© 2025 FASCO Admin. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;