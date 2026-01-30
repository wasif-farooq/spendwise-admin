import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TextProps<T extends ElementType> {
    children?: ReactNode;
    className?: string;
    as?: T;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
    weight?: 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black';
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
}

const Text = <T extends ElementType = 'p'>({
    children,
    className,
    as,
    size = 'md',
    weight = 'normal',
    color,
    align,
    ...props
}: TextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TextProps<T>>) => {
    const Component = as || ('p' as any);
    const sizeClasses = {
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
        '2xl': 'text-2xl',
        '3xl': 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
    };

    const weightClasses = {
        thin: 'font-thin',
        light: 'font-light',
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
        justify: 'text-justify',
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

export default Text;
