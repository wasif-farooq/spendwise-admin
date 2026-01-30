export interface Member {
    id: number | string;
    name: string;
    email: string;
    role: string;
    roles?: string[];
    status: 'Active' | 'Pending' | 'Inactive';
    joinedDate: string;
    isCurrentUser?: boolean;
    accountPermissions?: Record<string, AccountPermission>;
    avatar?: string;
}

export interface AccountPermission {
    accountId: string;
    permissions: string[];
    denied: string[];
}

export interface CreateMemberDTO {
    email: string;
    roles: string[];
    accountPermissions: Record<string, AccountPermission>;
}

export interface UpdateMemberDTO {
    name?: string;
    roles?: string[];
    status?: 'Active' | 'Pending' | 'Inactive';
    accountPermissions?: Record<string, AccountPermission>;
}

export interface MembersState {
    members: Member[];
    selectedMember: Member | null;
    loading: boolean;
    error: string | null;
}
