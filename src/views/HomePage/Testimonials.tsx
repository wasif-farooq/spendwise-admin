import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
    {
        quote: "SpendWise has completely changed how we manage our startup's burn rate. The multi-account tracking is a lifesaver.",
        author: "Sarah Jenkins",
        role: "Founder at TechFlow",
        avatar: "SJ",
    },
    {
        quote: "The audit trail feature gives us the transparency we need for our non-profit. Highly recommended for any organization.",
        author: "David Miller",
        role: "Director at GreenEarth",
        avatar: "DM",
    },
    {
        quote: "I finally have a clear view of my personal and business expenses in one place. The future scheduling is brilliant.",
        author: "Elena Rodriguez",
        role: "Freelance Designer",
        avatar: "ER",
    },
];

export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Individuals & Teams</h2>
                    <p className="text-lg text-gray-600">
                        See what our users have to say about their experience with SpendWise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
                        >
                            <Quote className="h-8 w-8 text-primary/10 absolute top-6 right-8" />
                            <p className="text-gray-600 italic mb-8 relative z-10">"{testimonial.quote}"</p>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                    {testimonial.avatar}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Trust Badges */}
                <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                    <div className="text-2xl font-black tracking-tighter text-gray-400">TECHFLOW</div>
                    <div className="text-2xl font-black tracking-tighter text-gray-400">GREENEARTH</div>
                    <div className="text-2xl font-black tracking-tighter text-gray-400">DESIGNPRO</div>
                    <div className="text-2xl font-black tracking-tighter text-gray-400">FINSYNC</div>
                </div>
            </div>
        </section>
    );
};
