import { Grid } from '@shared';
import { TestimonialCard } from '@ui';

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

                <Grid cols={1} className="md:grid-cols-3" gap={8}>
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard
                            key={index}
                            index={index}
                            {...testimonial}
                        />
                    ))}
                </Grid>

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
