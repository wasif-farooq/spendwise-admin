import { useAppSelector } from '@/store/redux';
import { selectHasAIAdvisorAccess } from '@/store/slices/subscriptionSlice';

export const useAIAdvisorAccess = () => {
    const hasAccess = useAppSelector(selectHasAIAdvisorAccess);
    return { hasAccess };
};
