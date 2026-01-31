import { useState, useMemo } from 'react';
import { CURRENCIES } from '../../../views/ExchangeRates/types';
import type { Currency } from '../../../views/ExchangeRates/types';

export const useCurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState<string>('1000');

    const conversionResult = useMemo(() => {
        const from = CURRENCIES.find((c: Currency) => c.value === fromCurrency)?.rate || 1;
        const to = CURRENCIES.find((c: Currency) => c.value === toCurrency)?.rate || 1;
        const rate = to / from;
        const result = parseFloat(amount || '0') * rate;
        return {
            result: result.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            rate: rate.toFixed(4)
        };
    }, [fromCurrency, toCurrency, amount]);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    return {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        amount,
        setAmount,
        conversionResult,
        handleSwap,
        currencies: CURRENCIES
    };
};
