import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAllOrgsThunk, toggleOrgStatusThunk } from '@/store/slices/adminOrganizationSlice';
import { useTable } from '@/hooks/useTable';
import type { AdminOrganization } from '@/store/types/admin.types';

export const useAdminOrganizations = () => {
    const dispatch = useAppDispatch();
    const { organizations, loading, error } = useAppSelector(state => state.adminOrganizations);

    useEffect(() => {
        dispatch(fetchAllOrgsThunk());
    }, [dispatch]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedOrgs,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<AdminOrganization>(organizations, ['name', 'plan', 'owner']);

    const handleToggleStatus = (id: string) => {
        dispatch(toggleOrgStatusThunk(id));
    };

    return {
        organizations: paginatedOrgs,
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
        refresh: () => dispatch(fetchAllOrgsThunk())
    };
};
