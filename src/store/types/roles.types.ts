export interface Role {
    id: number | string;
    name: string;
    description: string;
    isDefault: boolean;
    color: string;
    iconName: string;
    permissions: RolePermissions;
    memberCount?: number;
}

export interface RolePermissions {
    dashboard?: string[];
    transactions?: string[];
    members?: string[];
    roles?: string[];
    billing?: string[];
    accounts?: string[];
    [key: string]: string[] | undefined;
}

export interface CreateRoleDTO {
    name: string;
    description: string;
    color: string;
    iconName: string;
    permissions: RolePermissions;
}

export interface UpdateRoleDTO {
    name?: string;
    description?: string;
    color?: string;
    iconName?: string;
    permissions?: RolePermissions;
}

export interface RolesState {
    roles: Role[];
    selectedRole: Role | null;
    loading: boolean;
    error: string | null;
}
