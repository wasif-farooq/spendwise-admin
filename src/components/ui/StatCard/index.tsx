import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { AnimatedBlock, Flex, Block, Text } from '@shared';

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: LucideIcon;
    color: {
        bg: string;
        text: string;
    };
}

export const StatCard = ({ title, value, change, trend, icon: Icon, color }: StatCardProps) => (
    <AnimatedBlock className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <Flex align="center" justify="between" className="mb-4">
            <Block className={`p-3 rounded-2xl ${color.bg}`}>
                <Icon className={`h-6 w-6 ${color.text}`} />
            </Block>
            <Flex align="center" className={`text-xs font-bold px-2 py-1 rounded-full ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {change}
            </Flex>
        </Flex>
        <Text size="sm" weight="medium" color="text-gray-500">{title}</Text>
        <Text size="2xl" weight="bold" color="text-gray-900" className="mt-1">{value}</Text>
    </AnimatedBlock>
);
