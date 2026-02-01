import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';
import type { Staff } from '@/store/types/admin.types';

export const useAdminStaff = () => {
    const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStaff = async () => {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 600));

                // Ensure specific casting to match Staff interface
                const typedStaff = ((mockData.staff || []) as any[]).map(s => ({
                    ...s,
                    status: s.status as 'Active' | 'Inactive' | 'Pending'
                }));

                setStaff(typedStaff);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch staff members');
                setLoading(false);
            }
        };

        fetchStaff();
    }, []);

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

    const getStaffById = (id: number) => {
        return staff.find(s => s.id === id);
    };

    const updateStaffRoles = async (staffId: number, roleIds: number[]) => {
        await new Promise(resolve => setTimeout(resolve, 500));
        setStaff(prev => prev.map(s => s.id === staffId ? { ...s, roles: roleIds } : s));
        return true;
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
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 600);
        }
    };
};
