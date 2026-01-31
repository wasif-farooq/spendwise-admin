import { useNavigate } from 'react-router-dom';
import { useToggle } from '@/hooks/useToggle';
import { useMemberDetails } from './useMemberDetails';
import { useAccountAccess } from './useAccountAccess';
import type { InvitationData } from '@/views/Manage/InviteMember/types';

export const useInviteMember = () => {
    const navigate = useNavigate();

    const {
        email,
        setEmail,
        selectedRoles,
        toggleRole
    } = useMemberDetails();

    const {
        accountConfigs,
        overriddenAccounts,
        toggleAccountSelection,
        toggleAccountPermission,
        toggleOverride
    } = useAccountAccess(selectedRoles);

    // UI State
    const showConfirmation = useToggle(false);
    const isSubmitting = useToggle(false);

    const handleInviteClick = () => {
        if (isFormValid) {
            showConfirmation.setTrue();
        }
    };

    const processInvite = async () => {
        isSubmitting.setTrue();
        const data: InvitationData = {
            email,
            roles: selectedRoles,
            accountPermissions: accountConfigs
        };

        console.log('Sending invitation:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        isSubmitting.setFalse();
        showConfirmation.setFalse();
        navigate('/manage/members', { state: { invitationSent: true, email: data.email } });
    };

    const isFormValid = email && selectedRoles.length > 0 && Object.keys(accountConfigs).length > 0;

    return {
        email,
        setEmail, // exposed for form
        selectedRoles,
        toggleRole,
        accountConfigs,
        overriddenAccounts,
        toggleAccountSelection,
        toggleAccountPermission,
        toggleOverride,
        showConfirmation: showConfirmation.value,
        setShowConfirmation: showConfirmation.setValue, // exposed for modal close
        isSubmitting: isSubmitting.value,
        handleInviteClick,
        processInvite,
        isFormValid
    };
};
