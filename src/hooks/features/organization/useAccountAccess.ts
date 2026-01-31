import { useState } from 'react';
import type { InvitationData } from '@/views/Manage/InviteMember/types';
import mockData from '@/data/mockData.json';

export const useAccountAccess = (selectedRoles: string[]) => {
    const [accountConfigs, setAccountConfigs] = useState<InvitationData['accountPermissions']>({});
    const [overriddenAccounts, setOverriddenAccounts] = useState<string[]>([]);

    // In a real app, this would come from a store or API
    const availableRoles = mockData.roles;

    const toggleAccountSelection = (accountId: string) => {
        setAccountConfigs(prev => {
            if (prev[accountId]) {
                const { [accountId]: removed, ...rest } = prev;
                return rest;
            }

            // Calculate initial permissions based on selected roles
            const initialPermissions = new Set<string>();
            selectedRoles.forEach(roleName => {
                const role = availableRoles.find(r => r.name.toLowerCase() === roleName);
                role?.permissions?.accounts?.forEach(p => initialPermissions.add(p));
            });

            return {
                ...prev,
                [accountId]: {
                    accountId,
                    permissions: Array.from(initialPermissions),
                    denied: []
                }
            };
        });
    };

    const toggleAccountPermission = (accountId: string, permission: string) => {
        setAccountConfigs(prev => {
            const config = prev[accountId];
            // If account not selected, select it first with this permission
            if (!config) {
                return {
                    ...prev,
                    [accountId]: {
                        accountId,
                        permissions: [permission],
                        denied: []
                    }
                };
            }

            const currentPermissions = config.permissions || [];
            const hasPermission = currentPermissions.includes(permission);

            const newPermissions = hasPermission
                ? currentPermissions.filter(p => p !== permission)
                : [...currentPermissions, permission];

            return {
                ...prev,
                [accountId]: {
                    ...config,
                    permissions: newPermissions
                }
            };
        });
    };

    const toggleOverride = (accountId: string) => {
        setOverriddenAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };

    return {
        accountConfigs,
        setAccountConfigs,
        overriddenAccounts,
        setOverriddenAccounts,
        toggleAccountSelection,
        toggleAccountPermission,
        toggleOverride
    };
};
