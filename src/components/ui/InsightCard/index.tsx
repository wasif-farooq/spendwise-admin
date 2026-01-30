import { ChevronRight, type LucideIcon } from 'lucide-react';
import { Block, Flex, Text } from '@shared';
import { Button } from '../Button';

interface InsightCardProps {
    insight: {
        title: string;
        desc: string;
        icon: LucideIcon;
        color: string;
        bg: string;
    };
}

export const InsightCard = ({ insight }: InsightCardProps) => {
    return (
        <Block className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group">
            <Flex align="center" gap={3} className="mb-2">
                <Block className={`p-2 rounded-lg ${insight.bg}`}>
                    <insight.icon className={`h-4 w-4 ${insight.color}`} />
                </Block>
                <Text size="sm" weight="bold" color="text-gray-900">{insight.title}</Text>
            </Flex>
            <Text size="xs" color="text-gray-500" className="leading-relaxed mb-3">{insight.desc}</Text>
            <Button variant="ghost" className="text-[10px] font-bold text-primary flex items-center group-hover:gap-1 transition-all">
                VIEW DETAILS <ChevronRight className="h-3 w-3" />
            </Button>
        </Block>
    );
};
