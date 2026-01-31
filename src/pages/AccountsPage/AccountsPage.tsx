import { Container } from '@shared';
import { AccountsHeader } from '@/views/Accounts/AccountsHeader';
import { AccountsFilter } from '@/views/Accounts/AccountsFilter';
import { AccountsGrid } from '@/views/Accounts/AccountsGrid';
import { AddAccountModal } from '@/views/Accounts/AddAccountModal';
import { UpgradeModal, LimitBanner } from '@/views/Subscription';
import { useAccounts } from '@/hooks/features/accounts/useAccounts';

const AccountsPage = () => {
    const {
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
    } = useAccounts();

    return (
        <Container size="wide" className="p-8 space-y-10">
            {/* Limit Banner */}
            {!canAddAccount && (
                <LimitBanner
                    featureName="accounts"
                    current={accountAccess.current}
                    limit={accountAccess.limit}
                    variant="warning"
                />
            )}

            {/* Header Section */}
            <AccountsHeader
                totalBalance={totalBalance}
                onAddAccount={handleAddAccountClick}
            />

            {/* Search and Filters */}
            <AccountsFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Accounts Grid */}
            <AccountsGrid
                accounts={filteredAccounts}
                onAddAccount={handleAddAccountClick}
                getAccountIcon={getAccountIcon}
            />


            {/* Add Account Modal */}
            <AddAccountModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                triggerFeature="accounts"
            />
        </Container>
    );
};

export default AccountsPage;

