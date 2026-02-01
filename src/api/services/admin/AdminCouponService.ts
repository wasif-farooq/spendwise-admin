import { apiClient } from '../../client/apiClient';
import type { Coupon } from '@/store/types/admin.types';

export const AdminCouponService = {
    getAll: async (): Promise<Coupon[]> => {
        const response = await apiClient.get<Coupon[]>('/admin/coupons');
        return response.data;
    },

    getById: async (id: string): Promise<Coupon> => {
        const response = await apiClient.get<Coupon>(`/admin/coupons/${id}`);
        return response.data;
    },

    create: async (data: Omit<Coupon, 'id'>): Promise<Coupon> => {
        const response = await apiClient.post<Coupon>('/admin/coupons', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Coupon>): Promise<Coupon> => {
        const response = await apiClient.put<Coupon>(`/admin/coupons/${id}`, data);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await apiClient.delete(`/admin/coupons/${id}`);
    }
};
