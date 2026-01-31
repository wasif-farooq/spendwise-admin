import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Member, MemberFilters } from '@/views/Manage/Members/types';
import mockData from '@/data/mockData.json';

export const useMembers = () => {
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
    const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
    const [removingMember, setRemovingMember] = useState<Member | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const location = useLocation();

    // Check for success feedback from navigation
    useEffect(() => {
        const state = location.state as { invitationSent?: boolean; email?: string } | null;
        if (state?.invitationSent && state?.email) {
            setFeedback({ type: 'success', message: `Invitation sent to ${state.email}!` });
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

    const openRemoveModal = (member: Member) => {
        setRemovingMember(member);
        setIsRemoveModalOpen(true);
    };

    const closeRemoveModal = () => {
        setIsRemoveModalOpen(false);
        setRemovingMember(null);
    };

    const confirmRemoveMember = () => {
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

    const clearFilters = () => {
        setFilters({ roles: [], statuses: [], startDate: '', endDate: '' });
        setSearchQuery(''); // Also clear search when clearing filters
    };

    const activeFilterCount = filters.roles.length + filters.statuses.length + (filters.startDate ? 1 : 0) + (filters.endDate ? 1 : 0);

    return {
        members,
        paginatedMembers,
        filters,
        setFilters,
        searchQuery,
        setSearchQuery,
        currentPage,
        setCurrentPage,
        totalPages,
        filteredMembersCount: filteredMembers.length,
        itemsPerPage, // Exposed so component knows
        isRemoveModalOpen,
        openRemoveModal,
        closeRemoveModal,
        removingMember,
        confirmRemoveMember,
        isProcessing,
        feedback,
        setFeedback,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        clearFilters,
        activeFilterCount
    };
};
