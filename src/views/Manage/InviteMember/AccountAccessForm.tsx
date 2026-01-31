import { usePaginatedData } from '@/hooks/usePaginatedData';
import { AnimatePresence } from 'framer-motion';
import { Block, Flex, Heading, Text, AnimatedBlock, Inline } from '@shared';
import { Button, Input } from '@ui';
import { Check, CreditCard, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import mockData from '@/data/mockData.json';
import type { InvitationData } from '@/views/Manage/InviteMember/types';

interface AccountAccessFormProps {
    accountConfigs: InvitationData['accountPermissions'];
    toggleAccountSelection: (accountId: string) => void;
    toggleAccountPermission: (accountId: string, permission: string) => void;
    overriddenAccounts: string[];
    toggleOverride: (accountId: string) => void;
    canOverridePermissions?: boolean;
}

export const AccountAccessForm = ({
    accountConfigs,
    toggleAccountSelection,
    toggleAccountPermission,
    overriddenAccounts,
    toggleOverride,
    canOverridePermissions = false
}: AccountAccessFormProps) => {
    // Use usePaginatedData hook
    const {
        data: paginatedAccounts,
        currentPage,
        totalPages,
        searchQuery,
        setSearchQuery,
        goToNextPage,
        goToPrevPage
    } = usePaginatedData({
        data: mockData.accounts,
        itemsPerPage: 3,
        filterFn: (account, query) => account.name.toLowerCase().includes(query.toLowerCase())
    });

    // Define permission metadata
    const accountPermissions = [
        { id: 'view', name: 'View Account', description: 'Can view account details and read transactions.', effect: 'Read-only access.' },
        { id: 'create', name: 'Create Transactions', description: 'Can add new income or expenses.', effect: 'Modifies balance.' },
        { id: 'edit', name: 'Edit Transactions', description: 'Can modify existing transactions.', effect: 'Changes history.' },
        { id: 'delete', name: 'Delete Transactions', description: 'Can permanently remove transactions.', effect: 'Irreversible.' }
    ];

    return (
        <Block className="lg:col-span-2 space-y-8">
            <Flex align="center" justify="between" className="px-2">
                <Heading as="h3" weight="black" className="text-xl text-gray-900 tracking-tight">Account Access</Heading>
                <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">
                    {Object.keys(accountConfigs).length} Accounts Selected
                </Text>
            </Flex>

            {/* Search Bar */}
            <Block className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                    type="text"
                    placeholder="Search accounts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-4 rounded-2xl bg-white border-gray-100 shadow-sm focus:outline-none focus:ring-primary/20 focus:border-primary transition-all font-medium placeholder:text-gray-400"
                />
            </Block>

            <Block className="space-y-6">
                {paginatedAccounts.length > 0 ? (
                    paginatedAccounts.map((account) => {
                        const isSelected = !!accountConfigs[String(account.id)];
                        const config = accountConfigs[String(account.id)];
                        const isOverridden = overriddenAccounts.includes(String(account.id));

                        return (
                            <Block
                                key={account.id}
                                className={`bg-white rounded-[2.5rem] border transition-all overflow-hidden ${isSelected
                                    ? 'border-primary/20 shadow-lg shadow-primary/5'
                                    : 'border-gray-100 shadow-lg shadow-gray-200/30'
                                    }`}
                            >
                                <Block className={`p-8 border-b ${isSelected ? 'bg-primary/5 border-primary/10' : 'bg-gray-50/50 border-gray-100'}`}>
                                    <Flex align="center" justify="between">
                                        <Flex align="center" gap={6}>
                                            {/* Selection Checkbox */}
                                            <Block
                                                onClick={(e: React.MouseEvent) => { e.stopPropagation(); toggleAccountSelection(String(account.id)); }}
                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all cursor-pointer ${isSelected
                                                    ? 'bg-primary border-primary'
                                                    : 'bg-white border-gray-300 hover:border-gray-400'
                                                    }`}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" strokeWidth={4} />}
                                            </Block>

                                            <Flex align="center" gap={4}>
                                                <Block className={`p-3 rounded-2xl shadow-sm ${account.color || 'bg-gray-200'}`}>
                                                    <CreditCard className="h-6 w-6 text-white" />
                                                </Block>
                                                <Block>
                                                    <Heading as="h4" weight="black" className="text-lg text-gray-900">{account.name}</Heading>
                                                    <Text size="xs" color="text-gray-500" weight="medium">{account.type} • {account.currency}</Text>
                                                </Block>
                                            </Flex>
                                        </Flex>

                                        {/* Override Toggle */}
                                        {isSelected && canOverridePermissions && (
                                            <Flex align="center" gap={4}>
                                                <Text size="sm" weight="bold" color="text-gray-500">Override Permissions</Text>
                                                <Block
                                                    onClick={() => toggleOverride(String(account.id))}
                                                    className={`w-12 h-7 rounded-full transition-all relative flex items-center px-1 cursor-pointer ${isOverridden ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200'}`}
                                                >
                                                    <AnimatedBlock
                                                        initial={false}
                                                        animate={{ x: isOverridden ? 20 : 0 }}
                                                        className="w-5 h-5 bg-white rounded-full shadow-sm"
                                                    />
                                                </Block>
                                            </Flex>
                                        )}
                                    </Flex>
                                </Block>

                                <Block className="divide-y divide-gray-50">
                                    <AnimatePresence>
                                        {isSelected && isOverridden && accountPermissions.map((perm) => {
                                            const isAllowed = config?.permissions?.includes(perm.id);
                                            return (
                                                <AnimatedBlock
                                                    key={perm.id}
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                >
                                                    <Block
                                                        onClick={() => toggleAccountPermission(String(account.id), perm.id)}
                                                        className={`p-8 cursor-pointer transition-all hover:bg-gray-50/80 group ${isAllowed ? 'bg-primary/5' : ''
                                                            }`}
                                                    >
                                                        <Flex justify="between" align="start">
                                                            <Block className="flex-grow max-w-2xl">
                                                                <Flex align="center" gap={3} className="mb-1">
                                                                    <Text weight="black" className={`text-sm transition-colors ${isAllowed ? 'text-primary' : 'text-gray-900'}`}>
                                                                        {perm.name}
                                                                    </Text>
                                                                    {isAllowed && (
                                                                        <Inline className="px-2 py-0.5 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-md">
                                                                            Active
                                                                        </Inline>
                                                                    )}
                                                                </Flex>
                                                                <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">
                                                                    {perm.description}
                                                                </Text>
                                                                <Flex align="center" gap={2} className="mt-3">
                                                                    <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest">Effect:</Text>
                                                                    <Text size="xs" weight="bold" className={`${isAllowed ? 'text-primary' : 'text-gray-600'}`}>
                                                                        {perm.effect}
                                                                    </Text>
                                                                </Flex>
                                                            </Block>

                                                            <Block className={`w-14 h-8 rounded-full transition-all relative flex items-center px-1 flex-shrink-0 ${isAllowed ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-gray-200'
                                                                }`}>
                                                                <AnimatedBlock
                                                                    initial={false}
                                                                    animate={{ x: isAllowed ? 24 : 0 }}
                                                                    className="w-6 h-6 bg-white rounded-full shadow-sm"
                                                                />
                                                            </Block>
                                                        </Flex>
                                                    </Block>
                                                </AnimatedBlock>
                                            );
                                        })}
                                    </AnimatePresence>
                                </Block>
                            </Block>
                        );
                    })
                ) : (
                    <Block className="p-12 text-center bg-gray-50 rounded-[2rem] border border-dashed border-gray-200">
                        <Text color="text-gray-400" weight="medium">No accounts found matching "{searchQuery}"</Text>
                    </Block>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <Flex justify="between" align="center" className="pt-4 px-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={goToPrevPage}
                            disabled={currentPage === 1}
                            className="text-gray-500 font-bold disabled:opacity-30"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" />
                            Previous
                        </Button>
                        <Text size="sm" weight="bold" color="text-gray-400">
                            Page {currentPage} of {totalPages}
                        </Text>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="text-gray-500 font-bold disabled:opacity-30"
                        >
                            Next
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Flex>
                )}
            </Block>
        </Block>
    );
};
