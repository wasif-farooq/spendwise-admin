import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import { fetchAllOrgsThunk, toggleOrgStatusThunk } from '@/store/slices/adminOrganizationSlice';
import { useTable } from '@/hooks/useTable';
import type { AdminOrganization } from '@/store/types/admin.types';
import { adminOrganizationService } from '@/api/services/admin/adminOrganizationService';

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

    const createOrg = async (data: any) => {
        try {
            await adminOrganizationService.create(data);
            dispatch(fetchAllOrgsThunk());
            return true;
        } catch (err) {
            console.error('Failed to create organization', err);
            throw err;
        }
    };

    const updateOrg = async (id: string, data: any) => {
        try {
            await adminOrganizationService.update(id, data);
            dispatch(fetchAllOrgsThunk());
            return true;
        } catch (err) {
            console.error('Failed to update organization', err);
            throw err;
        }
    };

    const deleteOrg = async (id: string) => {
        try {
            await adminOrganizationService.delete(id);
            dispatch(fetchAllOrgsThunk());
            return true;
        } catch (err) {
            console.error('Failed to delete organization', err);
            throw err;
        }
    };

    const getOrgById = async (id: string) => {
        return adminOrganizationService.getById(id);
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
        createOrg,
        updateOrg,
        deleteOrg,
        getOrgById,
        refresh: () => dispatch(fetchAllOrgsThunk())
    };
};
