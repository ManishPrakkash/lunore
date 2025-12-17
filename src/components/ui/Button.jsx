import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { cn } from '../../utils/cn';

const Button = forwardRef(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            className,
            disabled,
            loading,
            as: Component = 'button',
            ...props
        },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2';

        const variants = {
            primary:
                'bg-noir-900 text-ivory hover:bg-noir-800 focus:ring-noir-900',
            secondary:
                'bg-transparent text-noir-900 border-2 border-noir-900 hover:bg-noir-900 hover:text-ivory focus:ring-noir-900',
            ghost: 'bg-transparent text-noir-900 hover:bg-noir-100 focus:ring-noir-900',
            link: 'bg-transparent text-noir-900 underline-offset-4 hover:underline',
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm rounded-md',
            md: 'px-6 py-3 text-base rounded-md',
            lg: 'px-8 py-4 text-lg rounded-lg',
        };

        const MotionComponent = motion(Component);

        return (
            <MotionComponent
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || loading}
                whileHover={{ scale: disabled ? 1 : 1.02 }}
                whileTap={{ scale: disabled ? 1 : 0.98 }}
                {...props}
            >
                {loading ? (
                    <>
                        <Spinner className="mr-2" />
                        Loading...
                    </>
                ) : (
                    children
                )}
            </MotionComponent>
        );
    }
);

Button.displayName = 'Button';

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'link']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    as: PropTypes.elementType,
};

export default Button;

// Simple spinner component
function Spinner({ className }) {
    return (
        <svg
            className={cn('animate-spin h-4 w-4', className)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
}

Spinner.propTypes = {
    className: PropTypes.string,
};
