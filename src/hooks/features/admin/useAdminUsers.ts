import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAllUsersThunk, toggleUserStatusThunk } from '@/store/slices/adminUserSlice';
import { useTable } from '@/hooks/useTable';
import type { AdminUser } from '@/store/types/admin.types';

export const useAdminUsers = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector(state => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsersThunk());
    }, [dispatch]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedUsers,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<AdminUser>(users, ['name', 'email', 'role']);

    const handleToggleStatus = (id: string) => {
        dispatch(toggleUserStatusThunk(id));
    };

    return {
        users: paginatedUsers,
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
        handleToggleStatus,
        refresh: () => dispatch(fetchAllUsersThunk())
    };
};
