"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { portfolioItems } from '@/lib/constants';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrambleText from './ScrambleText';

function CaseStudyCard({ item, index }: { item: any, index: number }) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/case-study/${item.slug}`} className="block w-full h-full p-4 md:p-6 border-2 border-dashed border-zinc-200/50 hover:border-zinc-200 rounded-3xl transition-colors duration-300 bg-background/50 backdrop-blur-sm">
        <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-foreground/5 border border-foreground/10 group-hover:shadow-2xl transition-all duration-500">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.title}
              className="object-cover w-full h-full transform group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary">No Image</div>
          )}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500 z-10 pointer-events-none" />
        </div>
        
        <div className="mt-8 flex flex-col relative z-20">
          <div className="text-sm font-bold text-accent text-pixel mb-3 uppercase tracking-widest">{item.category}</div>
          <h3 className="text-3xl font-bold text-foreground mb-3 flex items-center">
            {isHovered ? (
               <ScrambleText text={item.title} isActive={true} speed={3.0} />
            ) : (
               <span>{item.title}</span>
            )}
          </h3>
          <p className="text-secondary text-lg mb-2 line-clamp-2">{item.summary}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudyGrid() {
  return (
    <section className="pt-32 pb-16 px-4" id="work">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Selected Work</h2>
          <p className="text-secondary mt-4 text-lg">Case studies detailing my process and impact.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {portfolioItems.map((item: any, index: number) => (
             <CaseStudyCard item={item} index={index} key={item.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
