import { AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

import { Block, Heading, Text, Grid } from '@shared';
import { AccountCard } from '@ui';
import type { Account } from './types';

interface AccountsGridProps {
    accounts: Account[];
    onAddAccount: () => void;
    getAccountIcon: (type: string) => React.ReactNode;
}


export const AccountsGrid = ({ accounts, onAddAccount, getAccountIcon }: AccountsGridProps) => {


    return (
        <Grid cols={1} gap={8} className="md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
                {accounts.map((account) => (
                    <AccountCard key={account.id} account={account} getIcon={getAccountIcon} />
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
