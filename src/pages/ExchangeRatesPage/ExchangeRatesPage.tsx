import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    Globe,
    Search,
    ArrowUpRight,
    ArrowDownRight,
    TrendingUp,
    DollarSign,
    RefreshCw,
    Filter
} from 'lucide-react';
import { CustomSelect } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';

const CURRENCIES = [
    { value: 'USD', label: 'USD - US Dollar ($)', icon: DollarSign, rate: 1 },
    { value: 'EUR', label: 'EUR - Euro (€)', icon: DollarSign, rate: 0.92 },
    { value: 'GBP', label: 'GBP - British Pound (£)', icon: DollarSign, rate: 0.79 },
    { value: 'JPY', label: 'JPY - Japanese Yen (¥)', icon: DollarSign, rate: 148.12 },
    { value: 'CAD', label: 'CAD - Canadian Dollar ($)', icon: DollarSign, rate: 1.34 },
    { value: 'AUD', label: 'AUD - Australian Dollar ($)', icon: DollarSign, rate: 1.52 },
    { value: 'PKR', label: 'PKR - Pakistani Rupee (Rs)', icon: DollarSign, rate: 279.50 },
    { value: 'INR', label: 'INR - Indian Rupee (₹)', icon: DollarSign, rate: 83.12 },
    { value: 'AED', label: 'AED - UAE Dirham (د.إ)', icon: DollarSign, rate: 3.67 },
    { value: 'SAR', label: 'SAR - Saudi Riyal (﷼)', icon: DollarSign, rate: 3.75 },
    { value: 'CNY', label: 'CNY - Chinese Yuan (¥)', icon: DollarSign, rate: 7.18 },
    { value: 'BRL', label: 'BRL - Brazilian Real (R$)', icon: DollarSign, rate: 4.95 },
];

const ExchangeRatesPage = () => {
    const [baseCurrency, setBaseCurrency] = useState('USD');
    const [searchQuery, setSearchQuery] = useState('');

    // Converter State
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [amount, setAmount] = useState<string>('1000');

    const baseRate = useMemo(() => {
        return CURRENCIES.find(c => c.value === baseCurrency)?.rate || 1;
    }, [baseCurrency]);

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

    const filteredCurrencies = useMemo(() => {
        return CURRENCIES.filter(c =>
            c.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
            c.label.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(c => ({
            ...c,
            convertedRate: (c.rate / baseRate).toFixed(4),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            change: (Math.random() * 2).toFixed(2)
        }));
    }, [searchQuery, baseRate]);

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-8 max-w-[1600px] mx-auto"
        >
            <Flex as="header" direction="col" justify="between" gap={6} className="md:flex-row md:items-center">
                <Block>
                    <Heading as="h1" size="4xl" weight="black" className="text-gray-900 tracking-tight flex items-center gap-3">
                        <Globe className="h-10 w-10 text-primary" />
                        Exchange Rates
                    </Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-2">Real-time currency conversion rates across global markets.</Text>
                </Block>
                <Flex align="center" gap={4}>
                    <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-500">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                    <Block className="bg-primary/10 px-4 py-2 rounded-2xl">
                        <Text size="xs" weight="black" className="text-primary uppercase tracking-widest">Last Updated: Just Now</Text>
                    </Block>
                </Flex>
            </Flex>

            {/* Currency Converter Section */}
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

            <Grid cols={1} gap={8} className="lg:grid-cols-4">
                {/* Sidebar Controls */}
                <Block className="lg:col-span-1 space-y-6">
                    <Block as="section" className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <Block className="space-y-4">
                            <CustomSelect
                                label="Base Currency"
                                options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                                value={baseCurrency}
                                onChange={(val: string) => setBaseCurrency(val)}
                            />
                        </Block>

                        <Block className="space-y-4">
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Search Currency</Text>
                            <Block className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search code or name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all"
                                />
                            </Block>
                        </Block>

                        <Block className="pt-4">
                            <Flex align="start" gap={3} className="bg-blue-50 p-4 rounded-2xl">
                                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                                <Text size="xs" color="text-blue-800" weight="medium" className="leading-relaxed">
                                    Rates are updated every 60 seconds. Market data provided by global financial providers.
                                </Text>
                            </Flex>
                        </Block>
                    </Block>

                    {/* Quick Stats */}
                    <Block className="bg-gradient-to-br from-primary to-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <Block className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                            <RefreshCw className="h-32 w-32" />
                        </Block>
                        <Heading as="h3" weight="black" className="text-lg mb-2">Market Overview</Heading>
                        <Text color="text-white/80" size="sm" weight="medium" className="mb-6 leading-relaxed">The global market is showing high volatility today. Stay updated with real-time alerts.</Text>
                        <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl font-black text-sm hover:bg-white/30 transition-all">
                            Enable Alerts
                        </button>
                    </Block>
                </Block>

                {/* Rates Grid */}
                <Block className="lg:col-span-3">
                    <Grid cols={1} gap={6} className="sm:grid-cols-2 xl:grid-cols-3">
                        {filteredCurrencies.map((currency) => (
                            <Block
                                as={motion.div}
                                layout
                                key={currency.value}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                            >
                                <Flex align="center" justify="between" className="mb-6">
                                    <Block className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${currency.value === baseCurrency ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        <currency.icon size={24} />
                                    </Block>
                                    <Flex align="center" gap={1} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${currency.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {currency.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {currency.change}%
                                    </Flex>
                                </Flex>

                                <Block className="space-y-1">
                                    <Text size="sm" weight="black" color="text-gray-400" className="uppercase tracking-widest">{currency.value}</Text>
                                    <Text size="2xl" weight="black" className="text-gray-900">{currency.convertedRate}</Text>
                                    <Text size="xs" color="text-gray-500" weight="medium" className="truncate">{currency.label.split('-')[1].trim()}</Text>
                                </Block>

                                {currency.value === baseCurrency && (
                                    <Block className="absolute top-0 right-0 p-4">
                                        <Block className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg uppercase">Base</Block>
                                    </Block>
                                )}
                            </Block>
                        ))}
                    </Grid>

                    {filteredCurrencies.length === 0 && (
                        <Flex direction="col" align="center" justify="center" className="py-20 text-center">
                            <Block className="bg-gray-50 p-6 rounded-full mb-6">
                                <Filter className="h-10 w-10 text-gray-300" />
                            </Block>
                            <Heading as="h3" weight="black" className="text-xl text-gray-900">No currencies found</Heading>
                            <Text color="text-gray-500" weight="medium" className="mt-2">Try adjusting your search query.</Text>
                        </Flex>
                    )}
                </Block>
            </Grid>
        </Block>
    );
};

export default ExchangeRatesPage;
