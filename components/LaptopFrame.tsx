import React from 'react';

interface LaptopFrameProps {
  src: string;
  alt: string;
  isScrollable?: boolean;
}

export const LaptopFrame: React.FC<LaptopFrameProps> = ({ src, alt, isScrollable = false }) => {
  return (
    <div className="relative w-full max-w-4xl">
        {/* Screen */}
        <div className="relative aspect-[16/10] bg-[#1C1C1C] rounded-2xl border-2 border-zinc-800 p-1">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-1 bg-zinc-800 rounded-b-md"></div>
            <div className={`overflow-hidden rounded-lg h-full w-full ${isScrollable ? 'custom-scrollbar overflow-y-auto' : ''}`}>
                 <img src={src} className="w-full h-auto object-contain object-top" alt={alt} />
            </div>
        </div>
        {/* Base */}
        <div className="relative h-2 w-[110%] -bottom-1 left-1/2 -translate-x-1/2 bg-zinc-800/80 rounded-b-xl border-x-2 border-b-2 border-zinc-800">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-24 bg-zinc-700/50 rounded-b-sm"></div>
        </div>
    </div>
  );
};