import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from './Navigation';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import { useCart } from '../../app/store/CartContext';

export default function RootLayout() {
    const { isCartOpen, closeCart } = useCart();

    return (
        <div className="min-h-screen bg-ivory text-noir-900 font-sans">
            {/* Navigation */}
            <Navigation />

            {/* Main content with page transitions */}
            <main className="relative">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />

            {/* Cart drawer overlay */}
            <AnimatePresence>
                {isCartOpen && <CartDrawer onClose={closeCart} />}
            </AnimatePresence>

            {/* Background overlay when cart is open */}
            <AnimatePresence>
                {isCartOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-noir-900/40 backdrop-blur-sm z-40"
                        onClick={closeCart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
