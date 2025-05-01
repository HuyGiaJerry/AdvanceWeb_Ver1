import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.scss'; // Adjust the path as needed
import UltimateSale from '../../components/user/ultimate-sale/Ultimate-sale'
import DealTheMonth from './deal';
import NewArrival from './newArrival';
import Sub from '../../components/user/sub/sub';
import Feedback from '../../components/user/slider/FeedBack';
const Home = () => {

    return (
        <div className="home-page">
            <UltimateSale />
            <DealTheMonth />
            <NewArrival />
            <Feedback />
            <Sub />
        </div>
    );
}

export default Home;