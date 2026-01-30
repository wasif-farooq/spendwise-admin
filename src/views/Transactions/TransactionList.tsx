import { Flex, Text, Block } from '@shared';
import { Button } from '@ui';
import { TransactionRow } from '@ui';

interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'expense' | 'income';
    status: 'completed' | 'pending';
    icon: any;
    color: string;
}

interface TransactionListProps {
    transactions: Transaction[];
    onTransactionClick: (transaction: Transaction) => void;
}

export const TransactionList = ({ transactions, onTransactionClick }: TransactionListProps) => {
    return (
        <Block className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <Block className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                            <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Transaction</th>
                            <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Category</th>
                            <th className="text-left py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                            <th className="text-right py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Amount</th>
                            <th className="text-right py-6 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="py-6 px-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {transactions.map((transaction) => (
                            <TransactionRow
                                key={transaction.id}
                                transaction={{
                                    ...transaction,
                                    date: transaction.date,
                                    amount: transaction.amount,
                                }}
                                onViewHistory={() => onTransactionClick(transaction)}
                            />
                        ))}
                    </tbody>
                </table>
            </Block>

            <Block className="p-8 border-t border-gray-100 bg-gray-50/30">
                <Flex justify="between" align="center">
                    <Text size="sm" weight="bold" color="text-gray-500">Showing {transactions.length} transactions</Text>
                    <Flex gap={2}>
                        <Button variant="outline" size="sm" className="rounded-xl" disabled>Previous</Button>
                        <Button variant="outline" size="sm" className="rounded-xl">Next</Button>
                    </Flex>
                </Flex>
            </Block>

            {transactions.length === 0 && (
                <Block className="py-20 text-center">
                    <Block className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </Block>
                    <Text size="lg" weight="bold" color="text-gray-900">No transactions found</Text>
                    <Text color="text-gray-500" className="mt-1">Try adjusting your search or filters</Text>
                    <Button
                        variant="ghost"
                        className="mt-4 text-primary font-bold"
                        onClick={() => window.location.reload()} // Simplified handler for now
                    >
                        Clear Filters
                    </Button>
                </Block>
            )}
        </Block>
    );
};
