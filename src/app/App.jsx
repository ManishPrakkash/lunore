import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
