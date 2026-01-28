import { Link } from 'react-router-dom';
import { Menu, X, CreditCard } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { toggleMobileMenu, setMobileMenu } from '../store/uiSlice';
import { Button } from './Button';

export const Navbar = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.ui.isMobileMenuOpen);

    const closeMenu = () => dispatch(setMobileMenu(false));

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center" onClick={closeMenu}>
                        <CreditCard className="h-8 w-8 text-primary" />
                        <span className="ml-2 text-xl font-bold text-gray-900">ExpenseFlow</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-primary transition-colors">Features</a>
                        <a href="#pricing" className="text-gray-600 hover:text-primary transition-colors">Pricing</a>
                        <a href="#testimonials" className="text-gray-600 hover:text-primary transition-colors">Testimonials</a>
                        <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQ</a>
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Login</Button>
                        </Link>
                        <Link to="/register">
                            <Button size="sm">Start Free Trial</Button>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => dispatch(toggleMobileMenu())} className="text-gray-600">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <a href="#features" onClick={closeMenu} className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">Features</a>
                        <a href="#pricing" onClick={closeMenu} className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">Pricing</a>
                        <a href="#testimonials" onClick={closeMenu} className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">Testimonials</a>
                        <a href="#faq" onClick={closeMenu} className="block px-3 py-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded-md">FAQ</a>
                        <div className="pt-4 flex flex-col space-y-2 px-3">
                            <Link to="/login" onClick={closeMenu}>
                                <Button variant="outline" className="w-full justify-center">Login</Button>
                            </Link>
                            <Link to="/register" onClick={closeMenu}>
                                <Button className="w-full justify-center">Start Free Trial</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
