import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminTransactions } from '@/hooks/features/admin/useAdminTransactions';

export const useTransactionsList = () => {
    const navigate = useNavigate();
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
        totalCount,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
        refresh
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
        formatCurrency,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
        refresh,
        navigate
    };
};
