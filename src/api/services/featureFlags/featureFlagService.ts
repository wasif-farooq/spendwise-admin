import { apiClient } from '@/api/client/apiClient';
import { FEATURE_FLAGS, type FeatureFlagsResponse } from '@/constants/featureFlags';

class FeatureFlagService {
    private cache: FeatureFlagsResponse | null = null;
    private cacheTimestamp: number = 0;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    /**
     * Fetch all feature flags
     * Returns a map of flagKey -> boolean value
     */
    async getFlags(): Promise<FeatureFlagsResponse> {
        // Check cache
        if (this.cache && (Date.now() - this.cacheTimestamp < this.CACHE_DURATION)) {
            return this.cache;
        }

        try {
            const response = await apiClient.get<FeatureFlagsResponse>('/feature-flags');

            // Merge valid flags from response
            const flags: FeatureFlagsResponse = { ...this.getDefaultFlags() };

            if (response.data) {
                Object.keys(response.data).forEach((key) => {
                    // Only accept keys that are valid feature flags
                    if (key in FEATURE_FLAGS) {
                        // verify type safety if needed, assuming boolean for now
                        flags[key as keyof FeatureFlagsResponse] = Boolean(response.data[key as keyof FeatureFlagsResponse]);
                    }
                });
            }

            // Update cache
            this.cache = flags;
            this.cacheTimestamp = Date.now();

            return flags;
        } catch (error) {
            console.warn('Failed to fetch feature flags, using defaults:', error);
            // Fallback to defaults
            return this.getDefaultFlags();
        }
    }

    /**
     * Get default values for all flags
     */
    getDefaultFlags(): FeatureFlagsResponse {
        const defaults: Partial<FeatureFlagsResponse> = {};
        Object.values(FEATURE_FLAGS).forEach(flag => {
            defaults[flag.id as keyof FeatureFlagsResponse] = flag.defaultValue;
        });
        return defaults as FeatureFlagsResponse;
    }

    /**
     * Force refresh cache
     */
    invalidateCache() {
        this.cache = null;
    }
}

export default new FeatureFlagService();
