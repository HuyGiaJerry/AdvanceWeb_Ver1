import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/admin/ProtectedRoute';
import AdminLogin from '../pages/admin/AdminLogin';
import Dashboard from '../pages/admin/DashBoard';
import CustomerList from '../pages/admin/customers/CustomerList';
import ProductList from '../pages/admin/products/ProductList';
import ProductCreate from '../pages/admin/products/ProductCreate';
import CategoryList from '../pages/admin/categories/CategoryList';
import InventoryList from '../pages/admin/inventory/InventoryList';
import SalesDashboard from '../pages/admin/sales/SalesDashboard';
import OrderList from '../pages/admin/sales/OrderList';
import PromotionList from '../pages/admin/promotions/PromotionList';
import SalesReport from '../pages/admin/reports/SalesReport';
import InventoryReport from '../pages/admin/reports/InventoryReport';
const AdminRoutes = () => {
  return (
    <Routes>
      {/* Trang đăng nhập không cần bảo vệ */}
      <Route path="login" element={<AdminLogin />} />
      
      {/* Route được bảo vệ yêu cầu đăng nhập */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<CustomerList />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<ProductCreate />} />
        <Route path="categories" element={<CategoryList />} />
        <Route path="inventory" element={<InventoryList />} />
        <Route path="sales" element={<SalesDashboard />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="promotions" element={<PromotionList />} />
        <Route path="reports/sales" element={<SalesReport />} />
        <Route path="reports/inventory" element={<InventoryReport />} />

      </Route>
      
      {/* Redirect từ /admin đến /admin/dashboard nếu đã đăng nhập */}
      <Route index element={<ProtectedRoute />} />
    </Routes>
  );
};

export default AdminRoutes;