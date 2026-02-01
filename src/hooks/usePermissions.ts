import { useAppSelector } from '@/store/redux';
import { selectUser } from '@/store/slices/authSlice';

export const usePermissions = () => {
    const user = useAppSelector(selectUser);

    const hasPermission = (permission: string): boolean => {
        if (!user) return false;

        // Admin role has all permissions
        if (user.role === 'admin' || user.permissions?.includes('*')) {
            return true;
        }

        return user.permissions?.includes(permission) || false;
    };

    const hasAnyPermission = (permissions: string[]): boolean => {
        return permissions.some(p => hasPermission(p));
    };

    const hasAllPermissions = (permissions: string[]): boolean => {
        return permissions.every(p => hasPermission(p));
    };

    return {
        hasPermission,
        hasAnyPermission,
        hasAllPermissions,
        role: user?.role,
        isAdmin: user?.role === 'admin',
        isStaff: user?.role === 'staff',
    };
};
