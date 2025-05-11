import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Dropdown } from 'react-bootstrap';
import cartService from '../../services/cartService'; // Import cartService
import './check-out.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import checkOutService from '../../services/checkOutService'; // Import checkOutService

const CheckOut = () => {
    const [cartData, setCartData] = useState([]); // Thay thế dữ liệu tĩnh bằng state
    const [contact, setContact] = useState({
        name: '',
        phone: '',
        email: '',
    });
    const [address, setAddress] = useState({
        province: '',
        district: '',
        ward: '',
        street: '',
    });
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [invalidFields, setInvalidFields] = useState([]);

    // Refs để cuộn đến trường chưa điền
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const emailRef = useRef(null);
    const provinceRef = useRef(null);
    const districtRef = useRef(null);
    const wardRef = useRef(null);
    const streetRef = useRef(null);

    // Fetch danh sách tỉnh/thành
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('https://provinces.open-api.vn/api/p/');
                setProvinces(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách tỉnh/thành:', error);
            }
        };
        fetchProvinces();
    }, []);

    // Fetch danh sách quận/huyện khi chọn tỉnh/thành
    useEffect(() => {
        const fetchDistricts = async () => {
            if (address.province) {
                try {
                    const response = await axios.get(
                        `https://provinces.open-api.vn/api/p/${address.province}?depth=2`
                    );
                    setDistricts(response.data.districts || []);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
                }
            } else {
                setDistricts([]);
            }
        };
        fetchDistricts();
    }, [address.province]);

    // Fetch danh sách phường/xã khi chọn quận/huyện
    useEffect(() => {
        const fetchWards = async () => {
            if (address.district) {
                try {
                    const response = await axios.get(
                        `https://provinces.open-api.vn/api/d/${address.district}?depth=2`
                    );
                    setWards(response.data.wards || []);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách phường/xã:', error);
                }
            } else {
                setWards([]);
            }
        };
        fetchWards();
    }, [address.district]);

    // Fetch dữ liệu giỏ hàng từ API
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const userId = JSON.parse(localStorage.getItem('authState'))?.userId; // Lấy userId từ localStorage
                if (!userId) {
                    console.error('Không tìm thấy userId.');
                    return;
                }
                const cartItems = await cartService.getCart(userId); // Gọi API lấy giỏ hàng
                setCartData(cartItems); // Cập nhật state với dữ liệu từ API
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu giỏ hàng:', error);
            }
        };
        fetchCartData();
    }, []);

    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value,
            ...(name === 'province' && { district: '', ward: '' }), // Reset district và ward khi chọn tỉnh mới
            ...(name === 'district' && { ward: '' }), // Reset ward khi chọn quận mới
        }));
    };

    const handlePaymentChange = (method) => {
        const invalidFields = validateForm();
        if (invalidFields.length > 0) {
            setInvalidFields(invalidFields);
            scrollToInvalidField(invalidFields[0]);
        } else {
            setPaymentMethod(method);
        }
    };

    const handleCompleteOrder = async () => {
        const invalidFields = validateForm();
        if (invalidFields.length > 0) {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra giỏ hàng.');
            return;
        }

        if (!paymentMethod) {
            toast.error('Vui lòng chọn phương thức thanh toán.');
            return;
        }

        try {
            const userId = JSON.parse(localStorage.getItem('authState'))?.userId;
            if (!userId) {
                toast.error('Không tìm thấy thông tin người dùng.');
                return;
            }

            const orderData = {
                userId: userId,
                customerName: contact.name,
                customerEmail: contact.email,
                customerPhone: contact.phone,
                shippingAddress: `${address.street}, ${address.ward}, ${address.district}, ${address.province}`,
                items: [{
                    variantId: 0,
                    productId: 0,
                    productName: "string",
                    colorId: 0,
                    colorName: "string",
                    size: "string",
                    quantity: 0,
                    price: 0,
                    imageUrl: "string",
                }],
                paymentMethod: paymentMethod,
            };
            console.log('Dữ liệu đơn hàng:', orderData);
            if (paymentMethod === 'VNPAY') {
                const response = await checkOutService.createVnPayPaymentUrl(orderData);
                const { paymentUrl } = response;
                console.log('URL thanh toán VNPAY:', paymentUrl);
                console.log('URL thanh toán VNPAY:', paymentUrl);
                if (paymentUrl) {
                    window.location.href = paymentUrl; // Chuyển hướng đến URL thanh toán VNPAY
                } else {
                    toast.error('Không thể tạo URL thanh toán. Vui lòng thử lại.');
                }
            }


            const response = await checkOutService.checkoutOrderCod(orderData);
            toast.success(`Đơn hàng đã được tạo thành công! Mã đơn hàng: ${response.orderId}`);
            setCartData([]);
            localStorage.removeItem('cart');
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            toast.error('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.');
        }
    };

    const validateForm = () => {
        const { name, phone, email } = contact;
        const { province, district, ward, street } = address;
        const invalidFields = [];
        if (!name) invalidFields.push('name');
        if (!phone || !/^\d{10}$/.test(phone)) invalidFields.push('phone'); // Kiểm tra số điện thoại hợp lệ
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalidFields.push('email');
        if (!province) invalidFields.push('province');
        if (!district) invalidFields.push('district');
        if (!ward) invalidFields.push('ward');
        if (!street) invalidFields.push('street');
        if (cartData.length === 0) invalidFields.push('cart');

        setInvalidFields(invalidFields);
        setIsFormValid(invalidFields.length === 0);
        return invalidFields;
    };

    const scrollToInvalidField = (field) => {
        const refs = {
            name: nameRef,
            phone: phoneRef,
            email: emailRef,
            province: provinceRef,
            district: districtRef,
            ward: wardRef,
            street: streetRef,
        };
        refs[field]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const calculateTotal = () => {
        return cartData.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <Container className="check-out" style={{ marginTop: '100px', marginBottom: '170px' }}>
            <h1 className="text-center mb-4">FASCO Checkout</h1>
            <Row>
                {/* Phần bên trái: Thông tin liên hệ và địa chỉ */}
                <Col md={4}>
                    <Form>
                        <h4>Thông tin liên hệ</h4>
                        <Form.Group className="mb-3" ref={nameRef}>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={contact.name}
                                onChange={(e) => {
                                    handleContactChange(e);
                                    validateForm();
                                }}
                                placeholder="Nhập tên"
                                className={invalidFields.includes('name') ? 'is-invalid' : ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" ref={phoneRef}>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={contact.phone}
                                onChange={(e) => {
                                    handleContactChange(e);
                                    validateForm();
                                }}
                                placeholder="Nhập số điện thoại"
                                className={invalidFields.includes('phone') ? 'is-invalid' : ''}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" ref={emailRef}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={contact.email || ''} // Đảm bảo giá trị mặc định là chuỗi rỗng nếu chưa có
                                onChange={(e) => {
                                    handleContactChange(e);
                                    validateForm();
                                }}
                                placeholder="Nhập địa chỉ email"
                                className={invalidFields.includes('email') ? 'is-invalid' : ''}
                            />
                        </Form.Group>
                        <h4>Thông tin địa chỉ</h4>
                        <Form.Group className="mb-3" ref={provinceRef}>
                            <Form.Label>Tỉnh/Thành</Form.Label>
                            <Form.Select
                                name="province"
                                value={address.province}
                                onChange={(e) => {
                                    handleAddressChange(e);
                                    validateForm();
                                }}
                                className={invalidFields.includes('province') ? 'is-invalid' : ''}
                            >
                                <option value="">Chọn Tỉnh/Thành</option>
                                {provinces.map((province) => (
                                    <option key={province.code} value={province.code}>
                                        {province.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" ref={districtRef}>
                            <Form.Label>Quận/Huyện</Form.Label>
                            <Form.Select
                                name="district"
                                value={address.district}
                                onChange={(e) => {
                                    handleAddressChange(e);
                                    validateForm();
                                }}
                                disabled={!address.province}
                                className={invalidFields.includes('district') ? 'is-invalid' : ''}
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((district) => (
                                    <option key={district.code} value={district.code}>
                                        {district.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" ref={wardRef}>
                            <Form.Label>Phường/Xã</Form.Label>
                            <Form.Select
                                name="ward"
                                value={address.ward}
                                onChange={(e) => {
                                    handleAddressChange(e);
                                    validateForm();
                                }}
                                disabled={!address.district}
                                className={invalidFields.includes('ward') ? 'is-invalid' : ''}
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map((ward) => (
                                    <option key={ward.code} value={ward.code}>
                                        {ward.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" ref={streetRef}>
                            <Form.Label>Số Địa Chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                name="street"
                                value={address.street}
                                onChange={(e) => {
                                    handleAddressChange(e);
                                    validateForm();
                                }}
                                placeholder="Nhập số địa chỉ"
                                className={invalidFields.includes('street') ? 'is-invalid' : ''}
                            />
                        </Form.Group>

                        {/* Nút chọn phương thức thanh toán */}
                        <Dropdown className="mt-3">
                            <Dropdown.Toggle variant="outline-primary">
                                {paymentMethod || 'Chọn phương thức thanh toán'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {['VNPAY', 'COD', 'MOMO'].map((method) => (
                                    <Dropdown.Item
                                        key={method}
                                        onClick={() => handlePaymentChange(method)}
                                    >
                                        {method}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form>
                </Col>

                {/* Phần bên phải: Danh sách sản phẩm và thanh toán */}
                <Col md={8}>
                    <h4>Giỏ hàng</h4>
                    <div className="cart-scrollable">
                        {cartData.map((item) => (
                            <Card key={item.productId} className="mb-3">
                                <Row className="g-0">
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Màu sắc:</strong> {item.colorName} <br />
                                                <strong>Kích thước:</strong> {item.size} <br />
                                                <strong>Số lượng:</strong> {item.quantity} <br />
                                                <strong>Giá:</strong> ${item.price.toFixed(2)}
                                            </Card.Text>
                                        </Card.Body>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Img
                                            src={`https://localhost:7123${item.imageUrl}`}
                                            alt={item.name}
                                            className="card-img"
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        ))}
                    </div>
                    <div className="text-end">
                        <h5>Tổng tiền: ${calculateTotal()}</h5>
                    </div>
                    <Button
                        variant="dark"
                        className="w-100"
                        style={{ marginTop: '280px' }}
                        onClick={handleCompleteOrder}
                        disabled={!paymentMethod}
                    >
                        Hoàn tất đơn hàng
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CheckOut;