import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PropTypes from 'prop-types';

export default function RevealOnScroll({
    children,
    delay = 0,
    duration = 0.6,
    threshold = 0.1,
    className,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: threshold });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

RevealOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    threshold: PropTypes.number,
    className: PropTypes.string,
};
