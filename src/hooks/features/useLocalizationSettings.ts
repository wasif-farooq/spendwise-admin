import { useState } from 'react';
import { DollarSign, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import mockData from '@/data/mockData.json';

const iconMap: Record<string, LucideIcon> = {
    DollarSign,
    Globe
};

export const useLocalizationSettings = () => {
    const [currency, setCurrency] = useState('USD');
    const [timezone, setTimezone] = useState('EST');

    const currencyOptions = mockData.preferences.currencyOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || DollarSign
    }));

    const timezoneOptions = mockData.preferences.timezoneOptions.map(opt => ({
        ...opt,
        icon: iconMap[opt.iconName] || Globe
    }));

    return {
        currency,
        setCurrency,
        timezone,
        setTimezone,
        currencyOptions,
        timezoneOptions
    };
};
