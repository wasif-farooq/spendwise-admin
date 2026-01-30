import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Block, Flex, Heading, Text, Grid, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { ArrowLeft, Check } from 'lucide-react';
import mockData from '@/data/mockData.json';

import { MemberDetailsForm } from '@/views/Manage/InviteMember/MemberDetailsForm';
import { AccountAccessForm } from '@/views/Manage/InviteMember/AccountAccessForm';
import { InviteSummaryModal } from '@/views/Manage/InviteMember/InviteSummaryModal';
import type { InvitationData } from '@/views/Manage/InviteMember/types';


const InviteMemberPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(['member']);
    const [accountConfigs, setAccountConfigs] = useState<InvitationData['accountPermissions']>({});
    const [overriddenAccounts, setOverriddenAccounts] = useState<string[]>([]);

    // UI State
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const availableRoles = mockData.roles;

    const toggleRole = (roleName: string) => {
        const normalized = roleName.toLowerCase();
        setSelectedRoles(prev =>
            prev.includes(normalized)
                ? prev.filter(r => r !== normalized)
                : [...prev, normalized]
        );
    };

    const toggleAccountSelection = (accountId: string) => {
        setAccountConfigs(prev => {
            if (prev[accountId]) {
                const { [accountId]: removed, ...rest } = prev;
                return rest;
            }

            // Calculate initial permissions based on selected roles
            const initialPermissions = new Set<string>();
            selectedRoles.forEach(roleName => {
                const role = availableRoles.find(r => r.name.toLowerCase() === roleName);
                role?.permissions?.accounts?.forEach(p => initialPermissions.add(p));
            });

            return {
                ...prev,
                [accountId]: {
                    accountId,
                    permissions: Array.from(initialPermissions),
                    denied: []
                }
            };
        });
    };

    const toggleAccountPermission = (accountId: string, permission: string) => {
        setAccountConfigs(prev => {
            const config = prev[accountId];
            // If account not selected, select it first with this permission
            if (!config) {
                return {
                    ...prev,
                    [accountId]: {
                        accountId,
                        permissions: [permission],
                        denied: []
                    }
                };
            }

            const currentPermissions = config.permissions || [];
            const hasPermission = currentPermissions.includes(permission);

            const newPermissions = hasPermission
                ? currentPermissions.filter(p => p !== permission)
                : [...currentPermissions, permission];

            return {
                ...prev,
                [accountId]: {
                    ...config,
                    permissions: newPermissions
                }
            };
        });
    };

    const toggleOverride = (accountId: string) => {
        setOverriddenAccounts(prev =>
            prev.includes(accountId)
                ? prev.filter(id => id !== accountId)
                : [...prev, accountId]
        );
    };

    const handleInviteClick = () => {
        if (isFormValid) {
            setShowConfirmation(true);
        }
    };

    const processInvite = async () => {
        setIsSubmitting(true);
        const data: InvitationData = {
            email,
            roles: selectedRoles,
            accountPermissions: accountConfigs
        };

        console.log('Sending invitation:', data);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setShowConfirmation(false);
        navigate('/manage/members', { state: { invitationSent: true, email: data.email } });
    };

    const isFormValid = email && selectedRoles.length > 0 && Object.keys(accountConfigs).length > 0;

    return (
        <AnimatedBlock
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mx-auto space-y-12 pb-20"
        >
            {/* Header */}
            <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                <Flex align="center" gap={4}>
                    <button
                        onClick={() => navigate('/manage/members')}
                        className="p-3 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </button>
                    <Block>
                        <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">
                            Invite New Member
                        </Heading>
                        <Text color="text-gray-500" weight="medium" className="mt-1">Define precise access levels and roles.</Text>
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
                        onClick={handleInviteClick}
                        disabled={!isFormValid || isSubmitting}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center"
                    >
                        <Flex align="center">
                            <Check className="h-5 w-5 mr-2" />
                            Send Invitation
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
                />
            </Grid>

            {/* Confirmation Modal */}
            <InviteSummaryModal
                isOpen={showConfirmation}
                onClose={() => setShowConfirmation(false)}
                onConfirm={processInvite}
                isSubmitting={isSubmitting}
                email={email}
                selectedRoles={selectedRoles}
                accountConfigs={accountConfigs}
                overriddenAccounts={overriddenAccounts}
            />
        </AnimatedBlock>
    );
};

export default InviteMemberPage;
