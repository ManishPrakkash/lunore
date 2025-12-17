import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { useCart } from '../app/store/CartContext';

export default function CheckoutPage() {
    const { cart, cartTotal } = useCart();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        country: 'United States',
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
    });

    const shipping = 15;
    const tax = cartTotal * 0.08;
    const total = cartTotal + shipping + tax;

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (step < 3) {
            setStep(step + 1);
        } else {
            alert('Order placed successfully!');
        }
    };

    return (
        <div className="min-h-screen bg-pearl-100 py-12">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-center gap-4">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors ${step >= s
                                            ? 'bg-noir-900 text-ivory'
                                            : 'bg-pearl-300 text-noir-600'
                                        }`}
                                >
                                    {s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-16 h-1 mx-2 transition-colors ${step > s ? 'bg-noir-900' : 'bg-pearl-300'
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-24 mt-4 text-sm">
                        <span className={step >= 1 ? 'text-noir-900 font-medium' : 'text-noir-500'}>
                            Shipping
                        </span>
                        <span className={step >= 2 ? 'text-noir-900 font-medium' : 'text-noir-500'}>
                            Payment
                        </span>
                        <span className={step >= 3 ? 'text-noir-900 font-medium' : 'text-noir-500'}>
                            Review
                        </span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-8 shadow-md">
                            <form onSubmit={handleSubmit}>
                                {/* Step 1: Shipping */}
                                {step === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-2xl font-display mb-6">Shipping Information</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">City</label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={formData.city}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">State</label>
                                                    <input
                                                        type="text"
                                                        name="state"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">ZIP</label>
                                                    <input
                                                        type="text"
                                                        name="zip"
                                                        value={formData.zip}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Payment */}
                                {step === 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-2xl font-display mb-6">Payment Information</h2>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardNumber"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    placeholder="1234 5678 9012 3456"
                                                    required
                                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="expiry"
                                                        value={formData.expiry}
                                                        onChange={handleInputChange}
                                                        placeholder="MM/YY"
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium mb-2">CVV</label>
                                                    <input
                                                        type="text"
                                                        name="cvv"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        placeholder="123"
                                                        required
                                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Review */}
                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                    >
                                        <h2 className="text-2xl font-display mb-6">Review Order</h2>

                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-medium mb-2">Shipping Address</h3>
                                                <p className="text-noir-700">
                                                    {formData.firstName} {formData.lastName}
                                                    <br />
                                                    {formData.address}
                                                    <br />
                                                    {formData.city}, {formData.state} {formData.zip}
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="font-medium mb-2">Payment Method</h3>
                                                <p className="text-noir-700">
                                                    Card ending in {formData.cardNumber.slice(-4)}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Navigation Buttons */}
                                <div className="flex gap-4 mt-8">
                                    {step > 1 && (
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            onClick={() => setStep(step - 1)}
                                        >
                                            Back
                                        </Button>
                                    )}
                                    <Button type="submit" variant="primary" className="flex-1">
                                        {step === 3 ? 'Place Order' : 'Continue'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="bg-white rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-display mb-4">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-noir-600">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-medium">${item.price * item.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-noir-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Tax</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-noir-200">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
