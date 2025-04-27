import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

const ForgotPassWord = () => {
    const [showModal, setShowModal] = useState(false); // State để điều khiển popup
    const [confirmationCode, setConfirmationCode] = useState(''); // State để lưu mã xác nhận

    const handleSendCode = (e) => {
        e.preventDefault();
        // Kiểm tra thông tin đã điền đầy đủ chưa (có thể thêm logic kiểm tra ở đây)
        setShowModal(true); // Hiển thị popup
    };

    const handleConfirmCode = () => {
        // Xử lý logic xác nhận mã xác nhận
        console.log('Confirmation Code:', confirmationCode);
        setShowModal(false); // Đóng popup sau khi xác nhận
    };

    return (
        <Container className="forgotPass-page" style={{ marginTop: '100px', marginBottom: '100px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Row>
                <Col md={6} className="login-image">
                    <img
                        src={require('../../assets/images/login1.png')}
                        alt="Login"
                        className="img-fluid"
                    />
                </Col>
                <Col md={6} className="forgotPass-form" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="forgotPass-content">
                        <h1 className="">FASCO</h1>
                        <h4 className="text-center">Forget Password</h4>

                        <Form onSubmit={handleSendCode}>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="email" required />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="phone" required />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="dark" type="submit">
                                Send Confirmation Code
                            </Button>
                        </Form>

                        <div className="text-center mt-5">
                            <small>FASCO Terms & Conditions</small>
                        </div>
                    </div>
                </Col>
            </Row>

            {/* Modal Popup */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Confirmation Code</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formConfirmationCode">
                        <Form.Label>Confirmation Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your code"
                            value={confirmationCode}
                            onChange={(e) => setConfirmationCode(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmCode}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ForgotPassWord;