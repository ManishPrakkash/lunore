import PropTypes from 'prop-types';
import ProductTile from './ProductTile';
import { cn } from '../../utils/cn';

export default function ProductGrid({ products, className }) {
    return (
        <div
            className={cn(
                'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12',
                className
            )}
        >
            {products.map((product) => (
                <ProductTile
                    key={product._id}
                    product={product}
                    aspectRatio="portrait"
                />
            ))}
        </div>
    );
}

ProductGrid.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })
    ).isRequired,
    className: PropTypes.string,
};
