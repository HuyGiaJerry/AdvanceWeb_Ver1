import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const OrderDetail = () => {
    const { orderId } = useParams();

    // Dữ liệu mẫu sản phẩm trong đơn hàng
    const products = [
        { id: 1, name: 'Sản phẩm 1', price: '150,000₫', quantity: 2 },
        { id: 2, name: 'Sản phẩm 2', price: '200,000₫', quantity: 1 },
    ];

    return (
        <Container className="order-details" style={{ marginTop: '100px', marginBottom: '400px' }}>
            <h1 className="text-center mb-4">Chi tiết đơn hàng #{orderId}</h1>
            <Row>
                {products.map((product) => (
                    <Col md={6} lg={4} key={product.id} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <strong>Giá:</strong> {product.price}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Số lượng:</strong> {product.quantity}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default OrderDetail;