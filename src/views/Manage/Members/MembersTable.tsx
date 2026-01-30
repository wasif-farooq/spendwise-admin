import { Shield, CheckCircle2, Clock, Edit2, UserMinus, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import type { Member } from './types';

interface MembersTableProps {
    paginatedMembers: Member[];
    filteredMembersCount: number;
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    onOpenRemove: (member: Member) => void;
    clearFilters: () => void;
}

export const MembersTable = ({
    paginatedMembers,
    filteredMembersCount,
    currentPage,
    itemsPerPage,
    totalPages,
    setCurrentPage,
    onOpenRemove,
    clearFilters
}: MembersTableProps) => {
    return (
        <Block className="bg-gray-50/50 rounded-[3rem] border border-gray-100 overflow-hidden">
            <Block className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200/60">
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Member</th>
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Role</th>
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {paginatedMembers.length > 0 ? (
                            paginatedMembers.map((member) => (
                                <tr key={member.id} className="group hover:bg-white transition-colors">
                                    <td className="px-8 py-6">
                                        <Flex align="center">
                                            <Block className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg mr-4 border border-primary/20">
                                                {member.name.charAt(0)}
                                            </Block>
                                            <Block>
                                                <Text weight="bold" className="text-gray-900 flex items-center">
                                                    {member.name}
                                                    {member.isCurrentUser && (
                                                        <Text
                                                            as="span"
                                                            weight="black"
                                                            className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-[10px] uppercase tracking-wider rounded-md"
                                                        >
                                                            You
                                                        </Text>
                                                    )}
                                                </Text>
                                                <Text size="sm" color="text-gray-500" weight="medium">{member.email}</Text>
                                            </Block>
                                        </Flex>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Flex align="center">
                                            <Block className={`p-1.5 rounded-lg mr-2 ${member.role === 'Admin' ? 'bg-purple-100 text-purple-600' :
                                                member.role === 'Member' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                <Shield className="h-3.5 w-3.5" />
                                            </Block>
                                            <Text size="sm" weight="bold" className="text-gray-700">{member.role}</Text>
                                        </Flex>
                                    </td>
                                    <td className="px-8 py-6">
                                        <Flex align="center">
                                            {member.status === 'Active' ? (
                                                <Text
                                                    as="span"
                                                    weight="black"
                                                    className="flex items-center text-xs text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100"
                                                >
                                                    <CheckCircle2 className="h-3 w-3 mr-1.5" />
                                                    Active
                                                </Text>
                                            ) : (
                                                <Text
                                                    as="span"
                                                    weight="black"
                                                    className="flex items-center text-xs text-amber-600 uppercase tracking-widest bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100"
                                                >
                                                    <Clock className="h-3 w-3 mr-1.5" />
                                                    Pending
                                                </Text>
                                            )}
                                        </Flex>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <Flex align="center" justify="end" gap={2}>
                                            <button
                                                disabled={member.isCurrentUser}
                                                className={`p-2 rounded-xl transition-all ${member.isCurrentUser
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-400 hover:bg-gray-100 hover:text-primary'
                                                    }`}
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => onOpenRemove(member)}
                                                disabled={member.isCurrentUser}
                                                className={`p-2 rounded-xl transition-all ${member.isCurrentUser
                                                    ? 'text-gray-300 cursor-not-allowed'
                                                    : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                            >
                                                <UserMinus className="h-5 w-5" />
                                            </button>
                                        </Flex>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-8 py-20 text-center">
                                    <Flex direction="col" align="center" justify="center" gap={4}>
                                        <Block className="p-4 bg-gray-50 rounded-3xl">
                                            <Users className="h-8 w-8 text-gray-300" />
                                        </Block>
                                        <Block>
                                            <Heading weight="black" className="text-lg text-gray-900">No members found</Heading>
                                            <Text size="sm" color="text-gray-500" weight="medium">Try adjusting your search or filters.</Text>
                                        </Block>
                                        <button
                                            onClick={clearFilters}
                                            className="text-primary font-black text-sm hover:underline"
                                        >
                                            Clear all filters
                                        </button>
                                    </Flex>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Block>

            {/* Pagination UI */}
            <Flex align="center" justify="between" className="px-8 py-6 border-t border-gray-100 bg-white/50">
                <Text size="sm" color="text-gray-500" weight="medium">
                    Showing <Text as="span" weight="bold" className="text-gray-900">{filteredMembersCount > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</Text> to <Text as="span" weight="bold" className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredMembersCount)}</Text> of <Text as="span" weight="bold" className="text-gray-900">{filteredMembersCount}</Text> members
                </Text>
                <Flex align="center" gap={2}>
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${currentPage === i + 1
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-xl border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </Flex>
            </Flex>
        </Block>
    );
};
