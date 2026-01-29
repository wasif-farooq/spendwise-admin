import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, MessageSquare, Mail, Trash2, ChevronRight, ShieldCheck, AlertTriangle, Lock, Eye, EyeOff, Check, X as CloseIcon, RefreshCw, Copy, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

const Security = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRegenerateModalOpen, setIsRegenerateModalOpen] = useState(false);
    const [isNewCodesModalOpen, setIsNewCodesModalOpen] = useState(false);
    const [hasCopied, setHasCopied] = useState(false);

    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
    const [passwordFeedback, setPasswordFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const recoveryCodes = [
        'ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456',
        'QRST-7890', 'UVWX-1234', 'YZAB-5678', 'CDEF-9012'
    ];

    const methods = [
        { id: 'authenticator', name: 'Authenticator App', description: 'Use an app like Google Authenticator or Authy', icon: Smartphone, enabled: true },
        { id: 'whatsapp', name: 'WhatsApp', description: 'Receive codes via WhatsApp', icon: MessageSquare, enabled: false },
        { id: 'email', name: 'Email', description: 'Receive codes via email', icon: Mail, enabled: false },
    ];

    const passwordStrength = useMemo(() => {
        const p = passwordData.new;
        if (!p) return 0;
        let score = 0;
        if (p.length >= 8) score += 25;
        if (/[A-Z]/.test(p)) score += 25;
        if (/[0-9]/.test(p)) score += 25;
        if (/[^A-Za-z0-9]/.test(p)) score += 25;
        return score;
    }, [passwordData.new]);

    const strengthColor = () => {
        if (passwordStrength <= 25) return 'bg-red-500';
        if (passwordStrength <= 50) return 'bg-orange-500';
        if (passwordStrength <= 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const strengthLabel = () => {
        if (passwordStrength <= 25) return 'Weak';
        if (passwordStrength <= 50) return 'Fair';
        if (passwordStrength <= 75) return 'Good';
        return 'Strong';
    };

    const handleUpdatePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            setPasswordFeedback({ type: 'error', message: 'New passwords do not match' });
            return;
        }

        setIsUpdatingPassword(true);
        setPasswordFeedback(null);

        // Simulate API call
        setTimeout(() => {
            setIsUpdatingPassword(false);
            setPasswordFeedback({ type: 'success', message: 'Password updated successfully!' });
            setPasswordData({ current: '', new: '', confirm: '' });
        }, 1500);
    };

    const toggleVisibility = (field: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(recoveryCodes.join('\n'));
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    const downloadCodes = () => {
        const element = document.createElement('a');
        const file = new Blob([recoveryCodes.join('\n')], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'spendwise-recovery-codes.txt';
        document.body.appendChild(element);
        element.click();
    };

    const handleDeleteAccount = () => {
        console.log('Account deleted');
        setIsDeleteModalOpen(false);
    };

    const handleRegenerateCodes = () => {
        console.log('Codes regenerated');
        setIsRegenerateModalOpen(false);
        setIsNewCodesModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            {/* Change Password Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Change Password</h2>
                        <p className="text-gray-500 mt-1">Update your password to keep your account secure.</p>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-2xl">
                        <Lock className="h-6 w-6 text-primary" />
                    </div>
                </div>

                <form onSubmit={handleUpdatePassword} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="relative">
                                <Input
                                    label="Current Password"
                                    type={showPasswords.current ? 'text' : 'password'}
                                    value={passwordData.current}
                                    onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                    className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('current')}
                                    className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    label="New Password"
                                    type={showPasswords.new ? 'text' : 'password'}
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('new')}
                                    className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>

                                {passwordData.new && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 space-y-2"
                                    >
                                        <div className="flex justify-between items-center px-1">
                                            <span className="text-xs font-bold text-gray-500">Strength: {strengthLabel()}</span>
                                            <span className="text-xs font-bold text-gray-500">{passwordStrength}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength}%` }}
                                                className={`h-full ${strengthColor()} transition-all duration-500`}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <div className="relative">
                                <Input
                                    label="Confirm New Password"
                                    type={showPasswords.confirm ? 'text' : 'password'}
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    className="bg-gray-50 border-none h-14 rounded-2xl focus:ring-2 focus:ring-primary pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => toggleVisibility('confirm')}
                                    className="absolute right-4 top-[3.2rem] text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>

                                {passwordData.confirm && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-2 flex items-center px-1"
                                    >
                                        {passwordData.new === passwordData.confirm ? (
                                            <span className="text-xs font-bold text-green-600 flex items-center">
                                                <Check className="h-3 w-3 mr-1" /> Passwords match
                                            </span>
                                        ) : (
                                            <span className="text-xs font-bold text-red-500 flex items-center">
                                                <CloseIcon className="h-3 w-3 mr-1" /> Passwords do not match
                                            </span>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-3xl p-8 flex flex-col justify-center">
                            <h4 className="font-bold text-gray-900 mb-4">Password Requirements:</h4>
                            <ul className="space-y-3">
                                {[
                                    { label: 'At least 8 characters long', met: passwordData.new.length >= 8 },
                                    { label: 'Include at least one uppercase letter', met: /[A-Z]/.test(passwordData.new) },
                                    { label: 'Include at least one number', met: /[0-9]/.test(passwordData.new) },
                                    { label: 'Include at least one special character', met: /[^A-Za-z0-9]/.test(passwordData.new) },
                                ].map((req, i) => (
                                    <li key={i} className={`flex items-center text-sm ${req.met ? 'text-green-600 font-bold' : 'text-gray-500'}`}>
                                        <div className={`p-1 rounded-full mr-3 ${req.met ? 'bg-green-100' : 'bg-gray-200'}`}>
                                            {req.met ? <Check className="h-3 w-3" /> : <div className="h-3 w-3" />}
                                        </div>
                                        {req.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <AnimatePresence>
                        {passwordFeedback && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={`p-4 rounded-2xl text-sm font-bold ${passwordFeedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {passwordFeedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex justify-end pt-4 border-t border-gray-50">
                        <Button
                            type="submit"
                            disabled={isUpdatingPassword || passwordStrength < 100 || passwordData.new !== passwordData.confirm}
                            className="px-12 py-4 rounded-2xl shadow-lg shadow-primary/20"
                        >
                            {isUpdatingPassword ? 'Updating...' : 'Update Password'}
                        </Button>
                    </div>
                </form>
            </section>

            {/* 2FA Section */}
            <section className="pt-12 border-t border-gray-100">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Two-Factor Authentication</h2>
                        <p className="text-gray-500 mt-1">Add an extra layer of security to your account.</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-2xl">
                        <ShieldCheck className="h-6 w-6 text-green-600" />
                    </div>
                </div>

                <div className="space-y-4">
                    {methods.map((m) => (
                        <div key={m.id} className="flex items-center justify-between p-6 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-all group">
                            <div className="flex items-center">
                                <div className="bg-white p-3 rounded-2xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
                                    <m.icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">{m.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-6">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${m.enabled ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {m.enabled ? 'Enabled' : 'Disabled'}
                                </span>
                                <Link
                                    to={`/settings/security/setup-2fa?method=${m.id}`}
                                    className="p-2 bg-white rounded-xl shadow-sm text-gray-400 hover:text-primary hover:shadow-md transition-all"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recovery Codes Section */}
                <div className="mt-8 bg-gray-50/50 rounded-[2.5rem] p-8 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center">
                            <div className="bg-primary/10 p-3 rounded-2xl mr-5">
                                <RefreshCw className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900">Recovery Codes</p>
                                <p className="text-sm text-gray-500 mt-1">Recovery codes can be used to access your account if you lose your 2FA device.</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setIsRegenerateModalOpen(true)}
                                className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all"
                            >
                                Regenerate New Codes
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Danger Zone */}
            <section className="pt-12 border-t border-gray-100">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
                    <p className="text-gray-500 mt-1">Irreversible actions for your account.</p>
                </div>

                <div className="bg-red-50/50 rounded-3xl p-8 border border-red-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <p className="font-bold text-gray-900">Delete Account</p>
                            <p className="text-sm text-gray-600 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
                        </div>
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="flex items-center justify-center px-8 py-4 bg-white border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95"
                        >
                            <Trash2 className="h-5 w-5 mr-2" /> Delete Account
                        </button>
                    </div>
                </div>
            </section>

            {/* New Recovery Codes Modal (Shown after regeneration) */}
            <Modal
                isOpen={isNewCodesModalOpen}
                onClose={() => setIsNewCodesModalOpen(false)}
                title="Your New Recovery Codes"
            >
                <div className="space-y-8">
                    <div className="bg-green-50 p-4 rounded-2xl flex items-center space-x-3">
                        <Check className="h-5 w-5 text-green-600" />
                        <p className="text-sm text-green-700 font-medium">Codes regenerated successfully!</p>
                    </div>
                    <p className="text-gray-500 text-sm">
                        Save these codes in a safe place. Each code can only be used once.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {recoveryCodes.map((code, i) => (
                            <div key={i} className="bg-gray-50 px-4 py-3 rounded-xl text-center font-mono font-bold text-gray-700 border border-gray-100">
                                {code}
                            </div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={copyToClipboard}
                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            {hasCopied ? <Check className="h-5 w-5 mr-2 text-green-600" /> : <Copy className="h-5 w-5 mr-2" />}
                            {hasCopied ? 'Copied!' : 'Copy Codes'}
                        </button>
                        <button
                            onClick={downloadCodes}
                            className="flex-grow flex items-center justify-center px-6 py-4 bg-white rounded-2xl font-bold text-gray-700 hover:bg-gray-100 transition-all border border-gray-200"
                        >
                            <Download className="h-5 w-5 mr-2" />
                            Download
                        </button>
                    </div>
                    <Button onClick={() => setIsNewCodesModalOpen(false)} className="w-full py-4 rounded-2xl">
                        I have saved these codes
                    </Button>
                </div>
            </Modal>

            {/* Regenerate Codes Modal */}
            <Modal
                isOpen={isRegenerateModalOpen}
                onClose={() => setIsRegenerateModalOpen(false)}
                title="Regenerate Recovery Codes?"
            >
                <div className="space-y-6">
                    <div className="bg-orange-50 p-6 rounded-3xl flex items-start space-x-4">
                        <div className="bg-orange-100 p-2 rounded-xl flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="font-bold text-orange-900">Warning: Old codes will be invalidated</p>
                            <p className="text-sm text-orange-700 mt-1 leading-relaxed">
                                When you regenerate recovery codes, your existing codes will no longer work. Make sure to save the new codes immediately.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsRegenerateModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleRegenerateCodes}
                            className="flex-grow py-4 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20"
                        >
                            Regenerate Codes
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Delete Account Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Account"
            >
                <div className="space-y-6">
                    <div className="bg-red-50 p-6 rounded-3xl flex items-start space-x-4">
                        <div className="bg-red-100 p-2 rounded-xl flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <p className="font-bold text-red-900">Warning: This action is permanent</p>
                            <p className="text-sm text-red-700 mt-1 leading-relaxed">
                                Deleting your account will permanently remove all your data, including transaction history, budgets, and settings. This cannot be undone.
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 text-sm px-2">
                        Are you absolutely sure you want to delete your account? Please type <span className="font-bold text-gray-900">DELETE</span> to confirm.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className="flex-grow py-4 rounded-2xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteAccount}
                            className="flex-grow py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl shadow-lg shadow-red-200"
                        >
                            Confirm Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </motion.div>
    );
};

export default Security;
