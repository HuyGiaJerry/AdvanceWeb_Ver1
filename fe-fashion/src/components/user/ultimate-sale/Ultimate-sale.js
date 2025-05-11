import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Ultimate-sale.scss';
const UltimateSale = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container className="py-5 px-3 ultimate-sale-container">
                <Row className="align-items-center justify-content-around " >
                    {/* LEFT large image */}

                    <Col md={4} className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4', height: '540px', borderRadius: '10px' }}>
                        {/* <Image src="" alt="Model Left" fluid style={{ maxHeight: '600px' }} /> */}
                        <img
                            src={require('../../../assets/images/model_left.png')}
                            alt="model_left"

                            style={{ maxHeight: '400px' }}
                        />
                    </Col>
                    {/* CENTER: image on top, text in middle, image below */}
                    <Col md={4} className="text-center bg-white py-4 px-2">
                        {/* Top small image */}
                        <div className="mb-3">
                            <img
                                src={require('../../../assets/images/model_top.png')}
                                alt="model_top"

                                style={{ maxHeight: '120px' }}
                            />
                        </div>

                        {/* Text content */}
                        <div>
                            <h2 className="text-uppercase" style={{ fontSize: '50px', fontWeight: 'bold' }}>Ultimate</h2>
                            <h1 className="outline-text" >SALE</h1>
                            <p className="text-muted">New Collection</p>
                            <Button
                                onClick={() => navigate('/shop')}
                                variant="dark">SHOP NOW</Button>
                        </div>

                        {/* Bottom small image */}
                        <div className="mt-3">
                            <img
                                src={require('../../../assets/images/model_bottom.png')}
                                alt="model_bottom"

                                style={{ maxHeight: '120px' }}
                            />
                        </div>
                    </Col>

                    {/* RIGHT large image */}
                    <Col md={4} className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f4f4f4', height: '540px', borderRadius: '10px' }}>
                        <img
                            src={require('../../../assets/images/model_right.png')}
                            alt="model_right"

                            style={{ maxHeight: '400px' }}
                        />
                    </Col>

                </Row>

                {/* Brands below */}
                <Row className="text-center mt-5 justify-content-between">
                    {["CHANEL", "LOUIS VUITTON", "PRADA", "Calvin Klein", "DENIM"].map((brand, idx) => (
                        <Col key={idx} xs={6} md="auto" className="my-2">
                            
                                <h5 className="fw-bold brand">{brand}</h5>
                            
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default UltimateSale;