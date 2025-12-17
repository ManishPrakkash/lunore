import apiClient from '../../services/apiClient';

export const productAPI = {
  getAllProducts: async (params = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await apiClient.get(`/products?${queryString}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch products';
    }
  },

  getProductById: async (id) => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch product';
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await apiClient.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Search failed';
    }
  },

  getProductsByCategory: async (category) => {
    try {
      const response = await apiClient.get(`/products/category/${category}`);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch products';
    }
  },

  getCategories: async () => {
    try {
      const response = await apiClient.get('/products/categories');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch categories';
    }
  },

  getFeaturedProducts: async () => {
    try {
      const response = await apiClient.get('/products/featured');
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to fetch featured products';
    }
  },
};
