import React from 'react';
import { Block } from '@shared';

export interface FeatureIconProps {
    icon?: React.ReactNode;
}

export const FeatureIcon: React.FC<FeatureIconProps> = ({ icon }) => {
    if (!icon) return null;

    return (
        <Block className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6">
            {icon}
        </Block>
    );
};
