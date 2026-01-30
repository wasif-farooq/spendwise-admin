import { Building2, Wallet, CreditCard, Banknote } from 'lucide-react';
import type { StylesConfig } from 'react-select';

export interface Account {
    id: string;
    name: string;
    type: 'bank' | 'cash' | 'credit_card' | 'savings';
    balance: number;
    currency: string;
    lastActivity: string;
    color: string;
    trend: 'up' | 'down';
    change: string;
}

export const ACCOUNT_TYPES = [
    { id: 'bank', name: 'Bank Account', description: 'Checking or current account', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'savings', name: 'Savings', description: 'Long-term savings account', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'credit_card', name: 'Credit Card', description: 'Credit or revolving line', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'cash', name: 'Cash', description: 'Physical cash or wallet', icon: Banknote, color: 'text-amber-600', bg: 'bg-amber-50' },
] as const;

export const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'PKR', label: 'PKR - Pakistani Rupee' },
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'SAR', label: 'SAR - Saudi Riyal' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
];

export interface SelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: any;
    color?: string;
    bg?: string;
}

export const customSelectStyles: StylesConfig<SelectOption, false> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#f9fafb', // gray-50
        border: 'none',
        borderRadius: '1rem',
        padding: '0.4rem 0.5rem',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(var(--color-primary-rgb), 0.1)' : 'none',
        '&:hover': {
            backgroundColor: '#f3f4f6', // gray-100
        },
        cursor: 'pointer',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 0.75rem',
    }),
    singleValue: (base) => ({
        ...base,
        fontWeight: '700',
        color: '#111827', // gray-900
    }),
    placeholder: (base) => ({
        ...base,
        fontWeight: '700',
        color: '#9ca3af', // gray-400
    }),
    menu: (base) => ({
        ...base,
        backgroundColor: 'white',
        borderRadius: '1.5rem',
        padding: '0.5rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        border: '1px solid #f3f4f6',
        overflow: 'hidden',
        zIndex: 100,
    }),
    menuList: (base) => ({
        ...base,
        padding: '0',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? 'rgba(var(--color-primary-rgb), 1)' : state.isFocused ? 'rgba(var(--color-primary-rgb), 0.05)' : 'transparent',
        color: state.isSelected ? 'white' : '#374151', // gray-700
        padding: '0.75rem 1rem',
        borderRadius: '0.75rem',
        fontWeight: '700',
        cursor: 'pointer',
        '&:active': {
            backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        color: '#9ca3af', // gray-400
        '&:hover': {
            color: '#6b7280', // gray-500
        },
    }),
};
