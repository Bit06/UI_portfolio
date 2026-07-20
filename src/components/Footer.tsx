"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Asterisk, MousePointer2 } from 'lucide-react';
import { RESUME_URL } from '@/lib/constants';
import ScrambleText from './ScrambleText';

const DribbbleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer: React.FC = () => {
  const [isEmailHovered, setIsEmailHovered] = useState(false);

  return (
    <footer className="relative bg-background pt-16 pb-8 overflow-hidden border-t border-zinc-900/50">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        
        {/* TOP SECTION: Massive Typography */}
        <div className="flex flex-col items-center justify-center text-center relative mb-16 md:mb-32">
           
           {/* Floating Labels */}
           <motion.div 
             className="absolute top-0 md:top-10 left-0 md:left-12 lg:left-24 text-zinc-500 font-pixel text-[10px] md:text-sm max-w-[120px] text-left hidden sm:block"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             WEB & APP<br/>DEVELOPMENT
           </motion.div>
           <motion.div 
             className="absolute top-20 md:top-48 right-0 md:right-12 lg:right-24 text-zinc-500 font-pixel text-[10px] md:text-sm max-w-[120px] text-right hidden sm:block"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             CUSTOM UI<br/>SOLUTIONS
           </motion.div>
           <motion.div 
             className="absolute bottom-10 left-10 md:left-32 text-zinc-500 font-pixel text-[10px] md:text-sm max-w-[120px] text-left hidden md:block"
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             SYSTEM INTEGRATION<br/>& ARCHITECTURE
           </motion.div>

           {/* Floating Pixel SVGs globally scattered */}
           <div className="absolute top-0 right-10 md:right-32 w-8 h-8 md:w-12 md:h-12 animate-bounce opacity-80" style={{ animationDuration: '3s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffd700"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
           </div>
           <div className="absolute bottom-10 left-4 md:left-20 w-6 h-6 md:w-10 md:h-10 animate-pulse opacity-80 rotate-12" style={{ animationDuration: '4s' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00ccff"><path d="M13 2v10h5L8 22v-10H3L13 2z"/></svg>
           </div>

           {/* Huge Interlocking Typography Block */}
           <h2 className="font-black text-[clamp(1.8rem,8vw,8rem)] leading-[0.9] tracking-tighter text-foreground flex flex-col items-center uppercase w-full mt-10 md:mt-0">
              
              <div className="flex items-center justify-center gap-1 md:gap-4 w-full">
                <span>LET'S BUILD</span>
              </div>
              
              <div className="flex items-center justify-center gap-1 md:gap-6 mt-1 md:mt-4 w-full text-zinc-400 relative">
                <span>SOMETHING</span>
                {/* Embedded Spinning Asterisk Icon */}
                <span className="flex items-center justify-center bg-zinc-900 text-zinc-100 rounded-sm md:rounded-xl w-[0.8em] h-[0.8em] rotate-[-5deg] shadow-lg border border-zinc-700 flex-shrink-0">
                   <Asterisk className="w-[0.5em] h-[0.5em] animate-[spin_10s_linear_infinite]" strokeWidth={2.5} />
                </span>
                
                <div className="absolute -top-6 -right-2 md:-right-8 w-6 h-6 md:w-8 md:h-8 animate-bounce opacity-90 rotate-[-15deg]" style={{ animationDelay: '1s' }}>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff4d4d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-1 md:gap-6 mt-1 md:mt-4 w-full text-foreground relative">
                <span>EXTRA</span>
                {/* Embedded Large Arrow Button */}
                <span className="flex items-center justify-center w-[0.8em] h-[0.8em] bg-foreground text-background rounded-full shadow-xl z-20 border-[0.05em] border-zinc-700 transform rotate-12 flex-shrink-0">
                   <ArrowUpRight className="w-[0.5em] h-[0.5em]" strokeWidth={3} />
                </span>
                <span>ORDINARY</span>
              </div>

           </h2>
           
           {/* Contact Email directly under typography */}
           <div 
              className="mt-12 md:mt-24 relative z-30 inline-block group"
              onMouseEnter={() => setIsEmailHovered(true)}
              onMouseLeave={() => setIsEmailHovered(false)}
           >
              <span className="text-zinc-500 font-pixel text-[10px] md:text-sm uppercase tracking-widest block mb-4">Contact me</span>
              <a href="mailto:david.oloniyio@gmail.com" className="inline-block text-foreground font-mono font-bold text-lg sm:text-xl md:text-3xl hover:text-zinc-400 transition-colors border-b-2 border-foreground hover:border-zinc-400 pb-1 break-all">
                <ScrambleText text="david.oloniyio@gmail.com" isActive={isEmailHovered} speed={2.5} />
              </a>
              
              {/* Floating retro cursor graphic */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4.0, ease: "easeInOut" }}
                className="absolute -right-10 md:-right-28 -bottom-12 md:-bottom-20 w-12 h-12 md:w-24 md:h-24 text-foreground pointer-events-none drop-shadow-2xl z-50"
              >
                <MousePointer2 strokeWidth={1.5} className="w-full h-full fill-foreground text-background rotate-[-30deg]" />
              </motion.div>
           </div>
        </div>

        {/* BOTTOM SECTION: Links & Copyright */}
        <div className="flex justify-end items-center mt-16 pt-8 border-t border-zinc-900/50">
           <div className="flex items-center gap-6">
             <a href="#" className="text-zinc-500 hover:text-foreground transition-colors">
                <span className="sr-only">Dribbble</span>
                <DribbbleIcon />
             </a>
             <a href="#" className="text-zinc-500 hover:text-foreground transition-colors">
                <span className="sr-only">LinkedIn</span>
                <LinkedInIcon />
             </a>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
