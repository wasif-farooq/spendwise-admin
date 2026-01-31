import React from 'react';
import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                default: 'border-transparent bg-gray-100 text-gray-700',
                primary: 'border-transparent bg-primary/10 text-primary',
                secondary: 'border-transparent bg-secondary/10 text-secondary',
                success: 'border-transparent bg-green-100 text-green-700',
                warning: 'border-transparent bg-yellow-100 text-yellow-700',
                error: 'border-transparent bg-red-100 text-red-700',
                gradient: 'border-transparent bg-gradient-to-r from-blue-500 to-purple-500 text-white',
            },
            size: {
                sm: 'px-2 py-0.5 text-[10px]',
                md: 'px-2.5 py-0.5 text-xs',
                lg: 'px-3 py-1 text-sm',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(badgeVariants({ variant, size }), className)}
                {...props}
            />
        );
    }
);

Badge.displayName = 'Badge';

export default Badge;
