import { useState } from 'react';
import { orderAPI } from './orderAPI';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.getOrders();
      setOrders(data);
      return data;
    } catch (err) {
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.getOrderById(orderId);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.createOrder(orderData);

      setOrders(prev => [data, ...prev]);

      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.cancelOrder(orderId);

      setOrders(prev =>
        prev.map(order =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );

      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const trackOrder = async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderAPI.trackOrder(orderId);
      return data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    getOrderById,
    createOrder,
    cancelOrder,
    trackOrder,
  };
}
