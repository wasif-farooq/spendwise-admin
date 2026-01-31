import mockData from '@/data/mockData.json';

export const useBilling = () => {
    // In a real application, we would fetch this data from an API
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // For now, we are using the mock data directly, but wrapping it in a hook
    // allows us to easily swap this out for a real API call later without
    // changing the component.
    const currentPlan = mockData.billing.currentPlan;
    const paymentMethods = mockData.billing.paymentMethods;
    const billingHistory = mockData.billing.history;

    return {
        currentPlan,
        paymentMethods,
        billingHistory,
        // loading, 
        // error
    };
};
