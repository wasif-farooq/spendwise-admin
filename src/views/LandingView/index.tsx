import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Pricing } from './sections/Pricing';
import { Organization } from './sections/Organization';
import { HowItWorks } from './sections/HowItWorks';
import { Testimonials } from './sections/Testimonials';
import { FAQ } from './sections/FAQ';
import { CallToAction } from './sections/CallToAction';

export const LandingView = () => {
    return (
        <>
            <Hero />
            <Features />
            <Organization />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CallToAction />
        </>
    );
};
