import { useState, useMemo, useEffect } from 'react';

interface UsePaginationOptions {
    itemsPerPage?: number;
    initialPage?: number;
}

/**
 * A more flexible pagination hook that focuses purely on slicing data and managing page state.
 * Filtering should be handled externally for maximum flexibility.
 */
export function usePagination<T>(data: T[], options: UsePaginationOptions = {}) {
    const { itemsPerPage = 10, initialPage = 1 } = options;
    const [currentPage, setCurrentPage] = useState(initialPage);

    const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data.length, itemsPerPage]);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }, [data, currentPage, itemsPerPage]);

    // Reset to first page when data length changes (usually due to filtering)
    useEffect(() => {
        setCurrentPage(1);
    }, [data.length]);

    const goToPage = (page: number | ((prev: number) => number)) => {
        setCurrentPage(prev => {
            const next = typeof page === 'function' ? page(prev) : page;
            return Math.min(Math.max(1, next), totalPages || 1);
        });
    };

    return {
        paginatedData,
        currentPage,
        setCurrentPage: goToPage as React.Dispatch<React.SetStateAction<number>>,
        totalPages,
        totalItems: data.length,
        itemsPerPage
    };
}
