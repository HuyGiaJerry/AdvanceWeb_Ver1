import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Sub from '../../components/user/sub/sub';
import cartData from '../../services/sampleDataCart'; // Import dữ liệu mẫu
import './shop-cart.scss';

const ShopCart = () => {
    const [cartItems, setCartItems] = useState([]);

    // Giả lập lấy dữ liệu từ API
    useEffect(() => {
        setCartItems(cartData); // Sau này thay bằng API call
    }, []);

    // Tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Xử lý tăng số lượng
    const handleIncreaseQuantity = (productId) => {
        const updatedCart = cartItems.map((item) =>
            item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCartItems(updatedCart);
    };

    // Xử lý giảm số lượng
    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cartItems.map((item) =>
            item.productId === productId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCartItems(updatedCart);
    };

    // Xử lý xóa sản phẩm
    const handleRemoveItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.productId !== productId);
        setCartItems(updatedCart);
    };

    return (
        <Container className="shop-cart-page">
            {/* Tiêu đề */}
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Shopping Cart</h1>
                    <p className="text-center">
                        <Link to="/">Home</Link> &gt; Your Shopping Cart
                    </p>
                </Col>
            </Row>

            {/* Bảng sản phẩm */}
            <Row>
                <Col>
                    <Table responsive className="text-center">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "left" }}>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.productId}>
                                    <td>
                                        <div className="product-info">
                                            <img
                                                src={require(`../../assets/images/${item.imageUrl}`)}
                                                alt={item.name}
                                                className="product-image"
                                            />
                                            <div className="product-details">
                                                <p className="product-name">{item.name}</p>
                                                <p className="product-color">Color: {item.color}</p>
                                                <p className="product-size">Size: {item.size}</p>
                                                <button
                                                    className="remove-link"
                                                    onClick={() => handleRemoveItem(item.productId)}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>
                                        <div className="quantity-control d-flex justify-content-center align-items-center">
                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                                onClick={() => handleDecreaseQuantity(item.productId)}
                                                disabled={item.quantity === 1} // Không cho giảm dưới 1
                                            >
                                                -
                                            </Button>
                                            <span className="mx-2">{item.quantity}</span>
                                            <Button
                                                variant="outline-dark"
                                                size="sm"
                                                onClick={() => handleIncreaseQuantity(item.productId)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            {/* Tùy chọn và tổng tiền */}
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Check
                        type="checkbox"
                        label="For $10.00 Please Wrap The Product"
                        className="wrap-option"
                    />
                </Col>
                <Col md={6} className="text-end">
                    <p>Subtotal: <strong>${calculateTotal()}</strong></p>
                </Col>
            </Row>

            {/* Nút hành động */}
            <Row className="mb-5">
                <Col className="text-center">
                    <Link to="/check-out">
                        <Button variant="dark" className="checkout-btn mb-3">Checkout</Button>
                    </Link>
                    <br />
                    <Button variant="outline-dark" className="view-cart-btn">View Cart</Button>
                </Col>
            </Row>

            {/* Component Sub */}
            <Sub />
        </Container>
    );
};

export default ShopCart;