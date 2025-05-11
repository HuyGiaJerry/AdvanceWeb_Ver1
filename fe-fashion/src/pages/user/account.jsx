import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaGoogle, FaEdit } from 'react-icons/fa'; // Import icon Google và bút
import './account.scss';

const Account = () => {
    // Lấy thông tin từ authState trong localStorage
    const authState = JSON.parse(localStorage.getItem('authState')) || {};

    const [profileImage, setProfileImage] = useState(
        authState.profileImage || require('../../assets/images/defaultImg.jpg') // Ảnh mặc định
    );

    const [formData, setFormData] = useState({
        fullName: authState.fullName || 'Nguyễn Gia Huy',
        username: authState.username || 'nguyengiahuy',
        phone: authState.phoneNumber || '0123456789',
        email: authState.email || 'userTest@gmail.com',
    });

    const [isGoogleConnected, setIsGoogleConnected] = useState(
        authState.isGoogleConnected || false // Trạng thái kết nối Google
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result); // Cập nhật ảnh
                localStorage.setItem(
                    'authState',
                    JSON.stringify({ ...authState, profileImage: reader.result }) // Lưu ảnh vào authState
                );
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Lưu thông tin vào authState trong localStorage
        const updatedAuthState = {
            ...authState,
            fullName: formData.fullName,
            username: formData.username,
            phone: formData.phone,
            email: formData.email,
        };
        localStorage.setItem('authState', JSON.stringify(updatedAuthState));
        alert('Thông tin đã được lưu thành công!');
    };

    const handleGoogleConnect = () => {
        // Giả lập kết nối Google
        const newStatus = !isGoogleConnected;
        setIsGoogleConnected(newStatus);
        localStorage.setItem(
            'authState',
            JSON.stringify({ ...authState, isGoogleConnected: newStatus }) // Lưu trạng thái vào authState
        );
    };

    return (
        <Container className="account" style={{ marginTop: '100px', marginBottom: '170px' }}>
            <h1 className="text-center mb-4">Thông tin của tôi</h1>
            <Row className="justify-content-center">
                {/* Cột bên trái: Ảnh đại diện */}
                <Col md={4} className="text-center">
                    <div className="profile-image-container">
                        <img
                            src={profileImage}
                            alt="Profile"
                            className="img-fluid rounded-circle mb-3 profile-image"
                        />
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label className="btn btn-outline-dark">
                                Thay đổi ảnh
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    hidden
                                />
                            </Form.Label>
                        </Form.Group>
                    </div>

                    {/* Trạng thái kết nối Google */}
                    <div className="google-connect-status d-flex align-items-center justify-content-around">
                        <div className="d-flex align-items-center">
                            <img
                                src={require('../../assets/images/google_icon.png')}
                                alt="google-icon"
                                width="40"
                                className="rounded-circle mb-3"
                            />
                            <span style={{ paddingLeft: "20px", paddingBottom: "10px" }}>Google</span>
                        </div>
                        <Button
                            variant="outline-secondary"
                            className="d-flex align-items-center"
                            onClick={handleGoogleConnect}
                            disabled={isGoogleConnected} // Disable nếu đã liên kết
                        >
                            {isGoogleConnected ? (
                                <span className="text-success">Đã liên kết</span>
                            ) : (
                                <>
                                    <FaEdit className="me-1" style={{ color: "red" }} />
                                    <span style={{ color: "red" }}>Liên kết</span>
                                </>
                            )}
                        </Button>
                    </div>
                </Col>

                {/* Cột bên phải: Thông tin */}
                <Col md={8}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formFullName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label>Tên đăng nhập</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button className="save-btn" onClick={handleSave}>
                            Lưu thay đổi
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Account;