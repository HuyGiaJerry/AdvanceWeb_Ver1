import React from "react";
import { Card } from 'react-bootstrap';
import './FeedBackCard.scss';
const FeedBackCard = (props) => {
    const { id, imgSrc, feedback, name, carrer, rating } = props;
    return (
        <div className="feedback-card-wrapper">
            <Card className="feedback-card border-0 p-3">
                <div className="d-flex align-items-center">
                    {/* Hình ảnh người dùng */}
                    <div className="feedback-image-wrapper me-3">
                        <img
                            src={require(`../../../assets/images/${imgSrc}`) || require('../../../assets/images/defaultImg.jpg')}
                            alt={name}
                            className="feedback-image"
                        />
                    </div>
                    {/* Nội dung phản hồi */}
                    <div className="feedback-content">
                        <Card.Text className="feedback-text mb-2">
                            <i>"{feedback}"</i>
                        </Card.Text>
                        <div className="feedback-rating mb-2">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span key={index} className={`star ${index < rating ? "filled" : ""}`}>&#9733;</span>
                            ))}
                        </div>
                        <hr />
                        <Card.Title className="feedback-name mb-0">{name}</Card.Title>
                        <Card.Subtitle className="feedback-role text-muted">{carrer}</Card.Subtitle>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default FeedBackCard;