import {
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import {
    Block,
    Flex,
    Grid,
    Text,
    Heading,
} from '@shared';

export const StatsOverview = () => {
    return (
        <Grid cols={1} gap={6} className="md:grid-cols-3">
            <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Spent (This Month)</Text>
                <Flex align="baseline" gap={2}>
                    <Heading size="3xl" weight="black">4,590.30</Heading>
                    <TrendingDown className="h-5 w-5 text-rose-500" />
                </Flex>
            </Block>
            <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Total Income (This Month)</Text>
                <Flex align="baseline" gap={2}>
                    <Heading size="3xl" weight="black">8,500.00</Heading>
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                </Flex>
            </Block>
            <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Net Cash Flow</Text>
                <Flex align="baseline" gap={2}>
                    <Heading size="3xl" weight="black" color="text-primary">+3,909.70</Heading>
                </Flex>
            </Block>
        </Grid>
    );
};
