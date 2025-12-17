import { useNavigate } from 'react-router-dom';
import CartItem from '../../components/ui/CartItem';
import Button from '../../components/common/Button';
import { useCart } from './useCart';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal, cartCount } = useCart();

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
        {cart.length > 0 && (
          <Button variant="danger" size="small" onClick={clearCart}>
            Clear Cart
          </Button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your cart is empty</h3>
          <p>Add some products to get started!</p>
          <Button onClick={() => navigate('/products')}>
            Browse Products
          </Button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-row">
              <span>Items ({cartCount})</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            
            <div className="summary-row">
              <span>Tax (estimated)</span>
              <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(cartTotal * 1.18).toFixed(2)}</span>
            </div>

            <Button 
              onClick={handleCheckout} 
              variant="primary"
              className="checkout-button"
            >
              Proceed to Checkout
            </Button>

            <Button 
              onClick={() => navigate('/products')} 
              variant="secondary"
              className="continue-shopping-button"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
