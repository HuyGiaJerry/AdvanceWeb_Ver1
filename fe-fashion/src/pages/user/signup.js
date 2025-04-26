
import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        contact: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.fullName) {
            setError('Full name is required');
            return;
        }
        if (!formData.contact) {
            setError('Email or phone number is required');
            return;
        }
        if (!formData.password) {
            setError('Password is required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const payload = {
                fullName: formData.fullName,
                email: formData.contact.includes('@') ? formData.contact : null,
                phoneNumber: !formData.contact.includes('@') ? formData.contact : null,
                password: formData.password
            };

            await axios.post('https://localhost:7123/api/User/register', payload);
            setSuccess('Account created successfully!');
            setFormData({
                fullName: '',
                contact: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

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
                        <h1>FASCO</h1>
                        <h4 className="text-center">Create Account</h4>
                        <div className="d-flex justify-content-center my-3">
                            <Button variant="outline-primary" className="me-2">
                                <img
                                    src={require('../../assets/icons/google.png')}
                                    className="me-2"
                                    alt="Google Icon"
                                />
                                Sign up with Google
                            </Button>
                        </div>
                        <div className="text-center my-3">-- OR --</div>
                        {error && <div className="text-danger text-center mb-3">{error}</div>}
                        {success && <div className="text-success text-center mb-3">{success}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3" style={{ marginLeft: '50px' }}>
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3" style={{ marginLeft: '50px' }}>
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formContact">
                                        <Form.Label>Email or Phone Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mb-3" style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="dark" type="submit">
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