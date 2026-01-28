import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { toggleBillingCycle } from '../../../store/uiSlice';
import { PricingCard } from '../../../components/PricingCard';

export const Pricing = () => {
    const dispatch = useAppDispatch();
    const isYearly = useAppSelector((state) => state.ui.isYearlyBilling);

    const plans = [
        {
            name: 'Free Plan',
            price: '$0',
            period: 'month',
            description: 'Perfect for individuals just getting started.',
            features: [
                { text: '2 connected accounts', included: true },
                { text: 'Basic expense tracking', included: true },
                { text: '30-day history', included: true },
                { text: 'Team features', included: false },
                { text: 'Future scheduling', included: false },
            ],
        },
        {
            name: 'Pro Plan',
            price: isYearly ? '$7.99' : '$9.99',
            period: 'month',
            description: 'Advanced features for power users and small teams.',
            isPopular: true,
            features: [
                { text: 'Unlimited accounts', included: true },
                { text: 'Full team collaboration', included: true },
                { text: 'Advanced scheduling', included: true },
                { text: 'Complete audit history', included: true },
                { text: 'Priority support', included: true },
                { text: 'Custom categories', included: true },
            ],
            buttonText: 'Upgrade to Pro',
        },
    ];

    return (
        <section id="pricing" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Choose the plan that's right for you or your organization.
                    </p>

                    <div className="flex items-center justify-center gap-4">
                        <span className={!isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}>Monthly</span>
                        <button
                            onClick={() => dispatch(toggleBillingCycle())}
                            className="relative w-12 h-6 rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            <div
                                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-6' : ''
                                    }`}
                            />
                        </button>
                        <span className={isYearly ? 'text-gray-900 font-medium' : 'text-gray-500'}>
                            Yearly <span className="text-secondary text-sm font-bold">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
                    ))}
                </div>
            </div>
        </section>
    );
};
