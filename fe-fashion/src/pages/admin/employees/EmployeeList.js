import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';

const EmployeeList = () => {
  // Dữ liệu mẫu cho danh sách nhân viên
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Nguyễn Văn A', position: 'Quản lý', department: 'Kinh doanh', phone: '0901234567', status: 'Đang làm việc' },
    { id: 2, name: 'Trần Thị B', position: 'Nhân viên bán hàng', department: 'Kinh doanh', phone: '0912345678', status: 'Đang làm việc' },
    { id: 3, name: 'Lê Văn C', position: 'Kế toán', department: 'Tài chính', phone: '0923456789', status: 'Đang làm việc' },
    { id: 4, name: 'Phạm Thị D', position: 'Nhân viên kho', department: 'Kho vận', phone: '0934567890', status: 'Đang làm việc' },
    { id: 5, name: 'Hoàng Văn E', position: 'Nhân viên IT', department: 'IT', phone: '0945678901', status: 'Nghỉ phép' },
  ]);

  const columns = [
    { key: 'name', name: 'Họ tên', sortable: true },
    { key: 'position', name: 'Chức vụ', sortable: true },
    { key: 'department', name: 'Phòng ban', sortable: true },
    { key: 'phone', name: 'Số điện thoại', sortable: false },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  return (
    <Layout>
      <div className="employee-list">
        <Table 
          columns={columns} 
          data={employees} 
          onDelete={handleDelete}
          editUrl="/admin/employees/edit"
          createUrl="/admin/employees/create"
          title="Danh sách nhân viên"
        />
      </div>
    </Layout>
  );
};

export default EmployeeList;
