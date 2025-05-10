
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";
import { dataProduct } from "../../../services/test"; // Import với destructuring
import SearchBar from '../../../components/admin/SearchBar';
import FilterDropdown from '../../../components/admin/FilterDropdown';
import EditProductModal from "./EditProductModal "; // Import modal component
import "../../../assets/styles/SearchBar.scss";

const ProductList = () => {
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Sử dụng state để quản lý danh sách sản phẩm
  const [products, setProducts] = useState([]);
  
  // Tải dữ liệu sản phẩm khi component mount
  useEffect(() => {
    // Chuyển đổi dữ liệu từ dataProduct sang định dạng bảng
    const formattedProducts = dataProduct.map((product) => ({
      id: product.productId,
      product_id: product.productId,
      name: product.name,
      sku: product.sku,
      base_price: product.basePrice,
      discount_price: product.discountPrice,
      category_id: product.categoryId,
      updated_at: product.updatedAt,
    }));
    
    setProducts(formattedProducts);
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
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
    navigate(`/shop/product/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleEdit = (id) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleSaveChanges = (updatedProductData) => {
    const updatedProducts = products.map(product => {
      if (product.product_id === selectedProductId) {
        return {
          ...product,
          name: updatedProductData.name,
          sku: updatedProductData.sku,
          base_price: updatedProductData.basePrice,
          discount_price: updatedProductData.discountPrice,
          category_id: updatedProductData.categoryId,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    console.log("Đã cập nhật sản phẩm:", updatedProductData);
  };

  // Hàm để thêm sản phẩm mới vào danh sách sau khi được tạo
  const handleAddNewProduct = (newProduct) => {
    // Định dạng lại sản phẩm mới để phù hợp với cấu trúc bảng
    const formattedNewProduct = {
      id: newProduct.productId,
      product_id: newProduct.productId,
      name: newProduct.name,
      sku: newProduct.sku,
      base_price: newProduct.basePrice,
      discount_price: newProduct.discountPrice,
      category_id: newProduct.categoryId,
      updated_at: newProduct.updatedAt,
    };
    
    // Thêm vào danh sách hiện tại
    setProducts([...products, formattedNewProduct]);
  };

  // Đăng ký handleAddNewProduct vào context toàn cục hoặc truyền qua props
  useEffect(() => {
    // Đăng ký callback với một event system hoặc context toàn cục
    window.addEventListener('productCreated', (event) => {
      if (event.detail && event.detail.product) {
        handleAddNewProduct(event.detail.product);
      }
    });
    
    return () => {
      // Clean up event listener khi component unmount
      window.removeEventListener('productCreated', handleAddNewProduct);
    };
  }, [products]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category_id.toString() === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
      </div>
      
      <div className="search-bar-container">
        <SearchBar
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: "1", minWidth: "250px" }}
        />

        <FilterDropdown
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
          style={{ flexShrink: "0", minWidth: "150px" }}
        />
      </div>
      
      <Table
        columns={columns}
        data={filteredProducts.map((product) => ({
          ...product,
          onClick: () => handleRowClick(product.id),
          onEdit: () => handleEdit(product.product_id)
        }))}
        onDelete={handleDelete}
        createUrl="/admin/products/create"
        showActions={true}
        showAddButton={true}
      />
      
      <EditProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productId={selectedProductId}
        onSave={handleSaveChanges}
      />
    </div>
  );
};

export default ProductList;
