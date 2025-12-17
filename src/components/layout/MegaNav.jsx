import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function MegaNav({ isOpen, onClose }) {
    const categories = [
        {
            name: 'Shirts',
            path: '/category/shirts',
            image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&q=80',
            subcategories: ['Casual Shirts', 'Dress Shirts', 'Polo Shirts', 'Linen Shirts'],
        },
        {
            name: 'Shoes',
            path: '/category/shoes',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&q=80',
            subcategories: ['Sneakers', 'Oxfords', 'Loafers', 'Boots'],
        },
        {
            name: 'Accessories',
            path: '/category/accessories',
            image: 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&q=80',
            subcategories: ['Belts', 'Wallets', 'Scarves', 'Sunglasses'],
        },
    ];

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-noir-200 shadow-luxury"
        >
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
                <div className="grid grid-cols-3 gap-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Featured image */}
                            <Link
                                to={category.path}
                                className="block mb-6 group"
                                onClick={onClose}
                            >
                                <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-gold-600 transition-colors">
                                    {category.name}
                                </h3>
                            </Link>

                            {/* Subcategories */}
                            <ul className="space-y-2">
                                {category.subcategories.map((sub) => (
                                    <li key={sub}>
                                        <Link
                                            to={`${category.path}/${sub.toLowerCase().replace(' ', '-')}`}
                                            className="text-sm text-noir-600 hover:text-noir-900 transition-colors"
                                            onClick={onClose}
                                        >
                                            {sub}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

MegaNav.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
