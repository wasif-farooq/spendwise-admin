import { Block, Flex, Heading, Text, Grid, Inline } from '@shared';
import { Button, Modal } from '@ui';
import { Check, Shield, CreditCard } from 'lucide-react';
import type { InvitationData } from '@/views/Manage/InviteMember/types';

interface InviteSummaryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isSubmitting: boolean;
    email: string;
    selectedRoles: string[];
    accountConfigs: InvitationData['accountPermissions'];
    overriddenAccounts: string[];
}

export const InviteSummaryModal = ({
    isOpen,
    onClose,
    onConfirm,
    isSubmitting,
    email,
    selectedRoles,
    accountConfigs,
    overriddenAccounts
}: InviteSummaryModalProps) => {

    const getAccessSummary = () => {
        if (selectedRoles.includes('admin')) {
            return "This user will have full administrative privileges, giving them complete control over all workspace settings, billing, and member management, along with unrestricted access to all accounts.";
        }

        const accountCount = Object.keys(accountConfigs).length;
        if (accountCount === 0) {
            return "No specific accounts have been shared with this user yet. They will only have access to global features provided by their assigned role.";
        }

        // Aggregate permissions to form a smart sentence
        const allPermissions = new Set<string>();
        Object.values(accountConfigs).forEach(conf => {
            conf.permissions.forEach(p => allPermissions.add(p));
        });

        const canManage = allPermissions.has('create') || allPermissions.has('edit');
        const canDelete = allPermissions.has('delete');

        let actionText = "view account activity";
        if (canDelete) actionText = "manage and delete transactions";
        else if (canManage) actionText = "create and edit transactions";

        let summary = `This user will be able to ${actionText} across ${accountCount} selected account${accountCount === 1 ? '' : 's'}.`;

        if (overriddenAccounts.length > 0) {
            summary += ` You have applied custom permission overrides to ${overriddenAccounts.length} of these accounts to strictly control their capabilities.`;
        } else {
            summary += ` Their access levels are standardized based on the ${selectedRoles.length > 1 ? 'roles' : 'role'} you've assigned.`;
        }

        return summary;
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Review Access Summary"
            maxWidth="max-w-xl"
        >
            <Block className="space-y-8">
                {/* User Summary */}
                <Block className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
                    <Grid cols={2} gap={6}>
                        <Block>
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest mb-1">Inviting</Text>
                            <Text weight="bold" className="text-gray-900 truncate">{email}</Text>
                        </Block>
                        <Block>
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest mb-2">Roles Assigned</Text>
                            <Flex wrap gap={2}>
                                {selectedRoles.map(role => (
                                    <Inline key={role} className="px-2.5 py-1 bg-primary/10 text-primary rounded-lg text-xs font-black uppercase tracking-wide">
                                        {role}
                                    </Inline>
                                ))}
                            </Flex>
                        </Block>
                    </Grid>
                </Block>

                {/* Access Scope */}
                <Block className="space-y-4">
                    <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest px-1 text-gray-400">
                        Access Scope
                    </Heading>
                    <Block className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                        <Flex align="start" gap={4}>
                            <Block className="p-2 bg-white rounded-xl shadow-sm border border-primary/10">
                                <Shield className="w-6 h-6 text-primary" />
                            </Block>
                            <Block>
                                <Text weight="bold" className="text-gray-900 text-lg mb-2">Capabilities Overview</Text>
                                <Text size="md" color="text-gray-600" className="leading-relaxed">
                                    {getAccessSummary()}
                                </Text>
                            </Block>
                        </Flex>
                    </Block>
                </Block>

                {/* Actions */}
                <Flex gap={4}>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="flex-1 font-bold text-gray-500 hover:bg-gray-50 h-14 rounded-2xl"
                    >
                        Back to Edit
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-[2] h-14 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2 font-black text-lg"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Check className="h-5 w-5" strokeWidth={3} />
                                Confirm & Send
                            </>
                        )}
                    </Button>
                </Flex>
            </Block>
        </Modal>
    );
};
