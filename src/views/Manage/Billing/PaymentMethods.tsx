import { CreditCard, Plus, ArrowUpRight } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

interface PaymentMethod {
    id: number;
    type: string;
    last4: string;
    expiry: string;
    isDefault: boolean;
}

interface PaymentMethodsProps {
    paymentMethods: PaymentMethod[];
}

export const PaymentMethods = ({ paymentMethods }: PaymentMethodsProps) => {
    return (
        <Block as="section" className="bg-white rounded-[3rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
            <Flex align="center" justify="between" className="mb-8">
                <Flex align="center" gap={3}>
                    <Block className="bg-primary/10 p-2.5 rounded-xl">
                        <CreditCard className="h-5 w-5 text-primary" />
                    </Block>
                    <Heading as="h3" weight="black" className="text-xl tracking-tight text-gray-900">Payment Methods</Heading>
                </Flex>
                <button className="text-primary font-black text-sm flex items-center hover:underline">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                </button>
            </Flex>

            <Block className="space-y-4">
                {paymentMethods.map((method) => (
                    <Flex
                        key={method.id}
                        align="center"
                        justify="between"
                        className="p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group"
                    >
                        <Flex align="center">
                            <Block className="bg-white p-3 rounded-xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
                                <CreditCard className="h-6 w-6 text-gray-400" />
                            </Block>
                            <Block>
                                <Text weight="bold" className="text-gray-900">{method.type} ending in {method.last4}</Text>
                                <Text size="xs" color="text-gray-500" weight="bold" className="uppercase tracking-wider mt-0.5">Expires {method.expiry}</Text>
                            </Block>
                        </Flex>
                        <Flex align="center" gap={4}>
                            {method.isDefault && (
                                <Text
                                    weight="black"
                                    className="px-3 py-1 bg-green-100 text-green-700 text-[10px] uppercase tracking-widest rounded-full"
                                >
                                    Default
                                </Text>
                            )}
                            <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                <ArrowUpRight className="h-5 w-5" />
                            </button>
                        </Flex>
                    </Flex>
                ))}
            </Block>
        </Block>
    );
};
