import React from 'react';
import { FeatureLockedView } from '@/views/Subscription';

export const ExchangeRatesPreviewPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl">
                <FeatureLockedView
                    featureName="Real-Time Exchange Rates"
                    featureDescription="Access live currency exchange rates and multi-currency support for global financial tracking"
                    benefits={[
                        'Real-time exchange rates for 150+ currencies',
                        'Automatic currency conversion for transactions',
                        'Historical exchange rate data and trends',
                        'Multi-currency account support',
                        'Smart currency alerts and notifications',
                        'Accurate cross-border transaction tracking',
                    ]}
                    featureIcon={
                        <svg
                            className="h-10 w-10 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    }
                />
            </div>
        </div>
    );
};

export default ExchangeRatesPreviewPage;
