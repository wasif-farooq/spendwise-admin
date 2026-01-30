import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './billingMockData.json';
import type { BillingPlan, PaymentMethod, BillingHistory, BillingData, CreatePaymentMethodDTO } from '@/store/types/billing.types';

// Register mock data
mockAdapter.registerMockData('/billing', mockData);
mockAdapter.registerMockData('/billing/plan', mockData.currentPlan);
mockAdapter.registerMockData('/billing/payment-methods', mockData.paymentMethods);
mockAdapter.registerMockData('/billing/history', mockData.history);

class BillingService {
    async getBillingData(): Promise<BillingData> {
        const response = await apiClient.get<BillingData>('/billing');
        return response.data;
    }

    async getCurrentPlan(): Promise<BillingPlan> {
        const response = await apiClient.get<BillingPlan>('/billing/plan');
        return response.data;
    }

    async getPaymentMethods(): Promise<PaymentMethod[]> {
        const response = await apiClient.get<PaymentMethod[]>('/billing/payment-methods');
        return response.data;
    }

    async addPaymentMethod(data: CreatePaymentMethodDTO): Promise<PaymentMethod> {
        const response = await apiClient.post<PaymentMethod>('/billing/payment-methods', data);
        return response.data;
    }

    async deletePaymentMethod(id: string): Promise<void> {
        await apiClient.delete(`/billing/payment-methods/${id}`);
    }

    async setDefaultPaymentMethod(id: string): Promise<void> {
        await apiClient.post(`/billing/payment-methods/${id}/set-default`);
    }

    async getBillingHistory(): Promise<BillingHistory[]> {
        const response = await apiClient.get<BillingHistory[]>('/billing/history');
        return response.data;
    }

    async downloadInvoice(invoiceId: string): Promise<Blob> {
        const response = await apiClient.get<Blob>(`/billing/invoices/${invoiceId}/download`, {
            responseType: 'blob',
        });
        return response.data as Blob;
    }

    async changePlan(planId: string): Promise<BillingPlan> {
        const response = await apiClient.post<BillingPlan>('/billing/change-plan', { planId });
        return response.data;
    }

    async cancelSubscription(): Promise<void> {
        await apiClient.post('/billing/cancel');
    }
}

export const billingService = new BillingService();
