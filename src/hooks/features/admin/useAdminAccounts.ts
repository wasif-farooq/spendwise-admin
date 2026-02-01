import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAllAccountsThunk, flagAccountThunk } from '@/store/slices/adminAccountSlice';
import { useTable } from '@/hooks/useTable';
import type { AdminAccount } from '@/store/types/admin.types';

import { adminAccountService } from '@/api/services/admin/adminAccountService';

export const useAdminAccounts = () => {
    const dispatch = useAppDispatch();
    const { accounts, loading, error } = useAppSelector(state => state.adminAccounts);

    useEffect(() => {
        dispatch(fetchAllAccountsThunk());
    }, [dispatch]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedAccounts,
        fullData: filteredAccounts,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters
    } = useTable<AdminAccount>(accounts, ['name', 'organization', 'type', 'ownerEmail']);

    const handleFlagAccount = (id: string) => {
        dispatch(flagAccountThunk(id));
    };

    const createAccount = async (data: any) => {
        try {
            await adminAccountService.create(data);
            dispatch(fetchAllAccountsThunk());
            return true;
        } catch (err) {
            console.error('Failed to create account', err);
            throw err;
        }
    };

    const updateAccount = async (id: string, data: any) => {
        try {
            await adminAccountService.update(id, data);
            dispatch(fetchAllAccountsThunk());
            return true;
        } catch (err) {
            console.error('Failed to update account', err);
            throw err;
        }
    };

    const deleteAccount = async (id: string) => {
        try {
            await adminAccountService.delete(id);
            dispatch(fetchAllAccountsThunk());
            return true;
        } catch (err) {
            console.error('Failed to delete account', err);
            throw err;
        }
    };

    const getAccountById = async (id: string) => {
        return adminAccountService.getById(id);
    };

    // Calculate totals using all filtered records (not just the current page)
    const totalLiquid = filteredAccounts.reduce((sum, acc) => acc.balance > 0 ? sum + acc.balance : sum, 0);
    const totalLiability = filteredAccounts.reduce((sum, acc) => acc.balance < 0 ? sum + Math.abs(acc.balance) : sum, 0);

    return {
        accounts: paginatedAccounts,
        totalCount: filteredAccounts.length,
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
        handleFlagAccount,
        createAccount,
        updateAccount,
        deleteAccount,
        getAccountById,
        totalLiquid,
        totalLiability,
        refresh: () => dispatch(fetchAllAccountsThunk())
    };
};
