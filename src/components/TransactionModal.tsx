import { useState, useRef } from 'react';
import Select, { type StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
    DollarSign,
    Calendar,
    Tag,
    Wallet,
    FileText,
    Utensils,
    Car,
    ShoppingBag,
    Home,
    Zap,
    Heart,
    Briefcase,
    MoreHorizontal,
    Camera,
    Upload,
    X as CloseIcon
} from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CATEGORY_OPTIONS = [
    { value: 'food', label: 'Food & Dining', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
    { value: 'transport', label: 'Transport', icon: Car, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'shopping', label: 'Shopping', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
    { value: 'housing', label: 'Housing', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: 'utilities', label: 'Utilities', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { value: 'health', label: 'Health', icon: Heart, color: 'text-rose-600', bg: 'bg-rose-50' },
    { value: 'salary', label: 'Salary', icon: Briefcase, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { value: 'other', label: 'Other', icon: MoreHorizontal, color: 'text-gray-600', bg: 'bg-gray-50' },
];

const ACCOUNT_OPTIONS = [
    { value: 'checking', label: 'Main Checking', balance: '$12,450.80', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
    { value: 'savings', label: 'Business Savings', balance: '$45,000.00', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { value: 'cash', label: 'Petty Cash', balance: '$850.00', icon: DollarSign, color: 'text-amber-600', bg: 'bg-amber-50' },
];

interface SelectOption {
    value: string;
    label: string;
    icon?: any;
    color?: string;
    bg?: string;
    balance?: string;
}

const customSelectStyles: StylesConfig<SelectOption, false> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#f9fafb', // gray-50
        border: 'none',
        borderRadius: '1.25rem',
        minHeight: '3.5rem',
        padding: '0 0.5rem',
        boxShadow: state.isFocused ? '0 0 0 2px rgba(var(--color-primary-rgb), 0.1)' : 'none',
        '&:hover': {
            backgroundColor: '#f3f4f6', // gray-100
        },
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    }),
    valueContainer: (base) => ({
        ...base,
        padding: '0 0.75rem',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'nowrap',
    }),
    singleValue: (base) => ({
        ...base,
        fontWeight: '700',
        color: '#111827', // gray-900
        margin: 0,
        width: '100%',
    }),
    placeholder: (base) => ({
        ...base,
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#9ca3af', // gray-400
        margin: 0,
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
        borderRadius: '1rem',
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
        padding: '0 0.75rem',
        '&:hover': {
            color: '#6b7280', // gray-500
        },
    }),
};

const CustomOption = ({ innerProps, label, data }: any) => (
    <div {...innerProps} className="flex items-center gap-4 p-3 hover:bg-primary/5 rounded-2xl cursor-pointer transition-all group">
        {data.icon && (
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${data.bg} ${data.color}`}>
                <data.icon size={22} />
            </div>
        )}
        <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-gray-900 truncate">{label}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Account</p>
        </div>
        {data.balance && (
            <div className="text-right">
                <p className="text-sm font-black text-gray-900">{data.balance}</p>
                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider">Available</p>
            </div>
        )}
    </div>
);

const CustomSingleValue = ({ data }: any) => (
    <div className="flex items-center justify-between w-full gap-3">
        <div className="flex items-center gap-3 min-w-0">
            {data.icon && (
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${data.bg} ${data.color}`}>
                    <data.icon size={20} />
                </div>
            )}
            <span className="text-sm font-black text-gray-900 truncate whitespace-nowrap">
                {data.label}
            </span>
        </div>
        {data.balance && (
            <span className="text-[10px] font-black text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-lg whitespace-nowrap flex-shrink-0">
                {data.balance}
            </span>
        )}
    </div>
);

export const TransactionModal = ({ isOpen, onClose }: TransactionModalProps) => {
    const [amount, setAmount] = useState('');
    const [transactionType, setTransactionType] = useState<'expense' | 'income' | 'transfer'>('expense');
    const [selectedAccount, setSelectedAccount] = useState<SelectOption | null>(ACCOUNT_OPTIONS[0]);
    const [selectedToAccount, setSelectedToAccount] = useState<SelectOption | null>(ACCOUNT_OPTIONS[1]);
    const [categories, setCategories] = useState(CATEGORY_OPTIONS);
    const [selectedCategory, setSelectedCategory] = useState<SelectOption | null>(null);
    const [receipt, setReceipt] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCreateCategory = (inputValue: string) => {
        const newCategory = {
            value: inputValue.toLowerCase().replace(/\W/g, ''),
            label: inputValue,
            icon: Tag,
            color: 'text-primary',
            bg: 'bg-primary/5',
        };
        setCategories((prev) => [...prev, newCategory]);
        setSelectedCategory(newCategory);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle transaction creation logic here
        onClose();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setReceipt(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeReceipt = () => {
        setReceipt(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const isExpense = transactionType === 'expense';
    const isIncome = transactionType === 'income';
    const isTransfer = transactionType === 'transfer';

    const getTypeColor = () => {
        if (isExpense) return 'rose';
        if (isIncome) return 'emerald';
        return 'indigo';
    };

    const color = getTypeColor();

    const getIconColor = () => {
        if (isExpense) return 'text-rose-600';
        if (isIncome) return 'text-emerald-600';
        return 'text-indigo-600';
    };

    const iconColor = getIconColor();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="New Transaction"
            maxWidth="max-w-xl"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Transaction Type Toggle */}
                <div className="flex p-1.5 bg-gray-100 rounded-[1.5rem] w-full max-w-sm mx-auto">
                    <button
                        type="button"
                        onClick={() => setTransactionType('expense')}
                        className={`flex-1 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${isExpense
                            ? 'bg-white text-rose-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Expense
                    </button>
                    <button
                        type="button"
                        onClick={() => setTransactionType('income')}
                        className={`flex-1 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${isIncome
                            ? 'bg-white text-emerald-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Income
                    </button>
                    <button
                        type="button"
                        onClick={() => setTransactionType('transfer')}
                        className={`flex-1 py-3 rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest transition-all ${isTransfer
                            ? 'bg-white text-indigo-600 shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Transfer
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Account Selection (Full Width, Above Amount) */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 select-none">
                                <Wallet size={14} className={iconColor} />
                                {isTransfer ? 'From Account' : 'Account'}
                            </label>
                            <Select
                                options={ACCOUNT_OPTIONS}
                                styles={customSelectStyles}
                                value={selectedAccount}
                                onChange={(option) => setSelectedAccount(option)}
                                components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                placeholder="Select Account"
                                isSearchable
                            />
                        </div>

                        {isTransfer && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 select-none">
                                    <Wallet size={14} className={iconColor} />
                                    To Account
                                </label>
                                <Select
                                    options={ACCOUNT_OPTIONS.filter(opt => opt.value !== selectedAccount?.value)}
                                    styles={customSelectStyles}
                                    value={selectedToAccount}
                                    onChange={(option) => setSelectedToAccount(option)}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    placeholder="Select Destination Account"
                                    isSearchable
                                />
                            </div>
                        )}
                    </div>

                    {/* Amount Section */}
                    <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 text-center space-y-2 ${color === 'rose' ? 'bg-rose-50 border-rose-100' :
                        color === 'emerald' ? 'bg-emerald-50 border-emerald-100' :
                            'bg-indigo-50 border-indigo-100'
                        }`}>
                        <label className={`text-[10px] font-black uppercase tracking-[0.2em] ${color === 'rose' ? 'text-rose-600' :
                            color === 'emerald' ? 'text-emerald-600' :
                                'text-indigo-600'
                            }`}>
                            {isExpense ? 'You Spent' : isIncome ? 'You Received' : 'You are Transferring'}
                        </label>
                        <div className="flex items-center justify-center gap-2">
                            <span className={`text-4xl font-black ${color === 'rose' ? 'text-rose-600' :
                                color === 'emerald' ? 'text-emerald-600' :
                                    'text-indigo-600'
                                }`}>$</span>
                            <input
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className={`bg-transparent border-none focus:ring-0 text-6xl font-black placeholder:text-gray-200 w-56 text-center transition-colors duration-500 ${color === 'rose' ? 'text-rose-600' :
                                    color === 'emerald' ? 'text-emerald-600' :
                                        'text-indigo-600'
                                    }`}
                                autoFocus
                                required
                            />
                        </div>
                    </div>

                    {/* Description (Full Width) */}
                    {!isTransfer && (
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 select-none">
                                <FileText size={14} className={iconColor} />
                                Description
                            </label>
                            <Input
                                placeholder="What was this for?"
                                className="rounded-2xl h-14 px-5 bg-gray-50 border-none focus:ring-4 focus:ring-primary/5 font-bold"
                                required
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category Selection (Expense/Income only) */}
                        {!isTransfer && (
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 select-none">
                                    <Tag size={14} className={iconColor} />
                                    Category
                                </label>
                                <CreatableSelect
                                    options={categories}
                                    styles={customSelectStyles}
                                    value={selectedCategory}
                                    onChange={(option) => setSelectedCategory(option)}
                                    onCreateOption={handleCreateCategory}
                                    components={{ Option: CustomOption, SingleValue: CustomSingleValue }}
                                    placeholder="Select or Create Category"
                                    isSearchable
                                    required
                                    formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                                />
                            </div>
                        )}

                        {/* Date Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 select-none">
                                <Calendar size={14} className={iconColor} />
                                Transaction Date
                            </label>
                            <Input
                                type="date"
                                defaultValue={new Date().toISOString().split('T')[0]}
                                className="rounded-2xl h-14 px-5 bg-gray-50 border-none focus:ring-4 focus:ring-primary/5 font-bold"
                                required
                            />
                        </div>
                    </div>

                    {/* Receipt Selection (Expense/Income only) */}
                    {!isTransfer && (
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                                <Camera size={14} className={iconColor} />
                                Receipt
                            </label>
                            <div className="relative h-[60px]">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                    className="hidden"
                                />
                                {!receipt ? (
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="w-full h-full border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-gray-400 hover:border-primary hover:text-primary transition-all group"
                                    >
                                        <Upload size={18} className="group-hover:scale-110 transition-transform" />
                                        <span className="text-xs font-bold">Upload Receipt</span>
                                    </button>
                                ) : (
                                    <div className="w-full h-full relative group">
                                        <img
                                            src={receipt}
                                            alt="Receipt preview"
                                            className="w-full h-full object-cover rounded-2xl border border-gray-100"
                                        />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={removeReceipt}
                                                className="p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                                            >
                                                <CloseIcon size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        className="flex-1 rounded-2xl py-5 font-black uppercase tracking-widest text-xs border-2 hover:bg-gray-50"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className={`flex-1 rounded-2xl py-5 font-black uppercase tracking-widest text-xs shadow-2xl transition-all duration-500 ${color === 'rose' ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-200' :
                            color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' :
                                'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                            }`}
                    >
                        Create {isExpense ? 'Expense' : isIncome ? 'Income' : 'Transfer'}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
