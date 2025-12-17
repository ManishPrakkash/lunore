import apiClient from '../../services/apiClient';

export const orderAPI = {
  createOrder: async (orderData) => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to create order';
    }
  },

  getOrders: async () => {
    try {
      const response = await apiClient.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch orders';
    }
  },

  getOrderById: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch order';
    }
  },

  cancelOrder: async (orderId) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to cancel order';
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const response = await apiClient.put(`/orders/${orderId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update order status';
    }
  },

  trackOrder: async (orderId) => {
    try {
      const response = await apiClient.get(`/orders/${orderId}/track`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to track order';
    }
  },
};
