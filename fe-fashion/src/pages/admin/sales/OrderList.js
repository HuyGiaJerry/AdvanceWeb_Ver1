import React, { useState } from 'react';
import Table from '../../../components/admin/Table';
import Card from '../../../components/admin/Card';
import { FaSearch, FaFilter, FaEye, FaPrint, FaEdit, FaShoppingCart, FaSpinner, FaTruck, FaCheckCircle } from 'react-icons/fa';
import dataOrders from '../../../services/dataOrders';
import { useNavigate } from 'react-router-dom';
import "../../../assets/styles/EditOrder.scss";
import SearchBar from '../../../components/admin/SearchBar';
import FilterDropdown from '../../../components/admin/FilterDropdown';

const OrderList = () => {
  const navigate = useNavigate();
  
  // Chuyển đổi dữ liệu từ dataOrders thành định dạng cho bảng
  const formatOrders = dataOrders.map(order => {
    // Chuyển đổi status từ tiếng Anh sang tiếng Việt
    let vietnameseStatus = '';
    switch (order.status) {
      case 'pending':
        vietnameseStatus = 'Chờ xác nhận';
        break;
      case 'processing':
        vietnameseStatus = 'Đang xử lý';
        break;
      case 'shipped':
        vietnameseStatus = 'Đang giao';
        break;
      case 'delivered':
        vietnameseStatus = 'Hoàn thành';
        break;
      case 'cancelled':
        vietnameseStatus = 'Đã hủy';
        break;
      default:
        vietnameseStatus = 'Không xác định';
    }

    // Chuyển đổi paymentMethod từ tiếng Anh sang tiếng Việt
    let vietnamesePaymentMethod = '';
    switch (order.payment.paymentMethod) {
      case 'credit_card':
        vietnamesePaymentMethod = 'Thẻ tín dụng';
        break;
      case 'paypal':
        vietnamesePaymentMethod = 'PayPal';
        break;
      case 'bank_transfer':
        vietnamesePaymentMethod = 'Chuyển khoản';
        break;
      case 'cod':
        vietnamesePaymentMethod = 'COD';
        break;
      default:
        vietnamesePaymentMethod = 'Khác';
    }

    // Format ngày tháng
    const createdDate = new Date(order.createdAt);
    const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;

    return {
      id: order.orderId,
      code: `#ORD${order.orderId.toString().padStart(3, '0')}`,
      customerName: order.customerName,
      date: formattedDate,
      paymentMethod: vietnamesePaymentMethod,
      status: vietnameseStatus,
      total: order.totalAmount.toLocaleString('vi-VN') + 'đ',
      rawStatus: order.status // Lưu trữ status gốc để dễ dàng lọc
    };
  });

  const [orders, setOrders] = useState(formatOrders);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  
  const handleRowClick = (id) => {
    // Xử lý khi click vào hàng, có thể chuyển đến trang chi tiết
    navigate(`/admin/orders/detail/${id}`);
  };

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
    
    let statusFilterInVietnamese = '';
    switch (statusFilter) {
      case 'pending':
        statusFilterInVietnamese = 'Chờ xác nhận';
        break;
      case 'processing':
        statusFilterInVietnamese = 'Đang xử lý';
        break;
      case 'shipped':
        statusFilterInVietnamese = 'Đang giao';
        break;
      case 'delivered':
        statusFilterInVietnamese = 'Hoàn thành';
        break;
      case 'cancelled':
        statusFilterInVietnamese = 'Đã hủy';
        break;
      default:
        statusFilterInVietnamese = '';
    }
    
    const matchesStatus = statusFilter === 'all' || 
                          order.status === statusFilterInVietnamese;
    
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
  
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      // Xử lý xóa đơn hàng (demo)
      setOrders(orders.filter(order => order.id !== id));
    }
  };
  
  const handleEditStatus = (id) => {
    // Tìm đơn hàng cần sửa
    const orderToEdit = orders.find(order => order.id === id);
    if (orderToEdit) {
      setCurrentOrder(orderToEdit);
      // Set giá trị mặc định cho dropdown trong modal là trạng thái hiện tại
      let rawStatus = '';
      switch (orderToEdit.status) {
        case 'Chờ xác nhận':
          rawStatus = 'pending';
          break;
        case 'Đang xử lý':
          rawStatus = 'processing';
          break;
        case 'Đang giao':
          rawStatus = 'shipped';
          break;
        case 'Hoàn thành':
          rawStatus = 'delivered';
          break;
        case 'Đã hủy':
          rawStatus = 'cancelled';
          break;
        default:
          rawStatus = '';
      }
      setNewStatus(rawStatus);
      setShowStatusModal(true);
    }
  };

  const handleUpdateStatus = () => {
    if (!currentOrder || !newStatus) return;
    
    // Chuyển đổi trạng thái từ tiếng Anh sang tiếng Việt
    let vietnameseStatus = '';
    switch (newStatus) {
      case 'pending':
        vietnameseStatus = 'Chờ xác nhận';
        break;
      case 'processing':
        vietnameseStatus = 'Đang xử lý';
        break;
      case 'shipped':
        vietnameseStatus = 'Đang giao';
        break;
      case 'delivered':
        vietnameseStatus = 'Hoàn thành';
        break;
      case 'cancelled':
        vietnameseStatus = 'Đã hủy';
        break;
      default:
        vietnameseStatus = 'Không xác định';
    }
    
    // Cập nhật trạng thái đơn hàng
    setOrders(orders.map(order => {
      if (order.id === currentOrder.id) {
        return { ...order, status: vietnameseStatus, rawStatus: newStatus };
      }
      return order;
    }));
    
    // Đóng modal sau khi cập nhật
    setShowStatusModal(false);
    setCurrentOrder(null);
    setNewStatus('');
  };

  const closeModal = () => {
    setShowStatusModal(false);
    setCurrentOrder(null);
    setNewStatus('');
  };

  // Tính số lượng đơn hàng theo trạng thái
  const pendingOrders = orders.filter(order => order.status === 'Chờ xác nhận').length;
  const processingOrders = orders.filter(order => order.status === 'Đang xử lý').length;
  const shippingOrders = orders.filter(order => order.status === 'Đang giao').length;
  const completedOrders = orders.filter(order => order.status === 'Hoàn thành').length;
  const cancelledOrders = orders.filter(order => order.status === 'Đã hủy').length;
  const totalOrders = orders.length;

  return (
    <div className="order-list">
      <div className="page-header">
        <h1>Quản lý đơn hàng</h1>
        <div className="header-actions">
  <SearchBar
    placeholder="Tìm kiếm đơn hàng..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <FilterDropdown
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    options={[
      { value: 'all', label: 'Tất cả trạng thái' },
      { value: 'pending', label: 'Chờ xác nhận' },
      { value: 'processing', label: 'Đang xử lý' },
      { value: 'shipped', label: 'Đang giao' },
      { value: 'delivered', label: 'Hoàn thành' },
      { value: 'cancelled', label: 'Đã hủy' },
    ]}
  />
</div>

      </div>
      
      <div className="dashboard-summary">
        <Card
          title="Tổng đơn hàng"
          value={totalOrders}
          icon={<FaShoppingCart />}
          color="#2196f3"
          percentage={5} // Example growth percentage
        />
        <Card
          title="Đang xử lý"
          value={processingOrders}
          icon={<FaSpinner />}
          color="#ff9800"
          percentage={10} // Example growth percentage
        />
        <Card
          title="Đang giao"
          value={shippingOrders}
          icon={<FaTruck />}
          color="#9c27b0"
          percentage={15} // Example growth percentage
        />
        <Card
          title="Hoàn thành"
          value={completedOrders}
          icon={<FaCheckCircle />}
          color="#4caf50"
          percentage={20} // Example growth percentage
        />
      </div>
      
      <div className="orders-table">
        <Table 
          columns={columns} 
          data={filteredOrders.map(order => ({
            ...order,
            // Đổi key id thành product_id để phù hợp với Table component
            product_id: order.id,
            status: (
              <span className={`status ${
                order.status === 'Hoàn thành' ? 'completed' : 
                order.status === 'Đang xử lý' ? 'pending' : 
                order.status === 'Đang giao' ? 'shipping' : 
                order.status === 'Đã hủy' ? 'cancelled' :
                order.status === 'Chờ xác nhận' ? 'waiting' :
                'other'
              }`}>
                {order.status}
              </span>
            ),
            onEdit: () => handleEditStatus(order.id) // Truyền hàm mở popup
  }))}

          onDelete={handleDelete}
          // editUrl="/admin/orders/edit" // Định nghĩa URL cho nút sửa
          title="Danh sách đơn hàng"
        />
      </div>

      {/* Modal cập nhật trạng thái */}
      {showStatusModal && (
        <div className="status-modal-overlay">
          <div className="status-modal">
            <div className="modal-header">
              <h2>Cập nhật trạng thái đơn hàng</h2>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <p>Mã đơn hàng: {currentOrder?.code}</p>
              <p>Khách hàng: {currentOrder?.customerName}</p>
              <p>Trạng thái hiện tại: {currentOrder?.status}</p>
              
              <div className="form-group">
                <label htmlFor="new-status">Trạng thái mới:</label>
                <select 
                  id="new-status" 
                  value={newStatus} 
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="" disabled>Chọn trạng thái</option>
                  <option value="pending">Chờ xác nhận</option>
                  <option value="processing">Đang xử lý</option>
                  <option value="shipped">Đang giao</option>
                  <option value="delivered">Hoàn thành</option>
                  <option value="cancelled">Đã hủy</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeModal}>Hủy</button>
              <button className="save-btn" onClick={handleUpdateStatus}>Xác nhận</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;