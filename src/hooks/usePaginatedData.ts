import { useState, useMemo, useEffect } from 'react';

interface UsePaginatedDataOptions<T> {
    data: T[];
    itemsPerPage?: number;
    initialPage?: number;
    filterFn?: (item: T, query: string) => boolean;
}

export function usePaginatedData<T>({
    data,
    itemsPerPage = 10,
    initialPage = 1,
    filterFn
}: UsePaginatedDataOptions<T>) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!searchQuery || !filterFn) return data;
        return data.filter(item => filterFn(item, searchQuery));
    }, [data, searchQuery, filterFn]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredData.slice(start, start + itemsPerPage);
    }, [filteredData, currentPage, itemsPerPage]);

    // Reset page when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const goToNextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
    const goToPrevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
    const goToPage = (page: number) => setCurrentPage(Math.min(Math.max(1, page), totalPages));

    return {
        data: paginatedData,
        currentPage,
        totalPages,
        searchQuery,
        setSearchQuery,
        goToNextPage,
        goToPrevPage,
        goToPage,
        totalItems: filteredData.length
    };
}
