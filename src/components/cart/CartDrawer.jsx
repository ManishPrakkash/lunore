import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../../app/store/CartContext';
import Button from '../ui/Button';

export default function CartDrawer({ onClose }) {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-noir-200">
                <h2 className="text-2xl font-display font-semibold">Shopping Cart</h2>
                <button
                    onClick={onClose}
                    className="text-noir-600 hover:text-noir-900 transition-colors"
                    aria-label="Close cart"
                >
                    <CloseIcon />
                </button>
            </div>

            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <EmptyCartIcon />
                        <p className="text-lg text-noir-600 mt-4 mb-2">Your cart is empty</p>
                        <p className="text-sm text-noir-500 mb-6">
                            Add some items to get started
                        </p>
                        <Button onClick={onClose} variant="primary">
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <CartItem
                                key={`${item.id}-${JSON.stringify(item.variant)}`}
                                item={item}
                                onRemove={() => removeFromCart(item.id, item.variant)}
                                onUpdateQuantity={(qty) =>
                                    updateQuantity(item.id, item.variant, qty)
                                }
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Footer with total and checkout */}
            {cart.length > 0 && (
                <div className="border-t border-noir-200 p-6 space-y-4">
                    <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-noir-600">
                        Shipping and taxes calculated at checkout
                    </p>
                    <Button
                        as={Link}
                        to="/checkout"
                        variant="primary"
                        className="w-full"
                        size="lg"
                        onClick={onClose}
                    >
                        Proceed to Checkout
                    </Button>

                    <button
                        onClick={onClose}
                        className="w-full text-center text-sm text-noir-600 hover:text-noir-900 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}
        </motion.div>
    );
}

CartDrawer.propTypes = {
    onClose: PropTypes.func.isRequired,
};

// Cart item component
function CartItem({ item, onRemove, onUpdateQuantity }) {
    return (
        <div className="flex gap-4">
            <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
                <h3 className="font-medium text-noir-900">{item.name}</h3>
                {item.variant && (
                    <p className="text-sm text-noir-600">
                        {item.variant.size && `Size: ${item.variant.size}`}
                        {item.variant.color && ` • Color: ${item.variant.color}`}
                    </p>
                )}
                <p className="text-sm font-semibold text-noir-900 mt-1">
                    ${item.price}
                </p>
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-noir-300 rounded-md">
                        <button
                            onClick={() => onUpdateQuantity(item.quantity - 1)}
                            className="px-3 py-1 hover:bg-noir-100 transition-colors"
                        >
                            −
                        </button>
                        <span className="px-3 py-1 border-x border-noir-300">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(item.quantity + 1)}
                            className="px-3 py-1 hover:bg-noir-100 transition-colors"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={onRemove}
                        className="text-sm text-noir-600 hover:text-red-600 transition-colors"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onUpdateQuantity: PropTypes.func.isRequired,
};

// Icons
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

const EmptyCartIcon = () => (
    <svg
        className="w-24 h-24 text-noir-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
    </svg>
);
