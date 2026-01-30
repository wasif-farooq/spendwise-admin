export interface BillingPlan {
    name: string;
    price: string;
    period: string;
    nextBilling: string;
    status: 'Active' | 'Cancelled' | 'Expired';
    features: string[];
}

export interface PaymentMethod {
    id: number | string;
    type: string;
    last4: string;
    expiry: string;
    isDefault: boolean;
}

export interface BillingHistory {
    id: string;
    date: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Failed';
    invoiceUrl?: string;
}

export interface BillingData {
    currentPlan: BillingPlan;
    paymentMethods: PaymentMethod[];
    history: BillingHistory[];
}

export interface CreatePaymentMethodDTO {
    type: string;
    cardNumber: string;
    expiry: string;
    cvv: string;
}

export interface BillingState {
    currentPlan: BillingPlan | null;
    paymentMethods: PaymentMethod[];
    history: BillingHistory[];
    loading: boolean;
    error: string | null;
}
