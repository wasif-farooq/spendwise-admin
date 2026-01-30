import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Plus, Trash2, Edit2, Lock, AlertTriangle, ChevronLeft, ChevronRight, Users, Layout, Zap, CreditCard, Eye, Filter, RotateCcw, X, Sparkles } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Modal } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';

const Roles = () => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [deletingRole, setDeletingRole] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const [roles, setRoles] = useState([
        {
            id: 1,
            name: 'Admin',
            description: 'Full access to all features and settings',
            isDefault: true,
            color: 'from-blue-500 to-indigo-600',
            icon: ShieldCheck,
            permissions: { dashboard: ['view'], transactions: ['view', 'create', 'edit', 'delete'], members: ['view', 'create', 'delete'], roles: ['view', 'create', 'edit', 'delete'], billing: ['view', 'edit'] }
        },
        {
            id: 2,
            name: 'Member',
            description: 'Standard access for team members',
            isDefault: false,
            color: 'from-emerald-500 to-teal-600',
            icon: Users,
            permissions: { dashboard: ['view'], transactions: ['view', 'create', 'edit'], members: ['view'] }
        },
        {
            id: 3,
            name: 'Viewer',
            description: 'Read-only access to dashboard and reports',
            isDefault: false,
            color: 'from-violet-500 to-purple-600',
            icon: Eye,
            permissions: { dashboard: ['view'], transactions: ['view'] }
        },
        {
            id: 4,
            name: 'Accountant',
            description: 'Manage financial records and billing',
            isDefault: false,
            color: 'from-amber-500 to-orange-600',
            icon: CreditCard,
            permissions: { dashboard: ['view'], transactions: ['view', 'create', 'edit', 'delete'], billing: ['view', 'edit'] }
        },
        {
            id: 5,
            name: 'Support',
            description: 'Manage members and view logs',
            isDefault: false,
            color: 'from-rose-500 to-pink-600',
            icon: Zap,
            permissions: { dashboard: ['view'], members: ['view', 'create'], transactions: ['view'] }
        },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        types: [] as string[],
        minPermissions: 0,
    });

    // Filter roles based on search query and advanced filters
    const filteredRoles = useMemo(() => {
        return roles.filter(role => {
            const matchesSearch = role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                role.description.toLowerCase().includes(searchQuery.toLowerCase());

            const isSystem = role.isDefault ? 'System' : 'Custom';
            const matchesType = filters.types.length === 0 || filters.types.includes(isSystem);

            const totalPerms = Object.values(role.permissions).flat().length;
            const matchesPermCount = totalPerms >= filters.minPermissions;

            return matchesSearch && matchesType && matchesPermCount;
        });
    }, [roles, searchQuery, filters]);

    // Pagination logic
    const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
    const paginatedRoles = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredRoles.slice(start, start + itemsPerPage);
    }, [currentPage, filteredRoles]);

    // Reset to first page when searching or filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters]);

    const handleDeleteRole = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setRoles(roles.filter(r => r.id !== deletingRole.id));
            setIsProcessing(false);
            setIsDeleteModalOpen(false);
            setDeletingRole(null);
        }, 1000);
    };

    const openDeleteModal = (role: any) => {
        setDeletingRole(role);
        setIsDeleteModalOpen(true);
    };

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

    const toggleFilter = (type: 'types', value: string) => {
        setFilters(prev => {
            const current = prev[type];
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: next };
        });
    };

    const clearFilters = () => {
        setFilters({ types: [], minPermissions: 0 });
        setSearchQuery('');
    };

    const activeFilterCount = filters.types.length + (filters.minPermissions > 0 ? 1 : 0);

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
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
                        <button
                            onClick={() => setIsFilterDrawerOpen(true)}
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
                        </button>
                    </Flex>
                    <Button
                        onClick={() => navigate('/manage/roles/new')}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center font-black"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        Create Custom Role
                    </Button>
                </Flex>
            </Flex>

            <Block className="space-y-10">
                <Grid cols={1} gap={8} className="md:grid-cols-2 xl:grid-cols-3">
                    {filteredRoles.length > 0 ? (
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
                                            <button
                                                onClick={() => navigate(`/manage/roles/${role.id}/edit`)}
                                                disabled={role.isDefault}
                                                className={`p-2.5 rounded-xl transition-all ${role.isDefault
                                                    ? 'text-gray-200 cursor-not-allowed'
                                                    : 'text-gray-400 hover:bg-gray-100 hover:text-primary'
                                                    }`}
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(role)}
                                                disabled={role.isDefault}
                                                className={`p-2.5 rounded-xl transition-all ${role.isDefault
                                                    ? 'text-gray-200 cursor-not-allowed'
                                                    : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
                                                    }`}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
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
                            <button
                                onClick={clearFilters}
                                className="text-primary font-black text-sm hover:underline"
                            >
                                Clear all filters
                            </button>
                        </Block>
                    )}
                </Grid>

                {/* Pagination UI */}
                <Flex align="center" justify="between" className="px-8 py-6 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <Text size="sm" color="text-gray-500" weight="medium">
                        Showing <Text as="span" weight="bold" className="text-gray-900">{filteredRoles.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</Text> to <Text as="span" weight="bold" className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredRoles.length)}</Text> of <Text as="span" weight="bold" className="text-gray-900">{filteredRoles.length}</Text> roles
                    </Text>
                    <Flex align="center" gap={2}>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-3 rounded-2xl border border-gray-100 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`w-11 h-11 rounded-2xl text-sm font-black transition-all ${currentPage === i + 1
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-2xl border border-gray-100 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </Flex>
                </Flex>
            </Block>

            {/* Filter Drawer */}
            <AnimatePresence>
                {isFilterDrawerOpen && (
                    <>
                        <Block
                            as={motion.div}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterDrawerOpen(false)}
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
                                <button
                                    onClick={() => setIsFilterDrawerOpen(false)}
                                    className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </Flex>

                            <Block className="flex-grow overflow-y-auto p-8 space-y-10">
                                {/* Role Type Filter */}
                                <Block className="space-y-4">
                                    <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Role Type</Text>
                                    <Flex gap={3} className="flex-wrap">
                                        {['System', 'Custom'].map(type => (
                                            <button
                                                key={type}
                                                onClick={() => toggleFilter('types', type)}
                                                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${filters.types.includes(type)
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                    }`}
                                            >
                                                {type}
                                            </button>
                                        ))}
                                    </Flex>
                                </Block>

                                {/* Permission Count Filter */}
                                <Block className="space-y-4">
                                    <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Min. Permissions</Text>
                                    <Block className="space-y-6">
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            step="1"
                                            value={filters.minPermissions}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minPermissions: parseInt(e.target.value) }))}
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
                                <button
                                    onClick={clearFilters}
                                    className="flex-grow py-4 rounded-2xl border-2 border-gray-200 text-gray-500 font-black text-sm flex items-center justify-center hover:bg-white transition-all"
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" />
                                    Reset
                                </button>
                                <Button
                                    onClick={() => setIsFilterDrawerOpen(false)}
                                    className="flex-grow py-4 rounded-2xl shadow-xl shadow-primary/20 font-black text-sm"
                                >
                                    Apply Filters
                                </Button>
                            </Flex>
                        </Block>
                    </>
                )}
            </AnimatePresence>

            {/* Delete Role Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Role"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                        <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-rose-900">Permanent Deletion</Heading>
                            <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                                Deleting the <Text as="span" weight="black">"{deletingRole?.name}"</Text> role will remove it from all assigned members. They will lose access to the associated permissions.
                            </Text>
                        </Block>
                    </Flex>

                    <Text size="sm" weight="bold" className="text-gray-500 px-4">
                        Are you sure you want to delete this role? This cannot be undone.
                    </Text>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteRole}
                            disabled={isProcessing}
                            className="flex-grow py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-200 font-black"
                        >
                            {isProcessing ? 'Deleting...' : 'Confirm Delete'}
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </Block>
    );
};

export default Roles;
