export interface AnalyticsData {
    overview: AnalyticsOverview;
    categoryTrends: CategoryTrend[];
    monthlyComparison: MonthlyComparison[];
    topExpenses: TopExpense[];
    savingsGoals: SavingsGoal[];
}

export interface AnalyticsOverview {
    totalIncome: number;
    totalExpenses: number;
    netSavings: number;
    savingsRate: number;
    averageDaily: number;
    projectedMonthly: number;
}

export interface CategoryTrend {
    category: string;
    currentMonth: number;
    previousMonth: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
}

export interface MonthlyComparison {
    month: string;
    income: number;
    expenses: number;
    savings: number;
}

export interface TopExpense {
    id: string;
    description: string;
    category: string;
    amount: number;
    date: string;
}

export interface SavingsGoal {
    id: string;
    name: string;
    target: number;
    current: number;
    percentage: number;
    deadline: string;
}

export interface AnalyticsState {
    data: AnalyticsData | null;
    loading: boolean;
    error: string | null;
}
