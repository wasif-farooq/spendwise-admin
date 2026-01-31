import React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlags';
import type { FeatureFlagId } from '@/constants/featureFlags';

interface FeatureGateProps {
    feature: FeatureFlagId;
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

/**
 * A wrapper component that only renders its children if the specified feature flag is enabled.
 * Optionally accepts a fallback component to render when the feature is disabled.
 */
export const FeatureGate: React.FC<FeatureGateProps> = ({ feature, children, fallback = null }) => {
    const isEnabled = useFeatureFlag(feature);

    if (isEnabled) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};

export default FeatureGate;
