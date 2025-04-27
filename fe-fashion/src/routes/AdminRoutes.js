import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/admin/DashBoard';
import EmployeeList from '../pages/admin/employees/EmployeeList';
import ProductList from '../pages/admin/products/ProductList';
import ProductCreate from '../pages/admin/products/ProductCreate';
import CategoryList from '../pages/admin/categories/CategoryList';
import SupplierList from '../pages/admin/suppliers/SupplierList';
import InventoryList from '../pages/admin/inventory/InventoryList';
import SalesDashboard from '../pages/admin/sales/SalesDashboard';
import OrderList from '../pages/admin/sales/OrderList';
import PromotionList from '../pages/admin/promotions/PromotionList';
import SalesReport from '../pages/admin/reports/SalesReport';
import InventoryReport from '../pages/admin/reports/InventoryReport';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="employees" element={<EmployeeList />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/create" element={<ProductCreate />} />
      <Route path="categories" element={<CategoryList />} />
      <Route path="suppliers" element={<SupplierList />} />
      <Route path="inventory" element={<InventoryList />} />
      <Route path="sales" element={<SalesDashboard />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="promotions" element={<PromotionList />} />
      <Route path="reports/sales" element={<SalesReport />} />
      <Route path="reports/inventory" element={<InventoryReport />} />
    </Routes>
  );
};

export default AdminRoutes;