export interface InvitationData {
    email: string;
    roles: string[];
    accountPermissions: Record<string, {
        accountId: string;
        permissions: string[];
        denied: string[];
    }>;
}
