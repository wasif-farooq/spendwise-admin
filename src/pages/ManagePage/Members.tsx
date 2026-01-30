import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { Block } from '@shared';

import { MembersHeader } from '@/views/Manage/Members/MembersHeader';
import { MembersTable } from '@/views/Manage/Members/MembersTable';
import { MembersFilterDrawer } from '@/views/Manage/Members/MembersFilterDrawer';
import { InviteMemberModal } from '@/views/Manage/Members/InviteMemberModal';
import { RemoveMemberModal } from '@/views/Manage/Members/RemoveMemberModal';
import type { Member, MemberFilters } from '@/views/Manage/Members/types';

const Members = () => {
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removingMember, setRemovingMember] = useState<Member | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('member');
    const [isInviting, setIsInviting] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Mock data for members
    const [members, setMembers] = useState<Member[]>([
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
        setSearchQuery('');
    };

    const activeFilterCount = filters.roles.length + filters.statuses.length + (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0);

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <MembersHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                activeFilterCount={activeFilterCount}
                onOpenFilter={() => setIsFilterDrawerOpen(true)}
                onOpenInvite={() => setIsInviteModalOpen(true)}
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

            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                handleInvite={handleInvite}
                inviteEmail={inviteEmail}
                setInviteEmail={setInviteEmail}
                inviteRole={inviteRole}
                setInviteRole={setInviteRole}
                isInviting={isInviting}
                feedback={feedback}
            />
        </Block>
    );
};

export default Members;
