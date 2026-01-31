import { useNavigate } from 'react-router-dom';

import { Block, Flex, AnimatedBlock } from '@shared';

import { MembersHeader } from '@/views/Manage/Members/MembersHeader';
import { MembersTable } from '@/views/Manage/Members/MembersTable';
import { MembersFilterDrawer } from '@/views/Manage/Members/MembersFilterDrawer';
import { RemoveMemberModal } from '@/views/Manage/Members/RemoveMemberModal';
import { useMembers } from '@/hooks/features/organization/useMembers';

const Members = () => {
    const navigate = useNavigate();

    const {
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
        isRemoveModalOpen,
        closeRemoveModal,
        openRemoveModal,
        removingMember,
        confirmRemoveMember,
        isProcessing,
        feedback,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        clearFilters,
        activeFilterCount
    } = useMembers();

    const handleInviteClick = () => {
        navigate('invite');
    };


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
                filteredMembersCount={filteredMembersCount}
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
                onClose={closeRemoveModal}
                onConfirm={confirmRemoveMember}
                member={removingMember}
                isProcessing={isProcessing}
            />
        </Block>
    );
};

export default Members;
