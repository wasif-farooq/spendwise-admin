import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface HeadingProps<T extends ElementType> {
    children?: ReactNode;
    className?: string;
    as?: T;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    color?: string;
    align?: 'left' | 'center' | 'right';
}

const Heading = <T extends ElementType = 'h2'>({
    children,
    className,
    as,
    size = '2xl',
    weight = 'bold',
    color,
    align,
    ...props
}: HeadingProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof HeadingProps<T>>) => {
    const Component = as || ('h2' as any);
    const sizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
    };

    const weightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
        extrabold: 'font-extrabold',
        black: 'font-black',
    };

    const alignClasses = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
    };

    return (
        <Component
            className={cn(
                sizeClasses[size],
                weightClasses[weight],
                align && alignClasses[align],
                color,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Heading;
