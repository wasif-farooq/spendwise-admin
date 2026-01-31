import React from 'react';
import { useFeatureAccess, type FeatureName } from '@/hooks/useFeatureAccess';

export interface WithSubscriptionGateProps {
    featureAccess?: ReturnType<typeof useFeatureAccess>;
}

/**
 * Higher-order component to wrap components that require subscription access
 * @param Component - The component to wrap
 * @param feature - The feature to check access for
 * @param FallbackComponent - Optional component to render when access is denied
 */
export function withSubscriptionGate<P extends object>(
    Component: React.ComponentType<P & WithSubscriptionGateProps>,
    feature: FeatureName,
    FallbackComponent?: React.ComponentType<{ reason: string; canUpgrade: boolean }>
) {
    return function SubscriptionGatedComponent(props: P) {
        const featureAccess = useFeatureAccess(feature);

        // If no access and fallback provided, show fallback
        if (!featureAccess.hasAccess && FallbackComponent) {
            return (
                <FallbackComponent
                    reason={featureAccess.reason}
                    canUpgrade={featureAccess.canUpgrade}
                />
            );
        }

        // Pass feature access info to component
        return <Component {...props} featureAccess={featureAccess} />;
    };
}

/**
 * Default fallback component for locked features
 */
export const DefaultFeatureLockFallback: React.FC<{ reason: string; canUpgrade: boolean }> = ({
    reason,
    canUpgrade,
}) => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-4xl">🔒</div>
            <h3 className="mb-2 text-lg font-semibold">Feature Locked</h3>
            <p className="mb-4 text-sm text-gray-600">{reason}</p>
            {canUpgrade && (
                <button className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90">
                    Upgrade to Unlock
                </button>
            )}
        </div>
    );
};
