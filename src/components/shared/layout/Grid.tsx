import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GridProps<T extends ElementType> {
    children?: ReactNode;
    className?: string;
    as?: T;
    cols?: number | string;
    gap?: number | string;
    align?: 'start' | 'end' | 'center' | 'stretch';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
}

const Grid = <T extends ElementType = 'div'>({
    children,
    className,
    as,
    cols,
    gap,
    align,
    justify,
    ...props
}: GridProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof GridProps<T>>) => {
    const Component = as || ('div' as any);
    const alignClasses = {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        stretch: 'items-stretch',
    };

    const justifyClasses = {
        start: 'justify-start',
        end: 'justify-end',
        center: 'justify-center',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly',
    };

    return (
        <Component
            className={cn(
                'grid',
                cols && (typeof cols === 'number' ? `grid-cols-${cols}` : cols),
                gap && (typeof gap === 'number' ? `gap-${gap}` : gap),
                align && alignClasses[align],
                justify && justifyClasses[justify],
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Grid;
