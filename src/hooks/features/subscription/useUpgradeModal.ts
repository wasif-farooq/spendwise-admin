import { useModal } from '@/hooks/useModal';

export const useUpgradeModal = () => {
    const { isOpen, open, close } = useModal();

    return {
        isUpgradeModalOpen: isOpen,
        openUpgradeModal: open,
        closeUpgradeModal: close
    };
};
