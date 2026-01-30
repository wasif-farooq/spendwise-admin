import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Save, Building2, Info, Upload, Camera, User, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { useState, useRef } from 'react';
import { Input, Button, Modal } from '@ui';
import {
    Block,
    Flex,
    Heading,
    Text,
    Grid
} from '@shared';

import { useDispatch, useSelector } from 'react-redux';
import { setAccountType } from '../../store/uiSlice';
import type { RootState } from '../../store/store';

const ManageGeneral = () => {
    const dispatch = useDispatch();
    const accountType = useSelector((state: RootState) => state.ui.accountType);
    const [orgName, setOrgName] = useState('My Account');
    const [orgIcon, setOrgIcon] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isConvertModalOpen, setIsConvertModalOpen] = useState(false);
    const [isDowngradeModalOpen, setIsDowngradeModalOpen] = useState(false);
    const [pendingType, setPendingType] = useState<'personal' | 'organization' | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setFeedback({ type: 'success', message: `${accountType === 'personal' ? 'Account' : 'Organization'} settings updated successfully!` });
        }, 1500);
    };

    const handleTypeChange = (type: 'personal' | 'organization') => {
        if (type === accountType) return;

        setPendingType(type);
        if (type === 'organization') {
            setIsConvertModalOpen(true);
        } else {
            setIsDowngradeModalOpen(true);
        }
    };

    const confirmConversion = () => {
        if (pendingType) {
            dispatch(setAccountType(pendingType));
            setIsConvertModalOpen(false);
            setIsDowngradeModalOpen(false);
            setPendingType(null);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOrgIcon(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeIcon = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOrgIcon(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <Block
            as={motion.div}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <Flex as="header" direction="col" justify="between" gap={6} className="md:flex-row md:items-center">
                <Block>
                    <Heading as="h2" weight="black" className="text-3xl tracking-tight text-gray-900">General Settings</Heading>
                    <Text color="text-gray-500" weight="medium" className="mt-1">
                        Manage your {accountType === 'personal' ? 'personal account' : "organization's"} core identity and settings.
                    </Text>
                </Block>
                <Flex align="center" gap={4}>
                    <AnimatePresence>
                        {orgIcon && (
                            <Block
                                as={motion.div}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/5"
                            >
                                <img src={orgIcon} alt="Org Icon" className="w-full h-full object-cover" />
                            </Block>
                        )}
                    </AnimatePresence>
                    <Block className="bg-primary/10 p-4 rounded-[2rem] hidden sm:block">
                        {accountType === 'personal' ? <User className="h-8 w-8 text-primary" /> : <Building2 className="h-8 w-8 text-primary" />}
                    </Block>
                </Flex>
            </Flex>

            {/* Account Type Selection */}
            <Block as="section" className="space-y-6">
                <Flex align="center" gap={3}>
                    <Block className="bg-primary/10 p-2 rounded-xl">
                        <Sparkles className="h-4 w-4 text-primary" />
                    </Block>
                    <Heading as="h3" weight="black" className="uppercase tracking-widest text-xs text-gray-900">Select Account Type</Heading>
                </Flex>
                <Grid cols={1} gap={6} className="sm:grid-cols-2">
                    <button
                        onClick={() => handleTypeChange('personal')}
                        className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'personal'
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <Block className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'personal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                            }`}>
                            <User className="h-7 w-7" />
                        </Block>
                        <Heading as="h4" className="text-xl font-black text-gray-900 mb-2">Personal Account</Heading>
                        <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Best for individuals managing personal finances and small budgets.</Text>
                        {accountType === 'personal' && (
                            <Block className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                                <ShieldCheck className="h-4 w-4" />
                            </Block>
                        )}
                    </button>

                    <button
                        onClick={() => handleTypeChange('organization')}
                        className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'organization'
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <Block className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'organization' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                            }`}>
                            <Building2 className="h-7 w-7" />
                        </Block>
                        <Heading as="h4" className="text-xl font-black text-gray-900 mb-2">Organization</Heading>
                        <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Ideal for teams, families, or businesses requiring shared access and roles.</Text>
                        {accountType === 'organization' && (
                            <Block className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                                <ShieldCheck className="h-4 w-4" />
                            </Block>
                        )}
                    </button>
                </Grid>
            </Block>

            <Grid cols={1} gap={8}>
                <Block as="section" className="bg-gray-50/50 rounded-[3rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden group">
                    <Block className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutDashboard className="h-32 w-32 text-primary" />
                    </Block>

                    <Block as="form" onSubmit={handleSave} className="relative z-10 space-y-10">
                        <Grid cols={1} gap={12} className="lg:grid-cols-12">
                            {/* Left: Identity Form */}
                            <Block className="lg:col-span-7 space-y-10">
                                <Block className="space-y-8">
                                    <Flex align="center" gap={3}>
                                        <Block className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                                            <Info className="h-5 w-5 text-primary" />
                                        </Block>
                                        <Block>
                                            <Heading as="h3" weight="black" className="text-lg text-gray-900">
                                                {accountType === 'personal' ? 'Personal Identity' : 'Organization Identity'}
                                            </Heading>
                                            <Text size="sm" color="text-gray-500" weight="medium">Define how you appear across the platform.</Text>
                                        </Block>
                                    </Flex>

                                    <Block className="space-y-6">
                                        <Block className="group/input">
                                            <Input
                                                label={accountType === 'personal' ? 'Account Name' : 'Organization / Family Name'}
                                                value={orgName}
                                                onChange={(e) => setOrgName(e.target.value)}
                                                placeholder={accountType === 'personal' ? 'e.g. John Doe' : 'e.g. My Family, Acme Corp'}
                                                className="bg-white border-2 border-transparent h-20 rounded-[1.5rem] focus:border-primary focus:ring-0 text-2xl font-black px-8 shadow-sm transition-all group-hover/input:shadow-md"
                                                required
                                            />
                                        </Block>

                                        <Flex align="start" gap={4} className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-[2rem]">
                                            <Block className="bg-blue-100 p-2 rounded-xl mt-0.5">
                                                <Sparkles className="h-4 w-4 text-blue-600" />
                                            </Block>
                                            <Text size="sm" weight="medium" className="text-blue-800 leading-relaxed">
                                                <Text as="strong" weight="bold">Pro Tip:</Text> This name will be visible to all members in your {accountType === 'personal' ? 'account' : 'organization'} and will appear on reports and invoices.
                                            </Text>
                                        </Flex>
                                    </Block>
                                </Block>

                                <Block className="space-y-6">
                                    <Flex align="center" gap={3}>
                                        <Block className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                                            <Camera className="h-5 w-5 text-primary" />
                                        </Block>
                                        <Heading as="h3" weight="black" className="text-lg text-gray-900">
                                            {accountType === 'personal' ? 'Profile Picture' : 'Organization Logo'}
                                        </Heading>
                                    </Flex>

                                    <Flex direction="col" gap={8} className="sm:flex-row sm:items-center">
                                        <Block
                                            onClick={() => fileInputRef.current?.click()}
                                            className={`relative h-40 w-40 rounded-[2.5rem] border-4 border-dashed transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center group/upload ${orgIcon
                                                ? 'border-primary/20 bg-white shadow-xl shadow-primary/5'
                                                : 'border-gray-200 bg-gray-50 hover:border-primary/40 hover:bg-white'
                                                }`}
                                        >
                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                className="sr-only"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                            />

                                            {orgIcon ? (
                                                <>
                                                    <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                                    <Block className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Block className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                                                            <Upload className="h-6 w-6 text-white" />
                                                        </Block>
                                                    </Block>
                                                </>
                                            ) : (
                                                <Block className="text-center p-4">
                                                    <Block className="bg-white p-4 rounded-2xl shadow-sm mb-3 inline-block group-hover/upload:scale-110 group-hover/upload:shadow-md transition-all">
                                                        <Upload className="h-6 w-6 text-primary" />
                                                    </Block>
                                                    <Text size="xs" weight="black" className="text-gray-900">Upload</Text>
                                                </Block>
                                            )}
                                        </Block>

                                        <Block className="flex-1 space-y-4 text-center sm:text-left">
                                            <Block className="space-y-1">
                                                <Text size="sm" weight="black" className="text-gray-900">Recommended Dimensions</Text>
                                                <Text size="xs" color="text-gray-500" weight="medium">Square image, at least 512x512px</Text>
                                            </Block>
                                            <Flex justify="center" gap={3} className="sm:justify-start flex-wrap">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => fileInputRef.current?.click()}
                                                    className="px-6 py-2.5 rounded-xl text-xs font-black"
                                                >
                                                    {orgIcon ? 'Change Image' : 'Select Image'}
                                                </Button>
                                                {orgIcon && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={removeIcon}
                                                        className="px-6 py-2.5 rounded-xl text-xs font-black text-red-500 border-red-100 hover:bg-red-50"
                                                    >
                                                        Remove
                                                    </Button>
                                                )}
                                            </Flex>
                                        </Block>
                                    </Flex>
                                </Block>
                            </Block>

                            {/* Right: Live Preview */}
                            <Block className="lg:col-span-5">
                                <Block className="sticky top-8 space-y-6">
                                    <Flex align="center" justify="between">
                                        <Heading as="h3" weight="black" className="uppercase tracking-widest text-[10px] text-gray-400">Live Preview</Heading>
                                        <Flex gap={1}>
                                            <Block className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <Block className="w-2 h-2 rounded-full bg-gray-200" />
                                            <Block className="w-2 h-2 rounded-full bg-gray-200" />
                                        </Flex>
                                    </Flex>

                                    <Block className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/10 border border-gray-100 relative overflow-hidden">
                                        <Block className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                                        <Block className="relative space-y-8">
                                            {/* Sidebar Preview Mockup */}
                                            <Block className="space-y-4">
                                                <Text size="xs" weight="black" className="uppercase tracking-tight text-gray-400">Sidebar Appearance</Text>
                                                <Flex align="center" gap={4} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <Block className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                                                        {orgIcon ? (
                                                            <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            accountType === 'personal' ? <User className="h-6 w-6 text-primary" /> : <Building2 className="h-6 w-6 text-primary" />
                                                        )}
                                                    </Block>
                                                    <Block className="flex-1 min-w-0">
                                                        <Text size="sm" weight="black" className="truncate text-gray-900">{orgName || 'Your Name'}</Text>
                                                        <Text size="xs" color="text-gray-500" weight="bold" className="uppercase tracking-wider">
                                                            {accountType === 'personal' ? 'Personal' : 'Organization'}
                                                        </Text>
                                                    </Block>
                                                </Flex>
                                            </Block>

                                            {/* Header Preview Mockup */}
                                            <Block className="space-y-4">
                                                <Text size="xs" weight="black" className="uppercase tracking-tight text-gray-400">Header Appearance</Text>
                                                <Flex align="center" justify="between" className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <Flex align="center" gap={3}>
                                                        <Block className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-xs">
                                                            {orgName ? orgName.charAt(0).toUpperCase() : 'S'}
                                                        </Block>
                                                        <Text size="xs" weight="black" className="text-gray-900">SpendWise</Text>
                                                    </Flex>
                                                    <Block className="h-8 w-8 rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden">
                                                        {orgIcon ? (
                                                            <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <Block className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                                <User className="h-4 w-4 text-primary" />
                                                            </Block>
                                                        )}
                                                    </Block>
                                                </Flex>
                                            </Block>
                                        </Block>
                                    </Block>

                                    <Block className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                                        <Text size="xs" color="text-primary" weight="bold" className="leading-relaxed">
                                            The preview shows how your identity will be displayed in the main navigation and user menus.
                                        </Text>
                                    </Block>
                                </Block>
                            </Block>
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
                <Grid cols={1} gap={8} as="section" className="md:grid-cols-2">
                    <Block className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                        <Block className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                            <Building2 className="h-32 w-32 text-primary" />
                        </Block>
                        <Block className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                            <Building2 className="h-7 w-7 text-blue-600" />
                        </Block>
                        <Heading as="h4" className="text-xl font-black text-gray-900 mb-3">
                            {accountType === 'personal' ? 'Account Profile' : 'Organization Profile'}
                        </Heading>
                        <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">
                            {accountType === 'personal'
                                ? "Complete your personal profile with contact details and preferences for a tailored experience."
                                : "Complete your organization's profile with address, tax ID, and contact details for official documents."}
                        </Text>
                        <Flex align="center" gap={2} className="mt-8 text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                            Configure Profile
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Flex>
                    </Block>

                    <Block className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                        <Block className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                            <Info className="h-32 w-32 text-primary" />
                        </Block>
                        <Block className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                            <Info className="h-7 w-7 text-purple-600" />
                        </Block>
                        <Heading as="h4" className="text-xl font-black text-gray-900 mb-3">Workspace URL</Heading>
                        <Text size="sm" color="text-gray-500" weight="medium" className="leading-relaxed">Customize your workspace URL for easier access and professional branding across your team.</Text>
                        <Flex align="center" gap={2} className="mt-8 text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                            Manage URL
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </Flex>
                    </Block>
                </Grid>
            </Grid>

            {/* Conversion Modal (Upgrade) */}
            <Modal
                isOpen={isConvertModalOpen}
                onClose={() => setIsConvertModalOpen(false)}
                title="Convert to Organization"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100">
                        <Block className="bg-amber-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-amber-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-amber-900">Upgrade to Organization</Heading>
                            <Text size="sm" color="text-amber-700" weight="medium" className="mt-1 leading-relaxed">
                                Converting to an organization unlocks team management, custom roles, and shared billing features.
                            </Text>
                        </Block>
                    </Flex>

                    <Block className="space-y-4 px-4">
                        <Heading as="h4" size="sm" weight="black" className="uppercase tracking-widest text-gray-900">What changes?</Heading>
                        <ul className="space-y-3">
                            {[
                                'Invite team members and assign roles',
                                'Define custom permission levels',
                                'Shared workspace and collaborative tools',
                                'Centralized billing and reporting'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                    <Block className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </Block>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsConvertModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Keep Personal
                        </Button>
                        <Button
                            onClick={confirmConversion}
                            className="flex-grow py-4 rounded-2xl shadow-xl shadow-primary/20 font-black"
                        >
                            Confirm Conversion
                        </Button>
                    </Flex>
                </Block>
            </Modal>

            {/* Downgrade Modal */}
            <Modal
                isOpen={isDowngradeModalOpen}
                onClose={() => setIsDowngradeModalOpen(false)}
                title="Downgrade to Personal"
            >
                <Block className="space-y-6">
                    <Flex align="start" gap={5} className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                        <Block className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </Block>
                        <Block>
                            <Heading size="lg" weight="black" className="text-rose-900">Switch to Personal Account</Heading>
                            <Text size="sm" color="text-rose-700" weight="medium" className="mt-1 leading-relaxed">
                                Warning: Downgrading will disable all organization-level features.
                            </Text>
                        </Block>
                    </Flex>

                    <Flex direction="col" gap={4} className="sm:flex-row pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDowngradeModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl font-black"
                        >
                            Keep Organization
                        </Button>
                        <Button
                            onClick={confirmConversion}
                            className="flex-grow py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl shadow-xl shadow-rose-200 font-black"
                        >
                            Confirm Downgrade
                        </Button>
                    </Flex>
                </Block>
            </Modal>
        </Block>
    );
};

export default ManageGeneral;
