import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/product/ProductGrid';
import { useWishlist } from '../app/store/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

const MOCK_ORDERS = [
    {
        id: 'ORD-001',
        date: '2024-12-01',
        status: 'Delivered',
        total: 425.00,
        items: 3,
    },
    {
        id: 'ORD-002',
        date: '2024-11-15',
        status: 'Shipped',
        total: 189.00,
        items: 1,
    },
    {
        id: 'ORD-003',
        date: '2024-11-01',
        status: 'Delivered',
        total: 650.00,
        items: 4,
    },
];

export default function AccountPage() {
    const [activeTab, setActiveTab] = useState('orders');
    const { wishlist } = useWishlist();

    const tabs = [
        { id: 'orders', label: 'Orders' },
        { id: 'wishlist', label: 'Wishlist' },
        { id: 'profile', label: 'Profile' },
        { id: 'addresses', label: 'Addresses' },
    ];

    return (
        <div className="min-h-screen bg-ivory py-12">
            <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
                <h1 className="font-display text-4xl mb-8">My Account</h1>

                {/* Tabs */}
                <div className="border-b border-noir-200 mb-8">
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 font-medium transition-colors relative ${activeTab === tab.id
                                    ? 'text-noir-900'
                                    : 'text-noir-500 hover:text-noir-900'
                                    }`}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-noir-900"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'orders' && <OrdersTab orders={MOCK_ORDERS} />}
                    {activeTab === 'wishlist' && <WishlistTab wishlist={wishlist} />}
                    {activeTab === 'profile' && <ProfileTab />}
                    {activeTab === 'addresses' && <AddressesTab />}
                </motion.div>
            </div>
        </div>
    );
}

function OrdersTab({ orders }) {
    return (
        <div className="space-y-4">
            {orders.map((order) => (
                <div
                    key={order.id}
                    className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-semibold text-lg mb-1">Order {order.id}</h3>
                            <p className="text-sm text-noir-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                                }`}
                        >
                            {order.status}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-noir-700">
                            {order.items} item{order.items > 1 ? 's' : ''} • ${order.total.toFixed(2)}
                        </div>
                        <button className="text-sm font-medium text-noir-900 hover:text-gold-600 transition-colors">
                            View Details →
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function WishlistTab({ wishlist }) {
    if (wishlist.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-lg text-noir-600 mb-4">Your wishlist is empty</p>
                <p className="text-sm text-noir-500">
                    Save items you love to your wishlist
                </p>
            </div>
        );
    }

    return <ProductGrid products={wishlist} />;
}

function ProfileTab() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="max-w-2xl">
            <div className="bg-white rounded-lg p-8 shadow-md">
                <h2 className="text-2xl font-display mb-6">Personal Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                            className="w-full px-4 py-3 border border-noir-300 rounded-md bg-pearl-100 text-noir-600 cursor-not-allowed"
                        />
                        <p className="text-xs text-noir-500 mt-1">Email cannot be changed</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Account Type</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
                            disabled
                            className="w-full px-4 py-3 border border-noir-300 rounded-md bg-pearl-100 text-noir-600 cursor-not-allowed"
                        />
                    </div>

                    <div className="pt-4 border-t border-noir-200">
                        <p className="text-sm text-noir-600 mb-4">
                            Member since: {new Date(user?.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-noir-900 text-ivory rounded-md font-medium hover:bg-noir-800 transition-colors"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="px-6 py-3 bg-red-600 text-white rounded-md font-medium hover:bg-red-700 transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function AddressesTab() {
    const addresses = [
        {
            id: 1,
            type: 'Home',
            name: 'John Doe',
            address: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            isDefault: true,
        },
        {
            id: 2,
            type: 'Work',
            name: 'John Doe',
            address: '456 Office Blvd',
            city: 'New York',
            state: 'NY',
            zip: '10002',
            isDefault: false,
        },
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
                <div
                    key={addr.id}
                    className="bg-white rounded-lg p-6 shadow-md relative"
                >
                    {addr.isDefault && (
                        <span className="absolute top-4 right-4 px-2 py-1 bg-gold-500 text-white text-xs rounded">
                            Default
                        </span>
                    )}
                    <h3 className="font-semibold mb-2">{addr.type}</h3>
                    <p className="text-noir-700 text-sm">
                        {addr.name}
                        <br />
                        {addr.address}
                        <br />
                        {addr.city}, {addr.state} {addr.zip}
                    </p>
                    <div className="flex gap-4 mt-4">
                        <button className="text-sm text-noir-900 hover:text-gold-600 transition-colors">
                            Edit
                        </button>
                        <button className="text-sm text-noir-600 hover:text-red-600 transition-colors">
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <button className="bg-white rounded-lg p-6 shadow-md border-2 border-dashed border-noir-300 hover:border-noir-900 transition-colors flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                    <span className="text-4xl text-noir-400 mb-2 block">+</span>
                    <span className="text-sm font-medium text-noir-700">Add New Address</span>
                </div>
            </button>
        </div>
    );
}
