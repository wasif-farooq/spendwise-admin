import { useState } from 'react';

export const useMemberDetails = () => {
    const [email, setEmail] = useState('');
    const [selectedRoles, setSelectedRoles] = useState<string[]>(['member']);

    const toggleRole = (roleName: string) => {
        const normalized = roleName.toLowerCase();
        setSelectedRoles(prev =>
            prev.includes(normalized)
                ? prev.filter(r => r !== normalized)
                : [...prev, normalized]
        );
    };

    return {
        email,
        setEmail,
        selectedRoles,
        setSelectedRoles,
        toggleRole
    };
};
