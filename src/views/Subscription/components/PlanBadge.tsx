import React from 'react';
import { Badge } from '@ui';
import type { SubscriptionPlan } from '@/constants/subscriptionPlans';

export interface PlanBadgeProps {
    plan: SubscriptionPlan;
    className?: string;
}

const planConfig = {
    free: {
        label: 'Free',
        variant: 'default' as const,
    },
    pro: {
        label: 'Pro',
        variant: 'gradient' as const,
    },
};

export const PlanBadge: React.FC<PlanBadgeProps> = ({ plan, className }) => {
    const config = planConfig[plan as keyof typeof planConfig];

    if (!config) {
        return null;
    }

    return (
        <Badge variant={config.variant} size="md" className={className}>
            {config.label}
        </Badge>
    );
};
