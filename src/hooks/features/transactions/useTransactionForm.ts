import { useState, useRef } from 'react';
import { useForm } from '@/hooks/useForm';
import {
    Utensils, Car, ShoppingBag, Home, Zap, Heart, Briefcase, MoreHorizontal,
    Wallet, DollarSign, Tag
} from 'lucide-react';

export const CATEGORY_OPTIONS = [
    { value: 'food', label: 'Food & Dining', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'housing', label: 'Housing', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: 'utilities', label: 'Utilities', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { value: 'health', label: 'Health', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { value: 'salary', label: 'Salary', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'other', label: 'Other', icon: MoreHorizontal, color: 'text-gray-600', bg: 'bg-gray-50' },
];

export const ACCOUNT_OPTIONS = [
    { value: 'checking', label: 'Main Checking', balance: '$12,450.80', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'savings', label: 'Business Savings', balance: '$45,000.00', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: 'cash', label: 'Petty Cash', balance: '$850.00', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
];

interface SelectOption {
    value: string;
    label: string;
    icon?: any;
    color?: string;
    bg?: string;
    balance?: string;
}

export const useTransactionForm = (onClose: () => void) => {
    const { values, setFieldValue, handleChange, handleSubmit } = useForm({
        amount: '',
        transactionType: 'expense' as 'expense' | 'income' | 'transfer',
        selectedAccount: ACCOUNT_OPTIONS[0],
        selectedToAccount: ACCOUNT_OPTIONS[1],
        selectedCategory: null as SelectOption | null,
        receipt: null as string | null
    });

    const [categories, setCategories] = useState(CATEGORY_OPTIONS);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreateCategory = (inputValue: string) => {
        const newCategory = {
            value: inputValue.toLowerCase().replace(/\W/g, ''),
            label: inputValue,
            icon: Tag,
            color: 'text-primary',
            bg: 'bg-primary/5',
        };
        setCategories((prev) => [...prev, newCategory]);
        setFieldValue('selectedCategory', newCategory);
    };

    const onSubmit = async (formValues: typeof values) => {
        // Handle transaction creation logic here
        console.log('Form submitted:', formValues);
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFieldValue('receipt', reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeReceipt = () => {
        setFieldValue('receipt', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isExpense = values.transactionType === 'expense';
    const isIncome = values.transactionType === 'income';
    const isTransfer = values.transactionType === 'transfer';

    const getTypeColor = () => {
        if (isExpense) return 'rose';
        if (isIncome) return 'emerald';
        return 'indigo';
    };

    const getIconColor = () => {
        if (isExpense) return 'text-rose-600';
        if (isIncome) return 'text-emerald-600';
        return 'text-indigo-600';
    };

    return {
        values,
        handleChange,
        setFieldValue,
        handleSubmit,
        categories,
        fileInputRef,
        handleCreateCategory,
        handleFileChange,
        removeReceipt,
        onSubmit,
        isExpense,
        isIncome,
        isTransfer,
        color: getTypeColor(),
        iconColor: getIconColor()
    };
};
