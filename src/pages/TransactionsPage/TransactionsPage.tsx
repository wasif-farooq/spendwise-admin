import { motion } from 'framer-motion';
import {
    Container,
} from '@shared';
import { TransactionHeader } from '@/views/Transactions/TransactionHeader';
import { TransactionHistoryModal } from '@/views/Transactions/TransactionHistoryModal';
import { StatsOverview } from '@/views/Transactions/StatsOverview';
import { TransactionFilters } from '@/views/Transactions/TransactionFilters';
import { TransactionList } from '@/views/Transactions/TransactionList';
import { useTransactions } from '@/hooks/features/transactions/useTransactions';

const TransactionsPage = () => {
    const {
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
    } = useTransactions();

    return (
        <Container size="wide" as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="py-8 space-y-8"
        >
            {/* Header */}
            <TransactionHeader
                accountId={id}
                onBack={handleBack}
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
                onTransactionClick={handleTransactionClick}
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

