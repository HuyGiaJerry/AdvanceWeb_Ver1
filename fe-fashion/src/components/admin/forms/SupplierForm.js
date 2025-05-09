import React, { useState } from 'react';
import '../../../assets/styles/Forms.scss';

const SupplierForm = ({ supplier = {}, onSubmit, formType = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    phone: '',
    email: '',
    address: '',
    tax_code: '',
    status: 'active',
    ...supplier
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
      <h2>{formType === 'create' ? 'Thêm nhà cung cấp mới' : 'Cập nhật nhà cung cấp'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Tên nhà cung cấp</label>
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
          <label htmlFor="contact_person">Người liên hệ</label>
          <input
            type="text"
            id="contact_person"
            name="contact_person"
            value={formData.contact_person}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Số điện thoại</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Địa chỉ</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="tax_code">Mã số thuế</label>
          <input
            type="text"
            id="tax_code"
            name="tax_code"
            value={formData.tax_code}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Đang hợp tác</option>
            <option value="inactive">Ngừng hợp tác</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {formType === 'create' ? 'Thêm nhà cung cấp' : 'Cập nhật'}
          </button>
          <button type="button" className="cancel-btn">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;