import React, { useState, useEffect } from 'react';
import Table from '../../../components/admin/Table';
import Card from '../../../components/admin/Card';
import { FaSearch, FaFilter, FaShoppingCart, FaSpinner, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import "../../../assets/styles/EditOrder.scss";
import SearchBar from '../../../components/admin/SearchBar';
import FilterDropdown from '../../../components/admin/FilterDropdown';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

const OrderList = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://localhost:7123/api/Order/filter-by-status?status=${statusFilter}`);
        const formattedOrders = formatOrdersData(response.data);
        setOrders(formattedOrders);
        setError(null);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [statusFilter]);

  // Format orders data
  const formatOrdersData = (ordersData) => {
    return ordersData.map(order => {
      // Map status names from English to Vietnamese
      let vietnameseStatus = '';
      switch (order.status.toLowerCase()) {
        case 'pending':
          vietnameseStatus = 'Chờ xác nhận';
          break;
        case 'confirmed':
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

      // Format the date
      const createdDate = new Date(order.createdAt);
      const formattedDate = `${createdDate.getDate()}/${createdDate.getMonth() + 1}/${createdDate.getFullYear()}`;

      // Generate a code based on the ID
      const shortId = order.id.split('-')[0]; // Use first part of UUID
      const code = `#ORD${shortId}`;

      return {
        id: order.id,
        code: code,
        customerName: order.customerName || 'Khách hàng', // Default if missing
        date: formattedDate,
        paymentMethod: getPaymentMethodName(order.paymentStatus),
        status: vietnameseStatus,
        total: order.totalAmount.toLocaleString('vi-VN') + 'đ',
        rawStatus: order.status.toLowerCase() ,
         userId: order.userId
      };
    });
  };

  // Helper function for payment method name
  const getPaymentMethodName = (paymentStatus) => {
    // Default payment method if not specified in the API
    return paymentStatus || 'COD';
  };

  const handleRowClick = (id) => {
    // Navigate to order detail page
    navigate(`/admin/orders/detail/${id}`);
  };

  const columns = [
    { key: 'code', name: 'Mã đơn', sortable: true },
   { key: 'userId', name: 'User ID', sortable: true }, 
    { key: 'date', name: 'Ngày đặt', sortable: true },
    { key: 'paymentMethod', name: 'Phương thức thanh toán', sortable: true },
    { key: 'status', name: 'Trạng thái', sortable: true },
    { key: 'total', name: 'Tổng tiền', sortable: true },
  ];
  
  // Filter orders based on search
  const filteredOrders = orders.filter(order => {
    return order.code.toLowerCase().includes(search.toLowerCase()) || 
           (order.customerName && order.customerName.toLowerCase().includes(search.toLowerCase()));
  });

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) {
      try {
       
        setOrders(orders.filter(order => order.id !== id));
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete order. Please try again.");
      }
    }
  };
  
  const handleEditStatus = (id) => {
    const orderToEdit = orders.find(order => order.id === id);
    if (orderToEdit) {
      setCurrentOrder(orderToEdit);
      setNewStatus(orderToEdit.rawStatus);
      setShowStatusModal(true);
    }
  };

  const handleUpdateStatus = async () => {
   try {
  // Gửi API cập nhật
  const response = await axios.put("https://localhost:7123/api/Order/filter-by-status?status=${statusFilter}", {
    orderId: currentOrder.id,
    status: newStatus
  });

  // Nếu cập nhật thành công
  if (response.data && response.data.message === "Order status updated successfully") {
    let vietnameseStatus = '';
    switch (newStatus) {
      case 'pending':
        vietnameseStatus = 'Chờ xác nhận';
        break;
      case 'processing':
      case 'confirmed':
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

    // Cập nhật local state
    setOrders(orders.map(order =>
      order.id === currentOrder.id
        ? { ...order, status: vietnameseStatus, rawStatus: newStatus }
        : order
    ));

    // Đóng modal
    setShowStatusModal(false);
    setCurrentOrder(null);
    setNewStatus('');
       toast.success("Cập nhật trạng thái đơn hàng thành công!");

  } else {
    alert("Không thể cập nhật trạng thái. Vui lòng thử lại.");
  }
} catch (err) {
  console.error("Error updating order status:", err);
  alert("Cập nhật trạng thái thất bại. Vui lòng thử lại sau.");
}

  };

  const closeModal = () => {
    setShowStatusModal(false);
    setCurrentOrder(null);
    setNewStatus('');
  };

  // Count orders by status
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
              { value: 'confirmed', label: 'Đang xử lý' },
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
          percentage={0}
        />
        <Card
          title="Đang giao"
          value={shippingOrders}
          icon={<FaTruck />}
          color="#9c27b0"
          percentage={0}
        />
        <Card
          title="Hoàn thành"
          value={completedOrders}
          icon={<FaCheckCircle />}
          color="#4caf50"
          percentage={0}
        />
      </div>
      
      <div className="orders-table">
        {loading ? (
          <div className="loading-indicator">Loading orders...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <Table 
            columns={columns} 
            data={filteredOrders.map(order => ({
              ...order,
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
              onEdit: () => handleEditStatus(order.id)
            }))}
            onDelete={handleDelete}
            title="Danh sách đơn hàng"
          />
        )}
      </div>

      {/* Status update modal */}
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
                  <option value="confirmed">Đang xử lý</option>
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
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
};

export default OrderList;