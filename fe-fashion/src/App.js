import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <AdminRoutes />
      </Router>
    </div>
  );
}

export default App;