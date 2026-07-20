"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const paths = [
  { id: 'purple', d: "M19 28.5C19 33.7467 14.7467 38 9.5 38C4.25329 38 0 33.7467 0 28.5C0 23.2533 4.25329 19 9.5 19H19V28.5Z", fill: "#A259FF" },
  { id: 'green', d: "M0 47.5C0 52.7467 4.25329 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38H9.5C4.25329 38 0 42.2533 0 47.5Z", fill: "#0ACF83" },
  { id: 'red', d: "M19 0L9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19H19V0Z", fill: "#F24E1E" },
  { id: 'orange', d: "M19 9.5C19 14.7467 23.2533 19 28.5 19C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0C23.2533 0 19 4.25329 19 9.5Z", fill: "#FF7262" },
  { id: 'blue', d: "M38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5Z", fill: "#1ABCFE" }
];

export default function DissolvingLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-16 h-24 md:w-20 md:h-28 cursor-crosshair group flex items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 38 57" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {paths.map((p, i) => {
          // Calculate a random trajectory for each shape to fly outwards
          const randomX = (Math.random() - 0.5) * 150;
          const randomY = (Math.random() - 0.5) * 150;
          const randomRot = (Math.random() - 0.5) * 180;
          
          return (
            <motion.path
              key={p.id}
              d={p.d}
              fill={p.fill}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
              animate={isHovered ? { 
                x: randomX, 
                y: randomY, 
                opacity: 0,
                rotate: randomRot,
                scale: 0.2 
              } : { 
                x: 0, 
                y: 0, 
                opacity: 1,
                rotate: 0,
                scale: 1 
              }}
              transition={{ 
                duration: isHovered ? 0.6 : 0.8, 
                ease: isHovered ? "easeOut" : "backOut",
                delay: isHovered ? 0 : Math.random() * 0.15 
              }}
              style={{ transformOrigin: "center" }}
            />
          );
        })}
      </svg>
      
      {/* OriginKit style tooltip label */}
      <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs font-semibold text-foreground uppercase tracking-widest text-pixel whitespace-nowrap">
        Hover to Shatter
      </div>
    </div>
  );
}
