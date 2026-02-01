import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import { transactionsService } from '@/api/services/transactions/transactionsService';
import type { Transaction } from '@/store/types/transactions.types';

export const useAdminTransactions = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTransactions = async () => {
        setLoading(true);
        try {
            const data = await transactionsService.getTransactions();
            setTransactions(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch transactions');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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

    const createTransaction = async (data: any) => {
        try {
            await transactionsService.createTransaction(data);
            await fetchTransactions();
            return true;
        } catch (err) {
            console.error('Failed to create transaction', err);
            throw err;
        }
    };

    const updateTransaction = async (id: string, data: any) => {
        try {
            await transactionsService.updateTransaction(id, data);
            await fetchTransactions();
            return true;
        } catch (err) {
            console.error('Failed to update transaction', err);
            throw err;
        }
    };

    const deleteTransaction = async (id: string) => {
        try {
            await transactionsService.deleteTransaction(id);
            await fetchTransactions();
            return true;
        } catch (err) {
            console.error('Failed to delete transaction', err);
            throw err;
        }
    };

    const getTransactionById = async (id: string) => {
        return transactionsService.getTransactionById(id);
    };

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
        createTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactionById,
        refresh: fetchTransactions
    };
};
