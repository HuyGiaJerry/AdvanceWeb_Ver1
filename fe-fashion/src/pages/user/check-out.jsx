import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card, Dropdown } from 'react-bootstrap';
import cartData from '../../services/sampleDataCart';
import './check-out.scss';
import axios from 'axios';

const CheckOut = () => {
    const [contact, setContact] = useState({
        name: '',
        phone: '',
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

    const handleCompleteOrder = () => {
        if (!paymentMethod) {
            alert('Vui lòng chọn phương thức thanh toán.');
            return;
        }
        alert(`Đơn hàng đã được hoàn tất với phương thức thanh toán: ${paymentMethod}`);
    };

    const validateForm = () => {
        const { name, phone } = contact;
        const { province, district, ward, street } = address;
        const invalidFields = [];
        if (!name) invalidFields.push('name');
        if (!phone || !/^\d{10}$/.test(phone)) invalidFields.push('phone'); // Kiểm tra số điện thoại hợp lệ
        if (!province) invalidFields.push('province');
        if (!district) invalidFields.push('district');
        if (!ward) invalidFields.push('ward');
        if (!street) invalidFields.push('street');
        setIsFormValid(invalidFields.length === 0);
        return invalidFields;
    };

    const scrollToInvalidField = (field) => {
        const refs = {
            name: nameRef,
            phone: phoneRef,
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
            <h1 className="text-center mb-4">FASCO Demo Checkout</h1>
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
                                {['VN Pay', 'COD', 'Momo'].map((method) => (
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
                    {cartData.map((item) => (
                        <Card key={item.productId} className="mb-3">
                            <Row className="g-0">
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            <strong>Màu sắc:</strong> {item.color} <br />
                                            <strong>Kích thước:</strong> {item.size} <br />
                                            <strong>Số lượng:</strong> {item.quantity} <br />
                                            <strong>Giá:</strong> ${item.price.toFixed(2)}
                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <Card.Img
                                        src={require(`../../assets/images/${item.imageUrl}`)}
                                        alt={item.name}
                                        className="card-img"
                                    />
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <div className="text-end">
                        <h5>Tổng tiền: ${calculateTotal()}</h5>
                    </div>
                    <Button
                        variant="dark"
                        className="w-100"
                        style={{ marginTop: '100px' }}
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