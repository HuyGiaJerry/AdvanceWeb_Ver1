import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ChangePassWord = () => {
    return (
        <Container className="change-pass-page">
            <Row>
                <Col md={6} className="login-image">
                    <img
                        src={require('../../assets/images/login1.png')}
                        alt="Sign Up"
                        className="img-fluid"
                    />
                </Col>
                <Col md={6} className="login-form">
                    <div className="login-content">
                        <h1 className="">FASCO</h1>



                        <Form>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>New Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>

                                        <Form.Control type="password" />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Button variant="primary" type="submit" >
                                Submit
                            </Button>
                        </Form>

                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassWord;