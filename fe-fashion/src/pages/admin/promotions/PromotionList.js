import React, { useState } from 'react';
import Table from '../../../components/admin/Table';
import { toast } from 'react-toastify';
import '../../../assets/styles/ModalCustomer.scss'; // dùng chung CSS modal

const PromotionList = () => {
  const [promotions, setPromotions] = useState([
    { id: 1, name: 'Sale Tháng 4', discount: '20%', startDate: '01/04/2025', endDate: '30/04/2025', status: 'Đang hoạt động' },
    { id: 2, name: 'Khuyến mãi hè 2025', discount: '15%', startDate: '01/06/2025', endDate: '31/08/2025', status: 'Sắp diễn ra' },
    { id: 3, name: 'Black Friday', discount: '50%', startDate: '25/11/2025', endDate: '30/11/2025', status: 'Sắp diễn ra' },
    { id: 4, name: 'Tết Nguyên Đán', discount: '25%', startDate: '20/01/2025', endDate: '05/02/2025', status: 'Đã kết thúc' },
    { id: 5, name: 'Sinh nhật cửa hàng', discount: '30%', startDate: '15/03/2025', endDate: '20/03/2025', status: 'Đã kết thúc' },
  ]);

  const [editingPromotion, setEditingPromotion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const columns = [
    { key: 'name', name: 'Tên khuyến mãi', sortable: true },
    { key: 'discount', name: 'Mức giảm giá', sortable: true },
    { key: 'startDate', name: 'Ngày bắt đầu', sortable: true },
    { key: 'endDate', name: 'Ngày kết thúc', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
  ];

  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này?')) {
      setPromotions(promotions.filter(p => p.id !== id));
      toast.success('Xóa khuyến mãi thành công!');
    }
  };

  const handleEdit = (promotion) => {
    setEditingPromotion(promotion);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingPromotion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const updated = promotions.map(p =>
      p.id === editingPromotion.id ? editingPromotion : p
    );
    setPromotions(updated);
    setShowModal(false);
    toast.success('Cập nhật khuyến mãi thành công!');
  };

  return (
    <div className="promotion-list">
      <h1 style={{ fontSize: "24px", fontWeight: "600", color: "#333", margin: "20px" }}>
        Quản lý khuyến mãi
      </h1>

      <Table
        columns={columns}
        data={promotions.map(p => ({
          ...p,
          onEdit: () => handleEdit(p),
        }))}
        onDelete={handleDelete}
        editUrl={null}
        createUrl="/admin/promotions/create"
        title="Danh sách khuyến mãi"
        showActions={true}
        showAddButton={true}
      />

      {showModal && editingPromotion && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Chỉnh sửa khuyến mãi</h2>
            <div className="modal-form">
              <label>Tên khuyến mãi</label>
              <input name="name" value={editingPromotion.name} onChange={handleChange} />

              <label>Mức giảm giá</label>
              <input name="discount" value={editingPromotion.discount} onChange={handleChange} />

              <label>Ngày bắt đầu</label>
              <input type="date" name="startDate" value={editingPromotion.startDate} onChange={handleChange} />

              <label>Ngày kết thúc</label>
              <input type="date" name="endDate" value={editingPromotion.endDate} onChange={handleChange} />

              <label>Trạng thái</label>
              <select name="status" value={editingPromotion.status} onChange={handleChange}>
                <option>Đang hoạt động</option>
                <option>Sắp diễn ra</option>
                <option>Đã kết thúc</option>
              </select>

              <div className="modal-buttons">
                <button className="active" onClick={handleSave}>Lưu</button>
                <button className="blocked" onClick={() => setShowModal(false)}>Hủy</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionList;
