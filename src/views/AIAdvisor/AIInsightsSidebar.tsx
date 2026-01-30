import { Sparkles, TrendingDown, Zap, Lightbulb } from 'lucide-react';
import { Block, Heading, Text, Flex, AnimatedBlock } from '@shared';
import { InsightCard } from '@ui';

const INSIGHTS = [
    {
        title: "Potential Saving",
        desc: "Unused gym subscription detected ($45/mo)",
        icon: TrendingDown,
        color: "text-red-500",
        bg: "bg-red-50"
    },
    {
        title: "Spending Alert",
        desc: "Dining expenses up by 22% this week",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-50"
    },
    {
        title: "Smart Tip",
        desc: "Moving $200 today would maximize interest",
        icon: Lightbulb,
        color: "text-blue-500",
        bg: "bg-blue-50"
    }
];

export const AIInsightsSidebar = () => {
    return (
        <Block className="w-full lg:w-80 border-r border-gray-200 bg-white p-6 overflow-y-auto hidden lg:block">
            <Flex align="center" gap={2} className="mb-8">
                <Block className="p-2 bg-primary/10 rounded-xl">
                    <Sparkles className="h-5 w-5 text-primary" />
                </Block>
                <Heading as="h2" size="xl" weight="bold" color="text-gray-900">AI Insights</Heading>
            </Flex>

            <div className="space-y-4">
                {INSIGHTS.map((insight, idx) => (
                    <InsightCard key={idx} insight={insight} />
                ))}
            </div>

            <Block className="mt-8 p-4 rounded-2xl bg-primary text-white space-y-3">
                <Text size="sm" weight="bold">Goal Progress</Text>
                <Block className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <AnimatedBlock
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="h-full bg-white rounded-full"
                    />
                </Block>
                <Text size="xs" color="text-white/80">You're 75% through your "New Car" goal. Keep it up!</Text>
            </Block>
        </Block>
    );
};
