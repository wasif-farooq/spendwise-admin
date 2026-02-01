import { Block, Flex, Text } from '@shared';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '../Badge';

interface RecentTransactionItemProps {
    description: string;
    date: string;
    amount: string | number;
    category?: string;
    type: 'income' | 'expense';
    status?: 'completed' | 'pending';
    icon?: LucideIcon;
    color?: string;
    onClick?: () => void;
}

export const RecentTransactionItem = ({
    description,
    date,
    amount,
    category,
    type,
    status = 'completed',
    icon: Icon,
    color = 'bg-gray-100',
    onClick
}: RecentTransactionItemProps) => {
    const isExpense = type === 'expense';
    const formattedAmount = typeof amount === 'number'
        ? amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        : amount;

    return (
        <Flex
            align="center"
            justify="between"
            className="p-4 hover:bg-gray-50 rounded-2xl transition-all duration-200 cursor-pointer border border-transparent hover:border-gray-100 group"
            onClick={onClick}
        >
            <Flex align="center" gap={4}>
                <Block className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-sm`}>
                    {Icon ? <Icon className="h-6 w-6" /> : <Block className="h-6 w-6 bg-white/20 rounded-full" />}
                </Block>
                <Block>
                    <Flex align="center" gap={2}>
                        <Text size="sm" weight="bold" color="text-gray-900" className="group-hover:text-primary transition-colors">
                            {description}
                        </Text>
                        {status === 'pending' && (
                            <Badge variant="warning" size="sm" className="text-[10px] py-0 px-1.5 h-4">Pending</Badge>
                        )}
                    </Flex>
                    <Flex align="center" gap={1.5}>
                        <Text size="xs" color="text-gray-500">{date}</Text>
                        <Text size="xs" color="text-gray-300">•</Text>
                        <Text size="xs" weight="medium" color="text-gray-400">{category}</Text>
                    </Flex>
                </Block>
            </Flex>
            <Block className="text-right">
                <Text weight="black" size="md" color={isExpense ? 'text-gray-900' : 'text-emerald-600'}>
                    {isExpense ? '-' : '+'}{formattedAmount.replace('$', '')}
                </Text>
                <Text size="xs" color="text-gray-400" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    {isExpense ? 'spent' : 'received'}
                </Text>
            </Block>
        </Flex>
    );
};
