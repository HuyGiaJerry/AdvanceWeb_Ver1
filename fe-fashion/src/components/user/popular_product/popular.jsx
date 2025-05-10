import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './popular.scss';

const PopularProduct = () => {
    const navigate = useNavigate();

    return (
        <div className="popular-product">
            <Container>
                <Row className="align-items-center">
                    {/* Hình ảnh sản phẩm */}
                    <Col md={6} className="product-image">
                        <img
                            src={require('../../../assets/images/popular_product.png')}
                            alt="Product"
                            className="img-fluid"
                        />
                        
                    </Col>

                    {/* Thông tin sản phẩm */}
                    <Col md={6} className="product-info">
                        <h5 className="collection">Women Collection</h5>
                        <h2 className="product-title">Peaky Blinders</h2>
                        <h6 className="description-title">DESCRIPTION</h6>
                        <p className="description">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices
                            sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
                        </p>
                        <div className="product-size">
                            <span>Size:</span>
                            <Button variant="outline-dark" size="sm" className="size-button">M</Button>
                        </div>
                        <div className="product-price">
                            <h3>$100.00</h3>
                        </div>
                        <Button
                            variant="dark"
                            size="lg"
                            className="buy-now-button"
                            onClick={() => navigate('/shop')}
                        >
                            Buy Now
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PopularProduct;