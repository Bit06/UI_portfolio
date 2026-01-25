import React from 'react';
import { DribbbleIcon } from './icons/DribbbleIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';
// import { RESUME_URL } from '../constants';

interface FooterProps {
    onNavigate: (page: 'home' | 'about') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navItems = [
      { name: 'Home', action: () => onNavigate('home') },
      { name: 'About', action: () => onNavigate('about') },
      // { name: 'Resume', action: () => window.open(RESUME_URL, '_blank') },
  ];

  return (
    <footer className="border-t border-zinc-900 mt-24">
        <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
                <div className="text-zinc-500 text-sm">&copy; 2025 Oloniyo David</div>
                
                <div className="flex items-center space-x-6">
                    {navItems.map((item) => (
                        <button key={item.name} onClick={item.action} className="text-sm text-zinc-400 hover:text-white transition-colors">
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-4">
                    <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="text-zinc-500 hover:text-white transition-colors"><DribbbleIcon /></a>
                    <a href="https://www.linkedin.com/in/davenife" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-zinc-500 hover:text-white transition-colors"><LinkedInIcon /></a>
                </div>
            </div>
        </div>
    </footer>
  );
};

export default Footer;