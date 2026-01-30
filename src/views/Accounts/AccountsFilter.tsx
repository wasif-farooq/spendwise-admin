import { Search } from 'lucide-react';
import { Block, Flex } from '@shared';

interface AccountsFilterProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const AccountsFilter = ({ searchQuery, onSearchChange }: AccountsFilterProps) => {
    return (
        <Flex direction="col" className="sm:flex-row" align="center" gap={4}>
            <Block className="relative flex-1 group w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search accounts by name or type..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all shadow-sm"
                />
            </Block>
            <Flex gap={2} className="w-full sm:w-auto">
                <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                    All Types
                </button>
                <button className="flex-1 sm:flex-none px-6 py-5 bg-white border border-gray-100 rounded-[2rem] font-black text-xs uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all shadow-sm">
                    Currency
                </button>
            </Flex>
        </Flex>
    );
};
