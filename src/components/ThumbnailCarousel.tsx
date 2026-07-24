'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ThumbnailCarousel({ images }: { images: string[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const thumbnailContainerRef = useRef<HTMLDivElement>(null);

    if (!images || images.length === 0) return null;

    const carouselRef = useRef<HTMLDivElement>(null);
    const inView = useInView(carouselRef, { amount: 0.1 });

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-play effect
    useEffect(() => {
        if (!isAutoPlaying || !inView) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000); // Change image every 4 seconds
        return () => clearInterval(interval);
    }, [isAutoPlaying, inView, images.length]);

    // Auto-scroll the thumbnail container to keep the active thumbnail in view safely
    useEffect(() => {
        if (thumbnailContainerRef.current) {
            const container = thumbnailContainerRef.current;
            const activeThumb = container.children[currentIndex] as HTMLElement;
            if (activeThumb) {
                const scrollLeft = activeThumb.offsetLeft - (container.offsetWidth / 2) + (activeThumb.offsetWidth / 2);
                container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }
    }, [currentIndex]);

    return (
        <div ref={carouselRef} className="w-full flex flex-col gap-6">
            {/* Main Preview Container */}
            <div className="relative w-full overflow-hidden group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Dashboard Preview ${currentIndex + 1}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="w-full h-auto object-contain block"
                    />
                </AnimatePresence>
                
                {/* Navigation Arrows on the Main Image */}
                <button 
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-background/80 backdrop-blur-sm border border-foreground/10 text-foreground rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
                >
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button 
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 bg-background/80 backdrop-blur-sm border border-foreground/10 text-foreground rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-background"
                >
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
            </div>

            {/* Thumbnails Row */}
            <div 
                ref={thumbnailContainerRef}
                className="flex overflow-x-auto gap-3 pb-4 px-2 hide-scrollbar"
            >
                {images.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrentIndex(idx);
                        }}
                        className={`relative flex-shrink-0 w-24 md:w-32 aspect-[16/9] rounded-lg overflow-hidden border-2 transition-all ${
                            currentIndex === idx ? 'border-foreground ring-2 ring-foreground/20 scale-105 shadow-md' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                    >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
