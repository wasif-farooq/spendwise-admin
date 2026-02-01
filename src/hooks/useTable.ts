import { useState, useMemo } from 'react';

export interface FilterConfig<T> {
    field: keyof T | string;
    type: 'select' | 'range' | 'text';
    value: any;
}

export function useTable<T>(
    data: T[],
    searchFields: (keyof T | string)[],
    initialPageSize = 10
) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const filteredData = useMemo(() => {
        let result = [...data];

        // 1. Text Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(item => {
                return searchFields.some(field => {
                    const value = (item as any)[field];
                    if (value === null || value === undefined) return false;
                    return value.toString().toLowerCase().includes(query);
                });
            });
        }

        // 2. Custom Filters
        Object.keys(filters).forEach(key => {
            const filterValue = filters[key];
            if (filterValue === 'all' || filterValue === '' || filterValue === null || filterValue === undefined) return;

            if (typeof filterValue === 'object' && ('min' in filterValue || 'max' in filterValue)) {
                // Range filter (e.g., balance)
                const { min, max } = filterValue;
                result = result.filter(item => {
                    const val = (item as any)[key];
                    if (min !== undefined && val < min) return false;
                    if (max !== undefined && val > max) return false;
                    return true;
                });
            } else {
                // Exact match filter (e.g., status, type, org)
                result = result.filter(item => (item as any)[key] === filterValue);
            }
        });

        return result;
    }, [data, searchQuery, searchFields, filters]);

    // 3. Pagination
    const totalPages = Math.ceil(filteredData.length / pageSize);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return filteredData.slice(start, start + pageSize);
    }, [filteredData, currentPage, pageSize]);

    // Actions
    const setFilter = (key: string, value: any) => {
        setFilters(prev => ({ ...prev, [key]: value }));
        setCurrentPage(1); // Reset to first page on filter change
    };

    const clearFilters = () => {
        setFilters({});
        setSearchQuery('');
        setCurrentPage(1);
    };

    return {
        // State
        searchQuery,
        setSearchQuery: (val: string) => {
            setSearchQuery(val);
            setCurrentPage(1);
        },
        currentPage,
        setCurrentPage,
        pageSize,
        setPageSize,
        totalPages,
        filters,
        setFilter,
        clearFilters,

        // Data
        data: paginatedData,
        totalCount: filteredData.length,
        fullData: filteredData
    };
}
