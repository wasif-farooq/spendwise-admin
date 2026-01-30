import { useNavigate } from 'react-router-dom';
import { MoreVertical, TrendingUp, TrendingDown, Eye, Edit2 } from 'lucide-react';
import { Block, Flex, Heading, Text, AnimatedBlock } from '@shared';
import { Button } from '@ui';

interface AccountCardProps {
    account: {
        id: string;
        name: string;
        type: string;
        balance: number;
        currency: string;
        lastActivity: string;
        color: string;
        trend: 'up' | 'down';
        change: string;
    };
    getIcon: (type: string) => React.ReactNode;
}

export const AccountCard = ({ account, getIcon }: AccountCardProps) => {
    const navigate = useNavigate();

    return (
        <AnimatedBlock
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all group overflow-hidden flex flex-col"
        >
            <Block className="p-8 flex-grow space-y-8">
                <Flex align="start" justify="between">
                    <Block className={`h-16 w-16 rounded-[1.5rem] flex items-center justify-center text-white shadow-lg ${account.color} group-hover:scale-110 transition-transform duration-500`}>
                        {getIcon(account.type)}
                    </Block>
                    <Flex direction="col" align="end" gap={2}>
                        <Button variant="ghost" className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-gray-400 h-auto">
                            <MoreVertical size={20} />
                        </Button>
                        <Flex align="center" gap={1} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${account.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {account.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {account.change}
                        </Flex>
                    </Flex>
                </Flex>

                <Block className="space-y-1">
                    <Heading size="2xl" weight="black" color="text-gray-900" className="tracking-tight">{account.name}</Heading>
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">{account.type.replace('_', ' ')}</Text>
                </Block>

                <Block className="space-y-1">
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Current Balance</Text>
                    <Flex align="baseline" gap={2}>
                        <Text size="4xl" weight="black" className={`tracking-tighter ${account.balance < 0 ? 'text-rose-600' : 'text-gray-900'}`}>
                            {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString()}
                        </Text>
                        <Text size="sm" weight="black" color="text-gray-400">{account.currency}</Text>
                    </Flex>
                </Block>
            </Block>

            <Block className="px-8 py-6 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                <Flex align="center" gap={2}>
                    <Block className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Active: {account.lastActivity}</Text>
                </Flex>
                <Flex align="center" gap={1}>
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/accounts/${account.id}/transactions`)}
                        className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-gray-400 h-auto"
                        title="View Transactions"
                    >
                        <Eye size={18} />
                    </Button>
                    <Button variant="ghost" className="p-2 hover:bg-primary/10 hover:text-primary rounded-xl transition-all text-gray-400 h-auto" title="Edit Account">
                        <Edit2 size={18} />
                    </Button>
                </Flex>
            </Block>
        </AnimatedBlock>
    );
};
