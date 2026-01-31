import React, { createContext, useContext, useEffect, useState } from 'react';
import type { FeatureFlagsResponse, FeatureFlagId } from '@/constants/featureFlags';
import featureFlagService from '@/api/services/featureFlags/featureFlagService';

interface FeatureFlagContextType {
    flags: FeatureFlagsResponse | null;
    loading: boolean;
    error: string | null;
    checkFlag: (id: FeatureFlagId) => boolean;
    getFlagValue: (id: FeatureFlagId) => boolean;
    refreshFlags: () => Promise<void>;
}

const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

export const useFeatureFlagContext = () => {
    const context = useContext(FeatureFlagContext);
    if (!context) {
        throw new Error('useFeatureFlagContext must be used within a FeatureFlagProvider');
    }
    return context;
};

export const FeatureFlagProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [flags, setFlags] = useState<FeatureFlagsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchFlags = async () => {
        try {
            setLoading(true);
            const data = await featureFlagService.getFlags();
            setFlags(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to load feature flags');
            // Even on error, we might want to set defaults if service didn't handle it
            const defaults = featureFlagService.getDefaultFlags();
            setFlags(defaults);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlags();
    }, []);

    const checkFlag = (id: FeatureFlagId): boolean => {
        if (!flags) return false;
        return flags[id] === true;
    };

    const getFlagValue = (id: FeatureFlagId): boolean => {
        if (!flags) return false;
        return !!flags[id]; // Ensure boolean return
    };

    const value = {
        flags,
        loading,
        error,
        checkFlag,
        getFlagValue,
        refreshFlags: fetchFlags
    };

    return (
        <FeatureFlagContext.Provider value={value}>
            {children}
        </FeatureFlagContext.Provider>
    );
};
