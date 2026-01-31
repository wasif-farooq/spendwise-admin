import React from 'react';
import { Block } from '@shared';
import { useAppSelector } from '@/store/redux';
import { selectHasAIAdvisorAccess } from '@/store/slices/subscriptionSlice';
import { FeatureLockedView } from '@/views/Subscription';
import AIAdvisorContent from './AIAdvisorContent';

const AIAdvisorPage: React.FC = () => {
    const hasAccess = useAppSelector(selectHasAIAdvisorAccess);

    // Show feature guide for free users
    if (!hasAccess) {
        return (
            <Block className="min-h-screen bg-gray-50 p-8">
                <Block className="mx-auto max-w-4xl">
                    <FeatureLockedView
                        featureName="AI Advisor"
                        featureDescription="Get personalized financial insights and recommendations powered by advanced AI"
                        benefits={[
                            'Personalized spending analysis and recommendations',
                            'Automated budget suggestions based on your habits',
                            'Smart alerts for unusual spending patterns',
                            'Predictive insights for better financial planning',
                            'Natural language queries about your finances',
                            '24/7 AI-powered financial guidance',
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
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        }
                    />
                </Block>
            </Block>
        );
    }

    // Show full AI Advisor functionality for Pro users
    return <AIAdvisorContent />;
};

export default AIAdvisorPage;
