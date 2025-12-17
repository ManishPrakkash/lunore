import { useState, useEffect } from 'react';
import { productAPI } from './productAPI';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getAllProducts(params);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getProductById(id);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.searchProducts(query);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getProductsByCategory(category);
      setProducts(data);
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productAPI.getFeaturedProducts();
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts,
  };
}
