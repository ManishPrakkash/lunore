import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useCart } from '../../app/store/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { NAV_LINKS } from '../../utils/constants';

export default function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartItemCount, openCart } = useCart();
    const { user, isAuthenticated } = useAuth();
    const location = useLocation();

    return (
        <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur-md border-b border-noir-200">
            <nav className="max-w-screen-2xl mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-display font-bold tracking-tight">
                        Lunoré
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={cn(
                                    'text-sm font-medium tracking-wide transition-colors duration-200',
                                    location.pathname === link.path
                                        ? 'text-noir-900'
                                        : 'text-noir-600 hover:text-noir-900'
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        {isAuthenticated && user?.role === 'admin' && (
                            <Link
                                to="/admin"
                                className={cn(
                                    'text-sm font-medium tracking-wide transition-colors duration-200',
                                    location.pathname === '/admin'
                                        ? 'text-gold-600'
                                        : 'text-gold-500 hover:text-gold-600'
                                )}
                            >
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Right actions */}
                    <div className="flex items-center space-x-6">
                        {/* Search */}
                        <button
                            className="text-noir-600 hover:text-noir-900 transition-colors"
                            aria-label="Search"
                        >
                            <SearchIcon />
                        </button>

                        {/* Account */}
                        {isAuthenticated ? (
                            <Link
                                to="/account"
                                className="hidden lg:flex items-center gap-2 text-noir-600 hover:text-noir-900 transition-colors"
                                aria-label="Account"
                            >
                                <UserIcon />
                                <span className="text-sm font-medium">{user?.name?.split(' ')[0]}</span>
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="hidden lg:block text-noir-600 hover:text-noir-900 transition-colors"
                                aria-label="Login"
                            >
                                <UserIcon />
                            </Link>
                        )}

                        {/* Cart */}
                        <button
                            className="relative text-noir-600 hover:text-noir-900 transition-colors"
                            aria-label="Shopping cart"
                            onClick={openCart}
                        >
                            <BagIcon />
                            {cartItemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-2 -right-2 bg-noir-900 text-ivory text-xs w-5 h-5 rounded-full flex items-center justify-center"
                                >
                                    {cartItemCount}
                                </motion.span>
                            )}
                        </button>

                        {/* Mobile menu toggle */}
                        <button
                            className="lg:hidden text-noir-900"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Menu"
                        >
                            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden overflow-hidden bg-ivory border-t border-noir-200"
                    >
                        <div className="px-6 py-6 space-y-4">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className="block text-lg font-medium text-noir-900 hover:text-gold-500 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            {isAuthenticated && user?.role === 'admin' && (
                                <Link
                                    to="/admin"
                                    className="block text-lg font-medium text-gold-500 hover:text-gold-600 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Admin Dashboard
                                </Link>
                            )}
                            {isAuthenticated ? (
                                <Link
                                    to="/account"
                                    className="block text-lg font-medium text-noir-900 hover:text-gold-500 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Account ({user?.name})
                                </Link>
                            ) : (
                                <Link
                                    to="/login"
                                    className="block text-lg font-medium text-noir-900 hover:text-gold-500 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

// Icon components
const SearchIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
    </svg>
);

const BagIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
    </svg>
);

const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 6h16M4 12h16M4 18h16"
        />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);
