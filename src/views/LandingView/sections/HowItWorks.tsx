import { motion } from 'framer-motion';
import { CreditCard, Users, Calendar, History } from 'lucide-react';

const steps = [
    {
        title: 'Add Accounts',
        description: 'Connect your bank accounts and credit cards securely to get a unified view.',
        icon: CreditCard,
    },
    {
        title: 'Set Up Teams',
        description: 'Create your organization and invite team members with specific roles.',
        icon: Users,
    },
    {
        title: 'Track & Schedule',
        description: 'Monitor daily spending and schedule future expenses for better planning.',
        icon: Calendar,
    },
    {
        title: 'Review History',
        description: 'Access a complete audit trail and detailed reports of your financial activity.',
        icon: History,
    },
];

export const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600">
                        Get started with ExpenseFlow in four simple steps and take control of your finances.
                    </p>
                </div>

                <div className="relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 text-center"
                            >
                                <div className="relative inline-block mb-6">
                                    <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                                        <step.icon className="h-8 w-8" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold border-4 border-white">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
