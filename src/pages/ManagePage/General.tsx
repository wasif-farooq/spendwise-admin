import { motion } from 'framer-motion';
import { LayoutDashboard, Save, Building2, Info } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

const ManageGeneral = () => {
    const [orgName, setOrgName] = useState('My Account');
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            setFeedback({ type: 'success', message: 'Organization name updated successfully!' });
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <header className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">General Settings</h2>
                    <p className="text-gray-500 mt-1 font-medium">Manage your organization's core identity and settings.</p>
                </div>
                <div className="bg-primary/10 p-4 rounded-[2rem] hidden sm:block">
                    <Building2 className="h-8 w-8 text-primary" />
                </div>
            </header>

            <div className="grid grid-cols-1 gap-8">
                <section className="bg-gray-50/50 rounded-[3rem] p-8 sm:p-10 border border-gray-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutDashboard className="h-32 w-32 text-primary" />
                    </div>

                    <form onSubmit={handleSave} className="relative z-10 space-y-10">
                        <div className="max-w-xl">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-white p-2 rounded-xl shadow-sm">
                                    <Info className="h-4 w-4 text-primary" />
                                </div>
                                <h3 className="font-bold text-gray-900">Organization Identity</h3>
                            </div>

                            <div className="space-y-4">
                                <Input
                                    label="Organization / Family Name"
                                    value={orgName}
                                    onChange={(e) => setOrgName(e.target.value)}
                                    placeholder="e.g. My Family, Acme Corp"
                                    className="bg-white border-none h-16 rounded-[1.5rem] focus:ring-2 focus:ring-primary text-xl font-bold px-6 shadow-sm"
                                    required
                                />
                                <p className="text-sm text-gray-500 px-2 leading-relaxed">
                                    This name will be used as the primary identifier across the entire platform, including in shared reports and team notifications.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200/60">
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
                                    className="w-full sm:w-auto px-12 py-5 rounded-[1.5rem] shadow-xl shadow-primary/20 flex items-center justify-center text-lg"
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

                {/* Placeholder for more general settings */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Building2 className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Organization Logo</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">Upload a custom logo for your organization to personalize your workspace.</p>
                    </div>
                    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="bg-purple-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Info className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Workspace URL</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">Customize your workspace URL for easier access and professional branding.</p>
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default ManageGeneral;
