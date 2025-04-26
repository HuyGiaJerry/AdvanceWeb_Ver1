import React, { useState } from 'react';
import '../../../assets/styles/Forms.scss';

const PromotionForm = ({ promotion = {}, products = [], categories = [], onSubmit, formType = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount_type: 'percentage',
    discount_value: '',
    start_date: '',
    end_date: '',
    min_order_value: '',
    max_discount: '',
    applicable_to: 'all',
    product_ids: [],
    category_ids: [],
    status: 'active',
    ...promotion
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const value = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      <h2>{formType === 'create' ? 'Tạo khuyến mãi mới' : 'Cập nhật khuyến mãi'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên khuyến mãi</label>
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
          <label htmlFor="code">Mã khuyến mãi</label>
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="discount_type">Loại giảm giá</label>
            <select
              id="discount_type"
              name="discount_type"
              value={formData.discount_type}
              onChange={handleChange}
            >
              <option value="percentage">Phần trăm (%)</option>
              <option value="fixed">Số tiền cố định</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="discount_value">Giá trị giảm</label>
            <input
              type="number"
              id="discount_value"
              name="discount_value"
              value={formData.discount_value}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="start_date">Ngày bắt đầu</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="end_date">Ngày kết thúc</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="min_order_value">Giá trị đơn hàng tối thiểu</label>
            <input
              type="number"
              id="min_order_value"
              name="min_order_value"
              value={formData.min_order_value}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="form-group">
            <label htmlFor="max_discount">Giảm giá tối đa (cho % giảm)</label>
            <input
              type="number"
              id="max_discount"
              name="max_discount"
              value={formData.max_discount}
              onChange={handleChange}
              min="0"
              disabled={formData.discount_type !== 'percentage'}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="applicable_to">Áp dụng cho</label>
          <select
            id="applicable_to"
            name="applicable_to"
            value={formData.applicable_to}
            onChange={handleChange}
          >
            <option value="all">Tất cả sản phẩm</option>
            <option value="products">Sản phẩm cụ thể</option>
            <option value="categories">Danh mục cụ thể</option>
          </select>
        </div>

        {formData.applicable_to === 'products' && (
          <div className="form-group">
            <label htmlFor="product_ids">Chọn sản phẩm</label>
            <select
              id="product_ids"
              name="product_ids"
              multiple
              value={formData.product_ids}
              onChange={handleSelectChange}
              size="5"
            >
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.applicable_to === 'categories' && (
          <div className="form-group">
            <label htmlFor="category_ids">Chọn danh mục</label>
            <select
              id="category_ids"
              name="category_ids"
              multiple
              value={formData.category_ids}
              onChange={handleSelectChange}
              size="5"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Kích hoạt</option>
            <option value="inactive">Vô hiệu hóa</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {formType === 'create' ? 'Tạo khuyến mãi' : 'Cập nhật'}
          </button>
          <button type="button" className="cancel-btn">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;