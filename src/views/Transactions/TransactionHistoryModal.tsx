import {
    Plus,
    TrendingUp,
    Edit2,
    Clock,
    ArrowRight
} from 'lucide-react';
import {
    Block,
    Flex,
    Heading,
    Text,
    Inline
} from '@shared';
import { Modal, Button } from '@ui';

interface Transaction {
    id: string;
    description: string;
    category: string;
    amount: number;
    type: 'expense' | 'income';
    icon: any;
    color: string;
}

interface TransactionHistoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    transaction: Transaction | null;
}

const MOCK_HISTORY = [
    {
        id: 'h1',
        date: '2024-01-29 15:00',
        user: 'Wasif Farooq',
        action: 'Updated Amount',
        details: 'Changed amount from $2,400.00 to $2,499.00',
        type: 'update'
    },
    {
        id: 'h2',
        date: '2024-01-29 14:35',
        user: 'Wasif Farooq',
        action: 'Categorized',
        details: 'Set category to "Electronics"',
        type: 'category'
    },
    {
        id: 'h3',
        date: '2024-01-29 14:30',
        user: 'System',
        action: 'Created',
        details: 'Transaction imported via Bank Sync',
        type: 'create'
    }
];

export const TransactionHistoryModal = ({ isOpen, onClose, transaction }: TransactionHistoryModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Modification History"
            maxWidth="max-w-3xl"
        >
            <Block className="space-y-8">
                {transaction && (
                    <Block className="bg-gray-50 p-6 rounded-3xl flex items-center justify-between">
                        <Flex align="center" gap={4}>
                            <Block className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${transaction.color}`}>
                                <transaction.icon size={20} />
                            </Block>
                            <Block>
                                <Heading as="h4" weight="black" color="text-gray-900">{transaction.description}</Heading>
                                <Text size="xs" weight="bold" color="text-gray-500" className="uppercase tracking-widest">{transaction.category}</Text>
                            </Block>
                        </Flex>
                        <Block className="text-right">
                            <Text size="xl" weight="black" color="text-gray-900">
                                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                            </Text>
                            <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Current Amount</Text>
                        </Block>
                    </Block>
                )}

                <Block className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/20 before:via-gray-100 before:to-transparent">
                    {MOCK_HISTORY.map((item) => (
                        <Block key={item.id} className="relative flex items-start gap-6 pl-12 group">
                            <Block className={`absolute left-0 h-10 w-10 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${item.type === 'create' ? 'bg-emerald-500 text-white' :
                                item.type === 'category' ? 'bg-blue-500 text-white' : 'bg-primary text-white'
                                }`}>
                                {item.type === 'create' ? <Plus size={16} /> :
                                    item.type === 'category' ? <TrendingUp size={16} /> : <Edit2 size={16} />}
                            </Block>
                            <Block className="flex-1 bg-white border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                                <Flex direction="col" align="center" justify="between" gap={2} className="sm:flex-row mb-4">
                                    <Flex align="center" gap={2}>
                                        <Inline className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">
                                            {item.action}
                                        </Inline>
                                        <Text size="sm" weight="black" color="text-gray-900">{item.user}</Text>
                                    </Flex>
                                    <Flex align="center" gap={1.5} color="text-gray-400">
                                        <Clock size={14} />
                                        <Text size="xs" weight="bold">{item.date}</Text>
                                    </Flex>
                                </Flex>
                                <Text color="text-gray-600" weight="medium" className="leading-relaxed">{item.details}</Text>

                                {item.type === 'update' && (
                                    <Flex align="center" gap={3} className="mt-4 text-xs font-bold">
                                        <Text color="text-gray-400" className="line-through">$2,400.00</Text>
                                        <ArrowRight size={14} className="text-primary" />
                                        <Text color="text-emerald-600">$2,499.00</Text>
                                    </Flex>
                                )}
                            </Block>
                        </Block>
                    ))}
                </Block>

                <Block className="pt-6 border-t border-gray-100 flex justify-end">
                    <Button onClick={onClose} className="rounded-2xl px-8">
                        Close History
                    </Button>
                </Block>
            </Block>
        </Modal>
    );
};
