import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/store';
import { toast } from 'react-toastify';
import axios from 'axios';
import './login.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (userName.trim() === '' || password.trim() === '') {
            toast.error('Please enter your username and password!');
            return;
        }

        // Kiểm tra userName có chứa '@' hay không
        const isEmail = userName.includes('@');
        const email = isEmail ? userName : '';
        const phoneNumber = isEmail ? '' : userName;

        try {
            // Gửi request đến API
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/User/login`, {
                email,
                phoneNumber,
                password,
            });

            const { accessToken, refreshToken, fullName, userId } = response.data;

            // Dispatch thông tin người dùng vào Redux store
            dispatch(login({ userName: fullName, userId, accessToken, refreshToken }));

            // Hiển thị thông báo thành công và chuyển hướng
            toast.success('Login successfully!');
            navigate('/home');
        } catch (error) {
            console.error('Login error:', error);
            toast.error('Login failed. Please check your username or password!');
        }
    };

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
                                    className="me-2"
                                    alt="Google Icon"
                                />
                                Sign up with Google
                            </Button>
                        </div>
                        <div className="text-center my-3">-- OR --</div>
                        <Form onSubmit={handleLogin}>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your phone or email"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Log In
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