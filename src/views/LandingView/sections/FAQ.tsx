import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
    {
        question: "How secure is my financial data?",
        answer: "We use bank-level 256-bit encryption to protect your data. We never store your bank credentials and only have read-only access to your transaction history through secure, industry-standard aggregators.",
    },
    {
        question: "Can I export my expense history?",
        answer: "Yes, you can export your data at any time in CSV, PDF, or Excel formats. Pro users also have access to advanced reporting and automated monthly summaries.",
    },
    {
        question: "How do team permissions work?",
        answer: "You can invite team members as Admins (full control), Editors (can add/edit transactions), or Viewers (read-only). This ensures everyone has the access they need without compromising security.",
    },
    {
        question: "What's the difference between Free and Pro?",
        answer: "The Free plan is great for individuals with up to 2 accounts. Pro offers unlimited accounts, full team collaboration, advanced future scheduling, and complete audit history for all transactions.",
    },
];

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                    <p className="text-lg text-gray-600">
                        Everything you need to know about ExpenseFlow and how it works.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-100 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                            >
                                <span className="font-semibold text-gray-900">{faq.question}</span>
                                <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${activeIndex === index ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
