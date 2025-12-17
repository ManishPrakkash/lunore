import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * Custom hook for scroll-based reveal animations
 * @param {Object} options - Options for intersection observer
 * @returns {Object} - { ref, isInView }
 */
export default function useScrollReveal(options = {}) {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: true,
        amount: 0.1,
        ...options,
    });

    return { ref, isInView };
}
