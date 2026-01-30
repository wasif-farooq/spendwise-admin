import { useState, useMemo } from 'react';
import { Container } from '@shared';
import { AccountsHeader } from '@/views/Accounts/AccountsHeader';
import { AccountsFilter } from '@/views/Accounts/AccountsFilter';
import { AccountsGrid } from '@/views/Accounts/AccountsGrid';
import { AddAccountModal } from '@/views/Accounts/AddAccountModal';
import { CURRENCY_OPTIONS } from '@/views/Accounts/types';
import type { Account } from '@/views/Accounts/types';
import mockData from '@/data/mockData.json';


const AccountsPage = () => {
    // Use centralized mock data, casting types as needed
    const [accounts] = useState<Account[]>(mockData.accounts as Account[]);
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
