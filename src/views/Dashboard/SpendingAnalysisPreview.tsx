import { PieChart } from 'lucide-react';
import { Heading, Text, Block, Flex, AnimatedBlock } from '@shared';
import { Button } from '@ui';

export const SpendingAnalysisPreview = () => {
    return (
        <AnimatedBlock
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-80 flex flex-col"
        >
            <Flex align="center" justify="between" className="mb-6">
                <Heading as="h3" size="lg" weight="bold" color="text-gray-900" className="flex items-center">
                    <PieChart className="h-5 w-5 mr-2 text-primary" />
                    Spending Analysis
                </Heading>
                <Button variant="ghost" className="text-sm text-primary font-semibold hover:underline">View Details</Button>
            </Flex>
            <Block className="flex-grow bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                <Text weight="medium" color="text-gray-400">Chart Visualization Placeholder</Text>
            </Block>
        </AnimatedBlock>
    );
};
