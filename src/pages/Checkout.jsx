import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useCart } from '../features/cart/useCart';
import { useOrders } from '../features/orders/useOrders';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const { createOrder, loading } = useOrders();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'card',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderData = {
      items: cart,
      shippingAddress: {
        fullName: formData.fullName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      contactInfo: {
        email: formData.email,
        phone: formData.phone,
      },
      paymentMethod: formData.paymentMethod,
      total: cartTotal * 1.18, // Including tax
    };

    const order = await createOrder(orderData);
    
    if (order) {
      clearCart();
      navigate('/orders', { 
        state: { message: 'Order placed successfully!' } 
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products before proceeding to checkout</p>
        <Button onClick={() => navigate('/products')}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-content">
        {/* Checkout Form */}
        <form className="checkout-form" onSubmit={handleSubmit}>
          <section className="form-section">
            <h3>Shipping Information</h3>
            
            <Input
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              type="tel"
              name="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <Input
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
            />

            <div className="form-row">
              <Input
                name="city"
                label="City"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                required
              />

              <Input
                name="state"
                label="State"
                value={formData.state}
                onChange={handleChange}
                error={errors.state}
                required
              />
            </div>

            <div className="form-row">
              <Input
                name="zipCode"
                label="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                error={errors.zipCode}
                required
              />

              <Input
                name="country"
                label="Country"
                value={formData.country}
                onChange={handleChange}
                disabled
              />
            </div>
          </section>

          <section className="form-section">
            <h3>Payment Method</h3>
            
            <div className="payment-methods">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={handleChange}
                />
                <span>Credit/Debit Card</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={formData.paymentMethod === 'upi'}
                  onChange={handleChange}
                />
                <span>UPI</span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleChange}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>
          </section>

          <Button 
            type="submit" 
            variant="primary"
            disabled={loading}
            className="place-order-button"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </form>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <h3>Order Summary</h3>
          
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <img src={item.image} alt={item.name} />
                <div className="summary-item-details">
                  <p className="item-name">{item.name}</p>
                  <p className="item-quantity">Qty: {item.quantity}</p>
                </div>
                <p className="item-price">₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-calculations">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span className="free">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax (18%)</span>
              <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(cartTotal * 1.18).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
