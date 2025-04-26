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
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/employees" element={<EmployeeList />} />
      <Route path="/admin/products" element={<ProductList />} />
      <Route path="/admin/products/create" element={<ProductCreate />} />
      <Route path="/admin/categories" element={<CategoryList />} />
      <Route path="/admin/suppliers" element={<SupplierList />} />
      <Route path="/admin/inventory" element={<InventoryList />} />
      <Route path="/admin/sales" element={<SalesDashboard />} />
      <Route path="/admin/orders" element={<OrderList />} />
      <Route path="/admin/promotions" element={<PromotionList />} />
      <Route path="/admin/reports/sales" element={<SalesReport />} />
      <Route path="/admin/reports/inventory" element={<InventoryReport />} />
    </Routes>
  );
};

export default AdminRoutes;