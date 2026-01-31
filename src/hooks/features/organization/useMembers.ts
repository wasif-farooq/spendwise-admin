import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Member, MemberFilters } from '@/views/Manage/Members/types';
import mockData from '@/data/mockData.json';
import { usePagination } from '@/hooks/usePagination';
import { useModal } from '@/hooks/useModal';
import { useToggle } from '@/hooks/useToggle';

export const useMembers = () => {
    const filterDrawer = useToggle(false);
    const removeModal = useModal<Member>();
    const isProcessing = useToggle(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const location = useLocation();

    // Pagination/Data Source state
    const itemsPerPage = 5;
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

    // Check for success feedback from navigation
    useEffect(() => {
        const state = location.state as { invitationSent?: boolean; email?: string } | null;
        if (state?.invitationSent && state?.email) {
            setFeedback({ type: 'success', message: `Invitation sent to ${state.email}!` });
            window.history.replaceState({}, document.title);
            setTimeout(() => setFeedback(null), 3000);
        }
    }, [location]);

    const {
        paginatedData: paginatedMembers,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems: filteredMembersCount
    } = usePagination(filteredMembers, { itemsPerPage });

    const confirmRemoveMember = () => {
        if (!removeModal.data) return;
        isProcessing.setTrue();
        // Simulate API call
        setTimeout(() => {
            setMembers(prev => prev.filter(m => m.id !== removeModal.data?.id));
            isProcessing.setFalse();
            removeModal.close();
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
        filteredMembersCount,
        itemsPerPage,
        isRemoveModalOpen: removeModal.isOpen,
        openRemoveModal: removeModal.open,
        closeRemoveModal: removeModal.close,
        removingMember: removeModal.data,
        confirmRemoveMember,
        isProcessing: isProcessing.value,
        feedback,
        setFeedback,
        isFilterDrawerOpen: filterDrawer.value,
        setIsFilterDrawerOpen: filterDrawer.setValue,
        clearFilters,
        activeFilterCount
    };
};
