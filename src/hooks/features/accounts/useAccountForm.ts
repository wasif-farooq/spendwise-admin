import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ACCOUNT_TYPES, CURRENCY_OPTIONS, type Account } from '@/views/Accounts/types';

interface AccountFormData {
    name: string;
    balance: number;
}

export const useAccountForm = (onClose: () => void) => {
    const [selectedType, setSelectedType] = useState<Account['type']>('bank');
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<AccountFormData>();

    const onSubmit = (data: AccountFormData) => {
        // Handle account creation logic here
        const newAccount = {
            ...data,
            type: selectedType,
            currency: selectedCurrency.value
        };
        console.log('Creating account:', newAccount);

        // In a real app, dispatch an action here

        onClose();
        reset();
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        selectedType,
        setSelectedType,
        selectedCurrency,
        setSelectedCurrency,
        onSubmit,
        accountTypes: ACCOUNT_TYPES,
        currencyOptions: CURRENCY_OPTIONS
    };
};
