'use client';
import { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useInView } from 'framer-motion';

export default function MobileFrameCarousel({ images }: { images: string[] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(containerRef, { margin: "200px 0px" });

    // Duplicate images to create a massive runway for the "infinite" illusion
    const infiniteImages = [...images, ...images, ...images, ...images];

    useEffect(() => {
        if (!scrollRef.current || isHovered || !isInView) return;
        
        let animationFrameId: number;
        const scrollContainer = scrollRef.current;

        const scrollStep = () => {
            if (scrollContainer) {
                scrollContainer.scrollLeft += 1; // Smooth 1px continuous scroll
                
                // Reset to middle silently if we scroll too far, maintaining the infinite illusion
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                     scrollContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(scrollStep);
        };
        
        animationFrameId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    const scrollByAmount = (amount: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
        }
    };

    if (!images || images.length === 0) return null;

    return (
        <div 
            ref={containerRef}
            className="relative w-full py-8 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            <div 
                ref={scrollRef}
                className="flex gap-4 md:gap-8 overflow-x-auto hide-scrollbar px-4 md:px-8 pb-8"
            >
                {infiniteImages.map((img, idx) => (
                    <div 
                        key={idx} 
                        className="flex-shrink-0 w-[55vw] md:w-[260px] py-2"
                    >
                        <div className="w-full aspect-[9/19] rounded-2xl md:rounded-3xl overflow-hidden bg-foreground/5 shadow-2xl border-[2px] md:border-[4px] border-foreground">
                            <img src={img} alt={`Mobile Screen ${idx}`} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => scrollByAmount(-300)}
                className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 w-10 h-10 md:w-14 md:h-14 bg-background border border-foreground/10 text-foreground rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-foreground/5"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
                onClick={() => scrollByAmount(300)}
                className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 w-10 h-10 md:w-14 md:h-14 bg-background border border-foreground/10 text-foreground rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-foreground/5"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
        </div>
    );
}
