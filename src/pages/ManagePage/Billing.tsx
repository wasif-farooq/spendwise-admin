import { motion } from 'framer-motion';
import { CreditCard, Plus, Download, Check, ArrowUpRight, Zap, ShieldCheck, Clock } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../components/Button';

const Billing = () => {
    const [isChangingPlan, setIsChangingPlan] = useState(false);

    const currentPlan = {
        name: 'Premium Plan',
        price: '$29',
        period: 'month',
        nextBilling: 'Feb 29, 2026',
        status: 'Active',
        features: [
            'Up to 20 team members',
            'Unlimited transactions',
            'Advanced reporting',
            'Priority support',
            'Custom categories'
        ]
    };

    const paymentMethods = [
        { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
        { id: 2, type: 'Mastercard', last4: '8888', expiry: '08/25', isDefault: false },
    ];

    const billingHistory = [
        { id: 'INV-001', date: 'Jan 29, 2026', amount: '$29.00', status: 'Paid' },
        { id: 'INV-002', date: 'Dec 29, 2025', amount: '$29.00', status: 'Paid' },
        { id: 'INV-003', date: 'Nov 29, 2025', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
        >
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Billing & Subscription</h2>
                    <p className="text-gray-500 mt-1 font-medium">Manage your plan, payment methods, and billing history.</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Plan Overview */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-gradient-to-br from-primary to-blue-600 rounded-[3rem] p-8 sm:p-10 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                            <Zap className="h-48 w-48" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-widest">
                                    Current Plan
                                </div>
                                <div className="flex items-center text-white/80 text-sm font-bold">
                                    <Clock className="h-4 w-4 mr-2" />
                                    Next billing: {currentPlan.nextBilling}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                                <div>
                                    <h3 className="text-4xl font-black tracking-tight">{currentPlan.name}</h3>
                                    <div className="mt-2 flex items-baseline">
                                        <span className="text-5xl font-black">{currentPlan.price}</span>
                                        <span className="ml-2 text-white/70 font-bold text-lg">/{currentPlan.period}</span>
                                    </div>
                                </div>
                                <Button
                                    onClick={() => setIsChangingPlan(true)}
                                    className="bg-white text-primary hover:bg-white/90 px-10 py-4 rounded-2xl font-black shadow-lg shadow-black/10 transition-all active:scale-95"
                                >
                                    Change Plan
                                </Button>
                            </div>

                            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {currentPlan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center text-sm font-bold text-white/90">
                                        <div className="bg-white/20 p-1 rounded-lg mr-3">
                                            <Check className="h-3.5 w-3.5" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Payment Methods */}
                    <section className="bg-white rounded-[3rem] p-8 sm:p-10 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="bg-primary/10 p-2.5 rounded-xl">
                                    <CreditCard className="h-5 w-5 text-primary" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">Payment Methods</h3>
                            </div>
                            <button className="text-primary font-black text-sm flex items-center hover:underline">
                                <Plus className="h-4 w-4 mr-1" />
                                Add New
                            </button>
                        </div>

                        <div className="space-y-4">
                            {paymentMethods.map((method) => (
                                <div key={method.id} className="flex items-center justify-between p-6 rounded-[2rem] border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group">
                                    <div className="flex items-center">
                                        <div className="bg-white p-3 rounded-xl shadow-sm mr-5 group-hover:scale-110 transition-transform">
                                            <CreditCard className="h-6 w-6 text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{method.type} ending in {method.last4}</p>
                                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mt-0.5">Expires {method.expiry}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {method.isDefault && (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full">
                                                Default
                                            </span>
                                        )}
                                        <button className="p-2 text-gray-400 hover:text-primary transition-colors">
                                            <ArrowUpRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Billing History */}
                <div className="space-y-8">
                    <section className="bg-white rounded-[3rem] p-8 border border-gray-100 shadow-sm h-full">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="bg-blue-50 p-2.5 rounded-xl">
                                <ShieldCheck className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 tracking-tight">Billing History</h3>
                        </div>

                        <div className="space-y-6">
                            {billingHistory.map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between group">
                                    <div>
                                        <p className="font-bold text-gray-900">{invoice.date}</p>
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-0.5">{invoice.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-gray-900">{invoice.amount}</p>
                                        <button className="text-primary hover:text-primary/80 transition-colors mt-1">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-10 py-4 bg-gray-50 text-gray-500 font-black text-sm rounded-2xl hover:bg-gray-100 transition-all border border-gray-100">
                            View All Invoices
                        </button>
                    </section>
                </div>
            </div>
        </motion.div>
    );
};

export default Billing;
