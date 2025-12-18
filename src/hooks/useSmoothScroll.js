import { useEffect, useRef } from 'react';

/**
 * Custom hook for smooth scrolling that normalizes mouse wheel and trackpad behavior
 * 
 * @param {Object} options - Configuration options
 * @param {number} options.smoothness - Easing factor (0-1), lower = smoother but slower. Default: 0.1
 * @param {number} options.multiplier - Scroll speed multiplier. Default: 1
 * @param {boolean} options.enabled - Enable/disable smooth scroll. Default: true
 */
export const useSmoothScroll = (options = {}) => {
    const {
        smoothness = 0.1,
        multiplier = 1,
        enabled = true
    } = options;

    const scrollDataRef = useRef({
        current: 0,
        target: 0,
        ease: smoothness,
        rafId: null,
        isScrolling: false
    });

    useEffect(() => {
        if (!enabled) return;

        const data = scrollDataRef.current;

        // Initialize scroll position
        data.current = window.scrollY;
        data.target = window.scrollY;

        // Smooth scroll animation using requestAnimationFrame
        const animate = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

            // Clamp target scroll between 0 and max scrollable height
            data.target = Math.max(0, Math.min(data.target, maxScroll));

            // Lerp (linear interpolation) for smooth easing
            data.current += (data.target - data.current) * data.ease;

            // Apply scroll
            window.scrollTo(0, data.current);

            // Continue animation if still scrolling
            if (Math.abs(data.target - data.current) > 0.5) {
                data.rafId = requestAnimationFrame(animate);
                data.isScrolling = true;
            } else {
                data.isScrolling = false;
                data.current = data.target; // Snap to final position
            }
        };

        // Wheel event handler
        const handleWheel = (e) => {
            e.preventDefault();

            // Normalize deltaY across different browsers and devices
            let delta = e.deltaY;

            // Firefox uses different delta values
            if (e.deltaMode === 1) {
                delta *= 33; // Line mode
            } else if (e.deltaMode === 2) {
                delta *= window.innerHeight; // Page mode
            }

            // Apply multiplier and update target
            data.target += delta * multiplier;

            // Start animation if not already running
            if (!data.isScrolling) {
                data.rafId = requestAnimationFrame(animate);
            }
        };

        // Touch support for mobile devices
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            const touchY = e.touches[0].clientY;
            const delta = touchStartY - touchY;
            touchStartY = touchY;

            data.target += delta * 2; // Touch scroll multiplier

            if (!data.isScrolling) {
                data.rafId = requestAnimationFrame(animate);
            }
        };

        // Keyboard navigation support
        const handleKeyDown = (e) => {
            const keyScrollMap = {
                'ArrowDown': window.innerHeight * 0.3,
                'ArrowUp': -window.innerHeight * 0.3,
                'PageDown': window.innerHeight * 0.9,
                'PageUp': -window.innerHeight * 0.9,
                'Space': window.innerHeight * 0.9,
                'Home': -data.target,
                'End': document.documentElement.scrollHeight
            };

            const scrollAmount = keyScrollMap[e.key];
            if (scrollAmount !== undefined) {
                e.preventDefault();
                data.target += scrollAmount;

                if (!data.isScrolling) {
                    data.rafId = requestAnimationFrame(animate);
                }
            }
        };

        // Handle window resize
        const handleResize = () => {
            data.current = window.scrollY;
            data.target = window.scrollY;
        };

        // Attach event listeners
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchmove', handleTouchMove, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', handleResize);

            if (data.rafId) {
                cancelAnimationFrame(data.rafId);
            }
        };
    }, [enabled, smoothness, multiplier]);

    // Return current scroll position for use in components
    return scrollDataRef.current.current;
};

export default useSmoothScroll;
