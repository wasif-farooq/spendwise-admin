import { motion } from 'framer-motion';
import { Edit2, Trash2, Lock, Shield, Layout, Zap, Users, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Button } from '@ui';
import type { Role } from './types';

interface RolesGridProps {
    paginatedRoles: Role[];
    filteredRolesCount: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    onEditRole: (id: number) => void;
    onOpenDelete: (role: Role) => void;
    clearFilters: () => void;
}

export const RolesGrid = ({
    paginatedRoles,
    filteredRolesCount,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    onEditRole,
    onOpenDelete,
    clearFilters
}: RolesGridProps) => {

    const getResourceIcon = (resId: string) => {
        switch (resId) {
            case 'dashboard': return Layout;
            case 'transactions': return Zap;
            case 'members': return Users;
            case 'roles': return Lock;
            case 'billing': return CreditCard;
            default: return Shield;
        }
    };

    return (
        <Block className="space-y-10">
            <Grid cols={1} gap={8} className="md:grid-cols-2 xl:grid-cols-3">
                {paginatedRoles.length > 0 ? (
                    paginatedRoles.map((role) => (
                        <Block
                            as={motion.div}
                            key={role.id}
                            layout
                            whileHover={{ y: -8 }}
                            className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden group flex flex-col"
                        >
                            {/* Card Header */}
                            <Block className="p-8 pb-4 relative overflow-hidden">
                                <Block className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${role.color} opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`} />

                                <Flex align="start" justify="between" className="relative z-10">
                                    <Block className={`p-4 rounded-2xl bg-gradient-to-br ${role.color} text-white shadow-lg shadow-black/5`}>
                                        <role.icon className="h-7 w-7" />
                                    </Block>
                                    <Flex align="center" gap={2}>
                                        <Button
                                            variant="ghost"
                                            onClick={() => onEditRole(role.id)}
                                            disabled={role.isDefault}
                                            className={`p-2.5 rounded-xl transition-all h-auto ${role.isDefault
                                                ? 'text-gray-200 cursor-not-allowed'
                                                : 'text-gray-400 hover:bg-gray-100 hover:text-primary'
                                                }`}
                                        >
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => onOpenDelete(role)}
                                            disabled={role.isDefault}
                                            className={`p-2.5 rounded-xl transition-all h-auto ${role.isDefault
                                                ? 'text-gray-200 cursor-not-allowed'
                                                : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                }`}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </Flex>
                                </Flex>

                                <Block className="mt-6 relative z-10">
                                    <Flex align="center" gap={2}>
                                        <Heading as="h3" size="sm" weight="black" className="text-xl tracking-tight text-gray-900">{role.name}</Heading>
                                        {role.isDefault && (
                                            <Text
                                                as="span"
                                                weight="black"
                                                className="px-2 py-0.5 bg-gray-900 text-white text-[9px] uppercase tracking-widest rounded-md flex items-center"
                                            >
                                                <Lock className="h-2.5 w-2.5 mr-1" />
                                                System
                                            </Text>
                                        )}
                                    </Flex>
                                    <Text color="text-gray-500" weight="medium" size="sm" className="mt-1 line-clamp-2 min-h-[40px]">
                                        {role.description}
                                    </Text>
                                </Block>
                            </Block>

                            {/* Permission Summary */}
                            <Block className="px-8 py-6 flex-grow">
                                <Block className="space-y-4">
                                    <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Permission Summary</Text>
                                    <Flex gap={2} className="flex-wrap">
                                        {Object.entries(role.permissions).map(([resId, perms]: [string, any]) => {
                                            const Icon = getResourceIcon(resId);
                                            return (
                                                <Flex key={resId} align="center" className="bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 group/perm hover:bg-white hover:border-primary/20 transition-colors">
                                                    <Icon className="h-3 w-3 text-gray-400 group-hover/perm:text-primary transition-colors mr-2" />
                                                    <Text size="xs" weight="bold" className="text-gray-600 capitalize">{resId}</Text>
                                                    <Text as="span" size="xs" weight="black" className="ml-1.5 text-primary">
                                                        {perms.length}
                                                    </Text>
                                                </Flex>
                                            );
                                        })}
                                    </Flex>
                                </Block>
                            </Block>

                            {/* Card Footer */}
                            <Flex align="center" justify="between" className="px-8 py-6 bg-gray-50/50 border-t border-gray-100">
                                <Flex align="center" className="-space-x-2">
                                    {[...Array(3)].map((_, i) => (
                                        <Block key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/150?u=${role.id + i}`} alt="User" className="w-full h-full object-cover" />
                                        </Block>
                                    ))}
                                    <Block className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                                        +12
                                    </Block>
                                </Flex>
                                <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">
                                    {Object.values(role.permissions).flat().length} Total Rules
                                </Text>
                            </Flex>
                        </Block>
                    ))
                ) : (
                    <Block className="col-span-full py-20 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                        <Block className="p-4 bg-gray-50 rounded-3xl">
                            <Shield className="h-8 w-8 text-gray-300" />
                        </Block>
                        <Block className="text-center">
                            <Heading weight="black" className="text-lg text-gray-900">No roles found</Heading>
                            <Text size="sm" color="text-gray-500" weight="medium">Try adjusting your search or filters.</Text>
                        </Block>
                        <Button
                            variant="ghost"
                            onClick={clearFilters}
                            className="text-primary font-black text-sm hover:underline p-0 h-auto"
                        >
                            Clear all filters
                        </Button>
                    </Block>
                )}
            </Grid>

            {/* Pagination UI */}
            <Flex align="center" justify="between" className="px-8 py-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                <Text size="sm" color="text-gray-500" weight="medium">
                    Showing <Text as="span" weight="bold" className="text-gray-900">{filteredRolesCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</Text> to <Text as="span" weight="bold" className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredRolesCount)}</Text> of <Text as="span" weight="bold" className="text-gray-900">{filteredRolesCount}</Text> roles
                </Text>
                <Flex align="center" gap={2}>
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-3 rounded-2xl border border-gray-100 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-auto"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                        <Button
                            key={i}
                            variant="ghost"
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-11 h-11 rounded-2xl text-sm font-black transition-all p-0 ${currentPage === i + 1
                                ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary'
                                : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-50'
                                }`}
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-3 rounded-2xl border border-gray-100 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-auto"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </Button>
                </Flex>
            </Flex>
        </Block>
    );
};
