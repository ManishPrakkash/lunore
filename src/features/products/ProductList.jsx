import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import ProductFilters from '../../components/ui/ProductFilters';
import Loader from '../../components/common/Loader';
import apiClient from '../../services/apiClient';
import './ProductList.css';

function ProductList() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [200, 1150],
    rating: 4,
    brands: [],
    delivery: 'standard',
  });

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, category]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (category) params.category = category;

      const response = await apiClient.get('/products', { params });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) return <Loader text="Loading products..." />;

  return (
    <div className="product-list-container">
      <div className="product-list-content">
        {/* Filters Sidebar */}
        <aside className="filters-sidebar">
          <ProductFilters onFilterChange={handleFilterChange} />
        </aside>

        {/* Products Grid */}
        <div className="products-section">
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isTopItem={product.badge === 'Top Item'}
                />
              ))
            ) : (
              <div className="no-products">No products found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
