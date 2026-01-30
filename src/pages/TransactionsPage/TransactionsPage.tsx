import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Smartphone,
    Coffee,
    TrendingUp,
    Car,
    Home,
    ShoppingBag,
    Zap,
} from 'lucide-react';
import {
    Container,
} from '@shared';
import { TransactionHeader } from '@/views/Transactions/TransactionHeader';
import { TransactionHistoryModal } from '@/views/Transactions/TransactionHistoryModal';
import { StatsOverview } from '@/views/Transactions/StatsOverview';
import { TransactionFilters } from '@/views/Transactions/TransactionFilters';
import { TransactionList } from '@/views/Transactions/TransactionList';

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
            <TransactionHeader
                accountId={id}
                onBack={() => navigate('/accounts')}
            />

            {/* Stats Overview */}
            <StatsOverview />

            {/* Filters */}
            <TransactionFilters
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={categories}
            />

            {/* Transaction List */}
            <TransactionList
                transactions={filteredTransactions}
                onTransactionClick={(t) => {
                    setSelectedTransaction(t);
                    setIsHistoryModalOpen(true);
                }}
            />

            {/* Modification History Modal */}
            <TransactionHistoryModal
                isOpen={isHistoryModalOpen}
                onClose={() => setIsHistoryModalOpen(false)}
                transaction={selectedTransaction}
            />
        </Container>
    );
};

export default TransactionsPage;
