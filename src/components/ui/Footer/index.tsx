import { CreditCard, Twitter, Linkedin, Github } from 'lucide-react';
import { Grid, Flex, Block } from '@shared';

export const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Grid cols={1} className="md:grid-cols-4" gap={8}>
                    <Block className="col-span-1 md:col-span-1">
                        <Flex align="center" className="mb-4">
                            <CreditCard className="h-8 w-8 text-primary" />
                            <span className="ml-2 text-xl font-bold text-white">SpendWise</span>
                        </Flex>
                        <p className="text-sm text-gray-400">
                            Smart multi-account expense tracking for individuals and teams. Take control of your finances today.
                        </p>
                    </Block>

                    <Block>
                        <h3 className="text-white font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                            <li><a href="#security" className="hover:text-primary transition-colors">Security</a></li>
                            <li><a href="#changelog" className="hover:text-primary transition-colors">Changelog</a></li>
                        </ul>
                    </Block>

                    <Block>
                        <h3 className="text-white font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                            <li><a href="#careers" className="hover:text-primary transition-colors">Careers</a></li>
                            <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
                            <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
                        </ul>
                    </Block>

                    <Block>
                        <h3 className="text-white font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#terms" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#cookies" className="hover:text-primary transition-colors">Cookie Policy</a></li>
                        </ul>
                    </Block>
                </Grid>

                <Block className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} SpendWise. All rights reserved.
                    </p>
                    <Flex gap={6} className="mt-4 md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="h-5 w-5" />
                        </a>
                    </Flex>
                </Block>
            </div>
        </footer>
    );
};
