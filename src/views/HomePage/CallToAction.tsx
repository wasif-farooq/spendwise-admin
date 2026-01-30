import { Button } from '@ui';
import { AnimatedBlock } from '@shared';

export const CallToAction = () => {
    return (
        <section className="py-20 bg-primary relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <AnimatedBlock
                        as="h2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-white mb-6"
                    >
                        Ready to simplify your expense tracking?
                    </AnimatedBlock>
                    <AnimatedBlock
                        as="p"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-white/80 mb-10"
                    >
                        Join thousands of individuals and teams who use SpendWise to take control of their financial future.
                    </AnimatedBlock>

                    <AnimatedBlock
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <div className="w-full sm:w-auto flex-grow max-w-md">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-6 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                            />
                        </div>
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                            Get Started
                        </Button>
                    </AnimatedBlock>

                    <p className="mt-6 text-sm text-white/60">
                        No credit card required. 14-day free trial.
                    </p>
                </div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </section>
    );
};
