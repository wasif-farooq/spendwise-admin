import { useToggle } from '@/hooks/useToggle';

export const useFeatureLockedView = () => {
    const upgradeModal = useToggle(false);

    const openUpgradeModal = () => upgradeModal.setTrue();
    const closeUpgradeModal = () => upgradeModal.setFalse();

    return {
        isUpgradeModalOpen: upgradeModal.value,
        openUpgradeModal,
        closeUpgradeModal
    };
};
