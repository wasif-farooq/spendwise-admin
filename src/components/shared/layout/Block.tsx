import type { ElementType, ComponentPropsWithoutRef } from 'react';
import { cn } from '@/utils/cn';

interface BlockProps<T extends ElementType> {
    children?: React.ReactNode;
    className?: string;
    as?: T;
}

const Block = <T extends ElementType = 'div'>({
    children,
    className,
    as,
    ...props
}: BlockProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof BlockProps<T>>) => {
    const Component = as || ('div' as any);
    return (
        <Component className={cn('block', className)} {...props}>
            {children}
        </Component>
    );
};

export default Block;
