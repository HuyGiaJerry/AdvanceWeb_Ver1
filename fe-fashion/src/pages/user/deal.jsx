import React, { useState, useEffect } from 'react';
import './deal.scss';
import { sliderData as initialSliderData } from '../../services/sampleDataDealSlider';
import { useNavigate } from 'react-router-dom';
const DealTheMonth = () => {
    const navigate = useNavigate();
    const calculateTimeLeft = () => {
        const targetDate = new Date('2025-05-21T00:00:00');
        const now = new Date();
        const difference = targetDate - now;

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        } else {
            timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [sliderData, setSliderData] = useState(initialSliderData);
    const [currentSlideId, setCurrentSlideId] = useState(initialSliderData[0].id);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSlideChange = (id) => {
        const selectedIndex = sliderData.findIndex((item) => item.id === id);
        if (selectedIndex === -1) return;

        const updatedSliderData = [
            ...sliderData.slice(selectedIndex),
            ...sliderData.slice(0, selectedIndex),
        ];

        setSliderData(updatedSliderData);
        setCurrentSlideId(id);
    };

    const handlePrevSlide = () => {
        const currentIndex = sliderData.findIndex((item) => item.id === currentSlideId);
        const prevIndex = (currentIndex - 1 + sliderData.length) % sliderData.length;

        // Sắp xếp lại sliderData để slide trước đó đứng đầu
        const updatedSliderData = [
            ...sliderData.slice(prevIndex),
            ...sliderData.slice(0, prevIndex),
        ];

        setSliderData(updatedSliderData);
        setCurrentSlideId(sliderData[prevIndex].id);
    };

    const handleNextSlide = () => {
        const currentIndex = sliderData.findIndex((item) => item.id === currentSlideId);
        const nextIndex = (currentIndex + 1) % sliderData.length;

        // Sắp xếp lại sliderData để slide tiếp theo đứng đầu
        const updatedSliderData = [
            ...sliderData.slice(nextIndex),
            ...sliderData.slice(0, nextIndex),
        ];

        setSliderData(updatedSliderData);
        setCurrentSlideId(sliderData[nextIndex].id);
    };

    return (
        <div className="deal-container">
            <div className="deal-header-container">
                <div className="deal-header">
                    <h1>Deals Of The Month</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
                        ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
                    </p>
                    <button
                        onClick={() => navigate('/shop')} 
                    className="buy-now-btn">Buy Now</button>
                </div>
                <div className="deal-timer">
                    <h3>Hurry, Before It's Too Late!</h3>
                    <div className="timer">
                        <div className="time-box">
                            <span>{timeLeft.days}</span>
                            <p>Days</p>
                        </div>
                        <div className="time-box">
                            <span>{timeLeft.hours}</span>
                            <p>Hr</p>
                        </div>
                        <div className="time-box">
                            <span>{timeLeft.minutes}</span>
                            <p>Mins</p>
                        </div>
                        <div className="time-box">
                            <span>{timeLeft.seconds}</span>
                            <p>Sec</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="deal-slider">
                <div className="slider-wrapper">
                    {sliderData.map((item) => (
                        <div
                            key={item.id}
                            className={`slider-item ${item.id === currentSlideId ? 'active' : ''}`}
                        >
                            <img
                                src={require(`../../assets/images/${item.image}`)}
                                alt={item.caption}
                            />
                            <div className="slider-caption">
                                <p>{item.caption}</p>
                                <h4>{item.discount}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider-btn">
                    <button className="prev" onClick={handlePrevSlide}>
                        &#8249;
                    </button>
                    <button className="next" onClick={handleNextSlide}>
                        &#8250;
                    </button>
                </div>
                <div className="slider-dots">
                    {sliderData.map((item) => (
                        <button
                            key={item.id}
                            className={`dot ${item.id === currentSlideId ? 'active' : ''}`}
                            onClick={() => handleSlideChange(item.id)}
                        ></button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DealTheMonth;