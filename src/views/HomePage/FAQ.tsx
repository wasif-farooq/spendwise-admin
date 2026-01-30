import { useState } from 'react';
import { FAQItem } from '@ui';

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
                        Everything you need to know about SpendWise and how it works.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={activeIndex === index}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
