import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';

const CategoryList = () => {
  // Dữ liệu mẫu cho danh mục sản phẩm
  const [categories, setCategories] = useState([
    { id: 1, name: 'Điện thoại', description: 'Các loại điện thoại di động', products: 32, status: 'Kích hoạt' },
    { id: 2, name: 'Laptop', description: 'Máy tính xách tay các loại', products: 25, status: 'Kích hoạt' },
    { id: 3, name: 'Máy tính bảng', description: 'Các dòng tablet, máy tính bảng', products: 18, status: 'Kích hoạt' },
    { id: 4, name: 'Phụ kiện', description: 'Phụ kiện điện thoại, máy tính', products: 45, status: 'Kích hoạt' },
    { id: 5, name: 'Thiết bị đeo', description: 'Đồng hồ thông minh, thiết bị đeo', products: 15, status: 'Ẩn' },
  ]);

  const columns = [
    { key: 'name', name: 'Tên danh mục', sortable: true },
    { key: 'description', name: 'Mô tả', sortable: false },
    { key: 'products', name: 'Số sản phẩm', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  return (
    <Layout>
      <div className="category-list">
        <Table 
          columns={columns} 
          data={categories} 
          onDelete={handleDelete}
          editUrl="/admin/categories/edit"
          createUrl="/admin/categories/create"
          title="Danh mục sản phẩm"
        />
      </div>
    </Layout>
  );
};

export default CategoryList;