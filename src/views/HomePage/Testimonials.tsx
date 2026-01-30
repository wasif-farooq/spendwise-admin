import { Grid, Block, Container, Heading, Text, Flex } from '@shared';
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
        <Block as="section" id="testimonials" className="py-20 bg-gray-50">
            <Container>
                <Block className="text-center max-w-3xl mx-auto mb-16">
                    <Heading as="h2" weight="bold" color="text-gray-900" className="text-3xl mb-4">Trusted by Individuals & Teams</Heading>
                    <Text size="lg" color="text-gray-600">
                        See what our users have to say about their experience with SpendWise.
                    </Text>
                </Block>

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
                <Flex className="mt-20 flex-wrap justify-center items-center gap-12 opacity-40 grayscale">
                    <Text className="text-2xl font-black tracking-tighter text-gray-400">TECHFLOW</Text>
                    <Text className="text-2xl font-black tracking-tighter text-gray-400">GREENEARTH</Text>
                    <Text className="text-2xl font-black tracking-tighter text-gray-400">DESIGNPRO</Text>
                    <Text className="text-2xl font-black tracking-tighter text-gray-400">FINSYNC</Text>
                </Flex>
            </Container>
        </Block>
    );
};
