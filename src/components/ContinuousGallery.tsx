"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import GalleryOverlay from './GalleryOverlay';
import { CoverflowImage } from './CoverflowCarousel';
import ScrambleText from './ScrambleText';

export type GalleryProject = {
    id: string;
    name: string;
    images: CoverflowImage[];
};

export type GallerySection = {
    id: string;
    title: string;
    projects: GalleryProject[];
};

interface ContinuousGalleryProps {
    sections: GallerySection[];
}

type TrackItem = {
    uniqueId: string;
    sectionTitle: string;
    project: GalleryProject;
    image: CoverflowImage;
};

// Helper to pseudo-shuffle an array predictably based on a seed
function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    let seed = 12345;
    const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export default function ContinuousGallery({ sections }: ContinuousGalleryProps) {
    const [isMobile, setIsMobile] = useState<boolean | null>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);
    const set1Ref = useRef<HTMLDivElement>(null);
    
    // For mobile top/bottom tracks
    const topContainerRef = useRef<HTMLDivElement>(null);
    const topSetRef = useRef<HTMLDivElement>(null);
    const bottomContainerRef = useRef<HTMLDivElement>(null);
    const bottomSetRef = useRef<HTMLDivElement>(null);

    const xRef = useRef(0);
    const xTopRef = useRef(0);
    const xBottomRef = useRef(0);
    const isInteracting = useRef(false);

    const [trackWidth, setTrackWidth] = useState(0);
    const [topTrackWidth, setTopTrackWidth] = useState(0);
    const [bottomTrackWidth, setBottomTrackWidth] = useState(0);

    const [activeSection, setActiveSection] = useState(sections[0]?.title || '');
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const mousePos = useRef({ x: -1, y: -1 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    // State for the overlay
    const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

    // Deep Linking Effect
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const projectId = searchParams.get('project');
            if (projectId) {
                const searchTerms = projectId.split('-').filter(t => t.length > 2);
                const allProjects = sections.flatMap(s => s.projects);
                const relatedProjects = allProjects.filter(p => 
                    searchTerms.some(term => p.id.toLowerCase().includes(term.toLowerCase()))
                );

                if (relatedProjects.length > 0) {
                    const combinedImages = relatedProjects.flatMap(p => p.images);
                    let title = relatedProjects[0].name.split('(')[0].trim();
                    if (projectId === 'vira-rocon') title = 'VIRA & Rocon';
                    
                    setSelectedProject({
                        id: projectId + '-combined',
                        name: title,
                        images: combinedImages
                    });
                }
            }
        }
    }, [sections]);

    const buildTrackItems = (sectionList: GallerySection[]) => {
        const items: TrackItem[] = [];
        sectionList.forEach(section => {
            let sectionItems: TrackItem[] = [];
            section.projects.forEach(project => {
                project.images.forEach((img, idx) => {
                    sectionItems.push({
                        uniqueId: `${section.id}-${project.id}-${idx}`,
                        sectionTitle: section.title,
                        project: project,
                        image: img,
                    });
                });
            });
            sectionItems = shuffleArray(sectionItems);
            items.push(...sectionItems);
        });
        return items;
    };

    const desktopTrackItems = useMemo(() => buildTrackItems(sections), [sections]);
    const topTrackItems = useMemo(() => buildTrackItems(sections.filter(s => s.id.includes('dashboard') || s.id.includes('mobile'))), [sections]);
    const bottomTrackItems = useMemo(() => buildTrackItems(sections.filter(s => s.id.includes('landing'))), [sections]);

    // Measure track widths
    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                if (entry.target === set1Ref.current) setTrackWidth(entry.contentRect.width);
                if (entry.target === topSetRef.current) setTopTrackWidth(entry.contentRect.width);
                if (entry.target === bottomSetRef.current) setBottomTrackWidth(entry.contentRect.width);
            }
        });
        if (set1Ref.current) observer.observe(set1Ref.current);
        if (topSetRef.current) observer.observe(topSetRef.current);
        if (bottomSetRef.current) observer.observe(bottomSetRef.current);
        return () => observer.disconnect();
    }, [desktopTrackItems, topTrackItems, bottomTrackItems, isMobile]);

    const AUTO_SPEED = 0.5;
    const SCROLL_MULTIPLIER = 1.5;

    // Update the animation loop to use independent interacting flags for mobile
    useAnimationFrame((t, delta) => {
        if (selectedProject) return; 
        const step = (delta / 16.66);

        if (!isMobile) {
            if (trackWidth > 0) {
                if (!isInteracting.current) xRef.current -= AUTO_SPEED * step;
                if (xRef.current <= -trackWidth) xRef.current += trackWidth;
                else if (xRef.current > 0) xRef.current -= trackWidth;
                
                if (containerRef.current) containerRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
            }
        } else {
            if (topTrackWidth > 0 && bottomTrackWidth > 0) {
                if (!topTrackInteracting.current) {
                    xTopRef.current -= AUTO_SPEED * step;
                }
                if (!bottomTrackInteracting.current) {
                    xBottomRef.current += AUTO_SPEED * step;
                }

                if (xTopRef.current <= -topTrackWidth) xTopRef.current += topTrackWidth;
                else if (xTopRef.current > 0) xTopRef.current -= topTrackWidth;

                if (xBottomRef.current <= -bottomTrackWidth) xBottomRef.current += bottomTrackWidth;
                else if (xBottomRef.current > 0) xBottomRef.current -= bottomTrackWidth;

                if (topContainerRef.current) topContainerRef.current.style.transform = `translate3d(${xTopRef.current}px, 0, 0)`;
                if (bottomContainerRef.current) bottomContainerRef.current.style.transform = `translate3d(${xBottomRef.current}px, 0, 0)`;
            }
        }

        // Custom JS hover logic (only on desktop where we track mousePos)
        if (!isMobile && mousePos.current.x >= 0 && mousePos.current.y >= 0) {
            const el = document.elementFromPoint(mousePos.current.x, mousePos.current.y);
            const card = el?.closest('[data-card-id]');
            if (card) {
                const id = card.getAttribute('data-card-id');
                if (hoveredId !== id) setHoveredId(id);
            } else {
                if (hoveredId !== null) setHoveredId(null);
            }
        }
    });

    // Independent Touch Handlers for Mobile Tracks
    const topTrackInteracting = useRef(false);
    const bottomTrackInteracting = useRef(false);
    const lastTouchTopX = useRef(0);
    const lastTouchBottomX = useRef(0);
    const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleTopTouchStart = (e: React.TouchEvent) => {
        if (selectedProject) return;
        lastTouchTopX.current = e.touches[0].clientX;
        topTrackInteracting.current = true;
    };
    const handleTopTouchMove = (e: React.TouchEvent) => {
        if (selectedProject) return;
        const currentX = e.touches[0].clientX;
        const deltaX = lastTouchTopX.current - currentX;
        if (Math.abs(deltaX) > 2) {
            xTopRef.current -= deltaX * 2.5;
            lastTouchTopX.current = currentX;
        }
    };
    const handleTopTouchEnd = () => {
        setTimeout(() => topTrackInteracting.current = false, 300);
    };

    const handleBottomTouchStart = (e: React.TouchEvent) => {
        if (selectedProject) return;
        lastTouchBottomX.current = e.touches[0].clientX;
        bottomTrackInteracting.current = true;
    };
    const handleBottomTouchMove = (e: React.TouchEvent) => {
        if (selectedProject) return;
        const currentX = e.touches[0].clientX;
        const deltaX = lastTouchBottomX.current - currentX;
        if (Math.abs(deltaX) > 2) {
            xBottomRef.current -= deltaX * 2.5;
            lastTouchBottomX.current = currentX;
        }
    };
    const handleBottomTouchEnd = () => {
        setTimeout(() => bottomTrackInteracting.current = false, 300);
    };

    // We will handle touch events directly on the containers to allow independent scrolling
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (selectedProject) return;
            e.preventDefault();
            isInteracting.current = true;
            
            const delta = (e.deltaY + e.deltaX) * SCROLL_MULTIPLIER;
            if (!isMobile) {
                xRef.current -= delta;
            }
            
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
            interactionTimeoutRef.current = setTimeout(() => isInteracting.current = false, 150);
        };
        
        if (!isMobile) {
            window.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            window.removeEventListener('wheel', handleWheel);
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
        };
    }, [selectedProject, isMobile]);

    const HEX_COLORS = ['#fed7aa', '#e9d5ff', '#fecaca', '#bbf7d0', '#bfdbfe', '#fbcfe8'];

    const renderTrackSet = (keySuffix: string, items: TrackItem[], ref?: React.RefObject<HTMLDivElement>) => (
        <div ref={ref} className="flex gap-4 md:gap-8 pr-4 md:pr-8 h-full shrink-0 items-center">
            {items.map((item, idx) => {
                const isMobileProj = item.project.name.toLowerCase().includes('mobile');
                const cardId = `${item.uniqueId}-${keySuffix}`;
                const isHovered = hoveredId === cardId;

                return (
                <div 
                    key={cardId}
                    data-card-id={cardId}
                    data-section-title={item.sectionTitle}
                    className={`gallery-card relative shrink-0 h-full aspect-[3/4] rounded-3xl cursor-pointer shadow-2xl transition-all duration-200 ${isHovered ? 'scale-[1.02] border-zinc-300' : 'border-zinc-500/50'} border-2 border-dashed p-4 md:p-6 bg-[#050505] backdrop-blur-sm`}
                    onClick={() => {
                        const baseName = item.project.name.split('(')[0].trim();
                        const allProjects = sections.flatMap(s => s.projects);
                        const relatedProjects = allProjects.filter(p => p.name.split('(')[0].trim() === baseName);
                        
                        const clickedProjectImages = item.project.images;
                        const otherImages = relatedProjects
                            .filter(p => p.id !== item.project.id)
                            .flatMap(p => p.images);
                            
                        const combinedImages = [...clickedProjectImages, ...otherImages];
                        
                        setSelectedProject({
                            id: item.project.id + '-combined',
                            name: baseName,
                            images: combinedImages
                        });
                    }}
                >
                    {isMobileProj && (
                        <div 
                            className={`absolute inset-0 rounded-3xl transition-opacity duration-200 pointer-events-none ${isHovered || isMobile ? 'opacity-100' : 'opacity-0'}`}
                            style={{ backgroundColor: HEX_COLORS[idx % HEX_COLORS.length] }} 
                        />
                    )}

                    <div className="relative w-full h-full rounded-2xl overflow-hidden z-10 pointer-events-none">
                        <img 
                            src={item.image.srcUrl || item.image.src}
                            alt={item.image.alt || "Gallery Image"}
                            className={`w-full h-full ${isMobileProj ? 'object-contain p-2' : 'object-cover'} transition-all duration-200 pointer-events-none select-none ${isHovered || isMobile ? 'brightness-100 saturate-100' : 'filter brightness-[0.25] saturate-0'}`}
                            style={!isMobileProj ? { objectPosition: "top" } : {}}
                            draggable={false}
                        />
                        {/* Hover Overlay Title (Always visible on mobile) */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 pointer-events-none ${isHovered || isMobile ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-white font-pixel text-xs md:text-sm tracking-widest text-center shadow-xl">
                                {item.project.name.split('(')[0].trim()}
                            </span>
                        </div>
                    </div>
                </div>
            )})}
        </div>
    );

    if (isMobile === null) return <div className="w-full h-[100vh] bg-[#050505]"></div>;

    return (
        <div className="w-full h-[100vh] bg-[#050505] overflow-hidden relative flex flex-col">
            {/* Dynamic Header */}
            <div className="w-full pt-6 md:pt-12 px-6 md:px-12 shrink-0 z-20 h-[60px] md:h-[180px]">
                <h1 className="text-[clamp(1.5rem,8vw,6rem)] text-white tracking-[0.2em] transition-all duration-700 leading-none">
                    <ScrambleText key={activeSection} text={isMobile ? "GALLERY" : activeSection} isActive={true} speed={2} />
                </h1>
            </div>

            {/* Scrolling Tracks */}
            {!isMobile ? (
                <div className="w-full flex-1 flex items-center py-4 min-h-0 pb-24 md:pb-32">
                    <div ref={containerRef} className="flex h-full will-change-transform items-center">
                        {renderTrackSet('set-1', desktopTrackItems, set1Ref)}
                        {renderTrackSet('set-2', desktopTrackItems)}
                        {renderTrackSet('set-3', desktopTrackItems)}
                    </div>
                </div>
            ) : (
                <div className="w-full flex-1 flex flex-col pt-2 min-h-0 pb-20 md:pb-32 gap-6 pl-4">
                    {/* Top Track (Dashboard & Mobile) */}
                    <div 
                        className="flex-1 overflow-hidden relative"
                        onTouchStart={handleTopTouchStart}
                        onTouchMove={handleTopTouchMove}
                        onTouchEnd={handleTopTouchEnd}
                    >
                        <div ref={topContainerRef} className="flex h-full will-change-transform items-center">
                            {renderTrackSet('top-1', topTrackItems, topSetRef)}
                            {renderTrackSet('top-2', topTrackItems)}
                            {renderTrackSet('top-3', topTrackItems)}
                        </div>
                    </div>
                    {/* Bottom Track (Landing Pages) */}
                    <div 
                        className="flex-1 overflow-hidden relative"
                        onTouchStart={handleBottomTouchStart}
                        onTouchMove={handleBottomTouchMove}
                        onTouchEnd={handleBottomTouchEnd}
                    >
                        <div ref={bottomContainerRef} className="flex h-full will-change-transform items-center">
                            {renderTrackSet('bottom-1', bottomTrackItems, bottomSetRef)}
                            {renderTrackSet('bottom-2', bottomTrackItems)}
                            {renderTrackSet('bottom-3', bottomTrackItems)}
                        </div>
                    </div>
                </div>
            )}

            {/* Overlay Carousel */}
            <GalleryOverlay 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)}
                images={selectedProject?.images || []}
                projectName={selectedProject?.name}
            />
        </div>
    );
}
