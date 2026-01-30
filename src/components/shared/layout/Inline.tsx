import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InlineProps extends HTMLAttributes<HTMLSpanElement> {
    children?: ReactNode;
    className?: string;
}

const Inline = ({ children, className, ...props }: InlineProps) => {
    return (
        <span className={cn('inline', className)} {...props}>
            {children}
        </span>
    );
};

export default Inline;
