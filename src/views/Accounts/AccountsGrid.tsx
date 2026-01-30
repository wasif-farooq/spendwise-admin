import { AnimatePresence } from 'framer-motion';
import { Plus, Building2, Banknote, CreditCard, Wallet } from 'lucide-react';
import { Block, Heading, Text, Grid } from '@shared';
import { AccountCard } from '@ui';
import type { Account } from './types';

interface AccountsGridProps {
    accounts: Account[];
    onAddAccount: () => void;
}

export const AccountsGrid = ({ accounts, onAddAccount }: AccountsGridProps) => {

    const getIcon = (type: string) => {
        switch (type) {
            case 'bank': return <Building2 size={24} />;
            case 'cash': return <Banknote size={24} />;
            case 'credit_card': return <CreditCard size={24} />;
            case 'savings': return <Wallet size={24} />;
            default: return <Wallet size={24} />;
        }
    };

    return (
        <Grid cols={1} gap={8} className="md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {accounts.map((account) => (
                    <AccountCard key={account.id} account={account} getIcon={getIcon} />
                ))}
            </AnimatePresence>

            {/* Add New Account Card */}
            <Block
                as="button"
                onClick={onAddAccount}
                className="rounded-[3rem] border-4 border-dashed border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-all group flex flex-col items-center justify-center p-12 space-y-4 min-h-[350px]"
            >
                <Block className="h-20 w-20 rounded-[2rem] bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-primary/20">
                    <Plus size={40} />
                </Block>
                <Block className="text-center">
                    <Heading size="xl" weight="black" color="text-gray-900">Add New Account</Heading>
                    <Text size="sm" weight="medium" color="text-gray-500" className="mt-1">Connect a bank or add cash</Text>
                </Block>
            </Block>
        </Grid>
    );
};
