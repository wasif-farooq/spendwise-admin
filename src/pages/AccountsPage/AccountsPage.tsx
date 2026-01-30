import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import Select, { type StylesConfig } from 'react-select';
import {
    Wallet,
    Plus,
    Search,
    CreditCard,
    Banknote,
    Building2,
    Check,
    Info
} from 'lucide-react';
import { Container, Heading, Text, Block, Flex } from '@shared';
import { Button, Modal, Input, AccountCard } from '@ui';

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

    const getIcon = (type: Account['type'] | string) => {
        switch (type) {
            case 'bank': return <Building2 size={24} />;
            case 'cash': return <Banknote size={24} />;
            case 'credit_card': return <CreditCard size={24} />;
            case 'savings': return <Wallet size={24} />;
            default: return <Wallet size={24} />;
        }
    };

    return (
        <Container size="wide" className="p-8 space-y-10">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <Block className="space-y-2">
                    <Flex align="center" gap={3} className="text-primary">
                        <Wallet className="h-8 w-8" />
                        <Text size="sm" weight="black" className="uppercase tracking-widest">Financial Overview</Text>
                    </Flex>
                    <Heading size="5xl" weight="black" color="text-gray-900" className="tracking-tight">Expense Accounts</Heading>
                    <Text weight="medium" color="text-gray-500">Manage and track all your financial assets in one place.</Text>
                </Block>

                <Block className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-primary/5 flex items-center gap-8 px-10">
                    <Block className="space-y-1">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Balance</Text>
                        <Flex align="baseline" gap={2}>
                            <Text size="3xl" weight="black" color="text-gray-900">${totalBalance.toLocaleString()}</Text>
                            <Text size="sm" weight="black" color="text-primary">USD</Text>
                        </Flex>
                    </Block>
                    <Block className="h-12 w-px bg-gray-100" />
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        className="rounded-2xl px-6 py-4 flex items-center gap-2"
                    >
                        <Plus size={20} />
                        Add Account
                    </Button>
                </Block>
            </header>

            {/* Search and Filters */}
            <Flex direction="col" className="sm:flex-row" align="center" gap={4}>
                <Block className="relative flex-1 group w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search accounts by name or type..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all shadow-sm"
                    />
                </Block>
                <Flex gap={2} className="w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                        All Types
                    </button>
                    <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                        Currency
                    </button>
                </Flex>
            </Flex>

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredAccounts.map((account) => (
                        <AccountCard key={account.id} account={account} getIcon={getIcon} />
                    ))}
                </AnimatePresence>

                {/* Add New Account Card */}
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="rounded-[3rem] border-4 border-dashed border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-12 space-y-4 min-h-[350px]"
                >
                    <Block className="h-20 w-20 rounded-[2rem] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                        <Plus size={40} />
                    </Block>
                    <Block className="text-center">
                        <Heading size="xl" weight="black" color="text-gray-900">Add New Account</Heading>
                        <Text size="sm" weight="medium" color="text-gray-500" className="mt-1">Connect a bank or add cash</Text>
                    </Block>
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
                    <Block className="space-y-4">
                        <Flex align="center" justify="between" className="px-1">
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Select Account Type</Text>
                            <Flex align="center" gap={1} className="text-primary">
                                <Info size={14} />
                                <Text size="xs" weight="bold">Choose how you'll use this account</Text>
                            </Flex>
                        </Flex>
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
                                    <Block className={`h-12 w-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${type.bg} ${type.color}`}>
                                        <type.icon size={24} />
                                    </Block>
                                    <Block className="flex-1 min-w-0">
                                        <Text size="sm" weight="black" className={`truncate ${selectedType === type.id ? 'text-primary' : 'text-gray-900'}`}>{type.name}</Text>
                                        <Text size="xs" weight="bold" color="text-gray-500" className="truncate">{type.description}</Text>
                                    </Block>
                                    {selectedType === type.id && (
                                        <div className="absolute top-3 right-3 h-5 w-5 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </Block>

                    <Block className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Block className="space-y-2">
                                <Input label="Account Name" placeholder="e.g. Personal Savings" required />
                                <Text size="xs" weight="bold" color="text-gray-400" className="ml-1">Give your account a recognizable name</Text>
                            </Block>
                            <Block className="space-y-2">
                                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest ml-1">Currency</Text>
                                <Select
                                    options={CURRENCY_OPTIONS}
                                    styles={customSelectStyles}
                                    value={selectedCurrency}
                                    onChange={(option) => option && setSelectedCurrency(option)}
                                    placeholder="Select Currency"
                                    isSearchable
                                />
                            </Block>
                        </div>

                        <Block className="space-y-2">
                            <Input label="Initial Balance" type="number" placeholder="0.00" required />
                            <Flex align="center" gap={2} className="ml-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <Text size="xs" weight="bold" color="text-gray-400">This will be your starting balance for tracking</Text>
                            </Flex>
                        </Block>
                    </Block>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button variant="outline" className="flex-1 rounded-2xl py-4" onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1 rounded-2xl py-4 shadow-xl shadow-primary/20">
                            Create Account
                        </Button>
                    </Flex>
                </form>
            </Modal>
        </Container>
    );
};

export default AccountsPage;
