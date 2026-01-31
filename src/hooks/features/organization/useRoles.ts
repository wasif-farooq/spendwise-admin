import { useState, useMemo, useEffect } from 'react';
import { ShieldCheck, Users, Eye, CreditCard, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role, RoleFilters } from '@/views/Manage/Roles/types';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap
};

export const useRoles = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [roles, setRoles] = useState<Role[]>(() => {
        return mockData.roles.map(r => ({
            ...r,
            permissions: {
                ...r.permissions,
                accounts: r.permissions.accounts || []
            },
            icon: iconMap[r.iconName as keyof typeof iconMap] || ShieldCheck
        })) as Role[];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<RoleFilters>({
        types: [],
        minPermissions: 0,
    });

    const filteredRoles = useMemo(() => {
        return roles.filter(role => {
            const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                role.description.toLowerCase().includes(searchQuery.toLowerCase());

            const isSystem = role.isDefault ? 'System' : 'Custom';
            const matchesType = filters.types.length === 0 || filters.types.includes(isSystem);

            const totalPerms = Object.values(role.permissions).flat().length;
            const matchesPermCount = totalPerms >= filters.minPermissions;

            return matchesSearch && matchesType && matchesPermCount;
        });
    }, [roles, searchQuery, filters]);

    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRoles.slice(start, start + itemsPerPage);
    }, [currentPage, filteredRoles]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters]);

    const openDeleteModal = (role: Role) => {
        setDeletingRole(role);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingRole(null);
    };

    const confirmDeleteRole = () => {
        if (!deletingRole) return;
        setIsProcessing(true);
        setTimeout(() => {
            setRoles(prev => prev.filter(r => r.id !== deletingRole.id));
            setIsProcessing(false);
            setIsDeleteModalOpen(false);
            setDeletingRole(null);
        }, 1000);
    };

    const clearFilters = () => {
        setFilters({ types: [], minPermissions: 0 });
        setSearchQuery('');
    };

    const activeFilterCount = filters.types.length + (filters.minPermissions > 0 ? 1 : 0);

    return {
        roles,
        paginatedRoles,
        filters,
        setFilters,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredRolesCount: filteredRoles.length,
        itemsPerPage,
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        deletingRole,
        confirmDeleteRole,
        isProcessing,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        clearFilters,
        activeFilterCount
    };
};
