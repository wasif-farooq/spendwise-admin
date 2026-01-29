import { motion } from 'framer-motion';
import { Smartphone, MessageSquare, Mail, Trash2, ChevronRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Security = () => {
    const methods = [
        { id: 'authenticator', name: 'Authenticator App', description: 'Use an app like Google Authenticator or Authy', icon: Smartphone, enabled: true },
        { id: 'whatsapp', name: 'WhatsApp', description: 'Receive codes via WhatsApp', icon: MessageSquare, enabled: false },
        { id: 'email', name: 'Email', description: 'Receive codes via email', icon: Mail, enabled: false },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <section>
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
            </section>

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
                        <button className="flex items-center justify-center px-8 py-4 bg-white border-2 border-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-600 hover:text-white hover:border-red-600 transition-all active:scale-95">
                            <Trash2 className="h-5 w-5 mr-2" /> Delete Account
                        </button>
                    </div>
                </div>
            </section>
        </motion.div>
    );
};

export default Security;
