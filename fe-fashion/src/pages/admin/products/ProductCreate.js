import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/admin/Layout';
import ProductForm from '../../../components/admin/forms/ProductForm';

const ProductCreate = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    // Fetch categories from API or use mock data
    setCategories([
      { category_id: 1, name: 'Điện thoại' },
      { category_id: 2, name: 'Laptop' },
      { category_id: 3, name: 'Máy tính bảng' },
      { category_id: 4, name: 'Phụ kiện' },
    ]);
  }, []);

  const handleSubmit = async (formData) => {
    try {
      console.log('Submitting product data:', formData);
      
      // Create a FormData object to handle file uploads
      const productData = new FormData();
      
      // Add product basic information
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('base_price', formData.base_price);
      productData.append('discount_price', formData.discount_price || formData.base_price);
      productData.append('sku', formData.sku);
      productData.append('category_id', formData.category_id);
      
      // Add colors
      formData.colors.forEach((color, index) => {
        productData.append(`colors[${index}][color_name]`, color.color_name);
        productData.append(`colors[${index}][color_sku]`, color.color_sku);
      });
      
      // Add variants
      formData.variants.forEach((variant, index) => {
        productData.append(`variants[${index}][size]`, variant.size);
        productData.append(`variants[${index}][color_id]`, variant.color_id);
        productData.append(`variants[${index}][stock_quantity]`, variant.stock_quantity);
        productData.append(`variants[${index}][variant_sku]`, variant.variant_sku);
      });
      
      // Add images
      formData.images.forEach((image, index) => {
        productData.append(`images[${index}]`, image);
      });
      
      // Here you would typically make an API call to save the product
      // await axios.post('/api/products', productData);
      
      // Show success message
      alert('Sản phẩm đã được tạo thành công!');
      
      // Navigate back to product list
      navigate('/admin/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Có lỗi xảy ra khi tạo sản phẩm. Vui lòng thử lại.');
    }
  };

  return (
 
      <ProductForm 
        categories={categories}
        onSubmit={handleSubmit}
        formType="create"
      />
  );
};

export default ProductCreate;