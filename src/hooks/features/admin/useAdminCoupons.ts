import { useState, useEffect, useCallback } from 'react';
import { useTable } from '@/hooks/useTable';
import { AdminCouponService } from '@/api/services/admin/AdminCouponService';
import type { Coupon } from '@/store/types/admin.types';

export const useAdminCoupons = () => {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCoupons = useCallback(async () => {
        try {
            setLoading(true);
            const data = await AdminCouponService.getAll();
            setCoupons(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch coupons');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const getCouponById = async (id: string) => {
        const coupon = coupons.find(c => c.id === id);
        if (coupon) return coupon;
        try {
            return await AdminCouponService.getById(id);
        } catch (err) {
            console.error('Failed to get coupon', err);
            return null;
        }
    };

    const createCoupon = async (data: Omit<Coupon, 'id'>) => {
        try {
            await AdminCouponService.create(data);
            await fetchCoupons();
            return true;
        } catch (err) {
            console.error('Failed to create coupon', err);
            throw err;
        }
    };

    const updateCoupon = async (id: string, data: Partial<Coupon>) => {
        try {
            await AdminCouponService.update(id, data);
            await fetchCoupons();
            return true;
        } catch (err) {
            console.error('Failed to update coupon', err);
            throw err;
        }
    };

    const deleteCoupon = async (id: string) => {
        try {
            await AdminCouponService.delete(id);
            await fetchCoupons();
            return true;
        } catch (err) {
            console.error('Failed to delete coupon', err);
            throw err;
        }
    };

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
        refresh: fetchCoupons,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon
    };
};
