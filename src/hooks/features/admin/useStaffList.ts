import { useNavigate } from 'react-router-dom';
import { useAdminStaff } from '@/hooks/features/admin/useAdminStaff';
import { useAdminStaffRoles } from '@/hooks/features/admin/useAdminStaffRoles';

export const useStaffList = () => {
    const navigate = useNavigate();
    const {
        staff,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount,
        deleteStaff,
        refresh
    } = useAdminStaff();

    const { roles: staffRoles } = useAdminStaffRoles();

    const getRoleNames = (roleIds: number[]) => {
        if (!roleIds || !Array.isArray(roleIds)) return [];
        return roleIds.map(id => {
            const role = staffRoles.find(r => r.id === id);
            return role ? role.name : 'Unknown';
        });
    };

    return {
        staff,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        clearFilters,
        totalCount,
        getRoleNames,
        navigate,
        deleteStaff,
        refresh
    };
};
