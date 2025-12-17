import { useState, useEffect } from 'react';
import { useOrders } from './useOrders';
import Loader from '../../components/common/Loader';
import Button from '../../components/common/Button';
import './Orders.css';

function Orders() {
  const { orders, loading, error, fetchOrders } = useOrders();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      processing: 'blue',
      shipped: 'purple',
      delivered: 'green',
      cancelled: 'red',
    };
    return colors[status] || 'gray';
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  if (loading) return <Loader text="Loading your orders..." />;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2 className="orders-title">My Orders</h2>
        
        <div className="orders-filter">
          <button 
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'delivered' ? 'active' : ''}
            onClick={() => setFilter('delivered')}
          >
            Delivered
          </button>
          <button 
            className={filter === 'cancelled' ? 'active' : ''}
            onClick={() => setFilter('cancelled')}
          >
            Cancelled
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders found</h3>
          <p>Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header-row">
                <div className="order-info">
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <p className="item-name">{item.name}</p>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">₹{item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-total">
                  <strong>Total: ₹{order.total.toFixed(2)}</strong>
                </div>
                <div className="order-actions">
                  <Button size="small" variant="secondary">
                    View Details
                  </Button>
                  {order.status === 'delivered' && (
                    <Button size="small" variant="primary">
                      Reorder
                    </Button>
                  )}
                  {order.status === 'pending' && (
                    <Button size="small" variant="danger">
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
