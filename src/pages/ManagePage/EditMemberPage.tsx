import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Block, Flex, Heading, Text, Grid, AnimatedBlock } from '@shared';
import { Button } from '@ui';
import { ArrowLeft, Save } from 'lucide-react';
import mockData from '@/data/mockData.json';

import { MemberDetailsForm } from '@/views/Manage/InviteMember/MemberDetailsForm';
import { AccountAccessForm } from '@/views/Manage/InviteMember/AccountAccessForm';
import { InviteSummaryModal } from '@/views/Manage/InviteMember/InviteSummaryModal';
import type { InvitationData } from '@/views/Manage/InviteMember/types';

const EditMemberPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // ... (state code intentionally omitted/preserved in search) ...
    // Note: Since I can't preserve lines effectively without matching huge blocks, I will match the loader and the back button specifically.
    // Wait, the instruction says "Replace matches". I will target the Loader first.

    // ...
    // Using multiple chunks for efficiency if possible? The tool supports single chunk.
    // I will try to target specific blocks. But first, let's see if I can do it in one go if they are close? No, they are far apart.
    // I will use replace_file_content multiple times or maybe just target the render method if I include everything.
    // The previous view_file output is complete. I can replace the whole render return or parts.
    // Let's replace the loader first.


    // State
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [accountConfigs, setAccountConfigs] = useState<InvitationData['accountPermissions']>({});
    const [overriddenAccounts, setOverriddenAccounts] = useState<string[]>([]);

    // UI State
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const availableRoles = mockData.roles;

    // Simulate fetching member data
    useEffect(() => {
        const fetchMember = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 600)); // Simulating network

            const member = mockData.members.find(m => m.id === Number(id));

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

        if (id) {
            fetchMember();
        }
    }, [id]);

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
            if (!config) return prev;

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
