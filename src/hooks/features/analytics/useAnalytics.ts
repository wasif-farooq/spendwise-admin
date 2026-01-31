import { useState } from 'react';

export const useAnalytics = () => {
    const [timeRange, setTimeRange] = useState('Last 30 Days');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const handleTimeRangeClick = () => {
        // In a real app, this might open a dropdown or date picker
        console.log('Time range clicked');
    };

    const handleFilterClick = () => {
        setIsFilterModalOpen(true);
        console.log('Filter clicked');
    };

    return {
        timeRange,
        setTimeRange,
        isFilterModalOpen,
        setIsFilterModalOpen,
        handleTimeRangeClick,
        handleFilterClick
    };
};
