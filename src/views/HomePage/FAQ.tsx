import { FAQItem } from '@ui';
import { Block, Container, Heading, Text } from '@shared';
import { useFAQ } from '@/hooks/features/landing/useFAQ';

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
    const { activeIndex, toggleFAQ } = useFAQ();

    return (
        <Block as="section" id="faq" className="py-20 bg-white">
            <Container className="max-w-3xl mx-auto">
                <Block className="text-center mb-16">
                    <Heading as="h2" weight="bold" color="text-gray-900" className="text-3xl mb-4">Frequently Asked Questions</Heading>
                    <Text size="lg" color="text-gray-600">
                        Everything you need to know about SpendWise and how it works.
                    </Text>
                </Block>

                <Block className="space-y-4">
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={activeIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </Block>
            </Container>
        </Block>
    );
};

