import { useState, useEffect } from 'react';
import { cartAPI } from './cartAPI';

export function useCart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error('Failed to parse cart from localStorage', err);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = async (product) => {
    try {
      setError(null);
      
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Update quantity
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += product.quantity || 1;
        setCart(updatedCart);
      } else {
        // Add new item
        setCart([...cart, { ...product, quantity: product.quantity || 1 }]);
      }

      // Optionally sync with backend
      // await cartAPI.addToCart(product.id, product.quantity || 1);
      
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setError(null);
      
      if (quantity <= 0) {
        return removeFromCart(itemId);
      }

      const updatedCart = cart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
      setCart(updatedCart);

      // Optionally sync with backend
      // await cartAPI.updateCartItem(itemId, quantity);
      
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      setError(null);
      const updatedCart = cart.filter(item => item.id !== itemId);
      setCart(updatedCart);

      // Optionally sync with backend
      // await cartAPI.removeFromCart(itemId);
      
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const clearCart = async () => {
    try {
      setError(null);
      setCart([]);

      // Optionally sync with backend
      // await cartAPI.clearCart();
      
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = item.discount 
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return total + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return {
    cart,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartCount,
  };
}
