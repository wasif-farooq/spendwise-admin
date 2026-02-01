import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';

export interface Permission {
    [resource: string]: string[];
}

export interface Role {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    color: string;
    iconName: string;
    permissions: Record<string, string[]>;
    usersCount?: number;
}

export const useAdminRoles = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));

                // Enhance mock data with random user counts for UI demo
                const enhancedRoles = mockData.roles.map(role => ({
                    ...role,
                    usersCount: Math.floor(Math.random() * 20) + 1
                }));

                setRoles(enhancedRoles as Role[]);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch roles');
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
    } = useTable<Role>(roles, ['name', 'description']);

    const getRoleById = (id: number) => {
        return roles.find(r => r.id === id);
    };

    const updateRolePermissions = async (roleId: number, permissions: Permission) => {
        // Simulate API update
        await new Promise(resolve => setTimeout(resolve, 500));
        setRoles(prev => prev.map(r => r.id === roleId ? { ...r, permissions } : r));
        return true;
    };

    const createRole = async (newRole: Omit<Role, 'id'>) => {
        // Simulate API create
        await new Promise(resolve => setTimeout(resolve, 500));
        const role: Role = {
            ...newRole,
            id: Math.max(...roles.map(r => r.id), 0) + 1,
            usersCount: 0
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
        getRoleById,
        updateRolePermissions,
        createRole,
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 600);
        }
    };
};
