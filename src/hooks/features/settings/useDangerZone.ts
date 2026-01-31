import { useModal } from '@/hooks/useModal';

export const useDangerZone = () => {
    const deleteModal = useModal();

    const openDeleteModal = () => deleteModal.open();
    const closeDeleteModal = () => deleteModal.close();

    const handleDeleteAccount = () => {
        // TODO: Implement actual account deletion API call
        deleteModal.close();
    };

    return {
        isDeleteModalOpen: deleteModal.isOpen,
        setIsDeleteModalOpen: (val: boolean) => val ? deleteModal.open() : deleteModal.close(),
        openDeleteModal,
        closeDeleteModal,
        handleDeleteAccount
    };
};
