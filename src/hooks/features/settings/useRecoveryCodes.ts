import { useToggle } from '@/hooks/useToggle';
import { useModal } from '../../useModal';

export const useRecoveryCodes = () => {
    const regenerateModal = useModal(false);
    const newCodesModal = useModal(false);
    const hasCopied = useToggle(false); // Replaced useState with useToggle

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
        hasCopied.setTrue(); // Updated to use useToggle's setTrue
        setTimeout(() => hasCopied.setFalse(), 2000); // Updated to use useToggle's setFalse
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
        hasCopied: hasCopied.value, // Exposed the value from useToggle
        recoveryCodes,
        handleRegenerateCodes,
        copyToClipboard,
        downloadCodes
    };
};
