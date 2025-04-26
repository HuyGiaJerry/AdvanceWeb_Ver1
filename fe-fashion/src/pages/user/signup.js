import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.scss';

const SignUp = () => {
    return (
        <Container className="login-page">
            <Row>
                <Col md={6} className="login-image">
                    <img
                        src={require('../../assets/images/sign_up.png')}
                        alt="Sign Up"
                        className="img-fluid"
                    />
                </Col>
                <Col md={6} className="login-form">
                    <div className="login-content">
                        <h1 className="">FASCO</h1>
                        <h4 className="text-center">Create Account</h4>
                        <div className="d-flex justify-content-center my-3">
                            <Button variant="outline-primary" className="me-2">
                                <img
                                    src={require('../../assets/icons/google.png')}
                                    className='me-2'
                                    alt='Google Icon'
                                />
                                Sign up with Google
                            </Button>

                        </div>
                        <div className="text-center my-3">-- OR --</div>
                        <Form>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Email Address</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
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

                            <Button variant="dark" type="submit" >
                                Create Account
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <small>
                                Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                            </small>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUp;