import './App.scss';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UltimateSale from './components/user/ultimate-sale/Ultimate-sale';
import NewArrival from './pages/user/newArrival';
import FeedBack from './components/user/slider/FeedBack';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <UltimateSale />
          <NewArrival />
          <FeedBack />
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
