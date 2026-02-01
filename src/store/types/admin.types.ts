export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'admin' | 'staff';
    status: 'active' | 'suspended';
    organization: string;
    createdAt: string;
    joinedOrgsCount?: number;
}

export interface AdminOrganization {
    id: string;
    name: string;
    plan: 'free' | 'pro' | 'enterprise';
    status: 'active' | 'suspended';
    membersCount: number;
    accountsCount: number;
    owner: string;
    createdAt: string;
}

export interface AdminAccount {
    id: string;
    name: string;
    type: 'checking' | 'savings' | 'investment';
    balance: number;
    currency: string;
    status: 'active' | 'flagged' | 'closed';
    organization: string;
    ownerEmail: string;
}

export interface AdminDashboardMetrics {
    totalUsers: number;
    activeOrganizations: number;
    monthlyRevenue: number;
    conversionRate: number;
    userGrowth: { date: string; value: number }[];
    revenueGrowth: { date: string; value: number }[];
}
