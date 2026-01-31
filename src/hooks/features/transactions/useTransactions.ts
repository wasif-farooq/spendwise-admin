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
import { useSearch } from '@/hooks/useSearch';
import { useModal } from '@/hooks/useModal';

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

    const historyModal = useModal<Transaction>();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const { searchQuery, setSearchQuery, filteredData: searchedTransactions } = useSearch(transactions, ['description', 'category']);

    const filteredTransactions = useMemo(() => {
        return searchedTransactions.filter(t => {
            return selectedCategory === 'All' || t.category === selectedCategory;
        });
    }, [searchedTransactions, selectedCategory]);

    const categories = useMemo(() =>
        ['All', ...Array.from(new Set(transactions.map((t: Transaction) => t.category)))],
        [transactions]);

    const handleTransactionClick = (t: Transaction) => {
        historyModal.open(t);
    };

    const handleBack = () => navigate('/accounts');

    return {
        id,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        isHistoryModalOpen: historyModal.isOpen,
        setIsHistoryModalOpen: (val: boolean) => val ? historyModal.open() : historyModal.close(),
        selectedTransaction: historyModal.data,
        filteredTransactions,
        categories,
        handleTransactionClick,
        handleBack
    };
};
