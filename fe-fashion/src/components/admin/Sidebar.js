import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUsers, FaBoxes, FaShoppingCart, FaChartBar } from 'react-icons/fa';
import '../../assets/styles/Sidebar.scss';

const Sidebar = () => {
    useEffect(() => {
    const dropdowns = document.querySelectorAll('.menu-dropdown > span');
    const handleToggle = function () {
      this.parentElement.classList.toggle('open');
      this.classList.toggle('active');
    };
    
    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener('click', handleToggle);
    });

    return () => {
      dropdowns.forEach((dropdown) => {
        dropdown.removeEventListener('click', handleToggle);
      });
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Admin Panel</h3>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li>
            <Link to="/admin/dashboard"><FaHome /> Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/customers"><FaUsers /> Quản lý khách hàng</Link>
          </li>
          <li className="menu-dropdown">
            <span><FaBoxes /> Quản lý sản phẩm</span>
            <ul className="submenu">
              <li><Link to="/admin/products">Danh sách sản phẩm</Link></li>
              <li><Link to="/admin/categories">Danh mục sản phẩm</Link></li>
              {/* <li><Link to="/admin/suppliers">Nhà cung cấp</Link></li> */}
              <li><Link to="/admin/inventory">Quản lý tồn kho</Link></li>
            </ul>
          </li>
          <li className="menu-dropdown">
            <span><FaShoppingCart /> Quản lý bán hàng</span>
            <ul className="submenu">
              {/* <li><Link to="/admin/sales">Theo dõi doanh thu</Link></li> */}
              <li><Link to="/admin/orders">Quản lý đơn hàng</Link></li>
              <li><Link to="/admin/promotions">Quản lý khuyến mãi</Link></li>
            </ul>
          </li>
          <li className="menu-dropdown">
            <span><FaChartBar /> Báo cáo thống kê</span>
            <ul className="submenu">
              <li><Link to="/admin/reports/sales">Báo cáo doanh thu</Link></li>
              <li><Link to="/admin/reports/inventory">Báo cáo tồn kho</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;