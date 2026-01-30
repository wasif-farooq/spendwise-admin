import { AlertTriangle } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Modal } from '@ui';
import type { Role } from './types';

interface DeleteRoleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    role: Role | null;
    isProcessing: boolean;
}

export const DeleteRoleModal = ({
    isOpen,
    onClose,
    onConfirm,
    role,
    isProcessing
}: DeleteRoleModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Delete Role"
        >
            <Block className="space-y-6">
                <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                    <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                        <AlertTriangle className="h-6 w-6 text-white" />
                    </Block>
                    <Block>
                        <Heading size="lg" weight="black" className="text-rose-900">Permanent Deletion</Heading>
                        <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                            Deleting the <Text as="span" weight="black">"{role?.name}"</Text> role will remove it from all assigned members. They will lose access to the associated permissions.
                        </Text>
                    </Block>
                </Flex>

                <Text size="sm" weight="bold" className="text-gray-500 px-4">
                    Are you sure you want to delete this role? This cannot be undone.
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
                        {isProcessing ? 'Deleting...' : 'Confirm Delete'}
                    </Button>
                </Flex>
            </Block>
        </Modal>
    );
};
