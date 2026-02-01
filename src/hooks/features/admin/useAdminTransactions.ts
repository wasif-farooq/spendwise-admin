import { useState, useEffect, useMemo } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    status: 'completed' | 'pending' | 'failed';
    iconName: string;
    color: string;
}

export const useAdminTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 800));
                setTransactions(mockData.transactions as Transaction[]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch transactions');
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedTransactions,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<Transaction>(transactions, ['description', 'category', 'status']);

    return {
        transactions: paginatedTransactions,
        totalCount,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 800);
        }
    };
};
