"use client";

import { useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import ScrambleText from "./ScrambleText";

interface ButtonInfo {
  label: string;
  type: "case-study" | "website-live" | "view-gallery";
  link?: string;
}

interface TimelineItem {
  year: string;
  project: string;
  buttons: ButtonInfo[];
  image: string;
  isMobile?: boolean;
  isContain?: boolean;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    year: "2026",
    project: "Chowcheck",
    buttons: [
      { label: "Case Study", type: "case-study", link: "/case-study/chowcheck" },
      { label: "Website Live", type: "website-live", link: "https://www.chowcheck.app/" }
    ],
    image: "/images/timeline/CHOWCHECK - First Image.webp",
    isMobile: true
  },
  {
    year: "2025",
    project: "ECHO (Civic-Tech Platform)",
    buttons: [
      { label: "Case Study", type: "case-study", link: "/case-study/echo" },
      { label: "Website Live", type: "website-live", link: "https://www.echo-ng.com/" }
    ],
    image: "/images/timeline/ECHO - Fist Image.webp"
  },
  {
    year: "2025",
    project: "MyEstate",
    buttons: [
      { label: "Case Study", type: "case-study", link: "/case-study/myestate" }
    ],
    image: "/images/timeline/MY-ESTATE - First Image.webp"
  },
  {
    year: "2025",
    project: "Shop Hebron (E-commerce)",
    buttons: [
      { label: "Case Study", type: "case-study", link: "/case-study/shop-hebron" }
    ],
    image: "/images/timeline/SHOP HEBRON - First Image.webp"
  },
  {
    year: "2024",
    project: "Sterling Crest (Facility Management)",
    buttons: [
      { label: "View Gallery", type: "view-gallery", link: "/galleries?project=sterling-crest" }
    ],
    image: "/images/timeline/STERLING CREST - First Image.webp"
  },
  {
    year: "2023 – 2025",
    project: "ROCON & VIRA (Academic Projects)",
    buttons: [
      { label: "View Gallery", type: "view-gallery", link: "/galleries?project=vira-rocon" }
    ],
    image: "/images/timeline/VIRA-ROCON - First Image.webp",
    isContain: true
  }
];

const getButtonStyle = (type: ButtonInfo['type']) => {
  switch (type) {
    case "case-study":
      return "bg-white text-black hover:bg-zinc-200 border border-transparent";
    case "website-live":
      return "bg-transparent text-white border border-white/30 hover:bg-white/10";
    case "view-gallery":
      return "bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-zinc-700";
    default:
      return "bg-zinc-800 text-zinc-200";
  }
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 60, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const imageWidth = 400;
  const imageHeight = 250;

  const onMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Calculate the maximum X coordinate so the image doesn't enter the button column (right 1/3rd of the screen)
    // The center of the image is at x, so we cap x so the right edge (x + imageWidth/2) doesn't overlap.
    const maxAllowedRight = rect.width * 0.6; // Allow image to go up to 60% of the container width
    const maxX = maxAllowedRight - (imageWidth / 2);
    
    const targetX = e.clientX - rect.left;
    rawX.set(Math.min(targetX, maxX));
    rawY.set(e.clientY - rect.top);
  };

  const anyActive = hovered != null;

  return (
    <section className="w-full bg-background text-foreground py-12 md:py-32 px-4 md:px-12 lg:px-24 relative z-20 font-sans border-t border-white/10">
      <div className="max-w-6xl mx-auto w-full relative" ref={containerRef} onMouseMove={onMove} onMouseLeave={() => setHovered(null)}>
        
        {/* Header Section */}
        <div className="mb-16 relative">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground relative z-10 inline-block">
             Timeline
             <div className="absolute -top-4 -right-10 md:-right-16 w-8 h-8 md:w-12 md:h-12 animate-pulse opacity-90 rotate-[15deg]">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff4d4d"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
             </div>
          </h2>
        </div>

        {/* Table Headers */}
        <div className="grid grid-cols-12 gap-4 pb-4 border-b border-white/20 text-sm font-bold tracking-wider mb-2 text-zinc-400">
          <div className="col-span-3">YEAR</div>
          <div className="col-span-9 md:col-span-5">PROJECTS</div>
          <div className="col-span-4 hidden md:block"></div>
        </div>

        {/* Hover Image Container */}
        <motion.div
          className="absolute z-40 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border border-white/10 hidden md:block"
          style={{
            top: 0,
            left: 0,
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            width: imageWidth,
            height: imageHeight,
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: anyActive ? 1 : 0, scale: anyActive ? 1 : 0.95 }}
          transition={{ duration: anyActive ? 0.3 : 0 }}
        >
          {TIMELINE_DATA.map((item, i) => {
            const yPos =
              hovered == null
                ? "100%"
                : i < hovered
                  ? "-100%"
                  : i > hovered
                    ? "100%"
                    : "0%";
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{ y: yPos }}
                transition={{ type: "spring", stiffness: 400, damping: 40 }}
                className={`absolute inset-0 w-full h-full ${item.isMobile ? 'bg-[#fed7aa] p-6' : 'bg-zinc-900'}`}
              >
                <img
                  src={item.image}
                  alt={item.project}
                  className={`w-full h-full ${item.isMobile || item.isContain ? 'object-contain' : 'object-cover'} ${item.isMobile ? 'drop-shadow-2xl' : 'opacity-90'}`}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timeline Rows */}
        <div className="flex flex-col relative z-10">
          {TIMELINE_DATA.map((item, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              className="grid grid-cols-12 gap-4 py-8 border-b border-white/10 group items-center transition-colors hover:bg-white/5 -mx-4 px-4 rounded-xl relative"
            >
              <div className="col-span-12 md:col-span-3 text-lg md:text-xl font-bold font-serif text-foreground">
                {hovered === i ? (
                  <ScrambleText text={item.year} isActive={true} speed={2.0} />
                ) : (
                  <span>{item.year}</span>
                )}
              </div>
              <div className="col-span-12 md:col-span-5 text-xl md:text-2xl font-medium tracking-tight text-zinc-400 group-hover:text-foreground transition-colors">
                {item.project}
              </div>
              <div className="col-span-12 md:col-span-4 flex flex-wrap justify-start md:justify-end gap-3 mt-4 md:mt-0 relative z-[60]">
                {item.buttons.map((btn, idx) => {
                  const content = (
                    <span className={`px-5 py-2.5 rounded-full text-sm tracking-wide transition-colors shadow-sm text-pixel uppercase inline-block ${getButtonStyle(btn.type)}`}>
                      {btn.label}
                    </span>
                  );

                  return btn.link ? (
                    <a href={btn.link} target={btn.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" key={idx}>
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
