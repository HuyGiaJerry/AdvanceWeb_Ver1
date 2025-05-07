import React, { useState } from 'react';
import Layout from '../../../components/admin/Layout';
import Table from '../../../components/admin/Table';
import { FaSearch, FaFilter, FaEye, FaPrint } from 'react-icons/fa';

const OrderList = () => {
  // Dữ liệu mẫu cho bảng đơn hàng
  const [orders, setOrders] = useState([
    { 
      id: 1, 
      code: '#ORD001', 
      customerName: 'Nguyễn Văn A', 
      date: '10/04/2025', 
      paymentMethod: 'Thẻ tín dụng', 
      status: 'Hoàn thành', 
      total: '2,500,000đ' 
    },
    { 
      id: 2, 
      code: '#ORD002', 
      customerName: 'Trần Thị B', 
      date: '09/04/2025', 
      paymentMethod: 'COD', 
      status: 'Đang xử lý', 
      total: '1,800,000đ' 
    },
    { 
      id: 3, 
      code: '#ORD003', 
      customerName: 'Lê Văn C', 
      date: '08/04/2025', 
      paymentMethod: 'Chuyển khoản', 
      status: 'Đang giao', 
      total: '3,200,000đ'
    },
    { 
      id: 4, 
      code: '#ORD004', 
      customerName: 'Phạm Thị D', 
      date: '07/04/2025', 
      paymentMethod: 'Thẻ tín dụng', 
      status: 'Hoàn thành', 
      total: '1,500,000đ' 
    },
    { 
      id: 5, 
      code: '#ORD005', 
      customerName: 'Hoàng Văn E', 
      date: '06/04/2025', 
      paymentMethod: 'COD', 
      status: 'Đã hủy', 
      total: '2,100,000đ' 
    },
    { 
      id: 6, 
      code: '#ORD006', 
      customerName: 'Lê Thị F', 
      date: '05/04/2025', 
      paymentMethod: 'Thẻ tín dụng', 
      status: 'Hoàn thành', 
      total: '3,500,000đ' 
    },
    { 
      id: 7, 
      code: '#ORD007', 
      customerName: 'Vũ Văn G', 
      date: '04/04/2025', 
      paymentMethod: 'Chuyển khoản', 
      status: 'Hoàn thành', 
      total: '1,850,000đ' 
    },
    { 
      id: 8, 
      code: '#ORD008', 
      customerName: 'Nguyễn Thị H', 
      date: '03/04/2025', 
      paymentMethod: 'COD', 
      status: 'Đang giao', 
      total: '2,750,000đ' 
    },
  ]);

  const columns = [
    { key: 'code', name: 'Mã đơn', sortable: true },
    { key: 'customerName', name: 'Khách hàng', sortable: true },
    { key: 'date', name: 'Ngày đặt', sortable: true },
    { key: 'paymentMethod', name: 'Phương thức thanh toán', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
    { key: 'total', name: 'Tổng tiền', sortable: true },
  ];

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.code.toLowerCase().includes(search.toLowerCase()) || 
      order.customerName.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewOrder = (id) => {
    // Xử lý xem chi tiết đơn hàng
    console.log("Xem chi tiết đơn hàng:", id);
    // Implement modal hoặc chuyển hướng đến trang chi tiết
  };

  const handlePrintOrder = (id) => {
    // Xử lý in đơn hàng
    console.log("In đơn hàng:", id);
    // Implement chức năng in đơn hàng
  };

  const handleUpdateStatus = (id, newStatus) => {
    // Cập nhật trạng thái đơn hàng
    setOrders(orders.map(order => {
      if (order.id === id) {
        return { ...order, status: newStatus };
      }
      return order;
    }));
  };

  return (
  
      <div className="order-list">
        <div className="page-header">
          <h1>Quản lý đơn hàng</h1>
          <div className="header-actions">
            <div className="search-bar">
              <FaSearch />
              <input 
                type="text" 
                placeholder="Tìm kiếm đơn hàng..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="filter-dropdown">
              <FaFilter />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="Đang xử lý">Đang xử lý</option>
                <option value="Đang giao">Đang giao</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="order-summary">
          <div className="summary-box">
            <h3>Tổng đơn hàng</h3>
            <p>{orders.length}</p>
          </div>
          <div className="summary-box">
            <h3>Đang xử lý</h3>
            <p>{orders.filter(order => order.status === 'Đang xử lý').length}</p>
          </div>
          <div className="summary-box">
            <h3>Đang giao</h3>
            <p>{orders.filter(order => order.status === 'Đang giao').length}</p>
          </div>
          <div className="summary-box">
            <h3>Hoàn thành</h3>
            <p>{orders.filter(order => order.status === 'Hoàn thành').length}</p>
          </div>
        </div>
        
        <div className="orders-table">
          <Table 
            columns={columns} 
            data={filteredOrders.map(order => ({
              ...order,
              status: (
                <span className={`status ${
                  order.status === 'Hoàn thành' ? 'completed' : 
                  order.status === 'Đang xử lý' ? 'pending' : 
                  order.status === 'Đang giao' ? 'shipping' : 
                  'cancelled'
                }`}>
                  {order.status}
                </span>
              )
            }))} 
            customAction={(id) => (
              <div className="action-buttons">
                <button 
                  className="view-btn" 
                  onClick={() => handleViewOrder(id)}
                  title="Xem chi tiết"
                >
                  <FaEye />
                </button>
                <button 
                  className="print-btn" 
                  onClick={() => handlePrintOrder(id)}
                  title="In đơn hàng"
                >
                  <FaPrint />
                </button>
                <select 
                  className="status-select"
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleUpdateStatus(id, e.target.value);
                      e.target.value = "";
                    }
                  }}
                >
                  <option value="" disabled>Cập nhật trạng thái</option>
                  <option value="Đang xử lý">Đang xử lý</option>
                  <option value="Đang giao">Đang giao</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                  <option value="Đã hủy">Đã hủy</option>
                </select>
              </div>
            )}
            title="Danh sách đơn hàng"
          />
        </div>
      </div>

  );
};

export default OrderList;