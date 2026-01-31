import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
import mockData from '@/data/mockData.json';

interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'expense' | 'income';
    status: 'completed' | 'pending';
    icon: LucideIcon;
    color: string;
}

const iconMap: Record<string, LucideIcon> = {
    Smartphone,
    Coffee,
    TrendingUp,
    Car,
    Home,
    ShoppingBag,
    Zap
};

export const useTransactions = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Map icons from JSON strings to components
    const [transactions] = useState<Transaction[]>(() =>
        mockData.transactions.map(t => ({
            ...t,
            type: t.type as 'expense' | 'income',
            status: t.status as 'completed' | 'pending',
            icon: iconMap[t.iconName] || ShoppingBag // Fallback icon
        }))
    );

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

    const categories = useMemo(() =>
        ['All', ...Array.from(new Set(transactions.map((t: Transaction) => t.category)))],
        [transactions]);

    const handleTransactionClick = (t: Transaction) => {
        setSelectedTransaction(t);
        setIsHistoryModalOpen(true);
    };

    const handleBack = () => navigate('/accounts');

    return {
        id,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isHistoryModalOpen,
        setIsHistoryModalOpen,
        selectedTransaction,
        filteredTransactions,
        categories,
        handleTransactionClick,
        handleBack
    };
};
