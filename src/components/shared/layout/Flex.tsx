import type { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface FlexProps<T extends ElementType> {
    children?: ReactNode;
    className?: string;
    as?: T;
    direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
    align?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
    justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
    gap?: number | string;
    wrap?: boolean;
}

const Flex = <T extends ElementType = 'div'>({
    children,
    className,
    as,
    direction = 'row',
    align = 'stretch',
    justify = 'start',
    gap,
    wrap,
    ...props
}: FlexProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof FlexProps<T>>) => {
    const Component = as || ('div' as any);
    const directionClasses = {
        row: 'flex-row',
        'row-reverse': 'flex-row-reverse',
        col: 'flex-col',
        'col-reverse': 'flex-col-reverse',
    };

    const alignClasses = {
        start: 'items-start',
        end: 'items-end',
        center: 'items-center',
        baseline: 'items-baseline',
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
                'flex',
                directionClasses[direction],
                alignClasses[align],
                justifyClasses[justify],
                wrap && 'flex-wrap',
                gap && `gap-${gap}`,
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Flex;
