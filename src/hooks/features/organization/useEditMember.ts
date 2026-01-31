import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToggle } from '@/hooks/useToggle';
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
    const showConfirmation = useToggle(false);
    const isSubmitting = useToggle(false);
    const isLoading = useToggle(true);

    // Initial data fetch
    useEffect(() => {
        const fetchMember = async () => {
            isLoading.setTrue();
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

            isLoading.setFalse();
        };

        if (memberId) {
            fetchMember();
        }
    }, [memberId, setEmail, setSelectedRoles, setAccountConfigs, setOverriddenAccounts]);

    const handleSaveClick = () => {
        if (isFormValid) {
            showConfirmation.setTrue();
        }
    };

    const processUpdate = async () => {
        isSubmitting.setTrue();
        const data: InvitationData = {
            email,
            roles: selectedRoles,
            accountPermissions: accountConfigs
        };

        console.log('Updating member:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        isSubmitting.setFalse();
        showConfirmation.setFalse();
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
        isLoading: isLoading.value,
        isSubmitting: isSubmitting.value,
        showConfirmation: showConfirmation.value,
        setShowConfirmation: showConfirmation.setValue,
        handleSaveClick,
        processUpdate,
        isFormValid
    };
};
