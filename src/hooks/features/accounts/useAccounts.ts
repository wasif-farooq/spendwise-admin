import { useState, useMemo } from 'react';
import type { Account } from '@/views/Accounts/types';
import { Building2, Banknote, CreditCard, Wallet } from 'lucide-react';
import React from 'react';
import mockData from '@/data/mockData.json';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';

export const useAccounts = () => {
    const [accounts] = useState<Account[]>(mockData.accounts as Account[]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const accountAccess = useFeatureAccess('accounts');
    const canAddAccount = accountAccess.hasAccess;

    const handleAddAccountClick = () => {
        if (canAddAccount) {
            setIsAddModalOpen(true);
        } else {
            setIsUpgradeModalOpen(true);
        }
    };

    const totalBalance = useMemo(() => {
        return accounts.reduce((acc, curr) => acc + curr.balance, 0);
    }, [accounts]);

    const filteredAccounts = useMemo(() => {
        return accounts.filter(acc =>
            acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.type.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [accounts, searchQuery]);

    const getAccountIcon = (type: string) => {
        switch (type) {
            case 'bank': return React.createElement(Building2, { size: 24 });
            case 'cash': return React.createElement(Banknote, { size: 24 });
            case 'credit_card': return React.createElement(CreditCard, { size: 24 });
            case 'savings': return React.createElement(Wallet, { size: 24 });
            default: return React.createElement(Wallet, { size: 24 });
        }
    };

    return {
        accounts,
        searchQuery,
        setSearchQuery,
        isAddModalOpen,
        setIsAddModalOpen,
        isUpgradeModalOpen,
        setIsUpgradeModalOpen,
        canAddAccount,
        accountAccess,
        handleAddAccountClick,
        totalBalance,
        filteredAccounts,
        getAccountIcon
    };
};
