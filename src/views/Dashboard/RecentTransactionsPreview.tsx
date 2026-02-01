import { Activity, ArrowRight, Wallet } from 'lucide-react';
import { Heading, Block, Flex, AnimatedBlock, Text } from '@shared';
import { RecentTransactionItem, Button } from '@ui';
import { useTransactions } from '@/hooks/features/transactions/useTransactions';
import { useNavigate } from 'react-router-dom';

export const RecentTransactionsPreview = () => {
    const { filteredTransactions: transactions } = useTransactions();
    const navigate = useNavigate();

    // Display only top 5 recent transactions
    const recentTransactions = transactions.slice(0, 5);

    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-[520px] flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-8">
                <Block>
                    <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                        <Wallet className="h-5 w-5 mr-3 text-primary" />
                        Recent Transactions
                    </Heading>
                    <Text size="sm" color="text-gray-500" className="mt-1">Your latest financial activity</Text>
                </Block>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary font-semibold group"
                    onClick={() => navigate('/transactions')}
                >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </Flex>

            <Block className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                {recentTransactions.length === 0 ? (
                    <Flex direction="col" align="center" justify="center" className="h-full py-12">
                        <div className="p-4 bg-gray-50 rounded-full mb-4">
                            <Activity className="h-8 w-8 text-gray-300" />
                        </div>
                        <Text color="text-gray-400">No recent transactions found</Text>
                        <Button variant="ghost" className="mt-2 text-primary" onClick={() => navigate('/accounts')}>
                            Add your first account
                        </Button>
                    </Flex>
                ) : (
                    recentTransactions.map((tx) => (
                        <RecentTransactionItem
                            key={tx.id}
                            description={tx.description}
                            date={tx.date}
                            amount={tx.amount}
                            category={tx.category}
                            type={tx.type}
                            status={tx.status}
                            icon={tx.icon}
                            color={tx.color}
                            onClick={() => navigate(`/transactions/${tx.id}`)}
                        />
                    ))
                )}
            </Block>

            <Block className="mt-6 pt-6 border-t border-gray-50">
                <Flex align="center" justify="between" className="bg-primary/5 p-4 rounded-2xl">
                    <Flex align="center" gap={3}>
                        <div className="p-2 bg-primary rounded-xl text-white">
                            <Activity className="h-4 w-4" />
                        </div>
                        <Block>
                            <Text size="xs" weight="bold" color="text-primary" className="uppercase tracking-wider">Analysis</Text>
                            <Text size="sm" weight="medium" color="text-primary/80">3 new expenses today</Text>
                        </Block>
                    </Flex>
                    <ArrowRight className="h-4 w-4 text-primary" />
                </Flex>
            </Block>
        </AnimatedBlock>
    );
};
