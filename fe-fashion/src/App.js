import './App.scss';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UltimateSale from './components/user/ultimate-sale/Ultimate-sale';
import NewArrival from './pages/user/newArrival';
import FeedBack from './components/user/slider/FeedBack';
import Login from './pages/user/login';
import SignUp from './pages/user/signup';
import ForgotPassWord from './pages/user/forgot_password';
import ChangePassWord from './pages/user/new_password';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <UltimateSale />
          <NewArrival />
          <FeedBack />
          <Login />
          <SignUp />
          <ForgotPassWord />
          <ChangePassWord />
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
