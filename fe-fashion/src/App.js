import './App.scss';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DealTheMonth from './pages/user/deal';
import ShopCard from './components/user/card/ShopCard';
import Main_Shop from './pages/user/main_shop';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <Main_Shop />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;