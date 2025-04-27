import React, { useState } from 'react';
import '../../../assets/styles/Forms.scss';

const CategoryForm = ({ category = {}, onSubmit, formType = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active',
    ...category
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
      <h2>{formType === 'create' ? 'Thêm danh mục mới' : 'Cập nhật danh mục'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên danh mục</label>
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
          <label htmlFor="description">Mô tả</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Kích hoạt</option>
            <option value="inactive">Ẩn</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {formType === 'create' ? 'Thêm danh mục' : 'Cập nhật'}
          </button>
          <button type="button" className="cancel-btn">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;