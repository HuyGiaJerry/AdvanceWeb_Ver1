import React from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './login.scss';

const SignUp = () => {
    return (
        <Container className="signup-page" style={{
            marginTop: "100px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginBottom: "100px"
        }}>
            <Row>
                <Col md={6} className="signup-image">
                    <img
                        src={require('../../assets/images/sign_up.png')}
                        alt="Sign Up"
                        className="img-fluid"
                    />
                </Col>
                <Col md={6} className="signup-form">
                    <div className="signup-content">
                        <h1 className="text-center">FASCO</h1>
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
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formUserName">
                                        <Form.Label>Email Or Phone</Form.Label>
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

                            <Button type="submit" className='create-account-btn' style={{ width: "20vw", marginLeft: "130px" }}>
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
        </Container >
    );
};

export default SignUp;