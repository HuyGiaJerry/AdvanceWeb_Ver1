// src/pages/admin/promotions/PromotionList.js
import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';

const PromotionList = () => {
  // Dữ liệu mẫu cho danh sách khuyến mãi
  const [promotions, setPromotions] = useState([
    { 
      id: 1, 
      name: 'Sale Tháng 4', 
      discount: '20%', 
      startDate: '01/04/2025', 
      endDate: '30/04/2025', 
      status: 'Đang hoạt động' 
    },
    { 
      id: 2, 
      name: 'Khuyến mãi hè 2025', 
      discount: '15%', 
      startDate: '01/06/2025', 
      endDate: '31/08/2025', 
      status: 'Sắp diễn ra' 
    },
    { 
      id: 3, 
      name: 'Black Friday', 
      discount: '50%', 
      startDate: '25/11/2025', 
      endDate: '30/11/2025', 
      status: 'Sắp diễn ra' 
    },
    { 
      id: 4, 
      name: 'Tết Nguyên Đán', 
      discount: '25%', 
      startDate: '20/01/2025', 
      endDate: '05/02/2025', 
      status: 'Đã kết thúc' 
    },
    { 
      id: 5, 
      name: 'Sinh nhật cửa hàng', 
      discount: '30%', 
      startDate: '15/03/2025', 
      endDate: '20/03/2025', 
      status: 'Đã kết thúc' 
    },
  ]);

  const columns = [
    { key: 'name', name: 'Tên khuyến mãi', sortable: true },
    { key: 'discount', name: 'Mức giảm giá', sortable: true },
    { key: 'startDate', name: 'Ngày bắt đầu', sortable: true },
    { key: 'endDate', name: 'Ngày kết thúc', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter(promotion => promotion.id !== id));
    }
  };

  return (
      <div className="promotion-list">
        <Table 
          columns={columns} 
          data={promotions} 
          onDelete={handleDelete}
          editUrl="/admin/promotions/edit"
          createUrl="/admin/promotions/create"
          title="Danh sách khuyến mãi"
        />
      </div>
  );
};

export default PromotionList;