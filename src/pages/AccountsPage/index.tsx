import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Select, { type StylesConfig } from 'react-select';
import {
    Wallet,
    Plus,
    Search,
    MoreVertical,
    CreditCard,
    Banknote,
    Building2,
    Edit2,
    Eye,
    TrendingUp,
    TrendingDown,
    Check,
    Info
} from 'lucide-react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

interface Account {
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

const MOCK_ACCOUNTS: Account[] = [
    {
        id: '1',
        name: 'Main Checking',
        type: 'bank',
        balance: 12450.80,
        currency: 'USD',
        lastActivity: '2 hours ago',
        color: 'bg-blue-600',
        trend: 'up',
        change: '+2.4%'
    },
    {
        id: '2',
        name: 'Business Savings',
        type: 'savings',
        balance: 45000.00,
        currency: 'USD',
        lastActivity: '1 day ago',
        color: 'bg-emerald-600',
        trend: 'up',
        change: '+0.8%'
    },
    {
        id: '3',
        name: 'Petty Cash',
        type: 'cash',
        balance: 850.00,
        currency: 'USD',
        lastActivity: '5 mins ago',
        color: 'bg-amber-600',
        trend: 'down',
        change: '-1.2%'
    },
    {
        id: '4',
        name: 'Corporate Credit',
        type: 'credit_card',
        balance: -2340.50,
        currency: 'USD',
        lastActivity: '1 hour ago',
        color: 'bg-rose-600',
        trend: 'down',
        change: '+15.4%'
    },
];

const ACCOUNT_TYPES = [
    { id: 'bank', name: 'Bank Account', description: 'Checking or current account', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'savings', name: 'Savings', description: 'Long-term savings account', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'credit_card', name: 'Credit Card', description: 'Credit or revolving line', icon: CreditCard, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'cash', name: 'Cash', description: 'Physical cash or wallet', icon: Banknote, color: 'text-amber-600', bg: 'bg-amber-50' },
] as const;

const CURRENCY_OPTIONS = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'PKR', label: 'PKR - Pakistani Rupee' },
    { value: 'AED', label: 'AED - UAE Dirham' },
    { value: 'SAR', label: 'SAR - Saudi Riyal' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
];

interface SelectOption {
    value: string;
    label: string;
    description?: string;
    icon?: any;
    color?: string;
    bg?: string;
}

const customSelectStyles: StylesConfig<SelectOption, false> = {
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

const AccountsPage = () => {
    const navigate = useNavigate();
    const [accounts] = useState<Account[]>(MOCK_ACCOUNTS);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [selectedType, setSelectedType] = useState<Account['type']>('bank');
    const [selectedCurrency, setSelectedCurrency] = useState(CURRENCY_OPTIONS[0]);

    const totalBalance = useMemo(() => {
        return accounts.reduce((acc, curr) => acc + curr.balance, 0);
    }, [accounts]);

    const filteredAccounts = useMemo(() => {
        return accounts.filter(acc =>
            acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [accounts, searchQuery]);

    const getIcon = (type: Account['type']) => {
        switch (type) {
            case 'bank': return <Building2 size={24} />;
            case 'cash': return <Banknote size={24} />;
            case 'credit_card': return <CreditCard size={24} />;
            case 'savings': return <Wallet size={24} />;
            default: return <Wallet size={24} />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 space-y-10 max-w-7xl mx-auto"
        >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-primary">
                        <Wallet className="h-8 w-8" />
                        <span className="text-sm font-black uppercase tracking-widest">Financial Overview</span>
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 tracking-tight">Expense Accounts</h1>
                    <p className="text-gray-500 font-medium">Manage and track all your financial assets in one place.</p>
                </div>

                <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-primary/5 flex items-center gap-8 px-10">
                    <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Balance</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-900">${totalBalance.toLocaleString()}</span>
                            <span className="text-sm font-black text-primary">USD</span>
                        </div>
                    </div>
                    <div className="h-12 w-px bg-gray-100" />
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="rounded-2xl px-6 py-4 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Account
                    </Button>
                </div>
            </header>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search accounts by name or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all shadow-sm"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                        All Types
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                        Currency
                    </button>
                </div>
            </div>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredAccounts.map((account) => (
                        <motion.div
                            layout
                            key={account.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden flex flex-col"
                        >
                            <div className="p-8 flex-grow space-y-8">
                                <div className="flex items-start justify-between">
                                    <div className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg ${account.color} group-hover:scale-110 transition-transform duration-500`}>
                                        {getIcon(account.type)}
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors text-gray-400">
                                            <MoreVertical size={20} />
                                        </button>
                                        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${account.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                            {account.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                            {account.change}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-gray-900 tracking-tight">{account.name}</h3>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{account.type.replace('_', ' ')}</p>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Balance</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className={`text-4xl font-black tracking-tighter ${account.balance < 0 ? 'text-rose-600' : 'text-gray-900'}`}>
                                            {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                                        </span>
                                        <span className="text-sm font-black text-gray-400">{account.currency}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active: {account.lastActivity}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => navigate(`/accounts/${account.id}/transactions`)}
                                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-gray-400"
                                        title="View Transactions"
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-gray-400" title="Edit Account">
                                        <Edit2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Add New Account Card */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="rounded-[3rem] border-4 border-dashed border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-12 space-y-4 min-h-[350px]"
                >
                    <div className="h-20 w-20 rounded-[2rem] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                        <Plus size={40} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-black text-gray-900">Add New Account</h3>
                        <p className="text-sm font-medium text-gray-500 mt-1">Connect a bank or add cash</p>
                    </div>
                </button>
            </div>

            {/* Add Account Modal */}
            <Modal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Account"
                maxWidth="max-w-2xl"
            >
                <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsAddModalOpen(false); }}>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Account Type</label>
                            <div className="flex items-center gap-1 text-primary">
                                <Info size={14} />
                                <span className="text-[10px] font-bold">Choose how you'll use this account</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {ACCOUNT_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setSelectedType(type.id)}
                                    className={`relative flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left group ${selectedType === type.id
                                        ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                        : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${type.bg} ${type.color}`}>
                                        <type.icon size={24} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-black truncate ${selectedType === type.id ? 'text-primary' : 'text-gray-900'}`}>{type.name}</p>
                                        <p className="text-[10px] font-bold text-gray-500 truncate">{type.description}</p>
                                    </div>
                                    {selectedType === type.id && (
                                        <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Input label="Account Name" placeholder="e.g. Personal Savings" required />
                                <p className="text-[10px] font-bold text-gray-400 ml-1">Give your account a recognizable name</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Currency</label>
                                <Select
                                    options={CURRENCY_OPTIONS}
                                    styles={customSelectStyles}
                                    value={selectedCurrency}
                                    onChange={(option) => option && setSelectedCurrency(option)}
                                    placeholder="Select Currency"
                                    isSearchable
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Input label="Initial Balance" type="number" placeholder="0.00" required />
                            <div className="flex items-center gap-2 ml-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <p className="text-[10px] font-bold text-gray-400">This will be your starting balance for tracking</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <Button variant="outline" className="flex-1 rounded-2xl py-4" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 rounded-2xl py-4 shadow-xl shadow-primary/20">
                            Create Account
                        </Button>
                    </div>
                </form>
            </Modal>
        </motion.div>
    );
};

export default AccountsPage;
