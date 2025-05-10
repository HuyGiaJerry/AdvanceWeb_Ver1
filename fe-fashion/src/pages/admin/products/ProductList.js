
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/admin/Layout";
import Table from "../../../components/admin/Table";
import { dataProduct } from "../../../services/test"; // Import với destructuring
import SearchBar from '../../../components/admin/SearchBar';
import FilterDropdown from '../../../components/admin/FilterDropdown';
import EditProductModal from "./EditProductModal "; // Import modal component
import "../../../assets/styles/SearchBar.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductList = () => {
  const navigate = useNavigate();

 
const validatePrice = () => {
  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    setErrorMessage("Giá tối thiểu không thể lớn hơn giá tối đa!");
  } else {
    setErrorMessage(""); // Xóa lỗi nếu hợp lệ
  }
};

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  // Sử dụng state để quản lý danh sách sản phẩm
  const [products, setProducts] = useState([]);
  
  // Tải dữ liệu sản phẩm khi component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:7123/api/Product/products");
        const data = await response.json();

        if (response.ok) {
          const formattedProducts = data.map((product) => ({
            id: product.productId,
            name: product.name,
            base_price: product.basePrice,
            discount_price: product.discountPrice,
            images: product.images.map(img => ({
              color: img.colorName,
              url: img.imageUrl
            }))
          }));

          setProducts(formattedProducts);
        } else {
          console.error("Lỗi khi lấy dữ liệu sản phẩm:", data.message);
        }
      } catch (error) {
        console.error("Lỗi kết nối API:", error);
      }
    };

    fetchProducts();
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
    { key: "id", name: "ID", sortable: true },
    { key: "name", name: "Tên sản phẩm", sortable: true },
   
    { key: "base_price", name: "Giá gốc", sortable: true },
    { key: "discount_price", name: "Giá khuyến mãi", sortable: true },
   
  ];

  const handleRowClick = (id) => {
    navigate(`/shop/product/detail/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
     toast.success("Xóa sản phẩm thành công!");
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
    
  toast.success("Cập nhật sản phẩm thành công!");
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
 const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [errorMessage, setErrorMessage] = useState('');


const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesPrice = 
    (!minPrice || product.base_price >= parseFloat(minPrice)) &&
    (!maxPrice || product.base_price <= parseFloat(maxPrice));
  return matchesSearch && matchesPrice;
});

  return (
    <div>
       <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: "20px" }}>
        Danh sách sản phẩm
      </h1>
      
      <div className="search-bar-container">
        <SearchBar
          placeholder="Tìm kiếm sản phẩm theo tên hoặc ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: "1", minWidth: "250px" }}
        />

        <div className="filter-container">
  <div className="input-container">
  <input
    type="number"
    placeholder="Giá tối thiểu"
    className="input-box"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    onBlur={validatePrice}
  />
  <input
    type="number"
    placeholder="Giá tối đa"
    className="input-box"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    onBlur={validatePrice}
  />
</div>

{errorMessage && <p className="error-text">{errorMessage}</p>}
</div>
      </div>
      
      <Table
        columns={columns}
        data={filteredProducts.map((product) => ({
          ...product,
          onClick: () => handleRowClick(product.id),
          onEdit: () => handleEdit(product.id)
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
