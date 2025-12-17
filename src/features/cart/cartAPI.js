import apiClient from '../../services/apiClient';

export const cartAPI = {
  getCart: async () => {
    try {
      const response = await apiClient.get('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch cart';
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await apiClient.post('/cart/add', {
        productId,
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add to cart';
    }
  },

  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await apiClient.put(`/cart/items/${itemId}`, {
        quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update cart';
    }
  },

  removeFromCart: async (itemId) => {
    try {
      const response = await apiClient.delete(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove from cart';
    }
  },

  clearCart: async () => {
    try {
      const response = await apiClient.delete('/cart');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear cart';
    }
  },

  syncCart: async (localCart) => {
    try {
      const response = await apiClient.post('/cart/sync', { items: localCart });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to sync cart';
    }
  },
};
