import { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductFilters.css';

function ProductFilters({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState([200, 1150]);
  const [rating, setRating] = useState(4);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [deliveryOption, setDeliveryOption] = useState('standard');

  const brands = ['Adidas', 'Columbia', 'Demix', 'New Balance', 'Nike', 'Xiaomi', 'Asics'];

  const handlePriceChange = (index, value) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(value);
    setPriceRange(newRange);
    onFilterChange({ priceRange: newRange, rating, brands: selectedBrands, delivery: deliveryOption });
  };

  const handleRatingChange = (value) => {
    setRating(parseFloat(value));
    onFilterChange({ priceRange, rating: parseFloat(value), brands: selectedBrands, delivery: deliveryOption });
  };

  const handleBrandToggle = (brand) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter(b => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(newBrands);
    onFilterChange({ priceRange, rating, brands: newBrands, delivery: deliveryOption });
  };

  const handleDeliveryChange = (option) => {
    setDeliveryOption(option);
    onFilterChange({ priceRange, rating, brands: selectedBrands, delivery: option });
  };

  const resetFilters = () => {
    setPriceRange([200, 1150]);
    setRating(4);
    setSelectedBrands([]);
    setDeliveryOption('standard');
    onFilterChange({ priceRange: [200, 1150], rating: 4, brands: [], delivery: 'standard' });
  };

  return (
    <div className="product-filters">
      {/* Price Range */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Price Range</h3>
          <button onClick={resetFilters} className="filter-reset">Reset</button>
        </div>
        <div className="price-range-display">
          The average price is <strong>${((priceRange[0] + priceRange[1]) / 2).toFixed(0)}</strong>
        </div>
        <div className="price-range-inputs">
          <div className="price-input">
            <label>${priceRange[0]}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, e.target.value)}
              className="price-slider"
            />
          </div>
          <div className="price-input">
            <label>${priceRange[1]}</label>
            <input
              type="range"
              min="0"
              max="2000"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, e.target.value)}
              className="price-slider"
            />
          </div>
        </div>
      </div>

      {/* Star Rating */}
      <div className="filter-section">
        <h3>Star Rating</h3>
        <div className="rating-display">
          <div className="stars-display">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(rating) ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">{rating} Stars & up</span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={rating}
          onChange={(e) => handleRatingChange(e.target.value)}
          className="rating-slider"
        />
      </div>

      {/* Brand */}
      <div className="filter-section">
        <div className="filter-header">
          <h3>Brand</h3>
          <button onClick={resetFilters} className="filter-reset">Reset</button>
        </div>
        <div className="brand-list">
          {brands.map((brand) => (
            <label key={brand} className="brand-checkbox">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
          <button className="more-brand-btn">More Brand</button>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="filter-section">
        <h3>Delivery Options</h3>
        <div className="delivery-options">
          <button
            className={`delivery-btn ${deliveryOption === 'standard' ? 'active' : ''}`}
            onClick={() => handleDeliveryChange('standard')}
          >
            Standard
          </button>
          <button
            className={`delivery-btn ${deliveryOption === 'pickup' ? 'active' : ''}`}
            onClick={() => handleDeliveryChange('pickup')}
          >
            Pick Up
          </button>
        </div>
      </div>
    </div>
  );
}

ProductFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

export default ProductFilters;
