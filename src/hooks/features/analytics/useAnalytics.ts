import { useState } from 'react';

import { useModal } from '@/hooks/useModal';

export const useAnalytics = () => {
    const filterModal = useModal();
    const [timeRange, setTimeRange] = useState('Last 30 Days');

    const handleTimeRangeClick = () => {
        // In a real app, this might open a dropdown or date picker
        console.log('Time range clicked');
    };

    const handleFilterClick = () => {
        filterModal.open();
        console.log('Filter clicked');
    };

    return {
        timeRange,
        setTimeRange,
        isFilterModalOpen: filterModal.isOpen,
        setIsFilterModalOpen: (val: boolean) => val ? filterModal.open() : filterModal.close(),
        openFilterModal: filterModal.open,
        closeFilterModal: filterModal.close,
        handleTimeRangeClick,
        handleFilterClick
    };
};
