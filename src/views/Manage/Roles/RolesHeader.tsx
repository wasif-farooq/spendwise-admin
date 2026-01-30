import { Plus, Filter } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Input } from '@ui';

interface RolesHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeFilterCount: number;
    onOpenFilter: () => void;
    onCreateRole: () => void;
}

export const RolesHeader = ({
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    onOpenFilter,
    onCreateRole
}: RolesHeaderProps) => {
    return (
        <Flex as="header" direction="col" justify="between" gap={6} className="lg:flex-row lg:items-center">
            <Block>
                <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">Roles & Permissions</Heading>
                <Text color="text-gray-500" weight="medium" className="mt-1">Define granular access for your team members.</Text>
            </Block>
            <Flex direction="col" gap={4} className="sm:flex-row sm:items-center">
                <Flex align="center" gap={2}>
                    <Block className="relative group flex-grow sm:flex-grow-0">
                        <Input
                            placeholder="Search roles..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pl-12 w-full sm:w-64 font-bold"
                        />
                        <Block className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Block>
                    </Block>
                    <Block
                        as="button"
                        onClick={onOpenFilter}
                        className={`p-4 rounded-2xl border transition-all relative ${activeFilterCount > 0
                            ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/10'
                            : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        <Filter className="h-6 w-6" />
                        {activeFilterCount > 0 && (
                            <Text
                                as="span"
                                weight="black"
                                className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white"
                            >
                                {activeFilterCount}
                            </Text>
                        )}
                    </Block>
                </Flex>
                <Button
                    onClick={onCreateRole}
                    className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center font-black"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Create Custom Role
                </Button>
            </Flex>
        </Flex>
    );
};
