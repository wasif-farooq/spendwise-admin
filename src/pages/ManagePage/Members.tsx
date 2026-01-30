import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Block, Flex, AnimatedBlock } from '@shared';

import { MembersHeader } from '@/views/Manage/Members/MembersHeader';
import { MembersTable } from '@/views/Manage/Members/MembersTable';
import { MembersFilterDrawer } from '@/views/Manage/Members/MembersFilterDrawer';
import { RemoveMemberModal } from '@/views/Manage/Members/RemoveMemberModal';
import type { Member, MemberFilters } from '@/views/Manage/Members/types';
import mockData from '@/data/mockData.json';

const Members = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removingMember, setRemovingMember] = useState<Member | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Check for success feedback from navigation
    useEffect(() => {
        if (location.state?.invitationSent && location.state?.email) {
            setFeedback({ type: 'success', message: `Invitation sent to ${location.state.email}!` });
            window.history.replaceState({}, document.title);
            setTimeout(() => setFeedback(null), 3000);
        }
    }, [location]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Use centralized mock data (in real app, this would be fetched)
    const [members, setMembers] = useState<Member[]>(mockData.members);

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<MemberFilters>({
        roles: [],
        statuses: [],
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

    const handleInviteClick = () => {
        navigate('invite');
    };

    const handleRemoveMember = () => {
        if (!removingMember) return;
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            setMembers(prev => prev.filter(m => m.id !== removingMember.id));
            setIsProcessing(false);
            setIsRemoveModalOpen(false);
            setRemovingMember(null);
        }, 1000);
    };

    const openRemoveModal = (member: Member) => {
        setRemovingMember(member);
        setIsRemoveModalOpen(true);
    };

    const clearFilters = () => {
        setFilters({ roles: [], statuses: [], startDate: '', endDate: '' });
    };

    const activeFilterCount = filters.roles.length + filters.statuses.length + (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0);

    return (
        <Block className="space-y-6">
            {/* Feedback Message */}
            {feedback && (
                <AnimatedBlock
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 rounded-xl border ${feedback.type === 'success'
                        ? 'bg-green-50 border-green-100 text-green-700'
                        : 'bg-red-50 border-red-100 text-red-700'
                        }`}
                >
                    <Flex align="center" gap={3}>
                        <Block className={`w-2 h-2 rounded-full ${feedback.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="font-bold">{feedback.message}</span>
                    </Flex>
                </AnimatedBlock>
            )}

            <MembersHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeFilterCount={activeFilterCount}
                onOpenFilter={() => setIsFilterDrawerOpen(true)}
                onOpenInvite={handleInviteClick}
            />

            <MembersTable
                paginatedMembers={paginatedMembers}
                filteredMembersCount={filteredMembers.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                onOpenRemove={openRemoveModal}
                clearFilters={clearFilters}
            />

            <MembersFilterDrawer
                isOpen={isFilterDrawerOpen}
                onClose={() => setIsFilterDrawerOpen(false)}
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearFilters}
            />

            <RemoveMemberModal
                isOpen={isRemoveModalOpen}
                onClose={() => setIsRemoveModalOpen(false)}
                onConfirm={handleRemoveMember}
                member={removingMember}
                isProcessing={isProcessing}
            />
        </Block>
    );
};

export default Members;
