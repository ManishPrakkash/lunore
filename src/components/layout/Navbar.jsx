import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../features/cart/useCart';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const categories = [
    'All Categories', 'Deals', 'Crypto', 'Fashion', 'Health & Wellness',
    'Art', 'Home', 'Sport', 'Music', 'Gaming'
  ];

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            Lunoré
          </Link>

          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar-search-input"
            />
            <button type="submit" className="navbar-search-button">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </form>

          <div className="navbar-actions">
            <Link to="/account" className="navbar-action-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
                <path d="M3 9V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3" />
                <path d="M9 2v4" />
                <path d="M15 2v4" />
              </svg>
              <span>Orders</span>
            </Link>

            <Link to="/account" className="navbar-action-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span>Favourites</span>
            </Link>

            <Link to="/cart" className="navbar-action-item navbar-cart">
              <div className="cart-icon-wrapper">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </div>
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user-menu">
                <Link to="/account" className="navbar-user-icon">
                  <div className="user-avatar">
                    <span>{user?.email?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                </Link>
                <button onClick={handleLogout} className="navbar-logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="navbar-login-btn">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="category-nav">
        <div className="category-nav-container">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/products?category=${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
              className={`category-nav-item ${index === 0 ? 'active' : ''}`}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Navbar;
