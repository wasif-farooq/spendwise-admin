import { motion } from 'framer-motion';
import { Shield, UserPlus, Settings, CheckCircle2 } from 'lucide-react';

export const Organization = () => {
    return (
        <section id="organization" className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Built for Teams and Organizations</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Manage your company's expenses with granular control. Invite team members, set permissions, and maintain a clear audit trail of every transaction.
                        </p>

                        <div className="space-y-6">
                            {[
                                {
                                    title: 'Granular Permissions',
                                    description: 'Assign Admin, Editor, or Viewer roles to team members.',
                                    icon: Shield,
                                },
                                {
                                    title: 'Easy Invitations',
                                    description: 'Invite members via email and get them onboarded in seconds.',
                                    icon: UserPlus,
                                },
                                {
                                    title: 'Centralized Management',
                                    description: 'Control all accounts and cards from a single organization dashboard.',
                                    icon: Settings,
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="font-bold text-gray-900">Team Members</h3>
                                <button className="text-primary text-sm font-medium hover:underline">+ Invite Member</button>
                            </div>

                            <div className="space-y-4">
                                {[
                                    { name: 'Alex Johnson', role: 'Admin', email: 'alex@company.com', status: 'Active' },
                                    { name: 'Sarah Chen', role: 'Editor', email: 'sarah@company.com', status: 'Active' },
                                    { name: 'Mike Ross', role: 'Viewer', email: 'mike@company.com', status: 'Pending' },
                                ].map((member, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                                {member.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900 text-sm">{member.name}</p>
                                                <p className="text-gray-500 text-xs">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${member.role === 'Admin' ? 'bg-blue-100 text-blue-700' :
                                                    member.role === 'Editor' ? 'bg-emerald-100 text-emerald-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {member.role}
                                            </span>
                                            <CheckCircle2 className={`h-4 w-4 ${member.status === 'Active' ? 'text-secondary' : 'text-gray-300'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-100">
                                <p className="text-xs text-gray-400 text-center uppercase tracking-widest font-bold mb-4">Permission Matrix</p>
                                <div className="grid grid-cols-4 gap-2 text-[10px] font-bold text-gray-500 uppercase">
                                    <div></div>
                                    <div className="text-center">View</div>
                                    <div className="text-center">Add</div>
                                    <div className="text-center">Delete</div>
                                </div>
                                {[
                                    { role: 'Admin', v: true, a: true, d: true },
                                    { role: 'Editor', v: true, a: true, d: false },
                                    { role: 'Viewer', v: true, a: false, d: false },
                                ].map((row, i) => (
                                    <div key={i} className="grid grid-cols-4 gap-2 py-2 border-b border-gray-50 last:border-0 items-center">
                                        <div className="text-xs font-medium text-gray-700">{row.role}</div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.v ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.a ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                        <div className="flex justify-center"><CheckCircle2 className={`h-3 w-3 ${row.d ? 'text-secondary' : 'text-gray-200'}`} /></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-4 -right-4 h-24 w-24 bg-primary/5 rounded-full -z-10 blur-2xl"></div>
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 bg-secondary/5 rounded-full -z-10 blur-2xl"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
