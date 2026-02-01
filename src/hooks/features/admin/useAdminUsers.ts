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

    const getUserById = (id: string) => {
        return users.find(u => u.id === id);
    };

    const createUser = async (userData: Partial<AdminUser>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Creating user:', userData);
        return true;
    };

    const updateUser = async (id: string, userData: Partial<AdminUser>) => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log('Updating user:', id, userData);
        return true;
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
        getUserById,
        createUser,
        updateUser,
        refresh: () => dispatch(fetchAllUsersThunk())
    };
};
