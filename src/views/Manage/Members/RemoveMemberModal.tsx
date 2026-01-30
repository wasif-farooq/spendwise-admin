import { AlertTriangle } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Modal } from '@ui';
import type { Member } from './types';

interface RemoveMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    member: Member | null;
    isProcessing: boolean;
}

export const RemoveMemberModal = ({
    isOpen,
    onClose,
    onConfirm,
    member,
    isProcessing
}: RemoveMemberModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Remove from Organization"
        >
            <Block className="space-y-6">
                <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                    <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </Block>
                    <Block>
                        <Heading size="lg" weight="black" className="text-rose-900">Confirm Removal</Heading>
                        <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                            Are you sure you want to remove <Text as="span" weight="black">"{member?.name}"</Text> from the organization? They will lose all access immediately.
                        </Text>
                    </Block>
                </Flex>

                <Text size="sm" weight="bold" className="text-gray-500 px-4">
                    This action will revoke their membership and permissions. You can invite them back later if needed.
                </Text>

                <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-grow py-4 rounded-2xl font-black"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isProcessing}
                        className="flex-grow py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-200 font-black"
                    >
                        {isProcessing ? 'Removing...' : 'Confirm Removal'}
                    </Button>
                </Flex>
            </Block>
        </Modal>
    );
};
