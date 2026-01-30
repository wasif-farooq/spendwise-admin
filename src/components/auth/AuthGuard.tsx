import type { ReactNode } from 'react';
import { useAuth } from '@/store/hooks/useAuth';

interface AuthGuardProps {
    children: ReactNode;
    requiredRole?: string;
    fallback?: ReactNode;
}

export const AuthGuard = ({ children, requiredRole, fallback }: AuthGuardProps) => {
    const { isAuthenticated, user } = useAuth();

    // Not authenticated
    if (!isAuthenticated) {
        return fallback || null;
    }

    // Check role requirement
    if (requiredRole && user?.role !== requiredRole) {
        return fallback || null;
    }

    // Render children if authorized
    return <>{children}</>;
};
