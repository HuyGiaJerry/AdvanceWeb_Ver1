import './App.scss';
import Header from './components/user/header/Header';
import Footer from './components/user/footer/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DealTheMonth from './pages/user/deal';
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className='main-content'>
          <DealTheMonth />
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;