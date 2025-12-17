import PropTypes from 'prop-types';
import './RatingStars.css';

function RatingStars({ rating = 0, maxRating = 5, showValue = true }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = maxRating - Math.ceil(rating);

  return (
    <div className="rating-stars">
      <div className="stars">
        {[...Array(fullStars)].map((_, index) => (
          <span key={`full-${index}`} className="star star-full">★</span>
        ))}
        {hasHalfStar && <span className="star star-half">★</span>}
        {[...Array(emptyStars)].map((_, index) => (
          <span key={`empty-${index}`} className="star star-empty">★</span>
        ))}
      </div>
      {showValue && <span className="rating-value">({rating.toFixed(1)})</span>}
    </div>
  );
}

RatingStars.propTypes = {
  rating: PropTypes.number,
  maxRating: PropTypes.number,
  showValue: PropTypes.bool,
};

export default RatingStars;
