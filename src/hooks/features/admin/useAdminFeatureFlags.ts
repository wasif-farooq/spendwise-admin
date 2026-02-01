import { useState, useEffect } from 'react';
import { useTable } from '@/hooks/useTable';

export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    status: 'enabled' | 'disabled' | 'experimental';
    environments: string[];
    updatedAt: string;
}

// Mock feature flags (moved from page)
const MOCK_FLAGS: FeatureFlag[] = [
    { id: 'ai_advisor', name: 'AI Budget Advisor', description: 'Enable the AI-powered personalized budget advisor', status: 'enabled', environments: ['production', 'staging'], updatedAt: '2026-01-20' },
    { id: 'crypto_tracking', name: 'Crypto Wallet Sync', description: 'Support for syncing crypto wallets through Plaid', status: 'disabled', environments: ['staging'], updatedAt: '2026-01-25' },
    { id: 'multicurrency', name: 'Multi-Currency Support', description: 'Allows users to maintain accounts in different currencies', status: 'enabled', environments: ['production', 'staging'], updatedAt: '2025-12-15' },
    { id: 'advanced_analytics', name: 'Predictive Analytics', description: 'Advanced spending prediction models', status: 'experimental', environments: ['development'], updatedAt: '2026-02-01' },
    { id: 'dark_mode', name: 'Dark Mode v2', description: 'New improved dark mode with higher contrast', status: 'disabled', environments: ['development'], updatedAt: '2026-02-02' },
    { id: 'api_v2', name: 'API v2 Access', description: 'Grant access to the new REST API endpoints', status: 'experimental', environments: ['staging', 'development'], updatedAt: '2026-01-30' },
    { id: 'audit_logs', name: 'Advanced Audit Logs', description: 'Detailed user activity tracking for enterprise accounts', status: 'enabled', environments: ['production'], updatedAt: '2025-11-20' },
];

export const useAdminFeatureFlags = () => {
    const [flags, setFlags] = useState<FeatureFlag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate fetch
    useEffect(() => {
        const loadFlags = async () => {
            setLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 600));
                setFlags(MOCK_FLAGS);
            } catch (err) {
                setError('Failed to load feature flags');
            } finally {
                setLoading(false);
            }
        };
        loadFlags();
    }, []);

    const {
        searchQuery,
        setSearchQuery,
        data: paginatedFlags,
        currentPage,
        setCurrentPage,
        totalPages,
        setFilter,
        filters,
        clearFilters,
        totalCount
    } = useTable<FeatureFlag>(flags, ['name', 'id', 'description']);

    const toggleFlag = (id: string) => {
        setFlags(prev => prev.map(f => {
            if (f.id === id) {
                return { ...f, status: f.status === 'enabled' ? 'disabled' : 'enabled' };
            }
            return f;
        }));
    };

    return {
        flags: paginatedFlags,
        totalCount,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filters,
        setFilter,
        clearFilters,
        toggleFlag,
        refresh: () => {
            // Re-fetch logic would go here
            setLoading(true);
            setTimeout(() => {
                setFlags(MOCK_FLAGS);
                setLoading(false);
            }, 500);
        }
    };
};
