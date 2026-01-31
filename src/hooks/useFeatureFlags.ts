import { useFeatureFlagContext } from '@/context/FeatureFlagContext';
import type { FeatureFlagsResponse, FeatureFlagId } from '@/constants/featureFlags';

/**
 * Hook to check if a specific feature flag is enabled
 * @param flagId The ID of the feature flag
 * @returns boolean indicating if the feature is enabled
 */
export function useFeatureFlag(flagId: FeatureFlagId): boolean {
    const { checkFlag, loading } = useFeatureFlagContext();

    // Safely return false while loading, or handle differently if needed
    // Typically for UI flags, false/hidden is safe default
    if (loading) return false;

    return checkFlag(flagId);
}

/**
 * Hook to get the value of a specific feature flag
 * Useful if we expand flags to be non-boolean in future
 */
export function useFlagValue(flagId: FeatureFlagId): boolean {
    const { getFlagValue, loading } = useFeatureFlagContext();
    if (loading) return false;
    return getFlagValue(flagId);
}

/**
 * Hook to get all feature flags
 * Useful for debugging or listing available features
 */
export function useAllFlags(): FeatureFlagsResponse {
    const { flags } = useFeatureFlagContext();
    return flags || {} as FeatureFlagsResponse;
}

/**
 * Hook to force refresh feature flags
 */
export function useRefreshFlags() {
    const { refreshFlags, loading } = useFeatureFlagContext();
    return { refreshFlags, loading };
}
