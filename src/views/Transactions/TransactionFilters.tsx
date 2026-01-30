import { Search } from 'lucide-react';
import { Block, Flex } from '@shared';

interface TransactionFiltersProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}

export const TransactionFilters = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories
}: TransactionFiltersProps) => {
    return (
        <Flex direction="col" align="center" gap={4} className="lg:flex-row">
            <Block className="relative flex-1 group w-full">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-white border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-primary/10 focus:border-primary font-bold text-gray-900 placeholder:text-gray-400 transition-all shadow-sm"
                />
            </Block>
            <Flex gap={2} className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-6 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm ${selectedCategory === cat
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'bg-white border border-gray-100 text-gray-500 hover:bg-gray-50'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </Flex>
        </Flex>
    );
};
