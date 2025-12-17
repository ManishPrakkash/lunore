import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, isTopItem }) {
  const { id, name, price, image, discount, originalPrice } = product;
  const [isFavorite, setIsFavorite] = useState(false);
  const displayPrice = price;
  const hasDiscount = originalPrice && originalPrice > price;

  const toggleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-card-link">
        <div className="product-image">
          {isTopItem && <span className="top-item-badge">Top Item</span>}
          <button 
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            onClick={toggleFavorite}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={isFavorite ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <img src={image} alt={name} />
        </div>
        <div className="product-info">
          <h3 className="product-name">{name}</h3>
          <div className="product-price">
            {hasDiscount && (
              <span className="original-price">${originalPrice.toFixed(2)}</span>
            )}
            <span className="current-price">${displayPrice.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func,
  isTopItem: PropTypes.bool,
};

export default ProductCard;
