import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-title">Page Not Found</h2>
        <p className="error-description">
          Oops! The page you're looking for doesn't exist.
          It might have been moved or deleted.
        </p>
        
        <div className="not-found-actions">
          <Link to="/">
            <Button variant="primary" size="large">
              Go to Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="secondary" size="large">
              Browse Products
            </Button>
          </Link>
        </div>

        <div className="helpful-links">
          <h3>You might be interested in:</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
