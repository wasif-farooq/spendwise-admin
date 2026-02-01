import { useState, useEffect, useCallback } from 'react';
import { useTable } from '@/hooks/useTable';
import type { Staff } from '@/store/types/admin.types';
import { AdminStaffService } from '@/api/services/admin/AdminStaffService';

export const useAdminStaff = () => {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStaff = useCallback(async () => {
        try {
            setLoading(true);
            const data = await AdminStaffService.getAll();
            setStaff(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch staff members');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchStaff();
    }, [fetchStaff]);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedStaff,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<Staff>(staff, ['name', 'email']);

    const getStaffById = useCallback(async (id: number) => {
        const member = staff.find(s => s.id === id);
        if (member) return member;
        const data = await AdminStaffService.getById(id.toString());
        return data;
    }, [staff]);

    const updateStaffRoles = async (staffId: number, roleIds: number[]) => {
        try {
            await AdminStaffService.updateRoles(staffId.toString(), roleIds);
            await fetchStaff();
            return true;
        } catch (err) {
            console.error('Failed to update roles', err);
            throw err;
        }
    };

    return {
        staff: paginatedStaff,
        allStaff: staff,
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
        getStaffById,
        updateStaffRoles,
        refresh: fetchStaff
    };
};
