import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';
import { useWishlist } from '../../app/store/WishlistContext';
import { useCart } from '../../app/store/CartContext';

export default function ProductTile({ product, className, aspectRatio = 'portrait' }) {
    const [isHovered, setIsHovered] = useState(false);
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    const aspectRatios = {
        portrait: 'aspect-[3/4]',
        square: 'aspect-square',
        landscape: 'aspect-[4/3]',
    };

    const handleQuickAdd = (e) => {
        e.preventDefault();
        addToCart(product, 1);
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        toggleWishlist(product);
    };

    return (
        <motion.div
            className={cn('group relative', className)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link to={`/product/${product._id}`} className="block">
                {/* Image container - consistent aspect ratio */}
                <div className="relative overflow-hidden rounded-lg mb-4 aspect-[3/4]">

                    {/* Primary image */}
                    <motion.img
                        src={product.image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{ opacity: isHovered && product.hoverImage ? 0 : 1 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* Hover image */}
                    {product.hoverImage && (
                        <motion.img
                            src={product.hoverImage}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}

                    {/* Overlay on hover */}
                    <motion.div
                        className="absolute inset-0 bg-noir-900/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Quick add button */}
                    <motion.button
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-ivory text-noir-900 text-sm font-medium rounded-md shadow-lg hover:bg-gold-500 transition-colors"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleQuickAdd}
                    >
                        Quick Add
                    </motion.button>

                    {/* Wishlist button */}
                    <button
                        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-ivory/90 rounded-full shadow-md hover:bg-ivory transition-colors"
                        onClick={handleWishlistToggle}
                    >
                        <HeartIcon filled={isInWishlist(product._id)} />
                    </button>

                    {/* Badge (if on sale, new, etc.) */}
                    {product.badge && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-noir-900 text-ivory text-xs font-medium rounded-md">
                            {product.badge}
                        </div>
                    )}
                </div>

                {/* Product info */}
                <div className="space-y-1">
                    <h3 className="text-sm font-medium text-noir-900 group-hover:text-gold-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-noir-600">{product.category}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-noir-900">
                            ${product.price}
                        </span>
                        {product.originalPrice && (
                            <span className="text-sm text-noir-500 line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

ProductTile.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        hoverImage: PropTypes.string,
        category: PropTypes.string,
        badge: PropTypes.string,
        originalPrice: PropTypes.number,
    }).isRequired,
    className: PropTypes.string,
    aspectRatio: PropTypes.oneOf(['portrait', 'square', 'landscape']),
};

function HeartIcon({ filled }) {
    return (
        <svg
            className="w-5 h-5"
            fill={filled ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}

HeartIcon.propTypes = {
    filled: PropTypes.bool,
};
