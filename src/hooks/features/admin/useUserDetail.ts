import { useState, useEffect } from 'react';
import { useAdminUsers } from '@/hooks/features/admin/useAdminUsers';

export const useUserDetail = (id?: string) => {
    const [user, setUser] = useState<any>(null);
    const { getUserById, loading: apiLoading } = useAdminUsers();
    const [loading, setLoading] = useState(true);

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
                            { id: 'A1', name: 'Primary Checking', balance: 2450.00, type: 'checking' },
                            { id: 'A2', name: 'Vacation Savings', balance: 5000.00, type: 'savings' }
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

    return { user, loading: loading || apiLoading };
};
