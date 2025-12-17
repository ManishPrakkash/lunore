import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function PageTransition({ children }) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}

PageTransition.propTypes = {
    children: PropTypes.node.isRequired,
};
