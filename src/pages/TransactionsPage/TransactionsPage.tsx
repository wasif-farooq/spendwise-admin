import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Search,
    Download,
    TrendingUp,
    TrendingDown,
    ShoppingBag,
    Coffee,
    Home,
    Car,
    Zap,
    Smartphone,
    MoreVertical,
    Calendar,
    Plus,
    History,
    Clock,
    ArrowRight,
    Edit2
} from 'lucide-react';
import {
    Block,
    Flex,
    Grid,
    Container,
    Text,
    Heading,
    Inline
} from '@shared';
import { Button, Modal } from '@ui';

interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'expense' | 'income';
    status: 'completed' | 'pending';
    icon: any;
    color: string;
}

const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: '1',
        date: '2024-01-29 14:30',
        description: 'Apple Store - MacBook Pro',
        category: 'Electronics',
        amount: 2499.00,
        type: 'expense',
        status: 'completed',
        icon: Smartphone,
        color: 'bg-gray-900'
    },
    {
        id: '2',
        date: '2024-01-29 12:15',
        description: 'Starbucks Coffee',
        category: 'Food & Drink',
        amount: 5.50,
        type: 'expense',
        status: 'completed',
        icon: Coffee,
        color: 'bg-orange-500'
    },
    {
        id: '3',
        date: '2024-01-28 18:45',
        description: 'Monthly Salary',
        category: 'Income',
        amount: 8500.00,
        type: 'income',
        status: 'completed',
        icon: TrendingUp,
        color: 'bg-emerald-500'
    },
    {
        id: '4',
        date: '2024-01-28 10:20',
        description: 'Uber Ride',
        category: 'Transport',
        amount: 24.80,
        type: 'expense',
        status: 'completed',
        icon: Car,
        color: 'bg-blue-500'
    },
    {
        id: '5',
        date: '2024-01-27 15:30',
        description: 'Rent Payment',
        category: 'Housing',
        amount: 1800.00,
        type: 'expense',
        status: 'pending',
        icon: Home,
        color: 'bg-purple-500'
    },
    {
        id: '6',
        date: '2024-01-27 09:15',
        description: 'Amazon.com',
        category: 'Shopping',
        amount: 145.20,
        type: 'expense',
        status: 'completed',
        icon: ShoppingBag,
        color: 'bg-yellow-500'
    },
    {
        id: '7',
        date: '2024-01-26 20:00',
        description: 'Electricity Bill',
        category: 'Utilities',
        amount: 120.50,
        type: 'expense',
        status: 'completed',
        icon: Zap,
        color: 'bg-cyan-500'
    }
];

const TransactionsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const MOCK_HISTORY = [
        {
            id: 'h1',
            date: '2024-01-29 15:00',
            user: 'Wasif Farooq',
            action: 'Updated Amount',
            details: 'Changed amount from $2,400.00 to $2,499.00',
            type: 'update'
        },
        {
            id: 'h2',
            date: '2024-01-29 14:35',
            user: 'Wasif Farooq',
            action: 'Categorized',
            details: 'Set category to "Electronics"',
            type: 'category'
        },
        {
            id: 'h3',
            date: '2024-01-29 14:30',
            user: 'System',
            action: 'Created',
            details: 'Transaction imported via Bank Sync',
            type: 'create'
        }
    ];

    const filteredTransactions = useMemo(() => {
        return MOCK_TRANSACTIONS.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const categories = ['All', ...Array.from(new Set(MOCK_TRANSACTIONS.map(t => t.category)))];

    return (
        <Container size="wide" as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-8 space-y-8"
        >
            {/* Header */}
            <Flex as="header" direction="col" align="center" justify="between" gap={6} className="md:flex-row">
                <Flex align="center" gap={6}>
                    <button
                        onClick={() => navigate('/accounts')}
                        className="h-14 w-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 transition-all group"
                    >
                        <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <Block>
                        <Flex align="center" gap={2} className="text-primary mb-1">
                            <Calendar className="h-4 w-4" />
                            <Text size="xs" weight="black" className="uppercase tracking-widest">Transaction History</Text>
                        </Flex>
                        <Heading as="h1" size="4xl" weight="black" className="tracking-tight">Main Checking</Heading>
                        <Text color="text-gray-500" weight="medium">Account ID: {id}</Text>
                    </Block>
                </Flex>
                <Flex align="center" gap={3}>
                    <Button variant="outline" className="rounded-2xl px-6 py-4 flex items-center gap-2">
                        <Download size={20} />
                        Export CSV
                    </Button>
                    <Button className="rounded-2xl px-6 py-4 flex items-center gap-2">
                        <Plus size={20} />
                        Add Transaction
                    </Button>
                </Flex>
            </Flex>

            {/* Stats Overview */}
            <Grid cols={1} gap={6} className="md:grid-cols-3">
                <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Spent (This Month)</Text>
                    <Flex align="baseline" gap={2}>
                        <Heading size="3xl" weight="black">4,590.30</Heading>
                        <TrendingDown className="h-5 w-5 text-rose-500" />
                    </Flex>
                </Block>
                <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Income (This Month)</Text>
                    <Flex align="baseline" gap={2}>
                        <Heading size="3xl" weight="black">8,500.00</Heading>
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                    </Flex>
                </Block>
                <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Net Cash Flow</Text>
                    <Flex align="baseline" gap={2}>
                        <Heading size="3xl" weight="black" color="text-primary">+3,909.70</Heading>
                    </Flex>
                </Block>
            </Grid>

            {/* Filters */}
            <Flex direction="col" align="center" gap={4} className="lg:flex-row">
                <Block className="relative flex-1 group w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all shadow-sm"
                    />
                </Block>
                <Flex gap={2} className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-6 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${selectedCategory === cat
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </Flex>
            </Flex>

            {/* Transaction List */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-50">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Amount</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            <AnimatePresence mode="popLayout">
                                {filteredTransactions.map((t) => (
                                    <motion.tr
                                        layout
                                        key={t.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="group hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${t.color} group-hover:scale-110 transition-transform`}>
                                                    <t.icon size={20} />
                                                </div>
                                                <Text weight="black" color="text-gray-900">{t.description}</Text>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Inline className="px-4 py-2 bg-gray-100 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                                {t.category}
                                            </Inline>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Text size="sm" weight="bold" color="text-gray-500">{t.date}</Text>
                                        </td>
                                        <td className="px-8 py-6">
                                            <Flex align="center" gap={1.5} className={`text-[10px] font-black uppercase tracking-widest ${t.status === 'completed' ? 'text-emerald-600' : 'text-amber-600'
                                                }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${t.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                                                    }`} />
                                                {t.status}
                                            </Flex>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Text size="lg" weight="black" className={t.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}>
                                                {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                            </Text>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedTransaction(t);
                                                        setIsHistoryModalOpen(true);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                                                    title="Modification History"
                                                >
                                                    <History size={20} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mx-auto">
                            <Search className="h-8 w-8 text-gray-300" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">No transactions found</h3>
                        <p className="text-gray-500 font-medium">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Modification History Modal */}
            <Modal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                title="Modification History"
                maxWidth="max-w-3xl"
            >
                <div className="space-y-8">
                    {selectedTransaction && (
                        <Block className="bg-gray-50 p-6 rounded-3xl flex items-center justify-between">
                            <Flex align="center" gap={4}>
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${selectedTransaction.color}`}>
                                    <selectedTransaction.icon size={20} />
                                </div>
                                <Block>
                                    <Heading as="h4" weight="black" color="text-gray-900">{selectedTransaction.description}</Heading>
                                    <Text size="xs" weight="bold" color="text-gray-500" className="uppercase tracking-widest">{selectedTransaction.category}</Text>
                                </Block>
                            </Flex>
                            <div className="text-right">
                                <Text size="xl" weight="black" color="text-gray-900">
                                    {selectedTransaction.type === 'income' ? '+' : '-'}${selectedTransaction.amount.toLocaleString()}
                                </Text>
                                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Current Amount</Text>
                            </div>
                        </Block>
                    )}

                    <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-gray-100 before:to-transparent">
                        {MOCK_HISTORY.map((item) => (
                            <div key={item.id} className="relative flex items-start gap-6 pl-12 group">
                                <div className={`absolute left-0 h-10 w-10 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${item.type === 'create' ? 'bg-emerald-500 text-white' :
                                    item.type === 'category' ? 'bg-blue-500 text-white' : 'bg-primary text-white'
                                    }`}>
                                    {item.type === 'create' ? <Plus size={16} /> :
                                        item.type === 'category' ? <TrendingUp size={16} /> : <Edit2 size={16} />}
                                </div>
                                <Block className="flex-1 bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                                    <Flex direction="col" align="center" justify="between" gap={2} className="sm:flex-row mb-4">
                                        <Flex align="center" gap={2}>
                                            <Inline className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                                                {item.action}
                                            </Inline>
                                            <Text size="sm" weight="black" color="text-gray-900">{item.user}</Text>
                                        </Flex>
                                        <Flex align="center" gap={1.5} color="text-gray-400">
                                            <Clock size={14} />
                                            <Text size="xs" weight="bold">{item.date}</Text>
                                        </Flex>
                                    </Flex>
                                    <Text color="text-gray-600" weight="medium" className="leading-relaxed">{item.details}</Text>

                                    {item.type === 'update' && (
                                        <Flex align="center" gap={3} className="mt-4 text-xs font-bold">
                                            <Text color="text-gray-400" className="line-through">$2,400.00</Text>
                                            <ArrowRight size={14} className="text-primary" />
                                            <Text color="text-emerald-600">$2,499.00</Text>
                                        </Flex>
                                    )}
                                </Block>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-gray-100 flex justify-end">
                        <Button onClick={() => setIsHistoryModalOpen(false)} className="rounded-2xl px-8">
                            Close History
                        </Button>
                    </div>
                </div>
            </Modal>
        </Container>
    );
};

export default TransactionsPage;
