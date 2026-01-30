import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, RotateCcw } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button } from '@ui';
import type { MemberFilters } from './types';
import { useRef } from 'react';

interface MembersFilterDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    filters: MemberFilters;
    setFilters: React.Dispatch<React.SetStateAction<MemberFilters>>;
    clearFilters: () => void;
}

export const MembersFilterDrawer = ({
    isOpen,
    onClose,
    filters,
    setFilters,
    clearFilters
}: MembersFilterDrawerProps) => {
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    const toggleFilter = (type: 'roles' | 'statuses', value: string) => {
        setFilters(prev => {
            const current = (prev[type] as string[]);
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: next };
        });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select Date';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
                            {/* Role Filter */}
                            <Block className="space-y-4">
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Filter by Role</Text>
                                <Flex gap={3} className="flex-wrap">
                                    {['Admin', 'Member', 'Viewer'].map(role => (
                                        <Button
                                            key={role}
                                            variant="ghost"
                                            onClick={() => toggleFilter('roles', role)}
                                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 h-auto ${filters.roles.includes(role)
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                }`}
                                        >
                                            {role}
                                        </Button>
                                    ))}
                                </Flex>
                            </Block>

                            {/* Status Filter */}
                            <Block className="space-y-4">
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Filter by Status</Text>
                                <Flex gap={3} className="flex-wrap">
                                    {['Active', 'Pending'].map(status => (
                                        <Button
                                            key={status}
                                            variant="ghost"
                                            onClick={() => toggleFilter('statuses', status)}
                                            className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 h-auto ${filters.statuses.includes(status)
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                }`}
                                        >
                                            {status}
                                        </Button>
                                    ))}
                                </Flex>
                            </Block>

                            {/* Date Range */}
                            <Block className="space-y-4">
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Join Date</Text>
                                <Grid cols={2} gap={4}>
                                    <Block
                                        onClick={() => startDateRef.current?.showPicker()}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${filters.startDate ? 'border-primary bg-primary/5' : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                                            }`}
                                    >
                                        <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">From</Text>
                                        <Flex align="center" justify="between" className="mt-1">
                                            <Text size="sm" weight="bold" className={filters.startDate ? 'text-primary' : 'text-gray-900'}>
                                                {formatDate(filters.startDate)}
                                            </Text>
                                            <Calendar className={`h-4 w-4 ${filters.startDate ? 'text-primary' : 'text-gray-400'}`} />
                                        </Flex>
                                        <input
                                            ref={startDateRef}
                                            type="date"
                                            className="sr-only"
                                            value={filters.startDate}
                                            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                                        />
                                    </Block>
                                    <Block
                                        onClick={() => endDateRef.current?.showPicker()}
                                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${filters.endDate ? 'border-primary bg-primary/5' : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                                            }`}
                                    >
                                        <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">To</Text>
                                        <Flex align="center" justify="between" className="mt-1">
                                            <Text size="sm" weight="bold" className={filters.endDate ? 'text-primary' : 'text-gray-900'}>
                                                {formatDate(filters.endDate)}
                                            </Text>
                                            <Calendar className={`h-4 w-4 ${filters.endDate ? 'text-primary' : 'text-gray-400'}`} />
                                        </Flex>
                                        <input
                                            ref={endDateRef}
                                            type="date"
                                            className="sr-only"
                                            value={filters.endDate}
                                            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                                        />
                                    </Block>
                                </Grid>
                            </Block>
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
