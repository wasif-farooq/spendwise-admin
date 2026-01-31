import { AlertTriangle, Trash2 } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Modal, Button } from '@ui';
import { useDangerZone } from '@/hooks/features/settings/useDangerZone';

export const DangerZone = () => {
    const {
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteAccount
    } = useDangerZone();

    return (
        <Block as="section" className="pt-12 border-t border-gray-100">
            <Block className="mb-8">
                <Heading as="h2" weight="bold" className="text-red-600">Danger Zone</Heading>
                <Text color="text-gray-500" className="mt-1">Irreversible actions for your account.</Text>
            </Block>

            <Block className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                <Flex direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                    <Block>
                        <Text weight="bold" color="text-gray-900">Delete Account</Text>
                        <Text size="sm" color="text-gray-600" className="mt-1">Once you delete your account, there is no going back. Please be certain.</Text>
                    </Block>
                    <Block
                        as="button"
                        onClick={openDeleteModal}
                        className="flex items-center justify-center px-8 py-4 bg-white border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
                    >
                        <Trash2 className="h-5 w-5 mr-2" /> Delete Account
                    </Block>
                </Flex>
            </Block>

            {/* Delete Account Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                title="Delete Account"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={4} className="bg-red-50 p-6 rounded-3xl">
                        <Block className="bg-red-100 p-2 rounded-xl flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </Block>
                        <Block>
                            <Text weight="bold" className="text-red-900">Warning: This action is permanent</Text>
                            <Text size="sm" className="text-red-700 mt-1 leading-relaxed">
                                Deleting your account will permanently remove all your data, including transaction history, budgets, and settings. This cannot be undone.
                            </Text>
                        </Block>
                    </Flex>

                    <Text size="sm" color="text-gray-600" className="px-2">
                        Are you absolutely sure you want to delete your account? Please type <Text as="span" weight="bold" color="text-gray-900">DELETE</Text> to confirm.
                    </Text>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={closeDeleteModal}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteAccount}
                            className="flex-grow py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-200"
                        >
                            Confirm Delete
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </Block>
    );
};

