import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminCoupons } from '@/hooks/features/admin/useAdminCoupons';

export const useCouponsList = () => {
    const navigate = useNavigate();
    const {
        coupons,
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
        totalCount,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        refresh
    } = useAdminCoupons();

    const [showFilters, setShowFilters] = useState(false);

    const handleCopyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success(`Copied ${code} to clipboard`);
    };

    return {
        coupons,
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
        totalCount,
        showFilters,
        setShowFilters,
        handleCopyCode,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        refresh,
        handleCopyCode,
        getCouponById,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        refresh,
        navigate
    };
};
