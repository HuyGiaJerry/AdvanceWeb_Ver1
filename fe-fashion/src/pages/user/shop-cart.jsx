import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './shop-cart.scss';
import { toast } from 'react-toastify';
import { FaTrash } from 'react-icons/fa';
import cartService from '../../services/cartService'; // Import cartService

const ShopCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [authState, setAuthState] = useState(false); // Trạng thái đăng nhập

    // Lấy giỏ hàng từ API hoặc localStorage
    useEffect(() => {
        const fetchCart = async () => {
            const auth = JSON.parse(localStorage.getItem('authState'))?.auth || false;
            setAuthState(auth);

            if (auth) {
                // Nếu đã đăng nhập, lấy userId từ localStorage và gọi API
                const userId = JSON.parse(localStorage.getItem('authState'))?.userId;

                if (userId) {
                    try {
                        const data = await cartService.getCart(userId);
                        setCartItems(data); // Lưu dữ liệu giỏ hàng từ API
                    } catch (error) {
                        console.error('Lỗi khi lấy giỏ hàng từ API:', error);
                        toast.error('Không thể lấy dữ liệu giỏ hàng từ server.');
                    }
                }
            } else {
                // Nếu chưa đăng nhập, lấy giỏ hàng từ localStorage
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                setCartItems(cart);
            }
        };

        fetchCart();
    }, []);

    // Lưu giỏ hàng vào localStorage khi có thay đổi (chỉ khi chưa đăng nhập)
    useEffect(() => {
        if (!authState) {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }
    }, [cartItems, authState]);

    // Tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price || 0) * item.quantity, 0).toFixed(2);
    };

    // Xử lý tăng số lượng
    const handleIncreaseQuantity = async (variantId) => {
        if (!variantId) {
            toast.error('Không thể xác định sản phẩm cần tăng số lượng.');
            return;
        }

        if (authState) {
            // Nếu đã đăng nhập, gọi API để tăng số lượng
            const userId = JSON.parse(localStorage.getItem('authState'))?.userId;

            if (!userId) {
                toast.error('Không thể xác định người dùng.');
                return;
            }

            try {
                // Gọi API tăng số lượng
                const { variantId: updatedVariantId, quantityInCart, messeage } = await cartService.increaseCartItem(userId, variantId);

                // Cập nhật số lượng sản phẩm trong state
                setCartItems((prevCartItems) =>
                    prevCartItems.map((item) =>
                        item.variantId === updatedVariantId
                            ? { ...item, quantity: quantityInCart } // Cập nhật số lượng từ API
                            : item
                    )
                );
                toast.success(messeage); // Hiển thị thông báo từ API
            } catch (error) {
                console.error('Lỗi khi tăng số lượng sản phẩm:', error);
                toast.error('Không thể tăng số lượng sản phẩm. Vui lòng thử lại.');
            }
        } else {
            // Nếu chưa đăng nhập, tăng số lượng trong localStorage
            const updatedCart = cartItems.map((item) =>
                item.variantId === variantId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Số lượng sản phẩm đã được tăng!');
        }
    };

    // Xử lý giảm số lượng
    const handleDecreaseQuantity = async (variantId) => {
        if (!variantId) {
            toast.error('Không thể xác định sản phẩm cần giảm số lượng.');
            return;
        }

        if (authState) {
            // Nếu đã đăng nhập, gọi API để giảm số lượng
            const userId = JSON.parse(localStorage.getItem('authState'))?.userId;

            if (!userId) {
                toast.error('Không thể xác định người dùng.');
                return;
            }

            try {
                // Gọi API giảm số lượng
                const { variantId: updatedVariantId, quantityInCart } = await cartService.decreaseCartItem(userId, variantId);

                // Cập nhật số lượng sản phẩm trong state
                setCartItems((prevCartItems) =>
                    prevCartItems.map((item) =>
                        item.variantId === updatedVariantId
                            ? { ...item, quantity: quantityInCart } // Cập nhật số lượng từ API
                            : item
                    )
                );

                toast.success('Số lượng sản phẩm đã được giảm!');
            } catch (error) {
                console.error('Lỗi khi giảm số lượng sản phẩm:', error);
                toast.error('Không thể giảm số lượng sản phẩm. Vui lòng thử lại.');
            }
        } else {
            // Nếu chưa đăng nhập, giảm số lượng trong localStorage
            const updatedCart = cartItems.map((item) =>
                item.variantId === variantId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Số lượng sản phẩm đã được giảm!');
        }
    };

    // Xử lý xóa sản phẩm
    const handleRemoveItem = async (variantId) => {

        if (!variantId) {
            toast.error('Không thể xác định sản phẩm cần xóa.');
            return;
        }
        if (authState) {
            // Nếu đã đăng nhập, gọi API để xóa sản phẩm
            const userId = JSON.parse(localStorage.getItem('authState'))?.userId;

            if (!userId) {
                toast.error('Không thể xác định người dùng.');
                return;
            }

            try {
                await cartService.deleteCartItem(userId, variantId);
                toast.success('Sản phẩm đã được xóa khỏi giỏ hàng!');
                setCartItems(cartItems.filter((item) => item.variantId !== variantId)); // Cập nhật giao diện
            } catch (error) {
                console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
                toast.error('Không thể xóa sản phẩm khỏi giỏ hàng. Vui lòng thử lại.');
            }
        } else {
            // Nếu chưa đăng nhập, xóa sản phẩm khỏi localStorage
            const updatedCart = cartItems.filter((item) => item.variantId !== variantId);
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            toast.success('Sản phẩm đã được xóa khỏi giỏ hàng!');
        }
    };

    return (
        <Container className="shop-cart-page">
            {/* Tiêu đề */}
            <Row className="mb-4">
                <Col>
                    <h1 className="text-center">Shopping Cart</h1>
                    <p className="text-center">
                        <Link to="/" style={{ color: "gray", textDecoration: "none" }}>Home</Link> &gt; Shopping Cart
                    </p>
                </Col>
            </Row>

            {/* Kiểm tra giỏ hàng trống */}
            {cartItems.length === 0 ? (
                <Row className="text-center">
                    <Col>
                        <img
                            src={require('../../assets/images/empty_cart.jpg')} // Đường dẫn đến ảnh emptycart
                            alt="Empty Cart"
                            className="empty-cart-image"
                        />
                        <h4 className="text-muted">Bạn chưa có sản phẩm nào trong giỏ hàng!</h4>
                        <Link to="/shop">
                            <Button variant="dark" className="mt-3">Đi đến Shop</Button>
                        </Link>
                    </Col>
                </Row>
            ) : (
                <>
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
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.variantId}>
                                            <td>
                                                <div className="product-info">
                                                    <img
                                                        src={`https://localhost:7123${item.imageUrl}`}
                                                        alt={item.colorName}
                                                        className="product-image"
                                                    />
                                                    <div className="product-details">
                                                        <p className="product-name">{item.productName}</p>
                                                        <p className="product-color">Color: {item.colorName}</p>
                                                        <p className="product-size">Size: {item.size}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: "18px" }}>${item.price?.toFixed(2) || "0.00"}</td>
                                            <td>
                                                <div className="quantity-control d-flex justify-content-center align-items-center">
                                                    <Button
                                                        variant="outline-dark"
                                                        size="sm"
                                                        onClick={() => handleDecreaseQuantity(item.variantId)}
                                                        disabled={item.quantity === 1} // Không cho giảm dưới 1
                                                    >
                                                        -
                                                    </Button>
                                                    <span className="mx-2">{item.quantity}</span>
                                                    <Button
                                                        variant="outline-dark"
                                                        size="sm"
                                                        onClick={() => handleIncreaseQuantity(item.variantId)}
                                                    >
                                                        +
                                                    </Button>
                                                </div>
                                            </td>
                                            <td style={{ fontSize: "18px" }}>${((item.price || 0) * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleRemoveItem(item.variantId)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    {/* Tổng tiền */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Check
                                type="checkbox"
                                label="For $10.00 Please Wrap The Product"
                                className="wrap-option"
                            />
                        </Col>
                        <Col md={6} className="text-end">
                            <p style={{ fontSize: "22px" }}>Subtotal: <strong>${calculateTotal()}</strong></p>
                        </Col>
                    </Row>

                    {/* Nút hành động */}
                    <Row className="mb-5">
                        <Col className="text-center">
                            <Link to="/check-out">
                                <Button variant="dark" className="checkout-btn mb-3">Checkout</Button>
                            </Link>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ShopCart;