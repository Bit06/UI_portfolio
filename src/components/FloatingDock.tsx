"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import ScrambleText from './ScrambleText';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Work', href: '/#work' },
  { label: 'Galleries', href: '/galleries' },
  { label: 'About', href: '/about' },
];

export default function FloatingDock() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(
    pathname === '/galleries' ? 2 : pathname === '/about' ? 3 : 0
  );

  return (
    <div className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-fit">
      <div className="flex items-center justify-between px-1 md:px-2 py-1.5 md:py-2 rounded-full shadow-2xl relative bg-background border border-foreground/20 backdrop-blur-md overflow-hidden">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;
          return (
            <Link 
              key={index} 
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className={`
                relative px-3 md:px-5 py-2 rounded-full flex items-center justify-center group outline-none h-10 md:h-11 transition-all duration-300
                ${isActive ? 'text-background' : 'text-foreground/70 hover:text-foreground'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute inset-0 bg-foreground rounded-full z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 md:gap-2 text-[10px] md:text-sm font-bold tracking-widest text-pixel">
                {Icon && (
                  <span className={`flex items-center justify-center ${isActive ? '' : 'opacity-70 group-hover:opacity-100'} transition-opacity`}>
                     <Icon size={16} strokeWidth={2.5} className="mb-[2px]" />
                  </span>
                )}
                <ScrambleText text={item.label} isActive={isActive} />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
