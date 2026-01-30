import { Receipt, Download, ArrowUpRight } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

interface Payment {
    id: string;
    date: string;
    amount: string;
    status: 'Paid' | 'Pending' | 'Failed';
    method: string;
}

interface RecentPaymentsProps {
    payments: Payment[];
}

export const RecentPayments = ({ payments }: RecentPaymentsProps) => {
    return (
        <Block className="space-y-8">
            <Block as="section" className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm">
                <Flex align="center" justify="between" className="mb-8">
                    <Flex align="center" gap={3}>
                        <Block className="bg-indigo-50 p-2.5 rounded-xl">
                            <Receipt className="h-5 w-5 text-indigo-600" />
                        </Block>
                        <Heading as="h3" weight="black" className="text-xl tracking-tight text-gray-900">Recent Payments</Heading>
                    </Flex>
                    <button className="text-indigo-600 font-black text-sm flex items-center hover:underline">
                        View All
                        <ArrowUpRight className="h-4 w-4 ml-1" />
                    </button>
                </Flex>

                <Block className="space-y-4">
                    {payments.map((payment) => (
                        <Flex
                            key={payment.id}
                            align="center"
                            justify="between"
                            className="p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group"
                        >
                            <Flex align="center" gap={4}>
                                <Block className="bg-white p-3 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                                    <Receipt className="h-6 w-6 text-gray-400" />
                                </Block>
                                <Block>
                                    <Text weight="bold" className="text-gray-900">{payment.date}</Text>
                                    <Text size="xs" color="text-gray-500" weight="bold" className="uppercase tracking-widest mt-0.5">
                                        {payment.method} • {payment.id}
                                    </Text>
                                </Block>
                            </Flex>

                            <Flex align="center" gap={6}>
                                <Text weight="black" className="text-gray-900">{payment.amount}</Text>
                                <Block
                                    className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded-full font-black ${payment.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                                            payment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                'bg-rose-100 text-rose-700'
                                        }`}
                                >
                                    {payment.status}
                                </Block>
                                <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                                    <Download className="h-5 w-5" />
                                </button>
                            </Flex>
                        </Flex>
                    ))}
                </Block>
            </Block>
        </Block>
    );
};
