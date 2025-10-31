import React, { useState } from 'react';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { RESUME_URL } from '../constants';

interface HeaderProps {
    onNavigate: (page: 'home' | 'about') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', action: () => onNavigate('home') },
        { name: 'About', action: () => onNavigate('about') },
        { name: 'Resume', action: () => window.open(RESUME_URL, '_blank') },
    ];

    const handleLinkClick = (action: () => void) => {
        setIsMenuOpen(false);
        action();
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]">
                <div className="container mx-auto px-6 py-5">
                    <div className="flex items-center justify-between">
                        <button onClick={() => onNavigate('home')} className="font-bold text-xl tracking-wider text-white">
                            OD.
                        </button>
                        <nav className="hidden md:flex items-center space-x-4">
                            {navItems.map((item) => (
                                <button key={item.name} onClick={item.action} className="px-3 py-2 text-sm text-zinc-400 hover:text-white transition-colors">
                                    {item.name}
                                </button>
                            ))}
                        </nav>
                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-50 relative">
                                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            
            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-[#0A0A0A] z-40 transform transition-transform duration-500 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
                <nav className="flex flex-col items-center justify-center h-full space-y-8">
                    {navItems.map((item) => (
                        <button key={item.name} onClick={() => handleLinkClick(item.action)} className="text-4xl font-bold text-zinc-300 hover:text-white transition-colors">
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Header;