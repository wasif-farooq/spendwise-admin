import React from 'react';
import { TableRow, TableCell } from '@ui';
import { Text } from '@shared';
import { Check, X } from 'lucide-react';

export interface ComparisonRowProps {
    featureName: string;
    freeValue: string | boolean;
    proValue: string | boolean;
}

const renderValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
        return value ? (
            <Check className="h-5 w-5 text-green-600 mx-auto" />
        ) : (
            <X className="h-5 w-5 text-gray-300 mx-auto" />
        );
    }
    return <Text size="sm">{value}</Text>;
};

export const ComparisonRow: React.FC<ComparisonRowProps> = ({
    featureName,
    freeValue,
    proValue,
}) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{featureName}</TableCell>
            <TableCell className="text-center">{renderValue(freeValue)}</TableCell>
            <TableCell className="text-center">{renderValue(proValue)}</TableCell>
        </TableRow>
    );
};
