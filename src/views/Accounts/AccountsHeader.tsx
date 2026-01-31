import { Wallet, Plus } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button } from '@ui';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { LimitBanner } from '@/views/Subscription';

interface AccountsHeaderProps {
    totalBalance: number;
    onAddAccount: () => void;
    accountCount?: number;
}

export const AccountsHeader = ({ totalBalance, onAddAccount, accountCount = 0 }: AccountsHeaderProps) => {
    const accountAccess = useFeatureAccess('accounts');
    const canAddAccount = accountAccess.hasAccess;

    return (
        <>
            {/* Limit Reached Banner removed - handled in parent page */}

            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <Block className="space-y-2">
                    <Flex align="center" gap={3} className="text-primary">
                        <Wallet className="h-8 w-8" />
                        <Text size="sm" weight="black" className="uppercase tracking-widest">Financial Overview</Text>
                    </Flex>
                    <Heading size="5xl" weight="black" color="text-gray-900" className="tracking-tight">Expense Accounts</Heading>
                    <Text weight="medium" color="text-gray-500">
                        Manage and track all your financial assets in one place. ({accountAccess.current}/{accountAccess.limit === -1 ? '∞' : accountAccess.limit})
                    </Text>
                </Block>

                <Block className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-primary/5 flex items-center gap-8 px-10">
                    <Block className="space-y-1">
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Balance</Text>
                        <Flex align="baseline" gap={2}>
                            <Text size="3xl" weight="black" color="text-gray-900">${totalBalance.toLocaleString()}</Text>
                            <Text size="sm" weight="black" color="text-primary">USD</Text>
                        </Flex>
                    </Block>
                    <Block className="h-12 w-px bg-gray-100" />
                    <Button
                        onClick={onAddAccount}
                        className="rounded-2xl px-6 py-4 flex items-center gap-2"
                        title={canAddAccount ? 'Add a new account' : 'Upgrade to add more accounts'}
                    >
                        <Plus size={20} />
                        Add Account
                    </Button>
                </Block>
            </header>
        </>
    );
};
