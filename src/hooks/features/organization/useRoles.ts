import { useState, useMemo } from 'react';
import { ShieldCheck, Users, Eye, CreditCard, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Role, RoleFilters } from '@/views/Manage/Roles/types';
import mockData from '@/data/mockData.json';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/hooks/useModal';
import { useToggle } from '@/hooks/useToggle';

const iconMap: Record<string, LucideIcon> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap
};

export const useRoles = () => {
    const deleteModal = useModal<Role>();
    const filterDrawer = useToggle(false);
    const isProcessing = useToggle(false);

    // Pagination/Data Source state
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

    const {
        paginatedData: paginatedRoles,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems: filteredRolesCount
    } = usePagination(filteredRoles, { itemsPerPage });

    const confirmDeleteRole = () => {
        if (!deleteModal.data) return;
        isProcessing.setTrue();
        setTimeout(() => {
            setRoles(prev => prev.filter(r => r.id !== deleteModal.data?.id));
            isProcessing.setFalse();
            deleteModal.close();
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
        filteredRolesCount,
        itemsPerPage,
        isDeleteModalOpen: deleteModal.isOpen,
        openDeleteModal: deleteModal.open,
        closeDeleteModal: deleteModal.close,
        deletingRole: deleteModal.data,
        confirmDeleteRole,
        isProcessing: isProcessing.value,
        isFilterDrawerOpen: filterDrawer.value,
        setIsFilterDrawerOpen: filterDrawer.setValue,
        clearFilters,
        activeFilterCount
    };
};
