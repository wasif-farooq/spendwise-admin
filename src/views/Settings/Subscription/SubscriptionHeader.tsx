import { Block, Flex, Heading, Text } from '@shared';

export const SubscriptionHeader = () => (
    <Flex as="header" direction="col" justify="between" gap={6} className="sm:flex-row sm:items-center">
        <Block>
            <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">Subscription</Heading>
            <Text color="text-gray-500" weight="medium" className="mt-1">Manage your personal plan and view billing history.</Text>
        </Block>
    </Flex>
);
