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
    Zap
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
    Container,
} from '@shared';
import { TransactionHeader } from '@/views/Transactions/TransactionHeader';
import { TransactionHistoryModal } from '@/views/Transactions/TransactionHistoryModal';
import { StatsOverview } from '@/views/Transactions/StatsOverview';
import { TransactionFilters } from '@/views/Transactions/TransactionFilters';
import { TransactionList } from '@/views/Transactions/TransactionList';
import mockData from '@/data/mockData.json';

interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'expense' | 'income';
    status: 'completed' | 'pending';
    icon: LucideIconType;
    color: string;
}

const iconMap: Record<string, LucideIconType> = {
    Smartphone,
    Coffee,
    TrendingUp,
    Car,
    Home,
    ShoppingBag,
    Zap
};

const TransactionsPage = () => {
    // Map icons from JSON strings to components
    const [transactions] = useState<Transaction[]>(() =>
        mockData.transactions.map(t => ({
            ...t,
            type: t.type as 'expense' | 'income',
            status: t.status as 'completed' | 'pending',
            icon: iconMap[t.iconName] || ShoppingBag // Fallback icon
        }))
    );
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [transactions, searchQuery, selectedCategory]);

    const categories = ['All', ...Array.from(new Set(transactions.map((t: Transaction) => t.category)))];

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
