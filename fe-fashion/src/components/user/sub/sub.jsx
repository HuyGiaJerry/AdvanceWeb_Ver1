import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import './sub.scss';

const Sub = () => {
    return (
        <Container className="sub-section">
            <Row className="align-items-center justify-content-center">
                {/* Hình ảnh bên trái */}
                <Col md={3} className="text-center d-none d-md-block">
                    <img
                        src={require('../../../assets/images/subLeft.png')}
                        alt="Left Model"
                        className="img-fluid"
                    />
                </Col>

                {/* Nội dung ở giữa */}
                <Col md={3} xs={12} className="text-center">
                    <h2 className="sub-title">Subscribe To Our Newsletter</h2>
                    <p className="sub-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Scelerisque duis ultrices sollicitudin aliquam sem.
                    </p>
                    <Form>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="michael@ymail.com"
                                className="email-input"
                            />
                        </Form.Group>
                        <Button variant="dark" className="subscribe-btn mt-3">
                            Subscribe Now
                        </Button>
                    </Form>
                </Col>

                {/* Hình ảnh bên phải */}
                <Col md={3} className="text-center d-none d-md-block">
                    <img
                        src={require('../../../assets/images/subRight.png')}
                        alt="Right Model"
                        className="img-fluid"
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Sub;