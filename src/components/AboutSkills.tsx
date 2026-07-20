"use client";
import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { PenTool, Globe, Sparkles, Fingerprint } from 'lucide-react';
import { aboutContent } from '@/lib/constants';
import PhysicsSkills from './PhysicsSkills';

const revealVariants: Variants = {
  hidden: { opacity: 0.2, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const RevealWord = ({ children }: { children: React.ReactNode }) => (
  <motion.span variants={revealVariants} className="inline-block mr-2">
    {children}
  </motion.span>
);

const RevealIcon = ({ children }: { children: React.ReactNode }) => (
  <motion.span variants={revealVariants} className="inline-block align-middle mx-1 md:mx-2">
    {children}
  </motion.span>
);

export default function AboutSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const skills = aboutContent.skills;

  return (
    <section className="relative px-6 overflow-hidden" id="about">
      <div className="max-w-6xl mx-auto flex flex-col gap-20 relative">

        {/* Floating Pixel SVGs globally scattered */}
        <div className="absolute top-10 right-4 md:right-10 w-8 h-8 md:w-12 md:h-12 animate-pulse opacity-80 rotate-12" style={{ animationDuration: '4s' }}>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00ccff"><path d="M13 2v10h5L8 22v-10H3L13 2z"/></svg>
        </div>
        <div className="absolute top-1/2 left-0 md:-left-10 w-6 h-6 md:w-10 md:h-10 animate-bounce opacity-70 rotate-[-15deg]" style={{ animationDelay: '1.5s' }}>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffd700"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
        </div>

        {/* Inline Icon Typography - Scroll Reveal with Combined Copy */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={{
            visible: { transition: { staggerChildren: 0.04 } },
            hidden: {}
          }}
          className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] font-semibold leading-[1.3] md:leading-[1.4] tracking-tight text-foreground max-w-7xl mx-auto mt-12"
        >
          <RevealWord>Hi,</RevealWord> <RevealWord>I</RevealWord> <RevealWord>am</RevealWord>
          <RevealIcon>
            <span className="inline-block w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-[10px] md:rounded-2xl overflow-hidden border-2 border-white/10 shadow-xl relative top-[-2px] md:top-[-4px]">
              <img src="/images/Profile Image.jpg" alt="David Oloniyo" className="w-full h-full object-cover" />
            </span>
          </RevealIcon>
          <RevealWord>David</RevealWord> <RevealWord>Oloniyo</RevealWord>
          <RevealIcon>
            <span className="inline-block text-3xl sm:text-4xl md:text-6xl text-foreground">✌️</span>
          </RevealIcon>
          <RevealWord>,</RevealWord> <RevealWord>practicing</RevealWord> <RevealWord>design</RevealWord> <RevealWord>since</RevealWord>
          <RevealIcon>
            <span className="inline-block px-3 py-1 sm:px-4 sm:py-2 md:px-5 md:py-2 border-2 border-foreground/20 rounded-full font-bold text-2xl sm:text-3xl md:text-5xl text-foreground tracking-tight shadow-sm hover:scale-105 transition-transform">2023</span>
          </RevealIcon>
          <RevealWord>focused</RevealWord> <RevealWord>on</RevealWord> <RevealWord>designing</RevealWord>
          <RevealIcon>
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform"><PenTool className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /></span>
          </RevealIcon>
          <RevealWord>and</RevealWord> <RevealWord>building</RevealWord> <RevealWord>digital</RevealWord> <RevealWord>product</RevealWord>
          <RevealIcon>
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform"><Globe className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /></span>
          </RevealIcon>
          <RevealWord>,</RevealWord> <RevealWord>brands</RevealWord>
          <RevealIcon>
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform"><Fingerprint className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /></span>
          </RevealIcon>
          <RevealWord>and</RevealWord> <RevealWord>experiences</RevealWord>
          <RevealIcon>
            <span className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-foreground text-background shadow-lg hover:scale-110 transition-transform"><Sparkles className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" /></span>
          </RevealIcon>
          <RevealWord>.</RevealWord>

          <br /><br />

          <RevealWord>I'm</RevealWord> <RevealWord>a</RevealWord> <RevealWord>designer</RevealWord> <RevealWord>driven</RevealWord> <RevealWord>by</RevealWord> <RevealWord>one</RevealWord> <RevealWord>core</RevealWord> <RevealWord>belief:</RevealWord> <RevealWord>technology</RevealWord> <RevealWord>should</RevealWord> <RevealWord>be</RevealWord> <RevealWord>a</RevealWord> <RevealWord>bridge,</RevealWord> <RevealWord>not</RevealWord> <RevealWord>a</RevealWord> <RevealWord>barrier.</RevealWord> <RevealWord>My</RevealWord> <RevealWord>passion</RevealWord> <RevealWord>is</RevealWord> <RevealWord>to</RevealWord> <RevealWord>find</RevealWord> <RevealWord>the</RevealWord> <RevealWord>frustration</RevealWord> <RevealWord>in</RevealWord> <RevealWord>everyday</RevealWord> <RevealWord>systems</RevealWord> <RevealWord>and</RevealWord> <RevealWord>design</RevealWord> <RevealWord>a</RevealWord> <RevealWord>solution</RevealWord> <RevealWord>that</RevealWord> <RevealWord>feels</RevealWord> <RevealWord>effortless</RevealWord> <RevealWord>and</RevealWord> <RevealWord>logical.</RevealWord> <RevealWord>My</RevealWord> <RevealWord>process</RevealWord> <RevealWord>is</RevealWord> <RevealWord>built</RevealWord> <RevealWord>on</RevealWord> <RevealWord>empathy</RevealWord> <RevealWord>and</RevealWord> <RevealWord>data.</RevealWord> <RevealWord>I</RevealWord> <RevealWord>love</RevealWord> <RevealWord>digging</RevealWord> <RevealWord>into</RevealWord> <RevealWord>a</RevealWord> <RevealWord>problem,</RevealWord> <RevealWord>understanding</RevealWord> <RevealWord>real</RevealWord> <RevealWord>human</RevealWord> <RevealWord>needs,</RevealWord> <RevealWord>and</RevealWord> <RevealWord>iterating</RevealWord> <RevealWord>until</RevealWord> <RevealWord>the</RevealWord> <RevealWord>solution</RevealWord> <RevealWord>truly</RevealWord> <RevealWord>works.</RevealWord>
        </motion.div>

        {/* Physics Matter.js Pills */}
        <div className="mt-8 mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xl md:text-2xl text-foreground font-medium mb-12"
          >
            with my skills in:
          </motion.p>
          <PhysicsSkills />
        </div>
      </div>
    </section>
  );
}
