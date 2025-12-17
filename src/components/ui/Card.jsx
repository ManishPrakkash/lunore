import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function Card({ children, className, hover = true, ...props }) {
    return (
        <motion.div
            className={cn(
                'bg-white rounded-lg shadow-md overflow-hidden',
                className
            )}
            whileHover={hover ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' } : {}}
            transition={{ duration: 0.3 }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

Card.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    hover: PropTypes.bool,
};
