import React, { useState, useEffect } from 'react';
import '../../../assets/styles/Forms.scss';

const ProductForm = ({ product = {}, categories = [], suppliers = [], onSubmit, formType = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    supplier_id: '',
    price: '',
    stock: '',
    description: '',
    ...product
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{formType === 'create' ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category_id">Danh mục</label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="supplier_id">Nhà cung cấp</label>
          <select
            id="supplier_id"
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            required
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers.map(supplier => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="price">Giá bán</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Số lượng tồn kho</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Mô tả sản phẩm</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {formType === 'create' ? 'Thêm sản phẩm' : 'Cập nhật'}
          </button>
          <button type="button" className="cancel-btn">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;