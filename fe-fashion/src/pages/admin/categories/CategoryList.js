import React, { useState } from "react";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";
import dataCategories from "../../../services/dataCategories"; // Import external dataCategories

const CategoryList = () => {
  // Map dataCategories to match the table's expected structure
  const [categories, setCategories] = useState(
    dataCategories.map((category) => ({
      id: category.categoryId,
      name: category.name,
      description: category.subCategories
        ? `Bao gồm: ${category.subCategories.map((sub) => sub.name).join(", ")}`
        : "Không có danh mục con",
      products: category.productCount,
      status: "Kích hoạt", // Assuming active categories; modify if necessary
    }))
  );

  const columns = [
    { key: "name", name: "Tên danh mục", sortable: true },
    { key: "description", name: "Mô tả", sortable: false },
    { key: "products", name: "Số sản phẩm", sortable: true },
    { key: "status", name: "Trạng thái", sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  return (
 
      <div className="category-list">
        <Table
          columns={columns}
          data={categories}
          onDelete={handleDelete}
          editUrl="/admin/categories/edit"
          createUrl="/admin/categories/create"
          title="Danh mục sản phẩm"
          showActions={true}
  showAddButton={false}
        />
      </div>

  );
};

export default CategoryList;