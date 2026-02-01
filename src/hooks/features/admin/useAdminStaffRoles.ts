import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';
import type { StaffRole } from '@/store/types/admin.types';

export const useAdminStaffRoles = () => {
    const [roles, setRoles] = useState<StaffRole[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));
                setRoles((mockData.staffRoles || []) as StaffRole[]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch staff roles');
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

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

    const getRoleById = (id: number) => {
        return roles.find(r => r.id === id);
    };

    const updateRolePermissions = async (roleId: number, permissions: Record<string, string[]>) => {
        // Simulate API update
        await new Promise(resolve => setTimeout(resolve, 500));
        setRoles(prev => prev.map(r => r.id === roleId ? { ...r, permissions } : r));
        return true;
    };

    const createRole = async (newRole: Omit<StaffRole, 'id'>) => {
        // Simulate API create
        await new Promise(resolve => setTimeout(resolve, 500));
        const role: StaffRole = {
            ...newRole,
            id: Math.max(...roles.map(r => r.id), 0) + 1
        };
        setRoles(prev => [...prev, role]);
        return role;
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
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 600);
        }
    };
};
