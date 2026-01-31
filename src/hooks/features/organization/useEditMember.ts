import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMemberDetails } from './useMemberDetails';
import { useAccountAccess } from './useAccountAccess';
import type { InvitationData } from '@/views/Manage/InviteMember/types';
import mockData from '@/data/mockData.json';

export const useEditMember = (memberId?: string) => {
    const navigate = useNavigate();

    // Use existing hooks for form state
    const {
        email,
        setEmail,
        selectedRoles,
        setSelectedRoles,
        toggleRole
    } = useMemberDetails();

    const {
        accountConfigs,
        setAccountConfigs,
        overriddenAccounts,
        setOverriddenAccounts,
        toggleAccountSelection,
        toggleAccountPermission,
        toggleOverride
    } = useAccountAccess(selectedRoles);

    // Page-specific UI state
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initial data fetch
    useEffect(() => {
        const fetchMember = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 600)); // Simulating network

            const member = mockData.members.find(m => m.id === Number(memberId));

            if (member) {
                setEmail(member.email);
                // logic to handle legacy 'role' vs new 'roles' array
                const roles = (member as any).roles || [member.role.toLowerCase()];
                setSelectedRoles(roles);

                const permissions = (member as any).accountPermissions || {};
                setAccountConfigs(permissions);

                // Infer overridden accounts from permissions existence
                setOverriddenAccounts(Object.keys(permissions));
            }

            setIsLoading(false);
        };

        if (memberId) {
            fetchMember();
        }
    }, [memberId, setEmail, setSelectedRoles, setAccountConfigs, setOverriddenAccounts]);

    const handleSaveClick = () => {
        if (isFormValid) {
            setShowConfirmation(true);
        }
    };

    const processUpdate = async () => {
        setIsSubmitting(true);
        const data: InvitationData = {
            email,
            roles: selectedRoles,
            accountPermissions: accountConfigs
        };

        console.log('Updating member:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowConfirmation(false);
        navigate('/manage/members');
    };

    const isFormValid = email && selectedRoles.length > 0;

    return {
        email,
        setEmail, // Exposed for form binding
        selectedRoles,
        toggleRole,
        accountConfigs,
        overriddenAccounts,
        toggleAccountSelection,
        toggleAccountPermission,
        toggleOverride,
        isLoading,
        isSubmitting,
        showConfirmation,
        setShowConfirmation,
        handleSaveClick,
        processUpdate,
        isFormValid
    };
};
