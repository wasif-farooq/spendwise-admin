import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ContainerProps<T extends ElementType> {
    children: ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'wide';
    as?: T;
    className?: string;
}

const Container = <T extends ElementType = 'div'>({
    children,
    className,
    size = 'xl',
    as,
    ...props
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) => {
    const Component = as || ('div' as any);
    const sizeClasses = {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-7xl',
        '2xl': 'max-w-screen-2xl',
        full: 'max-w-full',
        wide: 'max-w-[1600px]',
    };

    return (
        <Component className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)} {...props}>
            {children}
        </Component>
    );
};

export default Container;
