import { Calendar } from 'lucide-react';
import { Heading, Block, Flex, AnimatedBlock } from '@shared';
import { RecentTransactionItem } from '@ui';

export const RecentTransactionsPreview = () => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-6">
                <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    Recent Transactions
                </Heading>
                <button className="text-sm text-primary font-semibold hover:underline">See All</button>
            </Flex>
            <Block className="space-y-4 overflow-y-auto pr-2">
                {[1, 2, 3].map((i) => (
                    <RecentTransactionItem
                        key={i}
                        index={i}
                        description={`Transaction ${i}`}
                        date="Jan 29, 2026"
                        amount="$45.00"
                        isExpense={true}
                    />
                ))}
            </Block>
        </AnimatedBlock>
    );
};
