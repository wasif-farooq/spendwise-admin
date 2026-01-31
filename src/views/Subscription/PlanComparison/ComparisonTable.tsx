import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, Badge } from '@ui';
import { Block, Flex } from '@shared';
import { ComparisonRow } from './ComparisonRow';

export interface ComparisonTableProps {
    className?: string;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ className = '' }) => {
    return (
        <Block className={`overflow-x-auto ${className}`}>
            <Table striped hoverable>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/3">Feature</TableHead>
                        <TableHead className="text-center w-1/3">
                            <Flex direction="col" align="center" gap={2}>
                                Free
                                <Badge variant="default" size="sm">
                                    $0/mo
                                </Badge>
                            </Flex>
                        </TableHead>
                        <TableHead className="text-center w-1/3">
                            <Flex direction="col" align="center" gap={2}>
                                Pro
                                <Badge variant="gradient" size="sm">
                                    $19/mo
                                </Badge>
                            </Flex>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <ComparisonRow
                        featureName="Team Members"
                        freeValue="2"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="Accounts"
                        freeValue="1"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="Custom Roles"
                        freeValue="1"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="Transaction History"
                        freeValue="3 months"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="Analytics"
                        freeValue="30 days"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="Organizations"
                        freeValue="5"
                        proValue="Unlimited"
                    />
                    <ComparisonRow
                        featureName="AI Advisor"
                        freeValue={false}
                        proValue={true}
                    />
                </TableBody>
            </Table>
        </Block>
    );
};
