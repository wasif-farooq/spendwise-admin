import { Globe, RefreshCw } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

export const ExchangeRatesHeader = () => {
    return (
        <Flex as="header" direction="col" justify="between" gap={6} className="md:flex-row md:items-center">
            <Block>
                <Heading as="h1" size="4xl" weight="black" className="text-gray-900 tracking-tight flex items-center gap-3">
                    <Globe className="h-10 w-10 text-primary" />
                    Exchange Rates
                </Heading>
                <Text color="text-gray-500" weight="medium" className="mt-2">Real-time currency conversion rates across global markets.</Text>
            </Block>
            <Flex align="center" gap={4}>
                <Block as="button" className="p-3 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-gray-500">
                    <RefreshCw className="h-5 w-5" />
                </Block>
                <Block className="bg-primary/10 px-4 py-2 rounded-2xl">
                    <Text size="xs" weight="black" className="text-primary uppercase tracking-widest">Last Updated: Just Now</Text>
                </Block>
            </Flex>
        </Flex>
    );
};
