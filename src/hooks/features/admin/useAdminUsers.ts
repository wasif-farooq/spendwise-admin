import { useEffect, useState, useCallback } from 'react';
import { useTable } from '@/hooks/useTable';
import type { AdminUser } from '@/store/types/admin.types';
import { AdminUserService } from '@/api/services/admin/AdminUserService';

export const useAdminUsers = () => {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await AdminUserService.getAll();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch users');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

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

    const handleToggleStatus = async (id: string) => {
        try {
            await AdminUserService.toggleStatus(id);
            await fetchUsers();
        } catch (err) {
            console.error('Failed to toggle status', err);
        }
    };

    const getUserById = useCallback((id: string) => {
        // First try to find in current list
        const user = users.find(u => u.id === id);
        if (user) return Promise.resolve(user);

        // If not found, fetch from API
        return AdminUserService.getById(id);
    }, [users]);

    const createUser = async (userData: Partial<AdminUser>) => {
        try {
            await AdminUserService.create(userData);
            await fetchUsers();
            return true;
        } catch (err) {
            console.error('Failed to create user', err);
            throw err;
        }
    };

    const updateUser = async (id: string, userData: Partial<AdminUser>) => {
        try {
            await AdminUserService.update(id, userData);
            await fetchUsers();
            return true;
        } catch (err) {
            console.error('Failed to update user', err);
            throw err;
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await AdminUserService.delete(id);
            await fetchUsers();
            return true;
        } catch (err) {
            console.error('Failed to delete user', err);
            throw err;
        }
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
        deleteUser,
        refresh: fetchUsers
    };
};
