import { useState } from 'react';
import { useToggle } from '@/hooks/useToggle';

export const useProfile = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('john@example.com');
    const [phone, setPhone] = useState('+1 (555) 000-0000');
    const isSaving = useToggle(false);

    const handleSave = async () => {
        isSaving.setTrue();
        // Simulate API call
        setTimeout(() => {
            console.log('Saved Profile:', { firstName, lastName, email, phone });
            isSaving.setFalse();
        }, 1000);
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        phone,
        setPhone,
        isSaving: isSaving.value,
        handleSave
    };
};
