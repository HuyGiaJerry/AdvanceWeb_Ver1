import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";
import dataProduct from "../../../services/test"; // Import dataProduct
import SearchBar from '../../../components/admin/SearchBar';
import FilterDropdown from '../../../components/admin/FilterDropdown';

const ProductList = () => {
  const navigate = useNavigate(); // Initialize the navigation hook

  // Initialize the product data from `dataProduct`
  const [products, setProducts] = useState(
    dataProduct.map((product) => ({
      product_id: product.productId,
      name: product.name,
      sku: product.sku,
      base_price: product.basePrice,
      discount_price: product.discountPrice,
      category_id: product.categoryId,
      updated_at: product.updatedAt,
    }))
  );

  // State for search term and selected category
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Dummy categories for filtering (replace with actual category data if available)
  const categories = [
    { value: '', label: 'Tất cả' },
    { value: '1', label: 'Điện thoại' },
    { value: '2', label: 'Máy tính' },
    { value: '3', label: 'Phụ kiện' }
  ];

  const columns = [
    { key: "product_id", name: "ID", sortable: true },
    { key: "name", name: "Tên sản phẩm", sortable: true },
    { key: "sku", name: "SKU", sortable: true },
    { key: "base_price", name: "Giá gốc", sortable: true },
    { key: "discount_price", name: "Giá khuyến mãi", sortable: true },
    { key: "category_id", name: "Danh mục ID", sortable: true },
    { key: "updated_at", name: "Cập nhật lúc", sortable: true },
  ];

  const handleRowClick = (id) => {
    navigate(`/shop/product/detail/${id}`); // Navigate to the detail page with the product ID
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.product_id !== id));
    }
  };

  // Filter products based on search term and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
      </div>

      {/* Searchbar and Filter Section on the same row */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search Bar */}
        <SearchBar
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter Dropdown */}
        <FilterDropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
        />
      </div>

      {/* Pass filtered data to the Table component */}
      <Table
        columns={columns}
        data={filteredProducts.map((product) => ({
          ...product,
          onClick: () => handleRowClick(product.product_id), // Add onClick handler to each product
        }))}
        onDelete={handleDelete}
        editUrl="/admin/products/edit"
        createUrl="/admin/products/create"
      />
    </div>
  );
};

export default ProductList;
