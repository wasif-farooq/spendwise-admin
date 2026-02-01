import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';
import mockData from '@/data/mockData.json';

export interface Coupon {
    id: string;
    code: string;
    discount: number;
    type: 'percentage' | 'fixed';
    status: 'active' | 'expired' | 'disabled';
    uses: number;
    maxUses: number;
    expiryDate: string;
}

export const useAdminCoupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                // Use the newly added coupons from mockData
                // We need to cast it since we just added it to JSON and TS might not know about it immediately without type updates
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setCoupons((mockData as any).coupons || []);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch coupons');
                setLoading(false);
            }
        };

        fetchCoupons();
    }, []);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedCoupons,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<Coupon>(coupons, ['code', 'status']);

    return {
        coupons: paginatedCoupons,
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
        refresh: () => {
            setLoading(true);
            setTimeout(() => setLoading(false), 500);
        }
    };
};
