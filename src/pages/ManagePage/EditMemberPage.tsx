import { useNavigate, useParams } from 'react-router-dom';
import { Block, Flex, Heading, Text, Grid, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { ArrowLeft, Save } from 'lucide-react';

import { MemberDetailsForm } from '@/views/Manage/InviteMember/MemberDetailsForm';
import { AccountAccessForm } from '@/views/Manage/InviteMember/AccountAccessForm';
import { InviteSummaryModal } from '@/views/Manage/InviteMember/InviteSummaryModal';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { useEditMember } from '@/hooks/features/organization/useEditMember';

const EditMemberPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const {
        email,
        setEmail,
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
    } = useEditMember(id);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" className="min-h-[60vh]">
                <Block className="w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
            </Flex>
        );
    }

    return (
        <AnimatedBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mx-auto space-y-12 pb-20"
        >
            {/* Header */}
            <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                <Flex align="center" gap={4}>
                    <Block
                        as="button"
                        onClick={() => navigate('/manage/members')}
                        className="p-3 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Block>
                    <Block>
                        <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">
                            Edit Member
                        </Heading>
                        <Text color="text-gray-500" weight="medium" className="mt-1">Update access levels and permissions.</Text>
                    </Block>
                </Flex>
                <Flex align="center" gap={4}>
                    <Button
                        variant="outline"
                        onClick={() => navigate('/manage/members')}
                        className="px-8 py-4 rounded-2xl"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSaveClick}
                        disabled={!isFormValid || isSubmitting}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center"
                    >
                        <Flex align="center">
                            <Save className="h-5 w-5 mr-2" />
                            Save Changes
                        </Flex>
                    </Button>
                </Flex>
            </Flex>

            <Grid cols={1} gap={6} className="lg:grid-cols-3">
                <MemberDetailsForm
                    email={email}
                    setEmail={setEmail}
                    selectedRoles={selectedRoles}
                    toggleRole={toggleRole}
                />

                <AccountAccessForm
                    accountConfigs={accountConfigs}
                    toggleAccountSelection={toggleAccountSelection}
                    toggleAccountPermission={toggleAccountPermission}
                    overriddenAccounts={overriddenAccounts}
                    toggleOverride={toggleOverride}
                    canOverridePermissions={useFeatureAccess('permission-overrides').hasAccess}
                />
            </Grid>

            {/* Confirmation Modal */}
            <InviteSummaryModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={processUpdate}
                isSubmitting={isSubmitting}
                email={email}
                selectedRoles={selectedRoles}
                accountConfigs={accountConfigs}
                overriddenAccounts={overriddenAccounts}
            />
        </AnimatedBlock>
    );
};

export default EditMemberPage;
