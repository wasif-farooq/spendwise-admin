import { apiClient } from '../../client/apiClient';
import { mockAdapter } from '../../client/mockAdapter';
import mockData from './aiAdvisorMockData.json';
import type { AIInsight, AIRecommendation, BudgetSuggestion, SpendingPattern } from '@/store/types/aiAdvisor.types';

// Register mock data
mockAdapter.registerMockData('/ai-advisor/insights', mockData.insights);
mockAdapter.registerMockData('/ai-advisor/recommendations', mockData.recommendations);
mockAdapter.registerMockData('/ai-advisor/budget-suggestions', mockData.budgetSuggestions);
mockAdapter.registerMockData('/ai-advisor/spending-patterns', mockData.spendingPatterns);

class AIAdvisorService {
    async getInsights(limit?: number): Promise<AIInsight[]> {
        const response = await apiClient.get<AIInsight[]>('/ai-advisor/insights', {
            params: { limit },
        });
        return response.data;
    }

    async getRecommendations(): Promise<AIRecommendation[]> {
        const response = await apiClient.get<AIRecommendation[]>('/ai-advisor/recommendations');
        return response.data;
    }

    async getBudgetSuggestions(): Promise<BudgetSuggestion[]> {
        const response = await apiClient.get<BudgetSuggestion[]>('/ai-advisor/budget-suggestions');
        return response.data;
    }

    async getSpendingPatterns(): Promise<SpendingPattern[]> {
        const response = await apiClient.get<SpendingPattern[]>('/ai-advisor/spending-patterns');
        return response.data;
    }

    async askQuestion(question: string): Promise<{ answer: string; confidence: number }> {
        const response = await apiClient.post<{ answer: string; confidence: number }>('/ai-advisor/ask', {
            question,
        });
        return response.data;
    }

    async dismissInsight(insightId: string): Promise<void> {
        await apiClient.post(`/ai-advisor/insights/${insightId}/dismiss`);
    }

    async applyRecommendation(recommendationId: string): Promise<void> {
        await apiClient.post(`/ai-advisor/recommendations/${recommendationId}/apply`);
    }

    async generateReport(type: 'spending' | 'saving' | 'investment'): Promise<{
        summary: string;
        details: string[];
        charts: any[];
    }> {
        const response = await apiClient.post<{
            summary: string;
            details: string[];
            charts: any[];
        }>('/ai-advisor/generate-report', { type });
        return response.data;
    }
}

export const aiAdvisorService = new AIAdvisorService();
