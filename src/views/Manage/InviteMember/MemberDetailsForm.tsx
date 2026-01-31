import { useSearch } from '@/hooks/useSearch';
import { usePagination } from '@/hooks/usePagination';
import { Block, Flex, Heading, Text, Grid } from '@shared';
import { Input, Button } from '@ui';
import { User, Shield, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import mockData from '@/data/mockData.json';

interface MemberDetailsFormProps {
    email: string;
    setEmail: (email: string) => void;
    selectedRoles: string[];
    toggleRole: (roleName: string) => void;
    isEditing?: boolean;
}

export const MemberDetailsForm = ({
    email,
    setEmail,
    selectedRoles,
    toggleRole,
    isEditing = false
}: MemberDetailsFormProps) => {
    const roles = mockData.roles;
    const { searchQuery: roleSearchQuery, setSearchQuery: setRoleSearchQuery, filteredData: searchedRoles } = useSearch(roles, ['name']);
    const {
        paginatedData: paginatedRoles,
        currentPage: currentRolePage,
        totalPages: totalRolePages,
        setCurrentPage: setRolePage
    } = usePagination(searchedRoles, { itemsPerPage: 3 });

    const goToPrevPage = () => setRolePage(p => p - 1);
    const goToNextPage = () => setRolePage(p => p + 1);

    return (
        <Block className="lg:col-span-1 space-y-8">
            <Block className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                <Flex align="center" gap={3} className="mb-2">
                    <Block className="bg-primary/10 p-2 rounded-xl">
                        <User className="h-5 w-5 text-primary" />
                    </Block>
                    <Heading as="h3" weight="black" className="text-xl text-gray-900">Member Details</Heading>
                </Flex>

                {isEditing ? (
                    <Block>
                        <Text size="xs" weight="black" color="text-gray-400" className="uppercase tracking-widest mb-2">Email Address</Text>
                        <Text weight="bold" size="lg" className="text-gray-900 bg-gray-50 px-4 py-3 rounded-2xl border border-transparent">
                            {email}
                        </Text>
                    </Block>
                ) : (
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="colleague@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                        required
                    />
                )}

                <Block className="space-y-4">
                    <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest px-1 text-gray-400">
                        Assign Roles
                    </Heading>

                    {/* Role Search */}
                    <Block className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
                        <Input
                            type="text"
                            placeholder="Find role..."
                            value={roleSearchQuery}
                            onChange={(e) => setRoleSearchQuery(e.target.value)}
                            className="pl-9 pr-3 py-2.5 text-sm rounded-xl bg-gray-50 border-transparent focus:bg-white focus:border-primary/20 focus:ring-primary/10 transition-all font-medium placeholder:text-gray-400"
                        />
                    </Block>

                    <Grid cols={1} gap={3}>
                        {paginatedRoles.length > 0 ? (
                            paginatedRoles.map((role: any) => {
                                const isSelected = selectedRoles.includes(role.name.toLowerCase());
                                return (
                                    <Block
                                        as="button"
                                        key={role.id}
                                        type="button"
                                        onClick={() => toggleRole(role.name)}
                                        className={`p-4 rounded-2xl border-2 transition-all text-left flex items-start gap-4 ${isSelected
                                            ? 'border-primary bg-primary/5 ring-4 ring-primary/10'
                                            : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-gray-100/50'
                                            }`}
                                    >
                                        <Block className={`p-2 rounded-xl flex-shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-white text-gray-400 shadow-sm'}`}>
                                            <Shield className="w-5 h-5" />
                                        </Block>
                                        <Block>
                                            <Text weight="black" size="md" color={isSelected ? 'text-primary' : 'text-gray-700'}>
                                                {role.name}
                                            </Text>
                                            <Text size="xs" color="text-gray-500" className="mt-0.5 line-clamp-2 leading-relaxed">
                                                {role.description}
                                            </Text>
                                        </Block>
                                    </Block>
                                );
                            })
                        ) : (
                            <Block className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                                <Text size="xs" color="text-gray-400" weight="medium">No roles found.</Text>
                            </Block>
                        )}
                    </Grid>

                    {/* Role Pagination */}
                    {totalRolePages > 1 && (
                        <Flex justify="between" align="center" className="pt-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={goToPrevPage}
                                disabled={currentRolePage === 1}
                                className="h-8 w-8 p-0 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            <Text size="xs" weight="bold" color="text-gray-400">
                                {currentRolePage} / {totalRolePages}
                            </Text>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={goToNextPage}
                                disabled={currentRolePage === totalRolePages}
                                className="h-8 w-8 p-0 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </Flex>
                    )}
                </Block>

                <Flex align="start" gap={4} className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
                    <Block className="bg-amber-100 p-2 rounded-xl">
                        <AlertCircle className="h-5 w-5 text-amber-600" />
                    </Block>
                    <Block>
                        <Text size="xs" weight="black" className="uppercase tracking-widest text-amber-900">Role Impact</Text>
                        <Text size="xs" weight="bold" color="text-amber-700" className="mt-1 leading-relaxed">
                            Roles grant default permissions. Disabling accounts on the right only restricts access for that specific account.
                        </Text>
                    </Block>
                </Flex>
            </Block>
        </Block >
    );
};
