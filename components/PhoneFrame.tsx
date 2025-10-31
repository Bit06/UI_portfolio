import React from 'react';

interface PhoneFrameProps {
  src: string;
  alt: string;
  isScrollable?: boolean;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ src, alt, isScrollable = false }) => {
  return (
    <div className="relative w-full max-w-xs bg-zinc-900 border-2 border-zinc-700 rounded-[2.5rem] p-1 shadow-2xl">
      <div className={`relative w-full h-full overflow-hidden rounded-[2.25rem] bg-black ${isScrollable ? 'custom-scrollbar overflow-y-auto' : ''}`}>
          <img src={src} alt={alt} className="h-auto w-full object-contain" />
      </div>
    </div>
  );
};