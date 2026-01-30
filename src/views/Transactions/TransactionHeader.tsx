import { Download, Plus, ArrowLeft, Calendar } from 'lucide-react';
import { Flex, Heading, Text, Block } from '@shared';
import { Button } from '@ui';

interface TransactionHeaderProps {
    accountId?: string;
    onBack?: () => void;
}

export const TransactionHeader = ({ accountId, onBack }: TransactionHeaderProps) => {
    return (
        <Flex justify="between" align="center" className="mb-8">
            <Flex align="center" gap={6}>
                {onBack && (
                    <button
                        onClick={onBack}
                        className="h-14 w-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/20 transition-all group"
                    >
                        <ArrowLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}
                <Block>
                    <Flex align="center" gap={2} className="text-primary mb-1">
                        <Calendar className="h-4 w-4" />
                        <Text size="xs" weight="black" className="uppercase tracking-widest">Transaction History</Text>
                    </Flex>
                    <Heading as="h1" size="4xl" weight="black" className="tracking-tight">Main Checking</Heading>
                    <Text color="text-gray-500" weight="medium">Account ID: {accountId}</Text>
                </Block>
            </Flex>

            <Flex gap={3}>
                <Button variant="outline" className="rounded-2xl border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Download className="h-5 w-5 mr-2" />
                    Export
                </Button>
                <Button className="rounded-2xl shadow-lg shadow-primary/30">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Transaction
                </Button>
            </Flex>
        </Flex>
    );
};
