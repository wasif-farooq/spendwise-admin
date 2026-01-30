import { forwardRef } from 'react';
import type { ElementType, ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

interface BlockProps<T extends ElementType> {
    children?: React.ReactNode;
    className?: string;
    as?: T;
}

const Block = forwardRef(<T extends ElementType = 'div'>(
    { children, className, as, ...props }: BlockProps<T> & Omit<ComponentPropsWithRef<T>, keyof BlockProps<T>>,
    ref: any
) => {
    const Component = as || ('div' as any);
    return (
        <Component ref={ref} className={cn('block', className)} {...props}>
            {children}
        </Component>
    );
});

Block.displayName = 'Block';

export default Block;
