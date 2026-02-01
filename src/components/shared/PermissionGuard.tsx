import type { ReactNode } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { Resource, Action } from '@/constants/permissions';

interface PermissionGuardProps {
    resource: Resource;
    action: Action;
    children: ReactNode;
    fallback?: ReactNode;
}

export const PermissionGuard = ({
    resource,
    action,
    children,
    fallback = null
}: PermissionGuardProps) => {
    const { hasPermission } = usePermissions();

    if (hasPermission(resource, action)) {
        return <>{children}</>;
    }

    return <>{fallback}</>;
};
