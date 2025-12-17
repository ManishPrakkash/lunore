import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../services/apiClient';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        category: 'Shirts',
        price: '',
        originalPrice: '',
        image: '',
        hoverImage: '',
        description: '',
        stock: '',
        featured: false,
        badge: ''
    });

    useEffect(() => {
        if (!isAuthenticated || user?.role !== 'admin') {
            navigate('/');
            return;
        }
        fetchProducts();
    }, [isAuthenticated, user, navigate]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/products');
            setProducts(response.data.products || []);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const productData = {
                ...formData,
                price: parseFloat(formData.price),
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                stock: parseInt(formData.stock),
                badge: formData.badge || null
            };

            if (editingProduct) {
                await apiClient.put(`/products/${editingProduct._id}`, productData);
            } else {
                await apiClient.post('/products', productData);
            }

            setFormData({
                name: '',
                category: 'Shirts',
                price: '',
                originalPrice: '',
                image: '',
                hoverImage: '',
                description: '',
                stock: '',
                featured: false,
                badge: ''
            });
            setShowAddForm(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Failed to save product:', error);
            alert('Failed to save product: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            originalPrice: product.originalPrice?.toString() || '',
            image: product.image,
            hoverImage: product.hoverImage || '',
            description: product.description,
            stock: product.stock.toString(),
            featured: product.featured,
            badge: product.badge || ''
        });
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            await apiClient.delete(`/products/${id}`);
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete product:', error);
            alert('Failed to delete product');
        }
    };

    const cancelForm = () => {
        setShowAddForm(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            category: 'Shirts',
            price: '',
            originalPrice: '',
            image: '',
            hoverImage: '',
            description: '',
            stock: '',
            featured: false,
            badge: ''
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-pearl-100 flex items-center justify-center">
                <div className="text-noir-900">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pearl-100 py-12 px-6">
            <div className="max-w-screen-xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-display text-noir-900 mb-2">Admin Dashboard</h1>
                    <p className="text-noir-600">Manage your product catalog</p>
                </motion.div>

                <div className="mb-6">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-6 py-3 bg-noir-900 text-ivory rounded-md font-medium hover:bg-noir-800 transition-colors"
                    >
                        {showAddForm ? 'Cancel' : '+ Add New Product'}
                    </button>
                </div>

                {showAddForm && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-white rounded-lg shadow-lg p-8 mb-8"
                    >
                        <h2 className="text-2xl font-display mb-6">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    >
                                        <option value="Shirts">Shirts</option>
                                        <option value="Shoes">Shoes</option>
                                        <option value="Accessories">Accessories</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Original Price (optional)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Image URL</label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Hover Image URL (optional)</label>
                                <input
                                    type="url"
                                    name="hoverImage"
                                    value={formData.hoverImage}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Stock</label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Badge (optional)</label>
                                    <input
                                        type="text"
                                        name="badge"
                                        value={formData.badge}
                                        onChange={handleInputChange}
                                        placeholder="e.g., New, Sale"
                                        className="w-full px-4 py-3 border border-noir-300 rounded-md focus:outline-none focus:border-noir-900"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleInputChange}
                                    className="mr-2"
                                />
                                <label className="text-sm font-medium">Featured Product</label>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-noir-900 text-ivory rounded-md font-medium hover:bg-noir-800 transition-colors"
                                >
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={cancelForm}
                                    className="px-6 py-3 bg-pearl-300 text-noir-900 rounded-md font-medium hover:bg-pearl-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-noir-900 text-ivory">
                            <tr>
                                <th className="px-6 py-4 text-left">Image</th>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-left">Category</th>
                                <th className="px-6 py-4 text-left">Price</th>
                                <th className="px-6 py-4 text-left">Stock</th>
                                <th className="px-6 py-4 text-left">Featured</th>
                                <th className="px-6 py-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <motion.tr
                                    key={product._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-pearl-200 hover:bg-pearl-50"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-medium">{product.name}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">
                                        ${product.price}
                                        {product.originalPrice && (
                                            <span className="text-sm text-noir-500 line-through ml-2">
                                                ${product.originalPrice}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        {product.featured ? (
                                            <span className="text-gold-600">★</span>
                                        ) : (
                                            <span className="text-noir-300">☆</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="px-3 py-1 bg-gold-500 text-noir-900 rounded hover:bg-gold-600 transition-colors text-sm"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-sm"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
