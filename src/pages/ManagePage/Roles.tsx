import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Block } from '@shared';

import { RolesHeader } from '@/views/Manage/Roles/RolesHeader';
import { RolesGrid } from '@/views/Manage/Roles/RolesGrid';
import { RolesFilterDrawer } from '@/views/Manage/Roles/RolesFilterDrawer';
import { DeleteRoleModal } from '@/views/Manage/Roles/DeleteRoleModal';
import { useRoles } from '@/hooks/features/organization/useRoles';

const Roles = () => {
    const navigate = useNavigate();
    const {
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
        isDeleteModalOpen,
        closeDeleteModal,
        openDeleteModal,
        deletingRole,
        confirmDeleteRole,
        isProcessing,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        clearFilters,
        activeFilterCount
    } = useRoles();

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
                filteredRolesCount={filteredRolesCount}
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
                onClose={closeDeleteModal}
                onConfirm={confirmDeleteRole}
                role={deletingRole}
                isProcessing={isProcessing}
            />
        </Block>
    );
};
export default Roles;
