import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Checkout from '../pages/Checkout';
import NotFound from '../pages/NotFound';
import Login from '../features/auth/Login';
import Register from '../features/auth/Register';
import ProductList from '../features/products/ProductList';
import ProductDetails from '../features/products/ProductDetails';
import Cart from '../features/cart/Cart';
import Orders from '../features/orders/Orders';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
