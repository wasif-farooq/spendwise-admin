import { useState, useMemo } from 'react';

/**
 * A generic search hook that filters an array of data based on specified fields.
 * 
 * @param data Array of items to search through
 * @param searchFields Array of property names to search within each item
 */
export function useSearch<T>(data: T[], searchFields: (keyof T | string)[]) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = useMemo(() => {
        if (!searchQuery) return data;
        const query = searchQuery.toLowerCase();

        return data.filter(item => {
            return searchFields.some(field => {
                const value = (item as any)[field];
                if (value === null || value === undefined) return false;
                return value.toString().toLowerCase().includes(query);
            });
        });
    }, [data, searchQuery, searchFields]);

    return {
        searchQuery,
        setSearchQuery,
        filteredData,
        clearSearch: () => setSearchQuery('')
    };
}

export default useSearch;
