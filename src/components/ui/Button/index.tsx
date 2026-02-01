import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';
import { cn } from '@/utils/cn';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    'inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-95',
                    {
                        'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20': variant === 'primary',
                        'bg-secondary text-white hover:bg-secondary/90 shadow-lg shadow-secondary/20': variant === 'secondary',
                        'border border-gray-200 bg-white hover:bg-gray-50 text-gray-700': variant === 'outline',
                        'hover:bg-gray-100 text-gray-600': variant === 'ghost',
                        'h-9 px-3 text-sm rounded-lg': size === 'sm',
                        'h-10 px-5 py-2': size === 'md',
                        'h-12 px-8 text-lg rounded-2xl': size === 'lg',
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export default Button;
