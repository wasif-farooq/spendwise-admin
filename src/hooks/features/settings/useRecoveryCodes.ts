import { useState } from 'react';
import { useModal } from '../../useModal';

export const useRecoveryCodes = () => {
    const regenerateModal = useModal(false);
    const newCodesModal = useModal(false);
    const [hasCopied, setHasCopied] = useState(false);

    const recoveryCodes = [
        'ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456',
        'QRST-7890', 'UVWX-1234', 'YZAB-5678', 'CDEF-9012'
    ];

    const handleRegenerateCodes = () => {
        // Logic for regenerating codes would go here
        regenerateModal.close();
        newCodesModal.open();
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

    return {
        regenerateModal,
        newCodesModal,
        hasCopied,
        recoveryCodes,
        handleRegenerateCodes,
        copyToClipboard,
        downloadCodes
    };
};
