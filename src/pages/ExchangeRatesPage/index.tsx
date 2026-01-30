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
import { CustomSelect } from '../../components/CustomSelect';

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-8 max-w-[1600px] mx-auto"
        >
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <Globe className="h-10 w-10 text-primary" />
                        Exchange Rates
                    </h1>
                    <p className="text-gray-500 mt-2 font-medium">Real-time currency conversion rates across global markets.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-500">
                        <RefreshCw className="h-5 w-5" />
                    </button>
                    <div className="bg-primary/10 px-4 py-2 rounded-2xl">
                        <p className="text-xs font-black text-primary uppercase tracking-widest">Last Updated: Just Now</p>
                    </div>
                </div>
            </header>

            {/* Currency Converter Section */}
            <section className="bg-white p-8 sm:p-10 rounded-[3rem] border border-gray-100 shadow-2xl shadow-primary/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <RefreshCw className="h-40 w-40 text-primary animate-spin-slow" />
                </div>

                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <TrendingUp className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900">Currency Converter</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-3 space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-black text-xl text-gray-900 transition-all"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-3 space-y-3">
                            <CustomSelect
                                label="From"
                                options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                                value={fromCurrency}
                                onChange={(val) => setFromCurrency(val)}
                            />
                        </div>

                        <div className="lg:col-span-1 flex justify-center pb-2">
                            <button
                                onClick={handleSwap}
                                className="p-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all group/swap"
                            >
                                <RefreshCw className="h-6 w-6 group-hover/swap:rotate-180 transition-transform duration-500" />
                            </button>
                        </div>

                        <div className="lg:col-span-3 space-y-3">
                            <CustomSelect
                                label="To"
                                options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                                value={toCurrency}
                                onChange={(val) => setToCurrency(val)}
                            />
                        </div>

                        <div className="lg:col-span-2 space-y-3">
                            <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10 text-center">
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Current Rate</p>
                                <p className="text-lg font-black text-gray-900">1 {fromCurrency} = {conversionResult.rate} {toCurrency}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="space-y-1 text-center sm:text-left">
                            <p className="text-sm font-bold text-gray-500">{amount} {fromCurrency} equals</p>
                            <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                                <span className="text-5xl font-black text-gray-900 tracking-tight">{conversionResult.result}</span>
                                <span className="text-2xl font-black text-primary uppercase">{toCurrency}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Market Status</p>
                                <p className="text-sm font-bold text-green-600 flex items-center gap-1 justify-end">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    Open
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Controls */}
                <div className="lg:col-span-1 space-y-6">
                    <section className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                        <div className="space-y-4">
                            <CustomSelect
                                label="Base Currency"
                                options={CURRENCIES.map(c => ({ value: c.value, label: c.label, icon: c.icon }))}
                                value={baseCurrency}
                                onChange={(val) => setBaseCurrency(val)}
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Search Currency</label>
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search code or name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3">
                                <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                                <p className="text-xs text-blue-800 font-medium leading-relaxed">
                                    Rates are updated every 60 seconds. Market data provided by global financial providers.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Quick Stats */}
                    <div className="bg-gradient-to-br from-primary to-blue-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-150 transition-transform duration-700">
                            <RefreshCw className="h-32 w-32" />
                        </div>
                        <h3 className="text-lg font-black mb-2">Market Overview</h3>
                        <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">The global market is showing high volatility today. Stay updated with real-time alerts.</p>
                        <button className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl font-black text-sm hover:bg-white/30 transition-all">
                            Enable Alerts
                        </button>
                    </div>
                </div>

                {/* Rates Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredCurrencies.map((currency) => (
                            <motion.div
                                layout
                                key={currency.value}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${currency.value === baseCurrency ? 'bg-primary text-white' : 'bg-gray-50 text-gray-400'
                                        }`}>
                                        <currency.icon size={24} />
                                    </div>
                                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${currency.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {currency.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                        {currency.change}%
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest">{currency.value}</h4>
                                    <p className="text-2xl font-black text-gray-900">{currency.convertedRate}</p>
                                    <p className="text-xs text-gray-500 font-medium truncate">{currency.label.split('-')[1].trim()}</p>
                                </div>

                                {currency.value === baseCurrency && (
                                    <div className="absolute top-0 right-0 p-4">
                                        <div className="bg-primary/10 text-primary text-[10px] font-black px-2 py-1 rounded-lg uppercase">Base</div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {filteredCurrencies.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-50 p-6 rounded-full mb-6">
                                <Filter className="h-10 w-10 text-gray-300" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900">No currencies found</h3>
                            <p className="text-gray-500 font-medium mt-2">Try adjusting your search query.</p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ExchangeRatesPage;
