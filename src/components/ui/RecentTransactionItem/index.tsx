import { Block, Flex, Text } from '@shared';

interface RecentTransactionItemProps {
    index: number;
    description: string;
    date: string;
    amount: string;
    isExpense?: boolean;
    onClick?: () => void;
}

export const RecentTransactionItem = ({
    index,
    description,
    date,
    amount,
    isExpense = true,
    onClick
}: RecentTransactionItemProps) => {
    return (
        <Flex
            align="center"
            justify="between"
            className="p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer"
            onClick={onClick}
        >
            <Flex align="center">
                <Block className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                    {index}
                </Block>
                <Block className="ml-3">
                    <Text size="sm" weight="bold" color="text-gray-900">{description}</Text>
                    <Text size="xs" color="text-gray-500">{date}</Text>
                </Block>
            </Flex>
            <Text size="sm" weight="bold" color={isExpense ? 'text-red-600' : 'text-emerald-600'}>
                {isExpense ? '-' : '+'}{amount}
            </Text>
        </Flex>
    );
};
