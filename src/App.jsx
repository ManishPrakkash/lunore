import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { CartProvider } from './app/store/CartContext';
import { WishlistProvider } from './app/store/WishlistContext';
import { AuthProvider } from './contexts/AuthContext';
import useSmoothScroll from './hooks/useSmoothScroll';
import { startKeepAlive, stopKeepAlive } from './services/keepAlive';
import ProtectedRoute from './components/auth/ProtectedRoute';
import RootLayout from './components/layout/RootLayout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  useSmoothScroll({
    smoothness: 0.12,
    multiplier: 1,
    enabled: true
  });

  // Start keep-alive service to prevent backend from sleeping
  useEffect(() => {
    startKeepAlive();
    return () => stopKeepAlive();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Toaster
              position="bottom-center"
              reverseOrder={false}
              gutter={8}
              containerStyle={{
                bottom: 40,
              }}
              toastOptions={{
                duration: 3000,
                className: '',
                style: {
                  animation: 'toastSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                },
                success: {
                  style: {
                    animation: 'toastSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  },
                },
                error: {
                  style: {
                    animation: 'toastSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  },
                },
              }}
            />
            <Routes>
              <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
                <Route path="new" element={<CategoryPage />} />
                <Route path="category/:category" element={<CategoryPage />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="sale" element={<CategoryPage />} />
                <Route
                  path="checkout"
                  element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="account"
                  element={
                    <ProtectedRoute>
                      <AccountPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

// 404 Page
function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pearl-100">
      <div className="text-center">
        <h1 className="text-6xl font-display mb-4">404</h1>
        <p className="text-xl text-noir-600 mb-6">Page Not Found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-noir-900 text-ivory rounded-md font-medium hover:bg-noir-800 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}

export default App;
