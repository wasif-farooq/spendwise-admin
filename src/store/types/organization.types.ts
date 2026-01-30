export interface Organization {
    id: string;
    name: string;
    description?: string;
    logo?: string;
    website?: string;
    industry?: string;
    size?: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrganizationSettings {
    allowMemberInvites: boolean;
    requireEmailVerification: boolean;
    defaultRole: string;
    billingEmail: string;
    notificationEmail: string;
}

export interface UpdateOrganizationDTO {
    name?: string;
    description?: string;
    logo?: string;
    website?: string;
    industry?: string;
    size?: string;
}

export interface OrganizationState {
    organization: Organization | null;
    settings: OrganizationSettings | null;
    loading: boolean;
    error: string | null;
}
