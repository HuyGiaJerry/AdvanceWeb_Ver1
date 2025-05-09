import React from "react";
import { Card, Button } from 'react-bootstrap';
import './ProductCardNewArrival.scss';
import { Link } from 'react-router-dom';
const ProductCardNewArrival = (props) => {
    const { id, imgSrc, productName, brandName, reviews, price, status, rating } = props;
    return (
        <Card className="product-card" style={{ width: '18rem', margin: 'auto' }}>
            <Link to={`/home/newArrivalProudctDetail/${id}`} className="product-image-link">
                <Card.Img
                    variant="top"
                    src={require(`../../../assets/images/${imgSrc}`) || require('../../../assets/images/defaultImg.jpg')}
                    alt={productName || "Product Image"}
                    className="product-image"
                />
            </Link>
            <Card.Body>
                {/* <Card.Title className="product-title">{productName}</Card.Title> */}
                <div className="d-flex justify-content-between align-items-center">
                    <Card.Title className="product-title mb-0">{productName}</Card.Title>
                    <div className="product-rating">
                        {Array.from({ length: 5 }, (_, index) => (
                            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>&#9733;</span>
                        ))}
                    </div>
                </div>
                <Card.Text className="product-brand text-start" style={{ fontWeight: '200' }}>{brandName}</Card.Text>
                <Card.Text className="product-reviews text-start" style={{ fontSize: '0.9rem' }}>{reviews} Customer Reviews</Card.Text>
                <div className="product-price-rating d-flex justify-content-between align-items-center">
                    <span className="product-price" style={{ fontSize: '1.8rem' }}>${price}</span>
                    <span className={`product-status ${status === 'out' ? 'text-danger' : 'text-success'}`}>{status}</span>
                </div>

            </Card.Body>
        </Card>

    )
}

export default ProductCardNewArrival;