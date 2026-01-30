import { motion } from 'framer-motion';
import { ShieldCheck, Users, Eye, CreditCard, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block } from '@shared';

import { RolesHeader } from '@/views/Manage/Roles/RolesHeader';
import { RolesGrid } from '@/views/Manage/Roles/RolesGrid';
import { RolesFilterDrawer } from '@/views/Manage/Roles/RolesFilterDrawer';
import { DeleteRoleModal } from '@/views/Manage/Roles/DeleteRoleModal';
import type { Role, RoleFilters } from '@/views/Manage/Roles/types';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    ShieldCheck,
    Users,
    Eye,
    CreditCard,
    Zap
};

const Roles = () => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [deletingRole, setDeletingRole] = useState<Role | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Use centralized mock data and map icon names to components
    const [roles, setRoles] = useState<Role[]>(() => {
        return mockData.roles.map(r => ({
            ...r,
            icon: iconMap[r.iconName as keyof typeof iconMap] || ShieldCheck
        })) as Role[];
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<RoleFilters>({
        types: [],
        minPermissions: 0,
    });

    // Filter roles based on search query and advanced filters
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

    // Pagination logic
    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRoles.slice(start, start + itemsPerPage);
    }, [currentPage, filteredRoles]);

    // Reset to first page when searching or filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters]);

    const handleDeleteRole = () => {
        if (!deletingRole) return;
        setIsProcessing(true);
        setTimeout(() => {
            setRoles(roles.filter(r => r.id !== deletingRole.id));
            setIsProcessing(false);
            setIsDeleteModalOpen(false);
            setDeletingRole(null);
        }, 1000);
    };

    const openDeleteModal = (role: Role) => {
        setDeletingRole(role);
        setIsDeleteModalOpen(true);
    };

    const clearFilters = () => {
        setFilters({ types: [], minPermissions: 0 });
        setSearchQuery('');
    };

    const activeFilterCount = filters.types.length + (filters.minPermissions > 0 ? 1 : 0);

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <RolesHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeFilterCount={activeFilterCount}
                onOpenFilter={() => setIsFilterDrawerOpen(true)}
                onCreateRole={() => navigate('/manage/roles/new')}
            />

            <RolesGrid
                paginatedRoles={paginatedRoles}
                filteredRolesCount={filteredRoles.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onEditRole={(id) => navigate(`/manage/roles/${id}/edit`)}
                onOpenDelete={openDeleteModal}
                clearFilters={clearFilters}
            />

            <RolesFilterDrawer
                isOpen={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <DeleteRoleModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDeleteRole}
                role={deletingRole}
                isProcessing={isProcessing}
            />
        </Block>
    );
};
export default Roles;
