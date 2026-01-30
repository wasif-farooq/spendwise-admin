import type { LucideIcon } from 'lucide-react';

export interface RolePermission {
    [resource: string]: string[];
    accounts: string[];
}

export interface Role {
    id: number;
    name: string;
    description: string;
    isDefault: boolean;
    color: string;
    icon: LucideIcon;
    permissions: RolePermission;
}

export interface RoleFilters {
    types: string[];
    minPermissions: number;
}
