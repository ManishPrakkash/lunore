import toast from 'react-hot-toast';

// Custom toast styles matching Lunoré color scheme
const toastStyles = {
    success: {
        style: {
            background: '#1a1a1a', // noir-900
            color: '#f5f5f0', // ivory
            border: '1px solid #d4af37', // gold-500
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        iconTheme: {
            primary: '#d4af37', // gold-500
            secondary: '#f5f5f0', // ivory
        },
    },
    error: {
        style: {
            background: '#1a1a1a', // noir-900
            color: '#f5f5f0', // ivory
            border: '1px solid #ef4444', // red
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        iconTheme: {
            primary: '#ef4444',
            secondary: '#f5f5f0',
        },
    },
    loading: {
        style: {
            background: '#1a1a1a', // noir-900
            color: '#e5e5dc', // pearl-300
            border: '1px solid #4a4a4a', // noir-700
            padding: '16px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
        },
        iconTheme: {
            primary: '#d4af37', // gold-500
            secondary: '#1a1a1a', // noir-900
        },
    },
};

// Custom toast functions
export const showSuccessToast = (message) => {
    toast.success(message, toastStyles.success);
};

export const showErrorToast = (message) => {
    toast.error(message, toastStyles.error);
};

export const showLoadingToast = (message) => {
    return toast.loading(message, toastStyles.loading);
};

export const dismissToast = (toastId) => {
    toast.dismiss(toastId);
};

// Specific toast messages for common actions
export const toastMessages = {
    loginRequired: () => showErrorToast('Please login to add items to cart'),
    addedToCart: (productName) => showSuccessToast(`${productName} added to cart`),
    removedFromCart: (productName) => showSuccessToast(`${productName} removed from cart`),
    cartUpdated: () => showSuccessToast('Cart updated successfully'),
    cartCleared: () => showSuccessToast('Cart cleared'),
    addedToWishlist: (productName) => showSuccessToast(`${productName} added to wishlist`),
    removedFromWishlist: (productName) => showSuccessToast(`${productName} removed from wishlist`),
    loginSuccess: () => showSuccessToast('Welcome back!'),
    logoutSuccess: () => showSuccessToast('Logged out successfully'),
    registrationSuccess: () => showSuccessToast('Account created successfully!'),
    error: (message) => showErrorToast(message || 'Something went wrong'),
};

export default toast;
