import { UserPlus, Filter } from 'lucide-react';
import { Block, Flex, Heading, Text } from '@shared';
import { Button, Input } from '@ui';
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { LimitBanner, UpgradeModal } from '@/views/Subscription';
import { useState } from 'react';

interface MembersHeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeFilterCount: number;
    onOpenFilter: () => void;
    onOpenInvite: () => void;
    memberCount?: number;
}

export const MembersHeader = ({
    searchQuery,
    setSearchQuery,
    activeFilterCount,
    onOpenFilter,
    onOpenInvite,
    memberCount = 0
}: MembersHeaderProps) => {
    const memberAccess = useFeatureAccess('members');
    const canAddMember = memberAccess.hasAccess;
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

    const handleInviteClick = () => {
        console.log('DEBUG: Invite Clicked', { canAddMember, current: memberAccess.current, limit: memberAccess.limit });
        if (canAddMember) {
            onOpenInvite();
        } else {
            setIsUpgradeModalOpen(true);
        }
    };

    return (
        <Flex as="header" direction="col" gap={6}>
            {/* Limit Reached Banner */}
            {!canAddMember && (
                <LimitBanner
                    featureName="members"
                    current={memberAccess.current}
                    limit={memberAccess.limit}
                    variant="warning"
                />
            )}

            <Flex direction="col" justify="between" gap={6} className="lg:flex-row lg:items-center">
                <Block>
                    <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">Team Members</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">
                        Manage your organization's members and their roles. ({memberAccess.current}/{memberAccess.limit === -1 ? '∞' : memberAccess.limit})
                    </Text>
                </Block>
                <Flex direction="col" gap={4} className="sm:flex-row sm:items-center">
                    <Flex align="center" gap={2}>
                        <Block className="relative group flex-grow sm:flex-grow-0">
                            <Input
                                placeholder="Search members..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pl-12 w-full sm:w-64 font-bold"
                            />
                            <Block className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </Block>
                        </Block>
                        <Button
                            variant="ghost"
                            onClick={onOpenFilter}
                            className={`p - 4 rounded - 2xl border transition - all relative h - auto ${activeFilterCount > 0
                                ? 'bg-primary/5 border-primary text-primary shadow-lg shadow-primary/10 hover:bg-primary/10'
                                : 'bg-gray-50 border-transparent text-gray-500 hover:bg-gray-100'
                                } `}
                        >
                            <Filter className="h-6 w-6" />
                            {activeFilterCount > 0 && (
                                <Text
                                    as="span"
                                    weight="black"
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white"
                                >
                                    {activeFilterCount}
                                </Text>
                            )}
                        </Button>
                    </Flex>
                    <Button
                        onClick={handleInviteClick}
                        className="px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center font-black"
                        title={canAddMember ? "Invite a new member" : "Upgrade to invite more members"}
                    >
                        <UserPlus className="h-5 w-5 mr-2" />
                        Invite Member
                    </Button>
                </Flex>
            </Flex>

            <UpgradeModal
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                triggerFeature="team members"
            />
        </Flex>
    );
};
