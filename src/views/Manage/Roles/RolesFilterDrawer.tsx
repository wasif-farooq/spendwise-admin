import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Sparkles, RotateCcw } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button } from '@ui';
import type { RoleFilters } from './types';

interface RolesFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filters: RoleFilters;
    setFilters: React.Dispatch<React.SetStateAction<RoleFilters>>;
    clearFilters: () => void;
}

export const RolesFilterDrawer = ({
    isOpen,
    onClose,
    filters,
    setFilters,
    clearFilters
}: RolesFilterDrawerProps) => {

    const toggleFilter = (type: 'types', value: string) => {
        setFilters(prev => {
            const current = (prev[type] as string[]);
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: next };
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <Block
                        as={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[60]"
                    />
                    <Block
                        as={motion.div}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] overflow-hidden flex flex-col"
                    >
                        <Flex align="center" justify="between" className="p-8 border-b border-gray-100">
                            <Flex align="center" gap={3}>
                                <Block className="bg-primary/10 p-2 rounded-xl">
                                    <Filter className="h-5 w-5 text-primary" />
                                </Block>
                                <Heading as="h3" weight="black" className="text-xl text-gray-900">Advanced Filters</Heading>
                            </Flex>
                            <Button
                                variant="ghost"
                                onClick={onClose}
                                className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors h-auto"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </Flex>

                        <Block className="flex-grow overflow-y-auto p-8 space-y-10">
                            {/* Role Type Filter */}
                            <Block className="space-y-4">
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Role Type</Text>
                                <Flex gap={3} className="flex-wrap">
                                    {['System', 'Custom'].map(type => (
                                        <Button
                                            key={type}
                                            variant="ghost"
                                            onClick={() => toggleFilter('types', type)}
                                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 h-auto ${filters.types.includes(type)
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                }`}
                                        >
                                            {type}
                                        </Button>
                                    ))}
                                </Flex>
                            </Block>

                            {/* Permission Count Filter */}
                            <Block className="space-y-4">
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Min. Permissions</Text>
                                <Block className="space-y-6">
                                    <Block
                                        as="input"
                                        type="range"
                                        min="0"
                                        max="20"
                                        step="1"
                                        value={filters.minPermissions}
                                        onChange={(e: any) => setFilters(prev => ({ ...prev, minPermissions: parseInt(e.target.value) }))}
                                        className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <Flex align="center" justify="between">
                                        <Text size="xs" weight="bold" className="text-gray-400">0 Rules</Text>
                                        <Block className="bg-primary/10 px-4 py-2 rounded-xl border border-primary/20">
                                            <Text size="sm" weight="black" className="text-primary">{filters.minPermissions} Rules</Text>
                                        </Block>
                                        <Text size="xs" weight="bold" className="text-gray-400">20 Rules</Text>
                                    </Flex>
                                </Block>
                            </Block>

                            {/* Pro Tip */}
                            <Flex gap={4} className="bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
                                <Block className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20 flex-shrink-0">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </Block>
                                <Block>
                                    <Text size="xs" weight="black" className="text-primary uppercase tracking-widest">Pro Tip</Text>
                                    <Text size="xs" weight="bold" className="text-gray-500 mt-1 leading-relaxed">
                                        Use filters to quickly identify roles with excessive permissions or to find custom roles created by your team.
                                    </Text>
                                </Block>
                            </Flex>
                        </Block>

                        <Flex gap={4} className="p-8 border-t border-gray-100 bg-gray-50/50">
                            <Button
                                variant="ghost"
                                onClick={clearFilters}
                                className="flex-grow py-4 rounded-2xl border-2 border-gray-200 text-gray-500 font-black text-sm flex items-center justify-center hover:bg-white transition-all h-auto"
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                            <Button
                                onClick={onClose}
                                className="flex-grow py-4 rounded-2xl shadow-xl shadow-primary/20 font-black text-sm h-auto"
                            >
                                Apply Filters
                            </Button>
                        </Flex>
                    </Block>
                </>
            )}
        </AnimatePresence>
    );
};
