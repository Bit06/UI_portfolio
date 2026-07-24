"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CoverflowCarousel, { CoverflowImage } from './CoverflowCarousel';
import ScrambleText from './ScrambleText';

interface GalleryOverlayProps {
    isOpen: boolean;
    onClose: () => void;
    images: CoverflowImage[];
    projectName?: string;
}

export default function GalleryOverlay({ isOpen, onClose, images, projectName }: GalleryOverlayProps) {
    const [isZoomed, setIsZoomed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsZoomed(false); // Reset on open
            setActiveIndex(0);
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const targetText = projectName || "";

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md"
                >
                    {projectName && (
                        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[2001] pointer-events-none transition-all duration-500">
                            <h2 className="text-xl md:text-4xl text-pixel text-white uppercase tracking-widest drop-shadow-lg text-center whitespace-pre bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                                <ScrambleText text={targetText} isActive={true} speed={0.8} />
                            </h2>
                        </div>
                    )}

                    <div className="w-full h-full max-w-[100vw] max-h-[100vh]">
                        <CoverflowCarousel
                            images={images}
                            onClose={onClose}
                            onZoomChange={setIsZoomed}
                            activeWidth={800}
                            activeHeight={500}
                            restWidth={300}
                            restHeight={400}
                            gap={40}
                            radius={8}
                            autoplay={false}
                            isMobile={isMobile}
                            arrowSize={isMobile ? 32 : 56}
                            activeIndexExternal={activeIndex}
                            onActiveIndexChange={setActiveIndex}
                        />
                    </div>
                    {/* Mobile Thumbnail Strip */}
                    {isMobile && !isZoomed && (
                        <div className="absolute bottom-[100px] left-0 right-0 z-50 overflow-x-auto flex gap-3 px-6 pb-2 no-scrollbar">
                            {images.map((img, idx) => (
                                <div 
                                    key={idx}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeIndex === idx ? 'border-white scale-110' : 'border-transparent opacity-50'}`}
                                >
                                    <img 
                                        src={img.srcUrl || img.src} 
                                        alt={img.alt || ""} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
