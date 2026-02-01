import { useAppSelector } from '@/store/redux';
import { selectUser } from '@/store/slices/authSlice';
import type { Resource, Action } from '@/constants/permissions';
import { ACTIONS } from '@/constants/permissions';

export const usePermissions = () => {
    const user = useAppSelector(selectUser);

    const hasPermission = (resource: Resource, action: Action): boolean => {
        if (!user) return false;

        // Super Admin or Admin has all permissions
        if (user.role === 'admin' || user.role === 'SUPER_ADMIN') {
            return true;
        }

        if (!user.permissions) return false;

        // Check for specific permission "resource:action"
        if (user.permissions.includes(`${resource}:${action}`)) {
            return true;
        }

        // Check for manage permission "resource:manage"
        if (user.permissions.includes(`${resource}:${ACTIONS.MANAGE}`)) {
            return true;
        }

        // Check for wildcard permission "resource:*"
        if (user.permissions.includes(`${resource}:*`)) {
            return true;
        }

        // Check for global wildcard "*"
        if (user.permissions.includes('*')) {
            return true;
        }

        return false;
    };

    return {
        hasPermission,
        user,
        role: user?.role,
        isAdmin: user?.role === 'admin' || user?.role === 'SUPER_ADMIN',
        isStaff: user?.role === 'staff',
    };
};
