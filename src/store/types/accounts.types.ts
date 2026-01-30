export interface Account {
    id: string;
    name: string;
    type: 'bank' | 'savings' | 'cash' | 'credit_card' | 'investment';
    balance: number;
    currency: string;
    lastActivity: string;
    color: string;
    trend: 'up' | 'down' | 'stable';
    change: string;
    icon?: string;
}

export interface CreateAccountDTO {
    name: string;
    type: 'bank' | 'savings' | 'cash' | 'credit_card' | 'investment';
    balance: number;
    currency: string;
    color?: string;
}

export interface UpdateAccountDTO {
    name?: string;
    balance?: number;
    color?: string;
}

export interface AccountsState {
    accounts: Account[];
    selectedAccount: Account | null;
    loading: boolean;
    error: string | null;
    totalBalance: number;
}
