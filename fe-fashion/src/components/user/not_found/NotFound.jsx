import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NotFound.scss'; // Tạo file CSS riêng nếu cần

const NotFound = () => {
    return (
        <Container className="not-found-page text-center d-flex align-items-center justify-content-center vh-100">
            <Row>
                <Col>
                    <h1 className="display-1 fw-bold text-danger">404</h1>
                    <h2 className="mb-4">Oops! Page Not Found</h2>
                    <p className="mb-4">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                    <Link to="/">
                        <Button variant="primary" className="px-4 py-2">
                            Go Back to Home
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;