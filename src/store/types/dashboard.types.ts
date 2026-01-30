export interface DashboardStats {
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    savingsRate: number;
    accountsCount: number;
    transactionsCount: number;
}

export interface SpendingByCategory {
    category: string;
    amount: number;
    percentage: number;
    color: string;
}

export interface IncomeVsExpense {
    month: string;
    income: number;
    expense: number;
}

export interface RecentActivity {
    id: string;
    type: 'transaction' | 'member' | 'account';
    description: string;
    timestamp: string;
    amount?: number;
}

export interface DashboardData {
    stats: DashboardStats;
    spendingByCategory: SpendingByCategory[];
    incomeVsExpense: IncomeVsExpense[];
    recentActivity: RecentActivity[];
}

export interface DashboardState {
    data: DashboardData | null;
    loading: boolean;
    error: string | null;
}
