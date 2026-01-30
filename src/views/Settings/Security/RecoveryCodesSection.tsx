import { useState } from 'react';
import { RefreshCw, Check, Copy, Download, AlertTriangle } from 'lucide-react';
import { Block, Flex, Text, Grid } from '@shared';
import { Modal, Button } from '@ui';

export const RecoveryCodesSection = () => {
    const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
    const [isNewCodesModalOpen, setIsNewCodesModalOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const recoveryCodes = [
        'ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456',
        'QRST-7890', 'UVWX-1234', 'YZAB-5678', 'CDEF-9012'
    ];

    const handleRegenerateCodes = () => {
        console.log('Codes regenerated');
        setIsRegenerateModalOpen(false);
        setIsNewCodesModalOpen(true);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(recoveryCodes.join('\n'));
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const downloadCodes = () => {
        const element = document.createElement('a');
        const file = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'spendwise-recovery-codes.txt';
        document.body.appendChild(element);
        element.click();
    };

    return (
        <>
            <Block className="mt-8 bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100">
                <Flex direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
                    <Flex align="center">
                        <Block className="bg-primary/10 p-3 rounded-2xl mr-5">
                            <RefreshCw className="h-6 w-6 text-primary" />
                        </Block>
                        <Block>
                            <Text weight="bold" color="text-gray-900">Recovery Codes</Text>
                            <Text size="sm" color="text-gray-500" className="mt-1">Recovery codes can be used to access your account if you lose your 2FA device.</Text>
                        </Block>
                    </Flex>
                    <Flex align="center" gap={4}>
                        <Block
                            as="button"
                            onClick={() => setIsRegenerateModalOpen(true)}
                            className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                        >
                            Regenerate New Codes
                        </Block>
                    </Flex>
                </Flex>
            </Block>

            {/* New Recovery Codes Modal (Shown after regeneration) */}
            <Modal
                isOpen={isNewCodesModalOpen}
                onClose={() => setIsNewCodesModalOpen(false)}
                title="Your New Recovery Codes"
            >
                <Block className="space-y-8">
                    <Block className="bg-green-50 p-4 rounded-2xl flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <Text size="sm" weight="medium" className="text-green-700">Codes regenerated successfully!</Text>
                    </Block>
                    <Text color="text-gray-500" size="sm">
                        Save these codes in a safe place. Each code can only be used once.
                    </Text>
                    <Grid cols={2} gap={4}>
                        {recoveryCodes.map((code, i) => (
                            <Block key={i} className="bg-gray-50 px-4 py-3 rounded-xl text-center font-mono font-bold text-gray-700 border border-gray-100">
                                {code}
                            </Block>
                        ))}
                    </Grid>
                    <Flex gap={4}>
                        <Block
                            as="button"
                            onClick={copyToClipboard}
                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            {hasCopied ? <Check className="h-5 w-5 mr-2 text-green-600" /> : <Copy className="h-5 w-5 mr-2" />}
                            {hasCopied ? 'Copied!' : 'Copy Codes'}
                        </Block>
                        <Block
                            as="button"
                            onClick={downloadCodes}
                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Download
                        </Block>
                    </Flex>
                    <Button onClick={() => setIsNewCodesModalOpen(false)} className="w-full py-4 rounded-2xl">
                        I have saved these codes
                    </Button>
                </Block>
            </Modal>

            {/* Regenerate Codes Modal */}
            <Modal
                isOpen={isRegenerateModalOpen}
                onClose={() => setIsRegenerateModalOpen(false)}
                title="Regenerate Recovery Codes?"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={4} className="bg-orange-50 p-6 rounded-3xl">
                        <Block className="bg-orange-100 p-2 rounded-xl flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                        </Block>
                        <Block>
                            <Text weight="bold" className="text-orange-900">Warning: Old codes will be invalidated</Text>
                            <Text size="sm" className="text-orange-700 mt-1 leading-relaxed">
                                When you regenerate recovery codes, your existing codes will no longer work. Make sure to save the new codes immediately.
                            </Text>
                        </Block>
                    </Flex>
                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsRegenerateModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRegenerateCodes}
                            className="flex-grow py-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20"
                        >
                            Regenerate Codes
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </>
    );
};
