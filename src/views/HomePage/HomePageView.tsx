import { Hero } from './Hero';
import { Features } from './Features';
import { Pricing } from './Pricing';
import { Organization } from './Organization';
import { HowItWorks } from './HowItWorks';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { CallToAction } from './CallToAction';

export const HomePageView = () => {
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

export default HomePageView;
