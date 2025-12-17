import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const result = await login(formData.email, formData.password);

        if (!result.success) {
            setErrors({ password: result.error });
            return;
        }

        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-screen bg-pearl-100 flex items-center justify-center py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-display text-center mb-2">Welcome Back</h2>
                    <p className="text-center text-noir-600 mb-8">Sign in to your Lunoré account</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-noir-900 transition-colors ${errors.email ? 'border-red-500' : 'border-noir-300'
                                    }`}
                                placeholder="Enter your email"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-noir-900 transition-colors ${errors.password ? 'border-red-500' : 'border-noir-300'
                                    }`}
                                placeholder="Enter your password"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-noir-900 text-ivory rounded-md font-medium hover:bg-noir-800 transition-colors"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm text-noir-600 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-noir-900 font-medium hover:text-gold-600 transition-colors">
                            Create Account
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-noir-500 mt-4">
                    Demo Accounts:<br />
                    Admin: admin@lunore.com / admin123<br />
                    Customer: customer@lunore.com / customer123
                </p>
            </motion.div>
        </div>
    );
}
