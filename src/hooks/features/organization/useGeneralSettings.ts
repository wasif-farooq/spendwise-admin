import { useState } from 'react';
import { useIdentityForm } from './useIdentityForm';
import { useOrgConversion } from './useOrgConversion';

export const useGeneralSettings = () => {
    const {
        orgName,
        setOrgName,
        orgIcon,
        handleFileChange,
        removeIcon,
        fileInputRef
    } = useIdentityForm();

    const {
        isConvertModalOpen,
        setIsConvertModalOpen,
        isDowngradeModalOpen,
        setIsDowngradeModalOpen,
        handleTypeChange,
        confirmConversion,
        accountType
    } = useOrgConversion();

    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setFeedback({ type: 'success', message: `${accountType === 'personal' ? 'Account' : 'Organization'} settings updated successfully!` });
        }, 1500);
    };

    return {
        // Identity Form
        orgName,
        setOrgName,
        orgIcon,
        handleFileChange,
        removeIcon,
        fileInputRef,

        // Org Conversion
        isConvertModalOpen,
        setIsConvertModalOpen,
        isDowngradeModalOpen,
        setIsDowngradeModalOpen,
        handleTypeChange,
        confirmConversion,
        accountType,

        // Page State
        isSaving,
        feedback,
        handleSave
    };
};
