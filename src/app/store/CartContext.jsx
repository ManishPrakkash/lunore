import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiClient from '../../services/apiClient';
import { toastMessages } from '../../utils/toast';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Get userId from localStorage
    const getUserId = () => {
        const userId = localStorage.getItem('lunoré_userId');
        return userId || null;
    };

    // Load cart from server on mount and when user logs in
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const userId = getUserId();
        if (!userId) {
            setLoading(false);
            return;
        }

        try {
            const response = await apiClient.get(`/cart/${userId}`);
            if (response.data.success) {
                // Fetch full product details for each cart item
                const cartItems = await Promise.all(
                    response.data.cart.map(async (item) => {
                        try {
                            const productResponse = await apiClient.get(`/products/${item.productId}`);
                            return {
                                ...productResponse.data.product,
                                quantity: item.quantity,
                                variant: item.variant
                            };
                        } catch (error) {
                            console.error(`Failed to fetch product ${item.productId}:`, error);
                            return null;
                        }
                    })
                );
                setCart(cartItems.filter(item => item !== null));
            }
        } catch (error) {
            console.error('Failed to fetch cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (product, quantity = 1, variant = null) => {
        const userId = getUserId();
        if (!userId) {
            toastMessages.loginRequired();
            return;
        }

        try {
            // Add to server
            await apiClient.post(`/cart/${userId}/add`, {
                productId: product._id,
                quantity,
                variant
            });

            // Update local state
            setCart((prevCart) => {
                const existingItemIndex = prevCart.findIndex(
                    (item) =>
                        item._id === product._id &&
                        JSON.stringify(item.variant) === JSON.stringify(variant)
                );

                if (existingItemIndex > -1) {
                    const newCart = [...prevCart];
                    newCart[existingItemIndex].quantity += quantity;
                    return newCart;
                }

                return [...prevCart, { ...product, quantity, variant }];
            });

            // Show success toast
            toastMessages.addedToCart(product.name);
        } catch (error) {
            console.error('Failed to add to cart:', error);
            toastMessages.error('Failed to add item to cart');
        }
    };

    const removeFromCart = async (productId, variant = null) => {
        const userId = getUserId();
        if (!userId) return;

        try {
            // Remove from server
            const params = variant ? { variant: JSON.stringify(variant) } : {};
            await apiClient.delete(`/cart/${userId}/remove/${productId}`, { params });

            // Update local state
            setCart((prevCart) =>
                prevCart.filter(
                    (item) =>
                        !(
                            item._id === productId &&
                            JSON.stringify(item.variant) === JSON.stringify(variant)
                        )
                )
            );
        } catch (error) {
            console.error('Failed to remove from cart:', error);
        }
    };

    const updateQuantity = async (productId, variant, quantity) => {
        const userId = getUserId();
        if (!userId) return;

        if (quantity <= 0) {
            removeFromCart(productId, variant);
            return;
        }

        try {
            // Update on server
            await apiClient.put(`/cart/${userId}/update`, {
                productId,
                quantity,
                variant
            });

            // Update local state
            setCart((prevCart) =>
                prevCart.map((item) =>
                    item._id === productId &&
                        JSON.stringify(item.variant) === JSON.stringify(variant)
                        ? { ...item, quantity }
                        : item
                )
            );
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const clearCart = async () => {
        const userId = getUserId();
        if (!userId) return;

        try {
            await apiClient.delete(`/cart/${userId}/clear`);
            setCart([]);
        } catch (error) {
            console.error('Failed to clear cart:', error);
        }
    };

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        cartItemCount,
        cartTotal,
        loading,
        refreshCart: fetchCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
