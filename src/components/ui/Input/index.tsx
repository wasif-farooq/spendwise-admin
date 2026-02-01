import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Text } from '@shared';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <motion.div
                initial={false}
                animate={{ y: 0 }}
                whileFocus={{ y: -2 }}
                className="w-full space-y-2"
            >
                {label && (
                    <Text as="label" className="text-sm font-semibold text-gray-700 ml-1">
                        {label}
                    </Text>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'flex h-11 w-full rounded-2xl border border-gray-200 bg-white px-4 py-2 text-sm ring-offset-white transition-all placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 shadow-sm',
                        error && 'border-red-500 focus-visible:ring-red-100 focus-visible:border-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <Text className="text-xs font-medium text-red-500 ml-1">
                        {error}
                    </Text>
                )}
            </motion.div>
        );
    }
);
Input.displayName = 'Input';

export default Input;
