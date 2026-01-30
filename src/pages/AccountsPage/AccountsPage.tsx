import { useState, useMemo } from 'react';
import { Container } from '@shared';
import { AccountsHeader } from '@/views/Accounts/AccountsHeader';
import { AccountsFilter } from '@/views/Accounts/AccountsFilter';
import { AccountsGrid } from '@/views/Accounts/AccountsGrid';
import { AddAccountModal } from '@/views/Accounts/AddAccountModal';
import { CURRENCY_OPTIONS } from '@/views/Accounts/types';
import type { Account } from '@/views/Accounts/types';

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

    return (
        <Container size="wide" className="p-8 space-y-10">
            {/* Header Section */}
            <AccountsHeader
                totalBalance={totalBalance}
                onAddAccount={() => setIsAddModalOpen(true)}
            />

            {/* Search and Filters */}
            <AccountsFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Accounts Grid */}
            <AccountsGrid
                accounts={filteredAccounts}
                onAddAccount={() => setIsAddModalOpen(true)}
            />

            {/* Add Account Modal */}
            <AddAccountModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                selectedType={selectedType}
                onTypeChange={setSelectedType}
                selectedCurrency={selectedCurrency}
                onCurrencyChange={(option) => option && setSelectedCurrency(option)}
            />
        </Container>
    );
};

export default AccountsPage;
