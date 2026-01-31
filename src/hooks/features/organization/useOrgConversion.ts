import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@/hooks/useModal';
import { setAccountType } from '@/store/uiSlice';
import type { RootState } from '@/store/store';

export const useOrgConversion = () => {
    const dispatch = useDispatch();
    const accountType = useSelector((state: RootState) => state.ui.accountType);

    const convertModal = useModal();
    const downgradeModal = useModal();
    const [pendingType, setPendingType] = useState<'personal' | 'organization' | null>(null);

    const handleTypeChange = (type: 'personal' | 'organization') => {
        if (type === accountType) return;

        setPendingType(type);
        if (type === 'organization') {
            convertModal.open();
        } else {
            downgradeModal.open();
        }
    };

    const confirmConversion = () => {
        if (pendingType) {
            dispatch(setAccountType(pendingType));
            convertModal.close();
            downgradeModal.close();
            setPendingType(null);
        }
    };

    return {
        isConvertModalOpen: convertModal.isOpen,
        setIsConvertModalOpen: (val: boolean) => val ? convertModal.open() : convertModal.close(),
        isDowngradeModalOpen: downgradeModal.isOpen,
        setIsDowngradeModalOpen: (val: boolean) => val ? downgradeModal.open() : downgradeModal.close(),
        pendingType,
        handleTypeChange,
        confirmConversion,
        accountType
    };
};
