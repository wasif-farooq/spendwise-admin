import React, { useMemo, useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { useToggle } from '@/hooks/useToggle';

export const usePasswordChangeForm = () => {
    const { values, handleChange, setFieldValue } = useForm({
        current: '',
        new: '',
        confirm: ''
    });

    const showCurrent = useToggle(false);
    const showNew = useToggle(false);
    const showConfirm = useToggle(false);

    const isUpdatingPassword = useToggle(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const passwordStrength = useMemo(() => {
        const p = values.new;
        if (!p) return 0;
        let score = 0;
        if (p.length >= 8) score += 25;
        if (/[A-Z]/.test(p)) score += 25;
        if (/[0-9]/.test(p)) score += 25;
        if (/[^A-Za-z0-9]/.test(p)) score += 25;
        return score;
    }, [values.new]);

    const strengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const strengthLabel = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (values.new !== values.confirm) {
            setFeedback({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        isUpdatingPassword.setTrue();
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            isUpdatingPassword.setFalse();
            setFeedback({ type: 'success', message: 'Password updated successfully!' });
            setFieldValue('current', '');
            setFieldValue('new', '');
            setFieldValue('confirm', '');
        }, 1500);
    };

    const requirements: { label: string; met: boolean }[] = useMemo(() => [
        { label: 'At least 8 characters long', met: values.new.length >= 8 },
        { label: 'Include at least one uppercase letter', met: /[A-Z]/.test(values.new) },
        { label: 'Include at least one number', met: /[0-9]/.test(values.new) },
        { label: 'Include at least one special character', met: /[^A-Za-z0-9]/.test(values.new) },
    ], [values.new]);

    return {
        values,
        handleChange,
        showCurrent,
        showNew,
        showConfirm,
        isUpdatingPassword,
        feedback,
        passwordStrength,
        strengthColor,
        strengthLabel,
        requirements,
        handleUpdatePassword
    };
};

