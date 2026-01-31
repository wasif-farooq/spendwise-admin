import { useState, useMemo } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { CURRENCIES } from '../../../views/ExchangeRates/types';

export const useExchangeRates = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const { searchQuery, setSearchQuery, filteredData: searchedCurrencies } = useSearch(CURRENCIES, ['value', 'label']);

    const baseRate = useMemo(() => {
        return CURRENCIES.find(c => c.value === baseCurrency)?.rate || 1;
    }, [baseCurrency]);

    const filteredCurrencies = useMemo(() => {
        return searchedCurrencies.map(c => ({
            ...c,
            convertedRate: (c.rate / baseRate).toFixed(4),
            trend: Math.random() > 0.5 ? 'up' : 'down', // In a real app, this would come from an API
            change: (Math.random() * 2).toFixed(2)      // In a real app, this would come from an API
        }));
    }, [searchedCurrencies, baseRate]);

    return {
        baseCurrency,
        setBaseCurrency,
        searchQuery,
        setSearchQuery,
        filteredCurrencies,
        currencies: CURRENCIES
    };
};
