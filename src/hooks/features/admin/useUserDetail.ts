import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';

export const useUserDetail = (id?: string) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const { getUserById, loading: apiLoading } = useAdminUsers();
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchUser = async () => {
                setLoading(true);
                try {
                    const data = await getUserById(id);
                    // Merge with mock details for now since API doesn't return everything yet
                    setUser({
                        ...data,
                        organizations: [
                            { id: '1', name: 'Personal', role: 'owner', joinedAt: '2025-01-15' },
                            { id: '2', name: 'Tech Solutions', role: 'admin', joinedAt: '2025-02-10' }
                        ],
                        accounts: [
                            { id: 'A1', name: 'Primary Checking', balance: 2450.00, type: 'checking', status: 'active' },
                            { id: 'A2', name: 'Vacation Savings', balance: 5000.00, type: 'savings', status: 'active' }
                        ],
                        subscription: {
                            plan: 'pro',
                            status: 'active',
                            billingCycle: 'monthly',
                            nextBilling: '2026-03-15'
                        },
                        transactions: [
                            { id: 'T1', date: '2026-02-01', description: 'Grocery Store', amount: -150.00, status: 'completed' },
                            { id: 'T2', date: '2026-01-28', description: 'Salary Deposit', amount: 3500.00, status: 'completed' }
                        ]
                    });
                } finally {
                    setLoading(false);
                }
            };
            fetchUser();
        }
    }, [id, getUserById]);

    // Actions
    const handleStatusChange = async (newStatus: 'active' | 'suspended') => {
        setActionLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser((prev: any) => ({ ...prev, status: newStatus }));
        toast.success(`User ${newStatus === 'active' ? 'reactivated' : 'suspended'} successfully`);
        setActionLoading(false);
    };

    const handleDeleteUser = async () => {
        setActionLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('User deleted permanently');
        navigate('/users');
    };

    const handleUpdateSubscription = async (plan: string) => {
        setActionLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser((prev: any) => ({
            ...prev,
            subscription: { ...prev.subscription, plan }
        }));
        toast.success(`Subscription updated to ${plan.toUpperCase()}`);
        setActionLoading(false);
    };

    // Organization Actions
    const handleDeleteOrg = async (orgId: string) => {
        setActionLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser((prev: any) => ({
            ...prev,
            organizations: prev.organizations.filter((o: any) => o.id !== orgId)
        }));
        toast.success('Organization removed from user profile');
        setActionLoading(false);
    };

    // Account Actions
    const handleFlagAccount = async (accountId: string) => {
        setUser((prev: any) => ({
            ...prev,
            accounts: prev.accounts.map((a: any) =>
                a.id === accountId ? { ...a, status: 'flagged' } : a
            )
        }));
        toast.warning('Account flagged for review');
    };

    const handleDeleteAccount = async (accountId: string) => {
        setActionLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setUser((prev: any) => ({
            ...prev,
            accounts: prev.accounts.filter((a: any) => a.id !== accountId)
        }));
        toast.success('Account deleted');
        setActionLoading(false);
    };


    return {
        user,
        loading: loading || apiLoading,
        actionLoading,
        handleStatusChange,
        handleDeleteUser,
        handleUpdateSubscription,
        handleDeleteOrg,
        handleFlagAccount,
        handleDeleteAccount
    };
};
