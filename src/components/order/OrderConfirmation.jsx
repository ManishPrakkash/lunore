import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../components/ui/Button';

export default function OrderConfirmation({ orderNumber, customerName, email, total, onContinueShopping }) {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-white rounded-lg p-12 shadow-lg text-center"
        >
            {/* Success Icon */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center"
            >
                <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </motion.div>

            {/* Success Message */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <h1 className="font-display text-4xl text-noir-900 mb-4">
                    Order Placed Successfully!
                </h1>
                <p className="text-lg text-noir-700 mb-8">
                    Thank you for your purchase{customerName ? `, ${customerName}` : ''}!
                </p>
            </motion.div>

            {/* Order Number */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-pearl-100 rounded-lg p-6 mb-8"
            >
                <p className="text-sm text-noir-600 mb-2">Order Number</p>
                <p className="text-2xl font-semibold text-noir-900 tracking-wider">
                    {orderNumber}
                </p>
            </motion.div>

            {/* Elegant Quote */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="border-t border-b border-gold-500/30 py-8 mb-8"
            >
                <p className="font-display text-2xl text-noir-900 italic mb-3">
                    "Style is a way to say who you are without having to speak."
                </p>
                <p className="text-sm text-gold-600 font-medium">
                    — Rachel Zoe
                </p>
            </motion.div>

            {/* Order Details */}
            {total && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-left space-y-4 mb-8"
                >
                    <div className="flex justify-between text-sm">
                        <span className="text-noir-600">Order Total</span>
                        <span className="font-semibold text-noir-900">${total.toFixed(2)}</span>
                    </div>
                    {email && (
                        <div className="flex justify-between text-sm">
                            <span className="text-noir-600">Email Confirmation</span>
                            <span className="text-noir-900">{email}</span>
                        </div>
                    )}
                </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex gap-4"
            >
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => window.print()}
                >
                    Print Receipt
                </Button>
                <Button
                    variant="primary"
                    className="flex-1"
                    onClick={() => {
                        if (onContinueShopping) {
                            onContinueShopping();
                        } else {
                            navigate('/');
                        }
                    }}
                >
                    Continue Shopping
                </Button>
            </motion.div>

            {/* Additional Info */}
            {email && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="text-sm text-noir-600 mt-8"
                >
                    A confirmation email has been sent to <span className="font-medium">{email}</span>
                </motion.p>
            )}
        </motion.div>
    );
}

OrderConfirmation.propTypes = {
    orderNumber: PropTypes.string.isRequired,
    customerName: PropTypes.string,
    email: PropTypes.string,
    total: PropTypes.number,
    onContinueShopping: PropTypes.func,
};
