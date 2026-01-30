export interface AIInsight {
    id: string;
    type: 'spending' | 'saving' | 'budget' | 'investment' | 'warning';
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    category?: string;
    amount?: number;
    actionable: boolean;
    action?: string;
    createdAt: string;
}

export interface AIRecommendation {
    id: string;
    category: string;
    suggestion: string;
    potentialSavings: number;
    confidence: number;
    reasoning: string;
}

export interface BudgetSuggestion {
    category: string;
    currentSpending: number;
    suggestedBudget: number;
    reasoning: string;
}

export interface SpendingPattern {
    pattern: string;
    frequency: string;
    averageAmount: number;
    nextOccurrence?: string;
}

export interface AIAdvisorState {
    insights: AIInsight[];
    recommendations: AIRecommendation[];
    budgetSuggestions: BudgetSuggestion[];
    spendingPatterns: SpendingPattern[];
    loading: boolean;
    error: string | null;
}
