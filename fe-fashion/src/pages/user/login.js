import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
    return (
        <Container className="login-page">
            <Row>
                <Col md={6} className="login-image">
                    <img
                        src={require('../../assets/images/login1.png')}
                        alt="Login"
                        className="img-fluid"
                    />
                </Col>
                <Col md={6} className="login-form">
                    <div className="login-content">
                        <h1 className="">FASCO</h1>
                        <h4 className="text-center">Sign In To FASCO</h4>
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
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Sign In
                            </Button>
                        </Form>
                        <div className="text-center mt-3">

                            <Button variant="outline-primary" className="me-0">
                                <Link to="/register" className="text-decoration-none">Register Now</Link>

                            </Button>
                            <br />
                            <Link to="/forgot-password" className="forgotPass">Forgot Password?</Link>
                        </div>
                        <div className="text-center mt-5">
                            <small>FASCO Terms & Conditions</small>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;