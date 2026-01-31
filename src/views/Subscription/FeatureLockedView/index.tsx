import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@ui';
import { Block, Flex, Heading, Text } from '@shared';
import { Lock } from 'lucide-react';
import { FeatureIcon } from './FeatureIcon';
import { BenefitsList } from './BenefitsList';
import { UpgradeButton } from '../components/UpgradeButton';
import { UpgradeModal } from '../UpgradeModal';

export interface FeatureLockedViewProps {
    featureName: string;
    featureDescription: string;
    benefits: string[];
    featureIcon?: React.ReactNode;
    previewImage?: string;
}

export const FeatureLockedView: React.FC<FeatureLockedViewProps> = ({
    featureName,
    featureDescription,
    benefits,
    featureIcon,
    previewImage,
}) => {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    return (
        <>
            <Block className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
                <Block className="max-w-4xl mx-auto">
                    <Card variant="elevated" className="overflow-hidden">
                        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-purple-50 pb-8">
                            <Flex direction="col" align="center" gap={4}>
                                <Block className="relative">
                                    <FeatureIcon icon={featureIcon} />
                                    <Block className="absolute -bottom-1 -right-1 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                        <Lock className="h-4 w-4 text-yellow-900" />
                                    </Block>
                                </Block>

                                <Block>
                                    <Heading size="3xl" weight="black" color="text-gray-900" className="mb-2">
                                        {featureName}
                                    </Heading>
                                    <Text size="lg" color="text-gray-600" className="max-w-2xl">
                                        {featureDescription}
                                    </Text>
                                </Block>
                            </Flex>
                        </CardHeader>

                        <CardContent className="py-8">
                            {previewImage && (
                                <Block className="mb-8 rounded-lg overflow-hidden">
                                    <img
                                        src={previewImage}
                                        alt={`${featureName} preview`}
                                        className="w-full h-auto"
                                    />
                                </Block>
                            )}

                            <Block className="mb-8">
                                <Heading size="xl" weight="bold" color="text-gray-900" className="mb-4">
                                    What you'll get:
                                </Heading>
                                <BenefitsList benefits={benefits} />
                            </Block>

                            <Flex justify="center" className="pt-4">
                                <UpgradeButton
                                    onClick={() => setIsUpgradeModalOpen(true)}
                                    size="lg"
                                    className="px-12 py-4 text-lg"
                                />
                            </Flex>

                            <Block className="mt-6 text-center">
                                <Text size="sm" color="text-gray-500">
                                    Unlock this feature and more with Pro or Enterprise
                                </Text>
                            </Block>
                        </CardContent>
                    </Card>
                </Block>
            </Block>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                triggerFeature={featureName}
            />
        </>
    );
};

export default FeatureLockedView;
