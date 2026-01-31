import { useState } from 'react';

export const useExchangeRates = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [searchQuery, setSearchQuery] = useState('');

    return {
        baseCurrency,
        setBaseCurrency,
        searchQuery,
        setSearchQuery
    };
};
