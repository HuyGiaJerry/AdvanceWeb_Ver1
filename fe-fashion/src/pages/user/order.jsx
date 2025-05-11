import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import orderService from '../../services/orderService'; // Import orderService
import './order.scss';

const Orders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]); // Danh sách đơn hàng
    const [filter, setFilter] = useState('all'); // Bộ lọc trạng thái
    const [loading, setLoading] = useState(true); // Trạng thái loading

    // Lấy userId từ localStorage
    const userId = JSON.parse(localStorage.getItem('authState'))?.userId;

    // Map trạng thái hiển thị sang trạng thái API
    const statusMap = {
        'Tất cả đơn hàng': 'all',
        'Đang xử lý': 'pending',
        'Đã xác nhận': 'confirmed',
        'Đang giao': 'shipping',
        'Đã hủy': 'cancelled',
        'Hoàn trả': 'return',
        'Hoàn tất': 'success',
    };

    // Lấy danh sách đơn hàng từ API
    const fetchOrders = async (status) => {
        try {
            setLoading(true); // Bật trạng thái loading
            const data = await orderService.filterOrder(status, userId);
            setOrders(data); // Cập nhật danh sách đơn hàng
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        } finally {
            setLoading(false); // Tắt trạng thái loading
        }
    };

    // Gọi API khi filter thay đổi
    useEffect(() => {
        if (userId) {
            fetchOrders(filter);
        }
    }, [filter, userId]);

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`); // Điều hướng đến trang chi tiết đơn hàng
    };

    return (
        <Container className="orders" style={{ marginTop: '100px', marginBottom: '300px' }}>
            <h1 className="text-center mb-4">Đơn hàng của tôi</h1>
            <Nav variant="tabs" defaultActiveKey="all" className="justify-content-center mb-4">
                {Object.keys(statusMap).map((status, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link
                            eventKey={statusMap[status]}
                            onClick={() => setFilter(statusMap[status])}
                            className={filter === statusMap[status] ? 'active' : ''}
                        >
                            {status}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            {loading ? (
                <p className="text-center">Đang tải...</p>
            ) : orders.length > 0 ? (
                <Row>
                    {orders.map((order) => (
                        <Col md={6} lg={4} key={order.id} className="mb-4">
                            <Card className="order-card">
                                <Card.Body>
                                    <Card.Title>Đơn hàng #{order.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Trạng thái:</strong> {order.status}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Tổng tiền:</strong> {order.totalAmount.toLocaleString()}₫
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleOrderClick(order.id)}>
                                        Xem chi tiết
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className="text-center">Không có đơn hàng nào.</p>
            )}
        </Container>
    );
};

export default Orders;