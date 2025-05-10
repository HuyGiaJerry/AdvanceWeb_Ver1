import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import './login.scss';

const SignUp = () => {
    const [formData, setFormData] = useState({
        fullName: formData.fullName || '',
        emailOrPhone: formData.emailOrPhone || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || ''
    });

    const navigate = useNavigate();
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(password);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();


        const { fullName, emailOrPhone, password, confirmPassword } = formData;

        // Validate password
        if (!validatePassword(password)) {
            toast.error('Password must be at least 6 characters long, contain at least 1 uppercase letter, 1 number, and 1 special character.');
            return;
        }

        // Confirm password match
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }

        // Determine email or phone
        const isEmail = emailOrPhone.includes('@');
        const requestData = {
            fullName,
            email: isEmail ? emailOrPhone : '',
            phoneNumber: isEmail ? '' : emailOrPhone,
            password,
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/User/register`, requestData);
            toast.success(response.data?.message || 'Registration successful!');
            navigate('/login');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed!');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }


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
                        <Form onSubmit={handleSubmit}>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formFullName">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={10}>
                                    <Form.Group className="mb-3" controlId="formUserName">
                                        <Form.Label>Email Or Phone</Form.Label>
                                        <Form.Control
                                            name="emailOrPhone"
                                            value={formData.emailOrPhone}
                                            onChange={handleChange}
                                            required
                                            type="text" />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Row className='mb-3' style={{ marginLeft: '50px' }}>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            type="password" />
                                    </Form.Group>
                                </Col>
                                <Col md={5}>
                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            required
                                            type="password" />
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