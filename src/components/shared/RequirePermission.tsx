import React, { type ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { usePermissions } from '@/hooks/usePermissions';
import type { Resource, Action } from '@/constants/permissions';
import { Block, Text } from '@shared';
import { ShieldAlert } from 'lucide-react';
import Button from '@/components/ui/Button';

interface RequirePermissionProps {
    resource: Resource;
    action: Action;
    children: ReactElement;
    redirectTo?: string;
}

export const RequirePermission = ({
    resource,
    action,
    children,
    redirectTo
}: RequirePermissionProps) => {
    const { hasPermission } = usePermissions();
    const location = useLocation();

    if (hasPermission(resource, action)) {
        return children;
    }

    if (redirectTo) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    // Default unauthorized view
    return (
        <Block className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
            <Block className="bg-red-50 p-4 rounded-full mb-4">
                <ShieldAlert size={48} className="text-red-500" />
            </Block>
            <Text as="h2" className="text-2xl font-bold text-gray-900 mb-2">Access Denied</Text>
            <Text className="text-gray-500 max-w-md mb-6">
                You do not have permission to access the <strong>{resource}</strong> module.
                Please contact your administrator if you believe this is an error.
            </Text>
            <Button onClick={() => window.history.back()}>
                Go Back
            </Button>
        </Block>
    );
};
