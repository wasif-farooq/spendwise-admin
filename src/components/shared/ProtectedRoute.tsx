import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/store/redux';
import { selectHasAIAdvisorAccess } from '@/store/slices/subscriptionSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    feature?: 'ai-advisor' | 'exchange-rates' | 'permission-overrides';
    redirectTo?: string;
}

/**
 * Protected route component that checks subscription access
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    feature,
    redirectTo = '/dashboard',
}) => {
    const hasAIAdvisor = useAppSelector(selectHasAIAdvisorAccess);

    // Check feature access based on feature type
    let hasAccess = true;

    if (feature === 'ai-advisor') {
        hasAccess = hasAIAdvisor;
    }
    // Add more feature checks as needed

    if (!hasAccess) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};
