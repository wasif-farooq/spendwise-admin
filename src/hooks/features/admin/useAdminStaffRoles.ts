import { useState, useEffect, useCallback } from 'react';
import { useTable } from '@/hooks/useTable';
import type { StaffRole } from '@/store/types/admin.types';
import { AdminStaffRoleService } from '@/api/services/admin/AdminStaffRoleService';

export const useAdminStaffRoles = () => {
    const [roles, setRoles] = useState<StaffRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRoles = useCallback(async () => {
        try {
            setLoading(true);
            const data = await AdminStaffRoleService.getAll();
            setRoles(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch staff roles');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedRoles,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<StaffRole>(roles, ['name', 'description']);

    const getRoleById = useCallback(async (id: number) => {
        const role = roles.find(r => r.id === id);
        if (role) return role;
        return AdminStaffRoleService.getById(id);
    }, [roles]);

    const updateRolePermissions = async (roleId: number, permissions: Record<string, string[]>) => {
        try {
            await AdminStaffRoleService.updatePermissions(roleId, permissions);
            await fetchRoles();
            return true;
        } catch (err) {
            console.error('Failed to update role permissions', err);
            throw err;
        }
    };

    const createRole = async (newRole: Omit<StaffRole, 'id'>) => {
        try {
            const role = await AdminStaffRoleService.create(newRole);
            await fetchRoles();
            return role;
        } catch (err) {
            console.error('Failed to create role', err);
            throw err;
        }
    };

    return {
        roles: paginatedRoles,
        allRoles: roles,
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
        getRoleById,
        updateRolePermissions,
        createRole,
        refresh: fetchRoles
    };
};
