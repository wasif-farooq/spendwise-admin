import React from 'react';
import { Button } from '@ui';
import { Sparkles } from 'lucide-react';
import { Block } from '@shared';

export interface UpgradeButtonProps {
    onClick?: () => void;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    showIcon?: boolean;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
    onClick,
    className = '',
    size = 'md',
    showIcon = true,
}) => {
    return (
        <Button
            onClick={onClick}
            size={size}
            className={`bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold shadow-lg hover:shadow-xl transition-all ${className}`}
        >
            {showIcon && (
                <Block as="span" className="mr-2">
                    <Sparkles className="h-4 w-4" />
                </Block>
            )}
            Upgrade
        </Button>
    );
};
