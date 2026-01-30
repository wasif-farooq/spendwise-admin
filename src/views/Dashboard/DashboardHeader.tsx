import { Heading, Text, AnimatedBlock } from '@shared';

export const DashboardHeader = () => {
    return (
        <AnimatedBlock>
            <Heading size="3xl" weight="black" color="text-gray-900">Overview</Heading>
            <Text color="text-gray-500" className="mt-1">Welcome back, John! Here's what's happening today.</Text>
        </AnimatedBlock>
    );
};
