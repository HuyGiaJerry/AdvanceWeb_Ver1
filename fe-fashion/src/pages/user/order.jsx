import React, { useState } from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './order.scss';

const Orders = () => {
    const navigate = useNavigate();

    // Dữ liệu mẫu
    const [orders, setOrders] = useState([
        { id: '1147591', status: 'Đã hủy', total: '450,000₫', date: '2023-05-01' },
        { id: '1147592', status: 'Đang xử lý', total: '350,000₫', date: '2023-05-02' },
        { id: '1147593', status: 'Đang giao', total: '550,000₫', date: '2023-05-03' },
        { id: '1147594', status: 'Đã giao', total: '650,000₫', date: '2023-05-04' },
    ]);

    const [filter, setFilter] = useState('Tất cả đơn hàng'); // Bộ lọc trạng thái

    // Lọc đơn hàng theo trạng thái
    const filteredOrders = filter === 'Tất cả đơn hàng' ? orders : orders.filter(order => order.status === filter);

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`); // Điều hướng đến trang chi tiết đơn hàng
    };

    return (
        <Container className="orders" style={{ marginTop: '100px', marginBottom: '300px' }}>
            <h1 className="text-center mb-4">Đơn hàng của tôi</h1>
            <Nav variant="tabs" defaultActiveKey="Tất cả đơn hàng" className="justify-content-center mb-4">
                {['Tất cả đơn hàng', 'Đang xử lý', 'Đang giao', 'Đã giao', 'Đã hủy'].map((status, index) => (
                    <Nav.Item key={index}>
                        <Nav.Link
                            eventKey={status}
                            onClick={() => setFilter(status)}
                            className={filter === status ? 'active' : ''}
                        >
                            {status}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
            <Row>
                {filteredOrders.map((order) => (
                    <Col md={6} lg={4} key={order.id} className="mb-4">
                        <Card className="order-card">
                            <Card.Body>
                                <Card.Title>Đơn hàng #{order.id}</Card.Title>
                                <Card.Text>
                                    <strong>Trạng thái:</strong> {order.status}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Ngày đặt:</strong> {order.date}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Tổng tiền:</strong> {order.total}
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleOrderClick(order.id)}>
                                    Xem chi tiết
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Orders;