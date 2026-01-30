export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    status: 'completed' | 'pending' | 'cancelled';
    iconName: string;
    color: string;
    accountId?: string;
    receipt?: string;
    notes?: string;
}

export interface CreateTransactionDTO {
    description: string;
    category: string;
    amount: number;
    type: 'income' | 'expense';
    date?: string;
    accountId?: string;
    receipt?: string;
    notes?: string;
}

export interface UpdateTransactionDTO {
    description?: string;
    category?: string;
    amount?: number;
    status?: 'completed' | 'pending' | 'cancelled';
    receipt?: string;
    notes?: string;
}

export interface TransactionsState {
    transactions: Transaction[];
    selectedTransaction: Transaction | null;
    loading: boolean;
    error: string | null;
    filters: {
        category?: string;
        type?: 'income' | 'expense' | 'all';
        dateRange?: { start: string; end: string };
    };
}
