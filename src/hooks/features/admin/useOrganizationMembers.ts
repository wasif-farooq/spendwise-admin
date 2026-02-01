import { useState, useEffect, useCallback } from 'react';
import { adminOrganizationService } from '@/api/services/admin/adminOrganizationService';
import { toast } from 'sonner';

export interface OrganizationMember {
    id: string;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinedDate: string;
    avatar?: string;
}

export const useOrganizationMembers = (orgId?: string) => {
    const [members, setMembers] = useState<OrganizationMember[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMembers = useCallback(async () => {
        if (!orgId) return;
        setLoading(true);
        try {
            const data = await adminOrganizationService.getMembers(orgId);
            setMembers(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch organization members');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [orgId]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const removeMember = async (memberId: string) => {
        if (!orgId) return;
        try {
            await adminOrganizationService.removeMember(orgId, memberId);
            toast.success('Member removed from organization');
            await fetchMembers();
            return true;
        } catch (err) {
            console.error('Failed to remove member', err);
            toast.error('Failed to remove member');
            throw err;
        }
    };

    return {
        members,
        loading,
        error,
        removeMember,
        refresh: fetchMembers
    };
};
