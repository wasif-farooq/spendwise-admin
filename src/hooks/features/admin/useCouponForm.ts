import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCouponsList } from '@/hooks/features/admin/useCouponsList';
import type { Coupon } from '@/store/types/admin.types';

export const useCouponForm = (id?: string) => {
    const navigate = useNavigate();
    const isEditing = !!id;
    const { getCouponById, createCoupon, updateCoupon } = useCouponsList();

    const [formData, setFormData] = useState<Partial<Coupon>>({
        code: '',
        discount: 0,
        type: 'percentage',
        status: 'active',
        uses: 0,
        maxUses: 100,
        expiryDate: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            const fetchCoupon = async () => {
                const coupon = await getCouponById(id);
                if (coupon) {
                    setFormData({
                        code: coupon.code,
                        discount: coupon.discount,
                        type: coupon.type,
                        status: coupon.status,
                        uses: coupon.uses,
                        maxUses: coupon.maxUses,
                        expiryDate: coupon.expiryDate.split('T')[0]
                    });
                }
            };
            fetchCoupon();
        }
    }, [isEditing, id, getCouponById]);

    const handleChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing && id) {
                await updateCoupon(id, formData);
                toast.success('Coupon updated successfully');
            } else {
                await createCoupon(formData as Coupon);
                toast.success('Coupon created successfully');
            }
            navigate('/admin/coupons');
        } catch (error) {
            toast.error('Failed to save coupon');
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        loading,
        isEditing,
        handleChange,
        handleSubmit,
        navigate
    };
};
