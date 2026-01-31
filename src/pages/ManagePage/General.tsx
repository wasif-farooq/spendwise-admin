import { motion } from 'framer-motion';
import { LayoutDashboard, Save } from 'lucide-react';
import { Button } from '@ui';
import { Block, Flex, Grid, Text } from '@shared';
import { GeneralHeader } from '@/views/Manage/General/GeneralHeader';
import { AccountTypeSelection } from '@/views/Manage/General/AccountTypeSelection';
import { IdentityForm } from '@/views/Manage/General/IdentityForm';
import { IdentityPreview } from '@/views/Manage/General/IdentityPreview';
import { ProfileCompletionCards } from '@/views/Manage/General/ProfileCompletionCards';
import { ConversionModals } from '@/views/Manage/General/ConversionModals';
import { useGeneralSettings } from '@/hooks/features/organization/useGeneralSettings';

const ManageGeneral = () => {
    const {
        orgName,
        setOrgName,
        orgIcon,
        handleFileChange,
        removeIcon,
        fileInputRef,
        isConvertModalOpen,
        setIsConvertModalOpen,
        isDowngradeModalOpen,
        setIsDowngradeModalOpen,
        handleTypeChange,
        confirmConversion,
        accountType,
        isSaving,
        feedback,
        handleSave
    } = useGeneralSettings();

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <GeneralHeader
                accountType={accountType}
                orgIcon={orgIcon}
            />

            {/* Account Type Selection */}
            <AccountTypeSelection
                accountType={accountType}
                onTypeChange={handleTypeChange}
            />

            <Grid cols={1} gap={8}>
                <Block as="section" className="bg-gray-50/50 rounded-[3rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden group">
                    <Block className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutDashboard className="h-32 w-32 text-primary" />
                    </Block>

                    <Block as="form" onSubmit={handleSave} className="relative z-10 space-y-10">
                        <Grid cols={1} gap={12} className="lg:grid-cols-12">
                            {/* Left: Identity Form */}
                            <IdentityForm
                                accountType={accountType}
                                orgName={orgName}
                                setOrgName={setOrgName}
                                orgIcon={orgIcon}
                                handleFileChange={handleFileChange}
                                removeIcon={removeIcon}
                                fileInputRef={fileInputRef}
                            />

                            {/* Right: Live Preview */}
                            <IdentityPreview
                                accountType={accountType}
                                orgName={orgName}
                                orgIcon={orgIcon}
                            />
                        </Grid>

                        <Flex direction="col" gap={6} className="sm:flex-row sm:items-center sm:justify-between pt-10 border-t border-gray-200/60">
                            <Text size="sm" color="text-gray-400" weight="medium">
                                Last updated: Jan 29, 2026
                            </Text>
                            <Flex align="center" gap={4} className="w-full sm:w-auto">
                                {feedback && (
                                    <Block
                                        as={motion.div}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`px-6 py-3 rounded-2xl text-sm font-bold ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {feedback.message}
                                    </Block>
                                )}
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full sm:w-auto px-12 py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center text-lg font-black"
                                >
                                    {isSaving ? 'Saving...' : (
                                        <Flex align="center" gap={3}>
                                            <Save className="h-5 w-5" />
                                            Save Changes
                                        </Flex>
                                    )}
                                </Button>
                            </Flex>
                        </Flex>
                    </Block>
                </Block>

                {/* Additional Settings Grid */}
                <ProfileCompletionCards accountType={accountType} />
            </Grid>

            {/* Conversion Modals */}
            <ConversionModals
                isConvertModalOpen={isConvertModalOpen}
                setIsConvertModalOpen={setIsConvertModalOpen}
                isDowngradeModalOpen={isDowngradeModalOpen}
                setIsDowngradeModalOpen={setIsDowngradeModalOpen}
                confirmConversion={confirmConversion}
            />
        </Block>
    );
};

export default ManageGeneral;
