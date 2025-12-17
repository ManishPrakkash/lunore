import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import RatingStars from '../../components/ui/RatingStars';
import Loader from '../../components/common/Loader';
import { useProducts } from './useProducts';
import { useCart } from '../cart/useCart';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading, error } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const data = await getProductById(id);
    setProduct(data);
    if (data?.images?.length > 0) {
      setSelectedImage(0);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      navigate('/cart');
    }
  };

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  if (loading) return <Loader text="Loading product details..." />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  const { name, price, description, rating, images, category, stock, discount } = product;
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Products
      </button>

      <div className="product-details-content">
        {/* Image Gallery */}
        <div className="product-images">
          <div className="main-image">
            <img 
              src={images?.[selectedImage] || '/placeholder.jpg'} 
              alt={name} 
            />
            {discount && <span className="discount-badge">{discount}% OFF</span>}
          </div>
          {images && images.length > 1 && (
            <div className="thumbnail-images">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${name} ${index + 1}`}
                  className={selectedImage === index ? 'active' : ''}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info-section">
          <h1 className="product-name">{name}</h1>
          
          <div className="product-rating">
            <RatingStars rating={rating} />
          </div>

          <div className="product-price-section">
            <span className="current-price">₹{discountedPrice.toFixed(2)}</span>
            {discount && (
              <>
                <span className="original-price">₹{price.toFixed(2)}</span>
                <span className="discount-text">Save {discount}%</span>
              </>
            )}
          </div>

          <div className="product-meta">
            <p><strong>Category:</strong> {category}</p>
            <p className={stock > 0 ? 'in-stock' : 'out-of-stock'}>
              <strong>Availability:</strong> {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
            </p>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label>Quantity:</label>
              <button onClick={() => handleQuantityChange(-1)}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>

            <Button 
              onClick={handleAddToCart}
              variant="primary"
              disabled={stock === 0}
            >
              Add to Cart
            </Button>

            <Button variant="secondary" onClick={() => navigate('/checkout')}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
