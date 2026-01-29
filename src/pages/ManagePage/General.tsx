import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Save, Building2, Info, Upload, X, Camera, User, ShieldCheck, Sparkles, AlertTriangle } from 'lucide-react';
import { useState, useRef } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

const ManageGeneral = () => {
    const [accountType, setAccountType] = useState<'personal' | 'organization'>('personal');
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
            setAccountType(pendingType);
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
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">General Settings</h2>
                    <p className="text-gray-500 mt-1 font-medium">Manage your {accountType === 'personal' ? 'personal account' : "organization's"} core identity and settings.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <AnimatePresence>
                        {orgIcon && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="h-14 w-14 rounded-2xl overflow-hidden border-2 border-primary/20 shadow-lg shadow-primary/5"
                            >
                                <img src={orgIcon} alt="Org Icon" className="w-full h-full object-cover" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="bg-primary/10 p-4 rounded-[2rem] hidden sm:block">
                        {accountType === 'personal' ? <User className="h-8 w-8 text-primary" /> : <Building2 className="h-8 w-8 text-primary" />}
                    </div>
                </div>
            </header>

            {/* Account Type Selection */}
            <section className="space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-xl">
                        <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-black text-gray-900 uppercase tracking-widest text-xs">Select Account Type</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button
                        onClick={() => handleTypeChange('personal')}
                        className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'personal'
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'personal' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                            }`}>
                            <User className="h-7 w-7" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">Personal Account</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Best for individuals managing personal finances and small budgets.</p>
                        {accountType === 'personal' && (
                            <div className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                        )}
                    </button>

                    <button
                        onClick={() => handleTypeChange('organization')}
                        className={`relative p-8 rounded-[3rem] border-4 transition-all text-left group ${accountType === 'organization'
                            ? 'border-primary bg-primary/5 shadow-xl shadow-primary/10'
                            : 'border-gray-100 bg-white hover:border-gray-200'
                            }`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${accountType === 'organization' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-gray-100 text-gray-400'
                            }`}>
                            <Building2 className="h-7 w-7" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-2">Organization</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Ideal for teams, families, or businesses requiring shared access and roles.</p>
                        {accountType === 'organization' && (
                            <div className="absolute top-6 right-6 bg-primary text-white p-1.5 rounded-full shadow-lg">
                                <ShieldCheck className="h-4 w-4" />
                            </div>
                        )}
                    </button>
                </div>
            </section>

            <div className="grid grid-cols-1 gap-8">
                <section className="bg-gray-50/50 rounded-[3rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutDashboard className="h-32 w-32 text-primary" />
                    </div>

                    <form onSubmit={handleSave} className="relative z-10 space-y-10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* Left: Identity Form */}
                            <div className="lg:col-span-7 space-y-10">
                                <div className="space-y-8">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                                            <Info className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-black text-gray-900 text-lg">
                                                {accountType === 'personal' ? 'Personal Identity' : 'Organization Identity'}
                                            </h3>
                                            <p className="text-sm text-gray-500 font-medium">Define how you appear across the platform.</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="group/input">
                                            <Input
                                                label={accountType === 'personal' ? 'Account Name' : 'Organization / Family Name'}
                                                value={orgName}
                                                onChange={(e) => setOrgName(e.target.value)}
                                                placeholder={accountType === 'personal' ? 'e.g. John Doe' : 'e.g. My Family, Acme Corp'}
                                                className="bg-white border-2 border-transparent h-20 rounded-[1.5rem] focus:border-primary focus:ring-0 text-2xl font-black px-8 shadow-sm transition-all group-hover/input:shadow-md"
                                                required
                                            />
                                        </div>

                                        <div className="bg-blue-50/50 border border-blue-100/50 p-6 rounded-[2rem] flex items-start space-x-4">
                                            <div className="bg-blue-100 p-2 rounded-xl mt-0.5">
                                                <Sparkles className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <p className="text-sm text-blue-800 leading-relaxed font-medium">
                                                <strong>Pro Tip:</strong> This name will be visible to all members in your {accountType === 'personal' ? 'account' : 'organization'} and will appear on reports and invoices.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-gray-100">
                                            <Camera className="h-5 w-5 text-primary" />
                                        </div>
                                        <h3 className="font-black text-gray-900 text-lg">
                                            {accountType === 'personal' ? 'Profile Picture' : 'Organization Logo'}
                                        </h3>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-8">
                                        <div
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
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                                        <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30">
                                                            <Upload className="h-6 w-6 text-white" />
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center p-4">
                                                    <div className="bg-white p-4 rounded-2xl shadow-sm mb-3 inline-block group-hover/upload:scale-110 group-hover/upload:shadow-md transition-all">
                                                        <Upload className="h-6 w-6 text-primary" />
                                                    </div>
                                                    <p className="text-xs font-black text-gray-900">Upload</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4 text-center sm:text-left">
                                            <div className="space-y-1">
                                                <p className="text-sm font-black text-gray-900">Recommended Dimensions</p>
                                                <p className="text-xs text-gray-500 font-medium">Square image, at least 512x512px</p>
                                            </div>
                                            <div className="flex flex-wrap justify-center sm:justify-start gap-3">
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Live Preview */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-black text-gray-400 uppercase tracking-widest text-[10px]">Live Preview</h3>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-primary/10 border border-gray-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />

                                        <div className="relative space-y-8">
                                            {/* Sidebar Preview Mockup */}
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Sidebar Appearance</p>
                                                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border border-primary/20">
                                                        {orgIcon ? (
                                                            <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            accountType === 'personal' ? <User className="h-6 w-6 text-primary" /> : <Building2 className="h-6 w-6 text-primary" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-black text-gray-900 truncate">{orgName || 'Your Name'}</p>
                                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                            {accountType === 'personal' ? 'Personal' : 'Organization'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Header Preview Mockup */}
                                            <div className="space-y-4">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-tight">Header Appearance</p>
                                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-white font-black text-xs">
                                                            {orgName ? orgName.charAt(0).toUpperCase() : 'S'}
                                                        </div>
                                                        <p className="text-xs font-black text-gray-900">SpendWise</p>
                                                    </div>
                                                    <div className="h-8 w-8 rounded-full bg-white shadow-sm border border-gray-100 overflow-hidden">
                                                        {orgIcon ? (
                                                            <img src={orgIcon} alt="Preview" className="w-full h-full object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                                                <User className="h-4 w-4 text-primary" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-primary/5 rounded-[2rem] border border-primary/10">
                                        <p className="text-[11px] text-primary font-bold leading-relaxed">
                                            The preview shows how your identity will be displayed in the main navigation and user menus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-gray-200/60">
                            <div className="text-sm text-gray-400 font-medium">
                                Last updated: Jan 29, 2026
                            </div>
                            <div className="flex items-center space-x-4 w-full sm:w-auto">
                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={`px-6 py-3 rounded-2xl text-sm font-bold ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}
                                    >
                                        {feedback.message}
                                    </motion.div>
                                )}
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full sm:w-auto px-12 py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center text-lg font-black"
                                >
                                    {isSaving ? 'Saving...' : (
                                        <>
                                            <Save className="h-5 w-5 mr-3" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                </section>


                {/* Additional Settings Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                            <Building2 className="h-32 w-32 text-primary" />
                        </div>
                        <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                            <Building2 className="h-7 w-7 text-blue-600" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-3">
                            {accountType === 'personal' ? 'Account Profile' : 'Organization Profile'}
                        </h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">
                            {accountType === 'personal'
                                ? "Complete your personal profile with contact details and preferences for a tailored experience."
                                : "Complete your organization's profile with address, tax ID, and contact details for official documents."}
                        </p>
                        <div className="mt-8 flex items-center text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                            Configure Profile
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all cursor-pointer group relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-150 transition-transform duration-700">
                            <Info className="h-32 w-32 text-primary" />
                        </div>
                        <div className="bg-purple-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-sm">
                            <Info className="h-7 w-7 text-purple-600" />
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-3">Workspace URL</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">Customize your workspace URL for easier access and professional branding across your team.</p>
                        <div className="mt-8 flex items-center text-primary font-black text-sm group-hover:translate-x-2 transition-transform">
                            Manage URL
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </section>
            </div>

            {/* Conversion Modal (Upgrade) */}
            <Modal
                isOpen={isConvertModalOpen}
                onClose={() => setIsConvertModalOpen(false)}
                title="Convert to Organization"
            >
                <div className="space-y-6">
                    <div className="bg-amber-50 p-8 rounded-[2.5rem] flex items-start space-x-5 border border-amber-100">
                        <div className="bg-amber-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-amber-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-amber-900 text-lg">Upgrade to Organization</p>
                            <p className="text-sm text-amber-700 mt-1 leading-relaxed font-medium">
                                Converting to an organization unlocks team management, custom roles, and shared billing features.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 px-4">
                        <p className="text-gray-900 font-black text-sm uppercase tracking-widest">What changes?</p>
                        <ul className="space-y-3">
                            {[
                                'Invite team members and assign roles',
                                'Define custom permission levels',
                                'Shared workspace and collaborative tools',
                                'Centralized billing and reporting'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    </div>
                </div>
            </Modal>

            {/* Downgrade Modal */}
            <Modal
                isOpen={isDowngradeModalOpen}
                onClose={() => setIsDowngradeModalOpen(false)}
                title="Downgrade to Personal"
            >
                <div className="space-y-6">
                    <div className="bg-rose-50 p-8 rounded-[2.5rem] flex items-start space-x-5 border border-rose-100">
                        <div className="bg-rose-500 p-3 rounded-2xl flex-shrink-0 shadow-lg shadow-rose-200">
                            <AlertTriangle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="font-black text-rose-900 text-lg">Switch to Personal Account</p>
                            <p className="text-sm text-rose-700 mt-1 leading-relaxed font-medium">
                                Warning: Downgrading will disable all organization-level features.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4 px-4">
                        <p className="text-gray-900 font-black text-sm uppercase tracking-widest">What will you lose?</p>
                        <ul className="space-y-3">
                            {[
                                'All team members will lose access immediately',
                                'Custom roles and permissions will be deleted',
                                'Shared workspace features will be disabled',
                                'Organization-specific billing will be cancelled'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center text-sm text-gray-600 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-3" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <p className="text-gray-500 text-xs px-4 font-bold italic">
                        This action is significant. Please ensure you have backed up any necessary organization data before proceeding.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default ManageGeneral;
