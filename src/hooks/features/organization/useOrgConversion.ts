import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountType } from '@/store/uiSlice';
import type { RootState } from '@/store/store';

export const useOrgConversion = () => {
    const dispatch = useDispatch();
    const accountType = useSelector((state: RootState) => state.ui.accountType);

    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
    const [isDowngradeModalOpen, setIsDowngradeModalOpen] = useState(false);
    const [pendingType, setPendingType] = useState<'personal' | 'organization' | null>(null);

    const handleTypeChange = (type: 'personal' | 'organization') => {
        if (type === accountType) return;

        setPendingType(type);
        if (type === 'organization') {
            setIsConvertModalOpen(true);
        } else {
            setIsDowngradeModalOpen(true);
        }
    };

    const confirmConversion = () => {
        if (pendingType) {
            dispatch(setAccountType(pendingType));
            setIsConvertModalOpen(false);
            setIsDowngradeModalOpen(false);
            setPendingType(null);
        }
    };

    return {
        isConvertModalOpen,
        setIsConvertModalOpen,
        isDowngradeModalOpen,
        setIsDowngradeModalOpen,
        pendingType,
        handleTypeChange,
        confirmConversion,
        accountType
    };
};
