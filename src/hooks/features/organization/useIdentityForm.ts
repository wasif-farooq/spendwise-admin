import { useState, useRef } from 'react';

export const useIdentityForm = () => {
    const [orgName, setOrgName] = useState('My Account');
    const [orgIcon, setOrgIcon] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOrgIcon(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeIcon = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOrgIcon(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return {
        orgName,
        setOrgName,
        orgIcon,
        setOrgIcon,
        handleFileChange,
        removeIcon,
        fileInputRef
    };
};
