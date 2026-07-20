"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Zap, PenTool, Sparkles, Paperclip } from 'lucide-react';
import Link from 'next/link';
import { heroContent } from '@/lib/constants';
import MeshText from './MeshText';
import ShinyPill from './ShinyPill';

const monochromeGrain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.25'/%3E%3C/svg%3E")`;
const darkGrain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4' mix-blend-mode='overlay'/%3E%3C/svg%3E")`;
const paperGrid = `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`;
const paperLines = `linear-gradient(transparent 90%, rgba(100,100,100,0.3) 90%)`;

import ParticleImage from './ParticleImage';
import ChromaticWaves from './ChromaticWaves';

const FIGMA_LOGO_URI = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2038%2057%22%3E%0A%20%20%3Cpath%20fill%3D%22%231ABCFE%22%20d%3D%22M19%2028.5a9.5%209.5%200%201%201%2019%200%209.5%209.5%200%200%201-19%200z%22%2F%3E%0A%20%20%3Cpath%20fill%3D%22%230ACF83%22%20d%3D%22M0%2047.5A9.5%209.5%200%200%201%209.5%2038H19v9.5a9.5%209.5%200%201%201-19%200z%22%2F%3E%0A%20%20%3Cpath%20fill%3D%22%23A259FF%22%20d%3D%22M0%2028.5A9.5%209.5%200%200%201%209.5%2019H19v19H9.5A9.5%209.5%200%200%201%200%2028.5z%22%2F%3E%0A%20%20%3Cpath%20fill%3D%22%23F24E1E%22%20d%3D%22M0%209.5A9.5%209.5%200%200%201%209.5%200H19v19H9.5A9.5%209.5%200%200%201%200%209.5z%22%2F%3E%0A%20%20%3Cpath%20fill%3D%22%23FF7262%22%20d%3D%22M19%200h9.5a9.5%209.5%200%201%201%200%2019H19V0z%22%2F%3E%0A%3C%2Fsvg%3E';
const HEART_SVG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ff4d4d%22%3E%3Cpath%20d%3D%22M12%2021.35l-1.45-1.32C5.4%2015.36%202%2012.28%202%208.5%202%205.42%204.42%203%207.5%203c1.74%200%203.41.81%204.5%202.09C13.09%203.81%2014.76%203%2016.5%203%2019.58%203%2022%205.42%2022%208.5c0%203.78-3.4%206.86-8.55%2011.54L12%2021.35z%22%2F%3E%3C%2Fsvg%3E';
const STAR_SVG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23ffd700%22%3E%3Cpath%20d%3D%22M12%2017.27L18.18%2021l-1.64-7.03L22%209.24l-7.19-.61L12%202%209.19%208.63%202%209.24l5.46%204.73L5.82%2021z%22%2F%3E%3C%2Fsvg%3E';
const LIGHTNING_SVG = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%2300ccff%22%3E%3Cpath%20d%3D%22M13%202v10h5L8%2022v-10H3L13%202z%22%2F%3E%3C%2Fsvg%3E';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const CYCLER_WORDS = ["STRATEGIC", "FULL-STACK", "CREATIVE", "DATA-DRIVEN", "AI-DRIVEN"];

function WordCycler() {
  const [displayText, setDisplayText] = useState(CYCLER_WORDS[0]);

  useEffect(() => {
    let cycleInterval: any;
    let scrambleInterval: any;
    let currentIndex = 0;

    cycleInterval = setInterval(() => {
      // Pick a random word that isn't the current one
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * CYCLER_WORDS.length);
      } while (nextIndex === currentIndex && CYCLER_WORDS.length > 1);
      
      const targetWord = CYCLER_WORDS[nextIndex];
      const prevWord = CYCLER_WORDS[currentIndex];
      const maxLength = Math.max(prevWord.length, targetWord.length);
      
      let iteration = 0;
      clearInterval(scrambleInterval); 
      
      scrambleInterval = setInterval(() => {
        setDisplayText(() => {
          let text = "";
          for (let i = 0; i < maxLength; i++) {
            if (i < iteration) {
              text += targetWord[i] || "";
            } else {
              text += CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          }
          return text;
        });

        iteration += 0.5; 
        
        if (iteration >= maxLength) {
          clearInterval(scrambleInterval);
          setDisplayText(targetWord);
          currentIndex = nextIndex;
        }
      }, 40);

    }, 10000); // Exactly every 10 seconds

    return () => {
      clearInterval(cycleInterval);
      clearInterval(scrambleInterval);
    };
  }, []);

  return <span className="tracking-[0.07em] inline-block">{displayText}</span>;
}

type AnimationState = 'idle' | 'clicked' | 'active' | 'fading-out';

export default function Hero() {
  const [logoPos, setLogoPos] = useState({ x: 0, y: 0 });
  const [animState, setAnimState] = useState<AnimationState>('idle');
  const [meshFontSize, setMeshFontSize] = useState(220);

  useEffect(() => {
    const updateSize = () => {
      // The word 'PRODUCT' takes up roughly 6.5x its font-size in width
      // This ensures it stays within the screen boundary on any device
      const maxFitSize = window.innerWidth / 6.5;
      setMeshFontSize(Math.min(220, maxFitSize)); 
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const triggerEasterEgg = () => {
    if (animState !== 'idle') return;
    setAnimState('clicked');
    
    setTimeout(() => {
      setAnimState('active'); // Mesh comes up, PR/DUCT fly out
      
      setTimeout(() => {
        setAnimState('fading-out'); // Mesh fades out, PR/DUCT fly in
        
        setTimeout(() => {
          setAnimState('idle'); // Cleanup
        }, 1500); // Fade duration
      }, 8000); // Active duration
    }, 1000); // Clicked pause
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLogoPos({
        x: (Math.random() - 0.5) * 40,
        y: (Math.random() - 0.5) * 40
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const particlePositions = [
    { top: "10%", left: "5%", size: 80, scale: 0.6, uri: STAR_SVG, mobileShow: true },
    { top: "60%", right: "8%", size: 120, scale: 0.8, uri: FIGMA_LOGO_URI, mobileShow: true },
    { bottom: "15%", left: "15%", size: 100, scale: 0.7, uri: FIGMA_LOGO_URI, mobileShow: false },
    { top: "25%", right: "20%", size: 60, scale: 0.5, uri: HEART_SVG, mobileShow: false },
    { bottom: "35%", right: "25%", size: 90, scale: 0.6, uri: LIGHTNING_SVG, mobileShow: false },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 bg-background text-foreground">
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen opacity-70">
         <ChromaticWaves 
           frequency={5} 
           cellSize={5} 
           gamma={9} 
           paletteBias={-6} 
           bgColor="#000000" 
           colors={animState !== 'idle' ? ['#ff6600', '#ffaa00', '#ffffff'] : ['#ffffff', '#cccccc', '#666666']} 
         />
      </div>

      <div className={`absolute inset-0 transition-all duration-1000 pointer-events-none z-10 ${animState !== 'idle' ? 'sepia hue-rotate-[-30deg] saturate-200' : ''}`}>
        {particlePositions.map((pos, i) => (
          <div 
            key={i}
            className={`absolute opacity-100 pointer-events-none ${pos.mobileShow ? 'block' : 'hidden md:block'}`}
            style={{ 
              top: pos.top, 
              left: pos.left, 
              right: pos.right,
              bottom: pos.bottom,
              width: pos.size, 
              height: pos.size 
            }}
          >
             <ParticleImage
                 imageConfig={{
                     mode: "fit",
                     image: pos.uri,
                     scale: pos.scale,
                     widthPx: pos.size,
                     heightPx: pos.size,
                     sizeUnit: "%",
                     widthPct: 100,
                     heightPct: 100
                 }}
                 particleCount={40} 
                 particleColor="original"
                 singleColor="#ffffff"
                 hoverEnabled={false}
                 repulsionConfig={{
                     repulsionForce: 4,
                     repulsionRadius: 60,
                     repulsionMode: "outside"
                 }}
                 style={{ pointerEvents: 'auto' }}
             />
          </div>
        ))}
      </div>

      <div className="z-20 max-w-7xl mx-auto w-full flex flex-col items-center text-center relative pointer-events-none">
        
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 inline-block px-4 py-1.5 rounded-full border border-foreground/10 bg-background backdrop-blur-sm pointer-events-auto"
        >
          <span className="text-xs md:text-sm font-medium tracking-wide text-secondary uppercase text-pixel">David Oloniyo — Est. 2023</span>
        </motion.div>

        {/* Main Headline */}
        <div className="flex flex-col items-center gap-1 md:gap-2 relative w-full pointer-events-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="text-4xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-foreground flex flex-col items-center leading-none w-full"
          >
            <span className="text-pixel text-2xl md:text-5xl lg:text-7xl text-foreground mb-4 md:mb-8 h-[1em] flex items-center justify-center">
              <WordCycler />
            </span>
            
            <div className="relative w-full flex flex-col justify-center items-center mt-4">
              <motion.div 
                 layout
                 animate={{ height: (animState === 'idle' || animState === 'clicked' || animState === 'fading-out') ? 'auto' : 250 }}
                 transition={{ duration: 0.8, delay: animState === 'fading-out' ? 0.3 : 0, type: "spring" }}
                 className="relative w-full flex flex-col justify-center items-center overflow-visible"
              >
                <div className="relative flex items-center flex-wrap justify-center w-full max-w-4xl px-4 h-16 md:h-32">
                  <motion.span 
                    animate={animState === 'active' ? { x: -100, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: animState === 'fading-out' ? 0.4 : 0, ease: "easeInOut" }}
                    className={`transition-colors duration-1000 relative z-10 ${animState === 'clicked' || animState === 'active' ? 'text-[#ff6600]' : 'text-foreground'}`}
                  >
                    PR
                  </motion.span>
                  
                  <motion.button 
                    animate={animState === 'active' ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: animState === 'fading-out' ? 0.4 : 0, ease: "easeInOut" }}
                    onClick={triggerEasterEgg}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                    className={`inline-flex items-center px-1 md:px-2 w-16 md:w-40 lg:w-48 h-10 md:h-24 lg:h-32 rounded-full mx-1 md:mx-2 relative z-10 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-1000 outline-none focus:outline-none bg-foreground ${animState === 'clicked' || animState === 'active' ? 'justify-end' : 'justify-start'}`}
                  >
                    <motion.div 
                      animate={animState === 'clicked' || animState === 'active' ? { x: 0 } : { x: [2, 16, 2] }}
                      transition={{ repeat: animState === 'idle' ? Infinity : 0, repeatDelay: 3, duration: 1, ease: "easeInOut" }}
                      className={`w-8 h-8 md:w-20 md:h-20 lg:w-28 lg:h-28 rounded-full shadow-md transition-colors duration-1000 ${animState === 'clicked' || animState === 'active' ? 'bg-[#ff6600]' : 'bg-background'}`}
                    />
                  </motion.button>
                  <motion.span 
                    animate={animState === 'active' ? { x: 100, opacity: 0 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: animState === 'fading-out' ? 0.4 : 0, ease: "easeInOut" }}
                    className={`transition-colors duration-1000 relative z-10 ${animState === 'clicked' || animState === 'active' ? 'text-[#ff6600]' : 'text-foreground'}`}
                  >
                    DUCT
                  </motion.span>
                </div>

                <AnimatePresence>
                  {(animState === 'active' || animState === 'fading-out') && (
                    <motion.div 
                      key="active-easter-egg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={animState === 'fading-out' ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: animState === 'fading-out' ? 1.0 : 0.8, ease: "easeInOut" }}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] max-w-[1400px] h-[600px] flex items-center justify-center z-50 pointer-events-none"
                    >
                      <MeshText text="PRODUCT" color="#ff6600" force={45} font={{ fontSize: meshFontSize, variant: 'Black' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

              <motion.span layout className="flex items-center justify-center mt-8 md:mt-10 flex-wrap relative z-40 transition-all duration-700 max-w-full px-2">
                <span 
                   className={`text-zinc-900 shadow-lg px-2 md:px-6 py-2 md:py-5 -rotate-6 font-serif font-black text-3xl md:text-6xl lg:text-[7rem] relative z-10 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-blue-400' : 'bg-zinc-100'}`}
                   style={{ 
                     backgroundImage: monochromeGrain,
                     clipPath: 'polygon(2% 3%, 98% 0%, 100% 95%, 0% 100%)'
                   }}
                >
                  D
                </span>
                <span 
                   className={`shadow-sm rounded-full w-10 h-10 md:w-20 md:h-20 lg:w-28 lg:h-28 flex items-center justify-center rotate-3 font-sans font-black text-2xl md:text-5xl lg:text-7xl relative -ml-1 md:-ml-4 z-20 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-red-500 text-white' : 'bg-zinc-900 text-zinc-100'}`}
                   style={{ backgroundImage: darkGrain }}
                >
                  E
                  <div className="absolute -top-1 md:-top-2 left-1/2 -translate-x-1/2 w-4 h-2 md:w-8 md:h-4 bg-zinc-300/50 backdrop-blur-md shadow-sm rotate-[-8deg] border border-zinc-400/30" />
                </span>
                <span 
                   className={`text-zinc-800 shadow-md px-3 md:px-6 py-2 md:py-4 rotate-[-12deg] font-mono font-bold text-3xl md:text-6xl lg:text-[7rem] border border-zinc-300 relative -ml-1 md:-ml-3 z-10 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-yellow-300' : 'bg-zinc-50'}`}
                   style={{ 
                     backgroundImage: paperGrid, 
                     backgroundSize: '12px 12px',
                     clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 20% 100%, 0% 50%)'
                   }}
                >
                  <div className="absolute inset-0" style={{ backgroundImage: monochromeGrain, opacity: 0.5, mixBlendMode: 'multiply' }} />
                  <span className="relative z-10 pl-1 md:pl-4">S</span>
                  <div className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 w-1 h-1 md:w-3 md:h-3 rounded-full bg-[#000] shadow-inner" />
                </span>
                <span 
                   className={`backdrop-blur-sm text-zinc-900 shadow-sm px-1 md:px-3 py-3 md:py-8 rotate-[8deg] flex items-center justify-center relative border border-zinc-400/50 -ml-1 md:-ml-2 z-30 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-green-400' : 'bg-zinc-300/80'}`}
                   style={{ 
                     backgroundImage: monochromeGrain,
                     clipPath: 'polygon(0 2%, 100% 0, 95% 98%, 5% 100%)'
                   }}
                >
                   <PenTool className="w-5 h-5 md:w-12 md:h-12 lg:w-16 lg:h-16 text-zinc-800 transform rotate-45 relative z-10" strokeWidth={1.5} />
                </span>
                <span 
                   className={`text-zinc-900 shadow-2xl px-2 md:px-4 pt-2 md:pt-4 pb-4 md:pb-8 rotate-[-4deg] font-sans font-black text-3xl md:text-5xl lg:text-7xl border border-zinc-200 relative -ml-1 md:-ml-4 z-20 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-pink-300' : 'bg-white'}`}
                   style={{ backgroundImage: monochromeGrain }}
                >
                  <div className={`px-1 md:px-3 py-0.5 md:py-2 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-zinc-900 text-pink-200' : 'bg-zinc-800 text-zinc-100'}`} style={{ backgroundImage: darkGrain }}>
                     G
                  </div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                     <Zap className="w-2 h-2 md:w-4 md:h-4 text-zinc-400 fill-zinc-400" />
                  </div>
                </span>
                <span 
                   className={`text-zinc-200 shadow-xl w-10 h-12 md:w-20 md:h-24 lg:w-28 lg:h-32 flex items-center justify-center rotate-[10deg] font-serif text-3xl md:text-6xl lg:text-[7rem] relative -ml-1 md:-ml-4 z-10 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-purple-600' : 'bg-[#1a1a1a]'}`}
                   style={{ 
                     backgroundImage: darkGrain,
                     clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                   }}
                >
                  N
                </span>
                <span 
                   className={`text-zinc-800 shadow-lg px-3 md:px-6 py-1 md:py-4 rotate-[-5deg] border-l-[3px] border-zinc-400 font-serif font-medium text-3xl md:text-6xl lg:text-[7rem] relative -ml-1 md:-ml-3 z-30 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-orange-300' : 'bg-[#fcfcfc]'}`}
                   style={{ backgroundImage: paperLines, backgroundSize: '100% 1.5rem', backgroundPosition: '0 0.2rem' }}
                >
                  <div className="absolute inset-0" style={{ backgroundImage: monochromeGrain, opacity: 0.5, mixBlendMode: 'multiply' }} />
                  <Paperclip className="absolute -top-2 md:-top-3 -right-1 md:-right-2 w-3 h-3 md:w-6 md:h-6 text-zinc-500 transform rotate-45 z-20" />
                  <span className="relative z-10">E</span>
                </span>
                <span 
                   className={`text-zinc-900 shadow-md px-2 md:px-5 py-2 md:py-4 rotate-[6deg] font-serif italic font-bold text-3xl md:text-6xl lg:text-[7rem] border-2 border-dashed border-zinc-500 -ml-1 md:-ml-4 z-20 transition-colors duration-1000 ${animState !== 'idle' ? 'bg-teal-400' : 'bg-zinc-200'}`}
                   style={{ backgroundImage: monochromeGrain }}
                >
                  R
                </span>
              </motion.span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-12 text-xs md:text-lg text-foreground font-bold max-w-2xl px-4 text-pixel uppercase tracking-widest leading-loose drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] pointer-events-auto"
        >
          {heroContent.subheadline}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex flex-col md:flex-row gap-4 items-center pointer-events-auto"
        >
           <Link 
              href="#work"
              className="px-6 md:px-8 py-3 md:py-4 bg-foreground text-background font-semibold rounded-full hover:scale-105 transition-transform flex items-center gap-2 text-xs md:text-sm text-pixel uppercase tracking-widest"
            >
              See my work <ArrowUpRight size={20} />
            </Link>
        </motion.div>

      </div>
    </section>
  );
}
