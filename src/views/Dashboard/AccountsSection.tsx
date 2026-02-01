import { Block, Flex, Heading, Text, AnimatedBlock } from '@shared';
import { AccountCard } from '@ui';
import { useAccounts } from '@/hooks/features/accounts/useAccounts';
import { useDashboard } from '@/hooks/features/dashboard/useDashboard';

export const AccountsSection = () => {
    const { filteredAccounts, getAccountIcon } = useAccounts();
    const { loading } = useDashboard();

    if (loading) {
        return (
            <Block className="space-y-4">
                <Heading size="xl" weight="black" color="text-gray-900">Accounts Overview</Heading>
                <Flex gap={6} className="overflow-x-auto pb-4 hide-scrollbar">
                    {[1, 2, 3].map((i) => (
                        <Block key={i} className="min-w-[350px] h-64 bg-gray-50 animate-pulse rounded-[3rem]" />
                    ))}
                </Flex>
            </Block>
        );
    }

    return (
        <Block className="space-y-6">
            <Flex align="center" justify="between">
                <Block>
                    <Heading size="xl" weight="black" color="text-gray-900">Accounts Overview</Heading>
                    <Text size="sm" color="text-gray-500">Individual performance across all your accounts</Text>
                </Block>
            </Flex>

            <Flex gap={6} className="overflow-x-auto pb-6 hide-scrollbar -mx-2 px-2">
                {filteredAccounts.map((account, index) => (
                    <Block key={account.id} className="min-w-[380px] flex-shrink-0">
                        <AnimatedBlock transition={{ delay: index * 0.1 }}>
                            <AccountCard
                                account={account}
                                getIcon={(type) => getAccountIcon(type)}
                            />
                        </AnimatedBlock>
                    </Block>
                ))}
            </Flex>
        </Block>
    );
};
