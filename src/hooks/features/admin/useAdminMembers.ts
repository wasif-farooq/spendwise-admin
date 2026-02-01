import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAllUsersThunk, toggleUserStatusThunk } from '@/store/slices/adminUserSlice';
import { useTable } from '@/hooks/useTable';
import type { AdminUser } from '@/store/types/admin.types';

export const useAdminMembers = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector(state => state.adminUsers);

    useEffect(() => {
        dispatch(fetchAllUsersThunk());
    }, [dispatch]);

    // Filter only internal members (admin, staff, super_admin)
    const members = useMemo(() => {
        return users.filter(user =>
            ['admin', 'staff', 'SUPER_ADMIN'].includes(user.role)
        );
    }, [users]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedMembers,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<AdminUser>(members, ['name', 'email', 'role']);

    const handleToggleStatus = (id: string) => {
        dispatch(toggleUserStatusThunk(id));
    };

    return {
        members: paginatedMembers,
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
