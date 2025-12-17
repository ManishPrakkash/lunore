import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductGrid from '../components/product/ProductGrid';
import RevealOnScroll from '../components/animations/RevealOnScroll';
import apiClient from '../services/apiClient';

export default function CategoryPage() {
    const { category } = useParams();
    const [sortBy, setSortBy] = useState('featured');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            let response;

            if (category) {
                response = await apiClient.get(`/products/category/${category}`);
            } else {
                response = await apiClient.get('/products');
            }

            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const categoryName = category
        ? category.charAt(0).toUpperCase() + category.slice(1)
        : 'New Arrivals';

    return (
        <div className="min-h-screen bg-ivory">
            {/* Hero Banner */}
            <section className="relative h-[40vh] flex items-center justify-center bg-noir-900 text-ivory overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
                        alt={categoryName}
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display text-5xl md:text-6xl mb-4"
                    >
                        {categoryName}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-pearl-300"
                    >
                        {products.length} Products
                    </motion.p>
                </div>
            </section>

            {/* Filters & Sort */}
            <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    {/* Filter buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-noir-900 text-ivory rounded-md text-sm font-medium">
                            All
                        </button>
                        <button className="px-4 py-2 bg-transparent border border-noir-300 text-noir-900 rounded-md text-sm font-medium hover:border-noir-900 transition-colors">
                            Casual
                        </button>
                        <button className="px-4 py-2 bg-transparent border border-noir-300 text-noir-900 rounded-md text-sm font-medium hover:border-noir-900 transition-colors">
                            Formal
                        </button>
                        <button className="px-4 py-2 bg-transparent border border-noir-300 text-noir-900 rounded-md text-sm font-medium hover:border-noir-900 transition-colors">
                            Sale
                        </button>
                    </div>

                    {/* Sort dropdown */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-noir-300 rounded-md text-sm font-medium focus:outline-none focus:border-noir-900 transition-colors"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>

                {/* Product Grid */}
                <RevealOnScroll>
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-noir-600">Loading products...</p>
                        </div>
                    ) : products.length > 0 ? (
                        <ProductGrid products={products} />
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-noir-600">No products found in this category</p>
                        </div>
                    )}
                </RevealOnScroll>
            </div>
        </div>
    );
}
