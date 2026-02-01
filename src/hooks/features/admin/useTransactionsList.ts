import { useState } from 'react';
import { useAdminTransactions } from '@/hooks/features/admin/useAdminTransactions';

export const useTransactionsList = () => {
    const {
        transactions,
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
        totalCount
    } = useAdminTransactions();

    const [showFilters, setShowFilters] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    return {
        transactions,
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
        totalCount,
        showFilters,
        setShowFilters,
        formatCurrency
    };
};
