import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { login } from '../../store/store';
import authService from '../../services/authService';
import cartService from '../../services/cartService';
import './login.scss';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || "1082077099324-hehekdmi87odbeo46dbscapgofe0o5dv.apps.googleusercontent.com";
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI || `${window.location.origin}/login`;
    console.log("Cart Before Merge", localStorage.getItem('cart'));
    // Hàm xử lý merge cart
    const mergeCart = async (userId) => {

        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        if (localCart.length > 0) {
            try {
                await cartService.mergeCart(userId, localCart);
                toast.success('Cart merged successfully!');
                localStorage.removeItem('cart'); // Xóa cart trong localStorage sau khi merge
                console.log("Cart After Merge", localStorage.getItem('cart'));

            } catch (mergeError) {
                console.error('Lỗi khi merge giỏ hàng:', mergeError);
                toast.error('Failed to merge cart. Please try again.');
            }
        }
    };

    // Xử lý đăng nhập thường
    const handleLogin = async (e) => {
        e.preventDefault();

        if (userName.trim() === '' || password.trim() === '') {
            toast.error('Please enter your username and password!');
            return;
        }

        const isEmail = userName.includes('@');
        const credentials = {
            email: isEmail ? userName : '',
            phoneNumber: isEmail ? '' : userName,
            password,
        };

        setIsLoading(true);

        try {
            const userData = await authService.login(credentials);
            dispatch(login(userData));

            // Merge cart sau khi đăng nhập
            await mergeCart(userData.userId);

            toast.success('Login successfully!');
            navigate('/home');
        } catch (err) {
            console.error('Login error:', err);
            toast.error('Login failed. Please check your username or password!');
        } finally {
            setIsLoading(false);
        }
    };

    // Xử lý callback từ Google
    const handleGoogleCallback = async (code) => {
        setIsLoading(true);

        try {
            const userData = await authService.googleLogin(code);
            dispatch(login(userData));

            // Merge cart sau khi đăng nhập bằng Google
            await mergeCart(userData.userId);

            toast.success('Google Login successfully!');
            navigate('/', { replace: true });
        } catch (err) {
            console.error('Google login failed:', err);
            toast.error(err.response?.data?.message || 'Google login failed. Please try again!');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const query = new URLSearchParams(location.search);
            const code = query.get('code');
            const error = query.get('error');

            if (error) {
                toast.error(error);
                return;
            }

            if (code) {
                await handleGoogleCallback(code);
            }
        };

        checkAuth();
    }, [location]);

    const handleGoogleLogin = () => {
        const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
        const params = {
            response_type: 'code',
            client_id: GOOGLE_CLIENT_ID,
            redirect_uri: REDIRECT_URI,
            scope: 'openid profile email',
            access_type: 'offline',
            prompt: 'consent',
        };

        Object.keys(params).forEach(key =>
            googleAuthUrl.searchParams.append(key, params[key])
        );

        window.location.href = googleAuthUrl.toString();
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
                        <h1>FASCO</h1>
                        <h4 className="text-center">Sign In To FASCO</h4>

                        {isLoading && (
                            <div className="text-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        )}

                        <div className="d-flex justify-content-center my-3">
                            <Button
                                variant="outline-primary"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="google-login-btn"
                            >
                                <img
                                    src={require('../../assets/icons/google.png')}
                                    className="me-2"
                                    alt="Google"
                                    width="20"
                                    height="20"
                                />
                                Sign in with Google
                            </Button>
                        </div>

                        <div className="text-center my-3 separator">-- OR --</div>

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
                            <Button
                                variant="dark"
                                type="submit"
                                className="w-100"
                                disabled={isLoading}
                            >
                                Sign In
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <Button
                                variant="outline-primary"
                                as={Link}
                                to="/register"
                                className="mb-2"
                            >
                                Register Now
                            </Button>
                            <br />
                            <Link
                                to="/forgot-password"
                                className="text-muted forgot-pass"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="text-center mt-5 text-muted">
                            <small>FASCO Terms & Conditions</small>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
