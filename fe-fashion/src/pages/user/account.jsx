import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './account.scss';

const Account = () => {
    const [profileImage, setProfileImage] = useState(require('../../assets/images/defaultImg.jpg')); // Ảnh mặc định
    const [formData, setFormData] = useState({
        fullName: 'Nguyễn Gia Huy',
        username: 'nguyengiahuy',
        phone: '0123456789',
        email: 'userTest@gmail.com',
    });

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
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        alert('Profile updated successfully!');
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