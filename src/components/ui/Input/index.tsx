import React from 'react';
import { cn } from '@/utils/cn';
import { Block, Text } from '@shared';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, ...props }, ref) => {
        return (
            <Block className="w-full space-y-1.5">
                {label && (
                    <Text as="label" className="text-sm font-medium text-gray-700">
                        {label}
                    </Text>
                )}
                <input
                    ref={ref}
                    className={cn(
                        'flex h-10 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all',
                        error && 'border-red-500 focus-visible:ring-red-500',
                        className
                    )}
                    {...props}
                />
                {error && (
                    <Text className="text-xs font-medium text-red-500">
                        {error}
                    </Text>
                )}
            </Block>
        );
    }
);
Input.displayName = 'Input';

export default Input;
