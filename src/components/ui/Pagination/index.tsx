import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import Button from '../Button';
import { Flex, Text, Block } from '@shared';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        if (startPage > 1) {
            pages.push(
                <Button
                    key={1}
                    variant={currentPage === 1 ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(1)}
                    className="w-9 h-9 p-0 rounded-xl"
                >
                    1
                </Button>
            );
            if (startPage > 2) {
                pages.push(
                    <Flex key="ellipsis-start" align="center" justify="center" className="w-9 h-9 text-gray-400">
                        <MoreHorizontal size={14} />
                    </Flex>
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(i)}
                    className={cn(
                        "w-9 h-9 p-0 rounded-xl transition-all duration-200",
                        currentPage === i ? "shadow-lg shadow-primary/20 scale-110" : "hover:bg-gray-100"
                    )}
                >
                    {i}
                </Button>
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <Flex key="ellipsis-end" align="center" justify="center" className="w-9 h-9 text-gray-400">
                        <MoreHorizontal size={14} />
                    </Flex>
                );
            }
            pages.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    className="w-9 h-9 p-0 rounded-xl"
                >
                    {totalPages}
                </Button>
            );
        }

        return pages;
    };

    return (
        <Flex
            as="nav"
            align="center"
            justify="between"
            className={cn("mt-6 px-2", className)}
        >
            <Block className="hidden sm:block">
                <Text className="text-sm text-gray-500">
                    Page <span className="font-semibold text-gray-900">{currentPage}</span> of <span className="font-semibold text-gray-900">{totalPages}</span>
                </Text>
            </Block>

            <Flex align="center" gap={1.5}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl px-2"
                >
                    <ChevronLeft size={18} className="mr-1" />
                    <span className="hidden xs:inline">Prev</span>
                </Button>

                <Flex align="center" gap={1} className="mx-1">
                    {renderPageNumbers()}
                </Flex>

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl px-2"
                >
                    <span className="hidden xs:inline">Next</span>
                    <ChevronRight size={18} className="ml-1" />
                </Button>
            </Flex>
        </Flex>
    );
};

export default Pagination;
