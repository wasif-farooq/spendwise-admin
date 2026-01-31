import { useState } from 'react';

export const useDangerZone = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    const handleDeleteAccount = () => {
        // TODO: Implement actual account deletion API call
        setIsDeleteModalOpen(false);
    };

    return {
        isDeleteModalOpen,
        openDeleteModal,
        closeDeleteModal,
        handleDeleteAccount
    };
};
