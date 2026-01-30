import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, Shield, UserMinus, Edit2, X, Check, ChevronLeft, ChevronRight, Users, Filter, RotateCcw, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { Button, Input, Modal } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';

const Members = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removingMember, setRemovingMember] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [isInviting, setIsInviting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock data for members
    const [members, setMembers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', joinedDate: '2023-10-01', isCurrentUser: true },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member', status: 'Active', joinedDate: '2023-11-15', isCurrentUser: false },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Viewer', status: 'Pending', joinedDate: '2024-01-10', isCurrentUser: false },
        { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Member', status: 'Active', joinedDate: '2023-12-05', isCurrentUser: false },
        { id: 5, name: 'Alex Brown', email: 'alex@example.com', role: 'Member', status: 'Active', joinedDate: '2023-09-20', isCurrentUser: false },
        { id: 6, name: 'David Miller', email: 'david@example.com', role: 'Viewer', status: 'Active', joinedDate: '2023-08-12', isCurrentUser: false },
        { id: 7, name: 'Emma Davis', email: 'emma@example.com', role: 'Member', status: 'Pending', joinedDate: '2024-01-25', isCurrentUser: false },
        { id: 8, name: 'Chris Evans', email: 'chris@example.com', role: 'Member', status: 'Active', joinedDate: '2023-11-20', isCurrentUser: false },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        roles: [] as string[],
        statuses: [] as string[],
        startDate: '',
        endDate: '',
    });

    // Filter members based on search query and advanced filters
    const filteredMembers = useMemo(() => {
        return members.filter(member => {
            const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.email.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRole = filters.roles.length === 0 || filters.roles.includes(member.role);
            const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(member.status);

            const memberDate = new Date(member.joinedDate);
            const matchesStartDate = !filters.startDate || memberDate >= new Date(filters.startDate);
            const matchesEndDate = !filters.endDate || memberDate <= new Date(filters.endDate);

            return matchesSearch && matchesRole && matchesStatus && matchesStartDate && matchesEndDate;
        });
    }, [members, searchQuery, filters]);

    // Pagination logic
    const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
    const paginatedMembers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredMembers.slice(start, start + itemsPerPage);
    }, [currentPage, filteredMembers]);

    // Reset to first page when searching or filtering
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, filters]);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        setIsInviting(true);
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsInviting(false);
            setFeedback({ type: 'success', message: `Invitation sent to ${inviteEmail}!` });
            setInviteEmail('');
            setTimeout(() => {
                setIsInviteModalOpen(false);
                setFeedback(null);
            }, 1500);
        }, 1500);
    };

    const handleRemoveMember = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setMembers(prev => prev.filter(m => m.id !== removingMember.id));
            setIsProcessing(false);
            setIsRemoveModalOpen(false);
            setRemovingMember(null);
        }, 1000);
    };

    const openRemoveModal = (member: any) => {
        setRemovingMember(member);
        setIsRemoveModalOpen(true);
    };

    const toggleFilter = (type: 'roles' | 'statuses', value: string) => {
        setFilters(prev => {
            const current = prev[type];
            const next = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: next };
        });
    };

    const clearFilters = () => {
        setFilters({ roles: [], statuses: [], startDate: '', endDate: '' });
        setSearchQuery('');
    };

    const activeFilterCount = filters.roles.length + filters.statuses.length + (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Select Date';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <Flex as="header" direction="col" justify="between" gap={6} className="lg:flex-row lg:items-center">
                <Block>
                    <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">Team Members</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">Manage your organization's members and their roles.</Text>
                </Block>
                <Flex direction="col" gap={4} className="sm:flex-row sm:items-center">
                    <Flex align="center" gap={2}>
                        <Block className="relative group flex-grow sm:flex-grow-0">
                            <Input
                                placeholder="Search members..."
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
                        onClick={() => setIsInviteModalOpen(true)}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center font-black"
                    >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Invite Member
                    </Button>
                </Flex>
            </Flex>

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
                                                    onClick={() => openRemoveModal(member)}
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
                        Showing <Text as="span" weight="bold" className="text-gray-900">{filteredMembers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</Text> to <Text as="span" weight="bold" className="text-gray-900">{Math.min(currentPage * itemsPerPage, filteredMembers.length)}</Text> of <Text as="span" weight="bold" className="text-gray-900">{filteredMembers.length}</Text> members
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
                                {/* Role Filter */}
                                <Block className="space-y-4">
                                    <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Filter by Role</Text>
                                    <Flex gap={3} className="flex-wrap">
                                        {['Admin', 'Member', 'Viewer'].map(role => (
                                            <button
                                                key={role}
                                                onClick={() => toggleFilter('roles', role)}
                                                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${filters.roles.includes(role)
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                    }`}
                                            >
                                                {role}
                                            </button>
                                        ))}
                                    </Flex>
                                </Block>

                                {/* Status Filter */}
                                <Block className="space-y-4">
                                    <Text size="xs" weight="black" className="uppercase tracking-widest text-gray-400">Filter by Status</Text>
                                    <Flex gap={3} className="flex-wrap">
                                        {['Active', 'Pending'].map(status => (
                                            <button
                                                key={status}
                                                onClick={() => toggleFilter('statuses', status)}
                                                className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all border-2 ${filters.statuses.includes(status)
                                                    ? 'border-primary bg-primary/5 text-primary'
                                                    : 'border-gray-50 bg-gray-50 text-gray-500 hover:border-gray-200'
                                                    }`}
                                            >
                                                {status}
                                            </button>
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

            {/* Remove Member Modal */}
            <Modal
                isOpen={isRemoveModalOpen}
                onClose={() => setIsRemoveModalOpen(false)}
                title="Remove from Organization"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                        <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-rose-900">Confirm Removal</Heading>
                            <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                                Are you sure you want to remove <Text as="span" weight="black">"{removingMember?.name}"</Text> from the organization? They will lose all access immediately.
                            </Text>
                        </Block>
                    </Flex>

                    <Text size="sm" weight="bold" className="text-gray-500 px-4">
                        This action will revoke their membership and permissions. You can invite them back later if needed.
                    </Text>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsRemoveModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRemoveMember}
                            disabled={isProcessing}
                            className="flex-grow py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-200 font-black"
                        >
                            {isProcessing ? 'Removing...' : 'Confirm Removal'}
                        </Button>
                    </Flex>
                </Block>
            </Modal>

            {/* Invite Modal */}
            <Modal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                title="Invite New Member"
            >
                <Block as="form" onSubmit={handleInvite} className="space-y-8">
                    <Block className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="colleague@example.com"
                            value={inviteEmail}
                            onChange={(e) => setInviteEmail(e.target.value)}
                            className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary font-bold"
                            required
                        />

                        <Block className="space-y-3">
                            <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest px-1 text-gray-900">Select Role</Heading>
                            <Grid cols={1} gap={4} className="sm:grid-cols-3">
                                {['Member', 'Admin', 'Viewer'].map((role) => (
                                    <button
                                        key={role}
                                        type="button"
                                        onClick={() => setInviteRole(role.toLowerCase())}
                                        className={`p-4 rounded-2xl border-2 transition-all text-sm font-bold ${inviteRole === role.toLowerCase()
                                            ? 'border-primary bg-primary/5 text-primary'
                                            : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-200'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </Grid>
                        </Block>
                    </Block>

                    <AnimatePresence>
                        {feedback && (
                            <Block
                                as={motion.div}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`p-4 rounded-2xl text-sm font-bold flex items-center ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {feedback.type === 'success' ? <Check className="h-4 w-4 mr-2" /> : <X className="h-4 w-4 mr-2" />}
                                {feedback.message}
                            </Block>
                        )}
                    </AnimatePresence>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4 border-t border-gray-100">
                        <Button
                            variant="outline"
                            type="button"
                            onClick={() => setIsInviteModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isInviting || !inviteEmail}
                            className="flex-grow py-4 rounded-2xl shadow-lg shadow-primary/20 font-black"
                        >
                            {isInviting ? 'Sending...' : 'Send Invitation'}
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </Block>
    );
};

export default Members;
