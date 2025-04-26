import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.scss';

const Login = ({ setUser }) => {
    const [formData, setFormData] = useState({
        contact: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation
        if (!formData.contact) {
            setError('Email or phone number is required');
            return;
        }
        if (!formData.password) {
            setError('Password is required');
            return;
        }

        try {
            const payload = {
                email: formData.contact.includes('@') ? formData.contact : null,
                phoneNumber: !formData.contact.includes('@') ? formData.contact : null,
                password: formData.password
            };
        
            console.log('Payload sent:', payload);
        
            const response = await axios.post('https://localhost:7123/api/User/login', payload);
        
            console.log('Login response:', response.data);
        
            // Đảm bảo response có fullName
            if (response.data && response.data.fullName) {
                setUser({
                    isLoggedIn: true,
                    fullName: response.data.fullName
                });
        
                setSuccess('Login successful!');
                setFormData({ contact: '', password: '' });
                navigate('/main_shop');
            } else {
                setError('Invalid login response from server.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Login failed');
        }
    }        

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
                        <h1>FASCO</h1>
                        <h4 className="text-center">Sign In To FASCO</h4>
                        <div className="d-flex justify-content-center my-3">
                            <Button variant="outline-primary" className="me-2">
                                <img
                                    src={require('../../assets/icons/google.png')}
                                    className="me-2"
                                    alt="Google Icon"
                                />
                                Sign in with Google
                            </Button>
                        </div>
                        <div className="text-center my-3">-- OR --</div>
                        {error && <div className="text-danger text-center mb-3">{error}</div>}
                        {success && <div className="text-success text-center mb-3">{success}</div>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Email or Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    placeholder="Enter email or phone number"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Sign In
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <Link to="/register" className="btn btn-outline-primary w-100 mt-3">
                                Register Now
                            </Link>
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