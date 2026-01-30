import { Bot, Search, RefreshCw } from 'lucide-react';
import { Block, Flex, Text } from '@shared';

export const AIChatHeader = () => {
    return (
        <Block className="h-16 border-b border-gray-100 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
            <Flex align="center" gap={3}>
                <Block className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                    <Bot className="h-6 w-6 text-white" />
                </Block>
                <Block>
                    <Text size="sm" weight="bold" color="text-gray-900">SpendWise Advisor</Text>
                    <Flex align="center" gap={2}>
                        <Block className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <Text size="xs" color="text-gray-500" weight="medium">Online & Analyzing</Text>
                    </Flex>
                </Block>
            </Flex>
            <Flex align="center" gap={2}>
                <Block as="button" className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                    <Search className="h-5 w-5" />
                </Block>
                <Block as="button" className="p-2 hover:bg-gray-100 rounded-xl text-gray-400 transition-colors">
                    <RefreshCw className="h-5 w-5" />
                </Block>
            </Flex>
        </Block>
    );
};
