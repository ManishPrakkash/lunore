import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../app/store/CartContext';
import { useWishlist } from '../app/store/WishlistContext';
import apiClient from '../services/apiClient';

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState('description');

    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    useEffect(() => {
        fetchProductDetails();
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            setLoading(true);

            const response = await apiClient.get(`/products/${id}`);
            const productData = response.data.product;

            if (!productData) {
                navigate('/');
                return;
            }

            setProduct(productData);

            if (productData.colors && productData.colors.length > 0) {
                setSelectedColor(productData.colors[0]);
            }

            if (productData.category) {
                const relatedResponse = await apiClient.get(`/products/category/${productData.category.toLowerCase()}`);
                const related = relatedResponse.data.products
                    .filter(p => p._id !== productData._id)
                    .slice(0, 4);
                setRelatedProducts(related);
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
            navigate('/');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;

        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert('Please select a size');
            return;
        }

        const variant = {};
        if (selectedSize) variant.size = selectedSize;
        if (selectedColor) variant.color = selectedColor.name;

        addToCart(product, quantity, Object.keys(variant).length > 0 ? variant : null);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <p className="text-noir-600">Loading product details...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-ivory flex items-center justify-center">
                <p className="text-noir-600">Product not found</p>
            </div>
        );
    }

    const images = [];
    if (product.image) images.push(product.image);
    if (product.hoverImage) images.push(product.hoverImage);
    if (product.images && Array.isArray(product.images)) {
        images.push(...product.images);
    }
    if (images.length === 0) {
        images.push('https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80');
    }

    return (
        <div className="min-h-screen bg-ivory">
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-12">
                {/* Breadcrumb */}
                <nav className="mb-8 text-sm">
                    <Link to="/" className="text-noir-600 hover:text-noir-900">
                        Home
                    </Link>
                    <span className="mx-2 text-noir-400">/</span>
                    <Link
                        to={`/category/${product.category.toLowerCase()}`}
                        className="text-noir-600 hover:text-noir-900"
                    >
                        {product.category}
                    </Link>
                    <span className="mx-2 text-noir-400">/</span>
                    <span className="text-noir-900">{product.name}</span>
                </nav>

                {/* Product Content */}
                <div className="grid lg:grid-cols-2 gap-12 mb-24">
                    {/* Image Gallery */}
                    <div>
                        {/* Main Image */}
                        <motion.div
                            key={selectedImage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="aspect-[3/4] mb-4 overflow-hidden rounded-lg"
                        >
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${selectedImage === index
                                            ? 'border-noir-900'
                                            : 'border-transparent hover:border-noir-400'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`View ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <h1 className="font-display text-4xl mb-4">{product.name}</h1>

                        {product.badge && (
                            <span className="inline-block px-3 py-1 bg-gold-500 text-noir-900 text-sm font-medium rounded-full mb-4">
                                {product.badge}
                            </span>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-semibold">${product.price}</span>
                            {product.originalPrice && (
                                <span className="text-xl text-noir-500 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-noir-700 mb-8">{product.description}</p>

                        {/* Stock Info */}
                        {product.stock !== undefined && (
                            <p className="text-sm text-noir-600 mb-4">
                                {product.stock > 0 ? (
                                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </p>
                        )}

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3">
                                    Color: {selectedColor?.name}
                                </label>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color)}
                                            className={`w-12 h-12 rounded-full border-2 transition-all ${selectedColor?.name === color.name
                                                ? 'border-noir-900 scale-110'
                                                : 'border-noir-300 hover:border-noir-600'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            aria-label={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-3">Size</label>
                                <div className="grid grid-cols-6 gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`py-3 text-sm font-medium rounded-md border-2 transition-colors ${selectedSize === size
                                                ? 'border-noir-900 bg-noir-900 text-ivory'
                                                : 'border-noir-300 hover:border-noir-900'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-8">
                            <label className="block text-sm font-medium mb-3">Quantity</label>
                            <div className="flex items-center border border-noir-300 rounded-md w-32">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 hover:bg-noir-100 transition-colors"
                                >
                                    −
                                </button>
                                <span className="flex-1 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock || 999, quantity + 1))}
                                    className="px-4 py-2 hover:bg-noir-100 transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1"
                                onClick={handleAddToCart}
                                disabled={product.stock === 0}
                            >
                                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                            <button
                                onClick={() => toggleWishlist(product)}
                                className="w-14 h-14 flex items-center justify-center border-2 border-noir-900 rounded-md hover:bg-noir-900 hover:text-ivory transition-colors"
                                aria-label="Add to wishlist"
                            >
                                <HeartIcon filled={isInWishlist(product._id)} />
                            </button>
                        </div>

                        {/* Accordion Details */}
                        <div className="border-t border-noir-200">
                            <AccordionItem
                                title="Description"
                                isActive={activeAccordion === 'description'}
                                onClick={() =>
                                    setActiveAccordion(
                                        activeAccordion === 'description' ? '' : 'description'
                                    )
                                }
                            >
                                <p className="text-noir-700">{product.description}</p>
                            </AccordionItem>

                            {product.details && Object.keys(product.details).length > 0 && (
                                <AccordionItem
                                    title="Details"
                                    isActive={activeAccordion === 'details'}
                                    onClick={() =>
                                        setActiveAccordion(activeAccordion === 'details' ? '' : 'details')
                                    }
                                >
                                    <dl className="space-y-2">
                                        {Object.entries(product.details).map(([key, value]) => (
                                            <div key={key} className="flex">
                                                <dt className="w-32 text-noir-600 capitalize">{key}:</dt>
                                                <dd className="text-noir-900">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </AccordionItem>
                            )}

                            <AccordionItem
                                title="Shipping & Returns"
                                isActive={activeAccordion === 'shipping'}
                                onClick={() =>
                                    setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')
                                }
                            >
                                <p className="text-noir-700">
                                    Free shipping on orders over $200. Returns accepted within 30 days.
                                </p>
                            </AccordionItem>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="font-display text-3xl mb-8">You May Also Like</h2>
                        <ProductGrid products={relatedProducts} />
                    </section>
                )}
            </div>
        </div>
    );
}

function AccordionItem({ title, isActive, onClick, children }) {
    return (
        <div className="border-b border-noir-200">
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between py-4 text-left font-medium hover:text-gold-600 transition-colors"
            >
                <span>{title}</span>
                <motion.span
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    ▼
                </motion.span>
            </button>
            <motion.div
                initial={false}
                animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                <div className="pb-4">{children}</div>
            </motion.div>
        </div>
    );
}

function HeartIcon({ filled }) {
    return (
        <svg className="w-6 h-6" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
        </svg>
    );
}
