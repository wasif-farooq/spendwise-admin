import React, { useState, useMemo } from 'react';
import type { Account } from '@/views/Accounts/types';
import { Building2, Banknote, CreditCard, Wallet } from 'lucide-react';
import mockData from '@/data/mockData.json';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { useSearch } from '@/hooks/useSearch';
import { useToggle } from '@/hooks/useToggle';
import { useModal } from '@/hooks/useModal';

export const useAccounts = () => {
    const [accounts] = useState<Account[]>(mockData.accounts as Account[]);
    const addModal = useModal();
    const upgradeModal = useToggle(false);

    const { searchQuery, setSearchQuery, filteredData: filteredAccounts } = useSearch(accounts, ['name', 'type']);

    const accountAccess = useFeatureAccess('accounts');
    const canAddAccount = accountAccess.hasAccess;

    const handleAddAccountClick = () => {
        if (canAddAccount) {
            addModal.open();
        } else {
            upgradeModal.setTrue();
        }
    };

    const totalBalance = useMemo(() => {
        return accounts.reduce((acc, curr) => acc + curr.balance, 0);
    }, [accounts]);

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
        isAddModalOpen: addModal.isOpen,
        openAddModal: addModal.open,
        closeAddModal: addModal.close,
        setIsAddModalOpen: (val: boolean) => val ? addModal.open() : addModal.close(),
        isUpgradeModalOpen: upgradeModal.value,
        setIsUpgradeModalOpen: upgradeModal.setValue,
        canAddAccount,
        accountAccess,
        handleAddAccountClick,
        totalBalance,
        filteredAccounts,
        getAccountIcon
    };
};
