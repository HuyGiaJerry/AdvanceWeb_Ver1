import React, { useState } from 'react';
import '../../../assets/styles/Forms.scss';

const EmployeeForm = ({ employee = {}, onSubmit, formType = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    phone: '',
    email: '',
    address: '',
    status: 'Đang làm việc',
    ...employee
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
      <h2>{formType === 'create' ? 'Thêm nhân viên mới' : 'Cập nhật thông tin nhân viên'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Họ và tên</label>
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
          <label htmlFor="position">Chức vụ</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Phòng ban</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Chọn phòng ban</option>
            <option value="Kinh doanh">Kinh doanh</option>
            <option value="Kế toán">Kế toán</option>
            <option value="IT">IT</option>
            <option value="Kho vận">Kho vận</option>
            <option value="Nhân sự">Nhân sự</option>
          </select>
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
            required
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
          <label htmlFor="status">Trạng thái</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Đang làm việc">Đang làm việc</option>
            <option value="Nghỉ phép">Nghỉ phép</option>
            <option value="Đã nghỉ việc">Đã nghỉ việc</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-btn">
            {formType === 'create' ? 'Thêm nhân viên' : 'Cập nhật'}
          </button>
          <button type="button" className="cancel-btn">Hủy</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;