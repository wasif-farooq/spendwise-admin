import { useState } from 'react';

export const useProfile = () => {
    const [firstName, setFirstName] = useState('John');
    const [lastName, setLastName] = useState('Doe');
    const [email, setEmail] = useState('john@example.com');
    const [phone, setPhone] = useState('+1 (555) 000-0000');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        console.log('Saved Profile:', { firstName, lastName, email, phone });
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
        isSaving,
        handleSave
    };
};
