import PropTypes from 'prop-types';
import Button from '../common/Button';
import './CartItem.css';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const { id, name, price, image, quantity } = item;
  const totalPrice = price * quantity;

  const handleIncrease = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-name">{name}</h3>
        <p className="cart-item-price">₹{price.toFixed(2)}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={handleDecrease} className="quantity-btn">-</button>
        <span className="quantity-value">{quantity}</span>
        <button onClick={handleIncrease} className="quantity-btn">+</button>
      </div>
      <div className="cart-item-total">
        <p className="total-price">₹{totalPrice.toFixed(2)}</p>
        <Button onClick={() => onRemove(id)} variant="danger" size="small">
          Remove
        </Button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
