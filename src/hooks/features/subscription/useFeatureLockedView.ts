import { useState } from 'react';

export const useFeatureLockedView = () => {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const openUpgradeModal = () => setIsUpgradeModalOpen(true);
    const closeUpgradeModal = () => setIsUpgradeModalOpen(false);

    return {
        isUpgradeModalOpen,
        openUpgradeModal,
        closeUpgradeModal
    };
};
