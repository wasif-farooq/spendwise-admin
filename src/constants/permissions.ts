export const RESOURCES = {
    USERS: 'users',
    TRANSACTIONS: 'transactions',
    ORGANIZATIONS: 'organizations',
    ACCOUNTS: 'accounts',
    SUBSCRIPTIONS: 'subscriptions',
    COUPONS: 'coupons',
    STAFF: 'staff',
    STAFF_ROLES: 'staff_roles',
    SETTINGS: 'settings',
    ANALYTICS: 'analytics',
} as const;

export const ACTIONS = {
    READ: 'read',
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    MANAGE: 'manage', // Super admin / all actions
} as const;

export type Resource = typeof RESOURCES[keyof typeof RESOURCES];
export type Action = typeof ACTIONS[keyof typeof ACTIONS];
