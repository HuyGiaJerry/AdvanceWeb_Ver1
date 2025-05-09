import React, { useState } from 'react';
import FeedBackCard from '../card/FeedBackCard';
import './FeedBack.scss';
import { sampleDataFeedBackCard } from '../../../services/sampleDataFeedBackCard.js';

const FeedBack = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + sampleDataFeedBackCard.length) % sampleDataFeedBackCard.length
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex + 1) % sampleDataFeedBackCard.length
        );
    };

    const getIndex = (offset) => {
        return (currentIndex + offset + sampleDataFeedBackCard.length) % sampleDataFeedBackCard.length;
    };

    return (
        <div className="feedback-slider-wrapper">
            {/* Caption */}
            <div className="feedback-caption text-center">
                <h2 className="feedback-title">This Is What Our Customers Say</h2>
                <p className="feedback-description">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
                </p>
            </div>

            {/* Slider */}
            <div className="slider">
                <div className="prev">
                    <FeedBackCard {...sampleDataFeedBackCard[getIndex(-1)]} />
                </div>
                <div className="active">
                    <FeedBackCard {...sampleDataFeedBackCard[getIndex(0)]} />
                </div>
                <div className="next">
                    <FeedBackCard {...sampleDataFeedBackCard[getIndex(1)]} />
                </div>
            </div>

            {/* Slider Buttons */}
            <div className="slider-buttons">
                <button className="prev-btn" onClick={handlePrev}>
                    &#8249;
                </button>
                <button className="next-btn" onClick={handleNext}>
                    &#8250;
                </button>
            </div>
        </div>
    );
};

export default FeedBack;