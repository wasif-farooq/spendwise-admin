import { ShieldCheck, Download } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';

interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: string;
}

interface BillingHistoryProps {
    billingHistory: Invoice[];
}

export const BillingHistory = ({ billingHistory }: BillingHistoryProps) => {
    return (
        <Block className="space-y-8">
            <Block as="section" className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm h-full">
                <Flex align="center" gap={3} className="mb-8">
                    <Block className="bg-blue-50 p-2.5 rounded-xl">
                        <ShieldCheck className="h-5 w-5 text-blue-600" />
                    </Block>
                    <Heading as="h3" weight="black" className="text-xl tracking-tight text-gray-900">Billing History</Heading>
                </Flex>

                <Block className="space-y-6">
                    {billingHistory.map((invoice) => (
                        <Flex key={invoice.id} align="center" justify="between" className="group">
                            <Block>
                                <Text weight="bold" className="text-gray-900">{invoice.date}</Text>
                                <Text size="xs" color="text-gray-400" weight="bold" className="uppercase tracking-widest mt-0.5">{invoice.id}</Text>
                            </Block>
                            <Block className="text-right">
                                <Text weight="black" className="text-gray-900">{invoice.amount}</Text>
                                <button className="text-primary hover:text-primary/80 transition-colors mt-1">
                                    <Download className="h-4 w-4" />
                                </button>
                            </Block>
                        </Flex>
                    ))}
                </Block>

                <button className="w-full mt-10 py-4 bg-gray-50 text-gray-500 font-black text-sm rounded-2xl hover:bg-gray-100 transition-all border border-gray-100">
                    View All Invoices
                </button>
            </Block>
        </Block>
    );
};
