import React from 'react';
import { cn } from '@/utils/cn';
import { Block } from '@shared';

export const Table = React.forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement> & { striped?: boolean; hoverable?: boolean }
>(({ className, striped, hoverable, ...props }, ref) => (
    <Block className="relative w-full overflow-auto">
        <table
            ref={ref}
            className={cn(
                'w-full caption-bottom text-sm',
                striped && '[&_tbody_tr:nth-child(even)]:bg-gray-50',
                hoverable && '[&_tbody_tr]:hover:bg-gray-100 [&_tbody_tr]:transition-colors',
                className
            )}
            {...props}
        />
    </Block>
));
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
    />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <tfoot
        ref={ref}
        className={cn('border-t bg-gray-50/50 font-medium [&>tr]:last:border-b-0', className)}
        {...props}
    />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn('border-b transition-colors data-[state=selected]:bg-gray-100', className)}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-12 px-4 text-left align-middle font-bold text-gray-700 [&:has([role=checkbox])]:pr-0',
            className
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
        {...props}
    />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm text-gray-500', className)}
        {...props}
    />
));
TableCaption.displayName = 'TableCaption';

export default Table;
