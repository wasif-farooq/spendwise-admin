import { useState, useMemo } from 'react';
import { RefreshCw, TrendingUp, DollarSign } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { CustomSelect } from '@ui';
import { CURRENCIES } from './types';

export const CurrencyConverter = () => {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState<string>('1000');

    const conversionResult = useMemo(() => {
        const from = CURRENCIES.find(c => c.value === fromCurrency)?.rate || 1;
        const to = CURRENCIES.find(c => c.value === toCurrency)?.rate || 1;
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

    return (
        <Block as="section" className="bg-white p-8 sm:p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-primary/5 relative overflow-hidden group">
            <Block className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <RefreshCw className="h-40 w-40 text-primary animate-spin-slow" />
            </Block>

            <Block className="relative z-10 space-y-8">
                <Flex align="center" gap={3}>
                    <Block className="bg-primary/10 p-2 rounded-xl">
                        <TrendingUp className="h-5 w-5 text-primary" />
                    </Block>
                    <Heading as="h2" weight="black" className="text-xl text-gray-900">Currency Converter</Heading>
                </Flex>

                <Grid cols={1} gap={8} className="lg:grid-cols-12 items-end">
                    <Block className="lg:col-span-3 space-y-3">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Amount</Text>
                        <Block className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-black text-xl text-gray-900 transition-all"
                                placeholder="0.00"
                            />
                        </Block>
                    </Block>

                    <Block className="lg:col-span-3 space-y-3">
                        <CustomSelect
                            label="From"
                            options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                            value={fromCurrency}
                            onChange={(val: string) => setFromCurrency(val)}
                        />
                    </Block>

                    <Block className="lg:col-span-1 flex justify-center pb-2">
                        <button
                            onClick={handleSwap}
                            className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all group/swap"
                        >
                            <RefreshCw className="h-6 w-6 group-hover/swap:rotate-180 transition-transform duration-500" />
                        </button>
                    </Block>

                    <Block className="lg:col-span-3 space-y-3">
                        <CustomSelect
                            label="To"
                            options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                            value={toCurrency}
                            onChange={(val: string) => setToCurrency(val)}
                        />
                    </Block>

                    <Block className="lg:col-span-2 space-y-3">
                        <Block className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                            <Text size="xs" weight="black" className="text-primary uppercase tracking-widest mb-1">Current Rate</Text>
                            <Text size="lg" weight="black" className="text-gray-900">1 {fromCurrency} = {conversionResult.rate} {toCurrency}</Text>
                        </Block>
                    </Block>
                </Grid>

                <Flex direction="col" align="center" justify="between" gap={6} className="pt-6 border-t border-gray-100 sm:flex-row">
                    <Block className="space-y-1 text-center sm:text-left">
                        <Text size="sm" weight="bold" color="text-gray-500">{amount} {fromCurrency} equals</Text>
                        <Flex align="baseline" gap={2} justify="center" className="sm:justify-start">
                            <Text size="5xl" weight="black" className="text-gray-900 tracking-tight">{conversionResult.result}</Text>
                            <Text size="2xl" weight="black" className="text-primary uppercase">{toCurrency}</Text>
                        </Flex>
                    </Block>
                    <Flex align="center" gap={4}>
                        <Block className="text-right hidden sm:block">
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Market Status</Text>
                            <Flex align="center" gap={1} justify="end" className="text-sm font-bold text-green-600">
                                <Block className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Open
                            </Flex>
                        </Block>
                    </Flex>
                </Flex>
            </Block>
        </Block>
    );
};
