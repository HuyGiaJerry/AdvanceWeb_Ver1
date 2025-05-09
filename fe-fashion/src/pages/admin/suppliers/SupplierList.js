import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';

const SupplierList = () => {
  // Dữ liệu mẫu cho nhà cung cấp
  const [suppliers, setSuppliers] = useState([
    { id: 1, name: 'Apple', contact_person: 'John Smith', phone: '+1 234 567 890', email: 'contact@apple.com', status: 'Đang hợp tác' },
    { id: 2, name: 'Samsung', contact_person: 'Lee Min Ho', phone: '+82 1234 5678', email: 'contact@samsung.com', status: 'Đang hợp tác' },
    { id: 3, name: 'Xiaomi', contact_person: 'Zhang Wei', phone: '+86 1234 5678', email: 'contact@xiaomi.com', status: 'Đang hợp tác' },
    { id: 4, name: 'Dell', contact_person: 'Michael Johnson', phone: '+1 987 654 321', email: 'contact@dell.com', status: 'Đang hợp tác' },
    { id: 5, name: 'Sony', contact_person: 'Tanaka Hiroshi', phone: '+81 1234 5678', email: 'contact@sony.com', status: 'Ngừng hợp tác' },
  ]);

  const columns = [
    { key: 'name', name: 'Tên nhà cung cấp', sortable: true },
    { key: 'contact_person', name: 'Người liên hệ', sortable: true },
    { key: 'phone', name: 'Số điện thoại', sortable: false },
    { key: 'email', name: 'Email', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?')) {
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
    }
  };

  return (

      <div className="supplier-list">
        <Table 
          columns={columns} 
          data={suppliers} 
          onDelete={handleDelete}
          editUrl="/admin/suppliers/edit"
          createUrl="/admin/suppliers/create"
          title="Danh sách nhà cung cấp"
        />
      </div>
  );
};

export default SupplierList;
