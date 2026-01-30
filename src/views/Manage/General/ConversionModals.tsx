import { AlertTriangle } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Modal } from '@ui';

interface ConversionModalsProps {
    isConvertModalOpen: boolean;
    setIsConvertModalOpen: (isOpen: boolean) => void;
    isDowngradeModalOpen: boolean;
    setIsDowngradeModalOpen: (isOpen: boolean) => void;
    confirmConversion: () => void;
}

export const ConversionModals = ({
    isConvertModalOpen,
    setIsConvertModalOpen,
    isDowngradeModalOpen,
    setIsDowngradeModalOpen,
    confirmConversion
}: ConversionModalsProps) => {
    return (
        <>
            {/* Conversion Modal (Upgrade) */}
            <Modal
                isOpen={isConvertModalOpen}
                onClose={() => setIsConvertModalOpen(false)}
                title="Convert to Organization"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100">
                        <Block className="bg-amber-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-amber-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-amber-900">Upgrade to Organization</Heading>
                            <Text size="sm" color="text-amber-700" weight="medium" className="mt-1 leading-relaxed">
                                Converting to an organization unlocks team management, custom roles, and shared billing features.
                            </Text>
                        </Block>
                    </Flex>

                    <Block className="space-y-4 px-4">
                        <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest text-gray-900">What changes?</Heading>
                        <ul className="space-y-3">
                            {[
                                'Invite team members and assign roles',
                                'Define custom permission levels',
                                'Shared workspace and collaborative tools',
                                'Centralized billing and reporting'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                    <Block className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Block>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsConvertModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Keep Personal
                        </Button>
                        <Button
                            onClick={confirmConversion}
                            className="flex-grow py-4 rounded-2xl shadow-xl shadow-primary/20 font-black"
                        >
                            Confirm Conversion
                        </Button>
                    </Flex>
                </Block>
            </Modal>

            {/* Downgrade Modal */}
            <Modal
                isOpen={isDowngradeModalOpen}
                onClose={() => setIsDowngradeModalOpen(false)}
                title="Downgrade to Personal"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                        <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-rose-900">Switch to Personal Account</Heading>
                            <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                                Warning: Downgrading will disable all organization-level features.
                            </Text>
                        </Block>
                    </Flex>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDowngradeModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Keep Organization
                        </Button>
                        <Button
                            onClick={confirmConversion}
                            className="flex-grow py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-200 font-black"
                        >
                            Confirm Downgrade
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </>
    );
};
