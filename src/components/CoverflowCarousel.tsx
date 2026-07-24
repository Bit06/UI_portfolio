"use client";

// Coverflow Carousel — Originkit
// Props set in the preview:
//   activeWidth: 506
//   activeHeight: 555
//   restHeight: 318
//   gap: 32
//   arrowSize: 42
//   arrowPosition: 96
//   transition: {"ease":"easeOut","mass":1,"type":"tween","delay":1,"damping":60,"duration":0.3,"stiffness":800}

import * as React from "react"
import { useCallback, useEffect, useMemo, useRef } from "react"
const RenderTarget = {
    current: () => "preview",
    canvas: "canvas",
    export: "export",
    thumbnail: "thumbnail",
    preview: "preview",
}
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useTransform,
    animate,
    type MotionValue,
} from "framer-motion"

/**
 * CoverflowCarousel — a flat-slat "cover flow" gallery.
 *
 * The active item is a big landscape card centered in the stage; every other
 * item is a thin flat slat of a fixed size. Each card is positioned by its
 * wrapped relative offset from the active index, so stepping is always a
 * single-slat move and the loop is seamless. A windowed set is rendered;
 * cards animate in from one edge as they animate out the other.
 */

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

export type CoverflowImage = {
    src?: any
    srcUrl?: string
    alt?: string
}

type Props = {
    images?: CoverflowImage[]
    activeWidth?: number
    activeHeight?: number
    restWidth?: number
    restHeight?: number
    gap?: number
    radius?: number
    showArrows?: boolean
    arrowColor?: string
    arrowBackground?: string
    arrowSize?: number
    arrowPosition?: number
    autoplay?: boolean
    transition?: any
    style?: React.CSSProperties
    onClose?: () => void
    isMobile?: boolean
    isMobile?: boolean
    isMobile?: boolean
    activeIndexExternal?: number
    onActiveIndexChange?: (index: number) => void
    onZoomChange?: (isZoomed: boolean) => void
}

// -----------------------------------------------------------------------------
// Constants
// -----------------------------------------------------------------------------

const PLACEHOLDER_URLS = [
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/612d1402-0ad9-4135-3bbc-a30a6a252b00/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/6d2ad64a-102d-4eab-0efe-31479e34b500/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/be854dd1-37aa-4fc7-f569-fdb948109300/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/51984031-9176-484b-f5e0-4af9a8e9ed00/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/34ce1842-4b7a-4d52-0302-38582c341700/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/88369c6d-00cc-4ac9-74ca-0f0965e06300/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/aeaa0756-9647-4f6c-d900-204bd25e4a00/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/316d1761-fd79-4ca9-b8d4-f2bb20521a00/w=800",
]

const DEFAULT_IMAGES: CoverflowImage[] = PLACEHOLDER_URLS.map((url, i) => ({
    srcUrl: url,
    alt: `Coverflow card ${i + 1}`,
}))

const GRADIENT_FALLBACKS = [
    '#fed7aa', // orange-200
    '#e9d5ff', // purple-200
    '#fecaca', // red-200
    '#bbf7d0', // green-200
    '#bfdbfe', // blue-200
    '#fbcfe8', // pink-200
]

const RENDER_RANGE = 6 // max slats each side

// -----------------------------------------------------------------------------
// Defaults + property controls
// -----------------------------------------------------------------------------

const COMPONENT_DEFAULTS = {
    images: DEFAULT_IMAGES,
    activeWidth: 600,
    activeHeight: 400,
    restWidth: 200,
    restHeight: 270,
    gap: 30,
    radius: 2,
    showArrows: true,
    arrowColor: "#000000",
    arrowBackground: "#FFFFFF",
    arrowSize: 56,
    arrowPosition: 95,
    autoplay: false,
    autoplayDirection: "rightToLeft" as const,
    transition: {
        type: "tween",
        duration: 0.3,
        delay: 1,
        ease: "easeInOut",
    },
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function resolveImageSrc(input: any): string {
    if (!input) return ""
    if (typeof input === "string") return input
    if (typeof input === "object" && input.src) return input.src
    return ""
}

function resolveImageSrcSet(input: any): string | undefined {
    if (input && typeof input === "object" && input.srcSet) return input.srcSet
    return undefined
}

function resolveItemSrc(item: CoverflowImage | undefined): string {
    const override = item?.srcUrl && item.srcUrl.trim()
    if (override) return override
    return resolveImageSrc(item?.src)
}

type Sizing = {
    restWidth: number
    restHeight: number
    activeWidth: number
    activeHeight: number
}

function relOf(index: number, pos: number, count: number): number {
    let rel = (((index - pos) % count) + count) % count
    if (rel > count / 2) rel -= count
    return rel
}

function xForRel(rel: number, s: Sizing, gap: number): number {
    const ar = Math.abs(rel)
    const c1 = s.activeWidth / 2 + gap + s.restWidth / 2
    const pitch = s.restWidth + gap
    const mag = ar <= 1 ? ar * c1 : c1 + (ar - 1) * pitch
    return (rel < 0 ? -1 : 1) * mag
}

function blendForRel(rel: number): number {
    return Math.min(Math.abs(rel), 1)
}

// -----------------------------------------------------------------------------
// Card
// -----------------------------------------------------------------------------

function Card({
    item,
    index,
    pos,
    count,
    R,
    sizing,
    gap,
    radius,
    gradient,
    onSelect,
    isMobile,
    zoomedIndex,
    setZoomedIndex,
    zoomScale,
    setZoomScale
}: {
    item: CoverflowImage | undefined
    index: number
    pos: MotionValue<number>
    count: number
    R: number
    sizing: Sizing
    gap: number
    radius: number
    gradient: string
    onSelect: ((index: number) => void) | undefined
    isMobile?: boolean
    zoomedIndex: number | null
    setZoomedIndex: (index: number | null) => void
    zoomScale: number
    setZoomScale: (scale: number) => void
}) {
    const src = resolveItemSrc(item)
    const srcSet = resolveImageSrcSet(item?.src)
    const containerRef = React.useRef<HTMLDivElement>(null)

    const isZoomed = zoomedIndex === index
    const zoomProgress = useMotionValue(0);
    const panX = useMotionValue(0);
    const panY = useMotionValue(0);

    // Calculate max zoom based on image type
    const isLandingPage = item?.alt?.toLowerCase().includes('landing page');
    const isMobileOrDashboard = item?.alt?.toLowerCase().includes('mobile') || 
                               item?.alt?.toLowerCase().includes('mob') || 
                               item?.alt?.toLowerCase().includes('dashboard');
    const isMobileImage = item?.alt?.toLowerCase().includes('mobile') || item?.alt?.toLowerCase().includes('mob');
    const maxZoom = isLandingPage ? 8 : (isMobileImage ? 4 : 2);

    // Calculate manual drag bounds because Framer Motion ignores scale for containerRef bounds
    const [dragBounds, setDragBounds] = React.useState({ left: 0, right: 0, top: 0, bottom: 0 });
    React.useEffect(() => {
        if (isZoomed && typeof window !== 'undefined') {
            const w = window.innerWidth * 0.95;
            const h = window.innerHeight * 0.95;
            // The scaled wrapper grows from the center, so it extends by (scaled - original) / 2
            const xRange = (w * zoomScale - w) / 2;
            const yRange = (h * zoomScale - h) / 2;
            setDragBounds({ left: -xRange, right: xRange, top: -yRange, bottom: yRange });
        }
    }, [isZoomed, zoomScale]);

    const x = useTransform(pos, (p: number) =>
        xForRel(relOf(index, p, count), sizing, gap)
    )
    
    // Shift zoomed images up on mobile to avoid the dock
    const yOffset = useTransform(zoomProgress, (z: number) => {
        return isMobile && z > 0.5 ? "-60%" : "-50%";
    });

    const opacity = useTransform(pos, (p: number) => {
        const ar = Math.abs(relOf(index, p, count))
        return ar <= R ? 1 : ar >= R + 1 ? 0 : 1 - (ar - R)
    })
    const zIndex = useTransform(pos, (p: number) =>
        Math.round(1000 - Math.abs(relOf(index, p, count)) * 100)
    )

    React.useEffect(() => {
        animate(zoomProgress, isZoomed ? 1 : 0, { type: 'spring', stiffness: 300, damping: 30 });
        if (!isZoomed) {
            animate(panX, 0, { type: 'spring', stiffness: 300, damping: 30 });
            animate(panY, 0, { type: 'spring', stiffness: 300, damping: 30 });
        } else {
            if (typeof window !== 'undefined') {
                const cx = panX.get();
                const cy = panY.get();
                const clampedX = Math.max(dragBounds.left, Math.min(dragBounds.right, cx));
                const clampedY = Math.max(dragBounds.top, Math.min(dragBounds.bottom, cy));
                if (cx !== clampedX) animate(panX, clampedX, { type: 'spring', stiffness: 300, damping: 30 });
                if (cy !== clampedY) animate(panY, clampedY, { type: 'spring', stiffness: 300, damping: 30 });
            }
        }
    }, [isZoomed, zoomProgress, panX, panY, dragBounds]);

    const width = useTransform(() => {
        const p = pos.get()
        const a = blendForRel(relOf(index, p, count))
        const normalWidth = sizing.activeWidth + (sizing.restWidth - sizing.activeWidth) * a
        const zoomWidth = typeof window !== 'undefined' ? window.innerWidth * 0.95 : 1000
        return normalWidth + (zoomWidth - normalWidth) * zoomProgress.get()
    })
    
    const height = useTransform(() => {
        const p = pos.get()
        const a = blendForRel(relOf(index, p, count))
        const normalHeight = sizing.activeHeight + (sizing.restHeight - sizing.activeHeight) * a
        const zoomHeight = typeof window !== 'undefined' ? window.innerHeight * 0.95 : 800
        return normalHeight + (zoomHeight - normalHeight) * zoomProgress.get()
    })
    
    const borderRadius = useTransform(() => {
        return 24 * (1 - zoomProgress.get())
    })
    
    const boxShadow = useTransform(pos, (p: number) =>
        Math.abs(relOf(index, p, count)) < 0.5
            ? "0 24px 70px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 14px 40px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,255,255,0.05)"
    )

    const handleSelect = () => {
        const rel = Math.abs(relOf(index, pos.get(), count))
        if (rel < 0.1) {
            // Toggle zoom
            if (isZoomed) {
                setZoomedIndex(null)
                setZoomScale(1)
            } else {
                setZoomedIndex(index)
                setZoomScale(1) // Start at scale 1 on first click (which is fitted view)
            }
        } else if (onSelect) {
            onSelect(index)
        }
    }

    const handleDragEnd = (e: any, info: any) => {
        if (isZoomed && zoomScale === 1) {
            // If scale is 1, a swipe left/right changes the image instead of panning
            const swipeThreshold = 50;
            if (info.offset.x < -swipeThreshold) {
                // Go Next
                setZoomedIndex(null); // Exit zoom temporarily
                setTimeout(() => {
                    if (onSelect) onSelect(index + 1);
                    setTimeout(() => {
                        const nextIdx = (index + 1) % count;
                        setZoomedIndex(nextIdx); // Re-enter zoom on next
                    }, 50);
                }, 10);
            } else if (info.offset.x > swipeThreshold) {
                // Go Prev
                setZoomedIndex(null);
                setTimeout(() => {
                    if (onSelect) onSelect(index - 1);
                    setTimeout(() => {
                        const prevIdx = (index - 1 + count) % count;
                        setZoomedIndex(prevIdx);
                    }, 50);
                }, 10);
            }
        }
    };

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (isZoomed) {
            if (zoomScale > 1) {
                // If zoomed in, leave zoom mode entirely
                setZoomScale(1);
                setZoomedIndex(null);
            } else {
                // If zoomed out (scale 1), zoom into the image to max zoom
                setZoomScale(maxZoom);
            }
        }
    }

    // Landing pages get gradient background too now that they have padding
    const hasGradient = isMobileOrDashboard || isLandingPage;

    let paddingClasses = '';
    if (!isZoomed) {
        if (isLandingPage) {
            paddingClasses = 'pt-3 px-3 md:pt-6 md:px-6 pb-0';
        } else if (isMobileOrDashboard) {
            paddingClasses = 'p-3 md:p-6';
        }
    }

    return (
        <motion.div
            onClick={isZoomed ? undefined : handleSelect}
            onDoubleClick={handleDoubleClick}
            className="select-none"
            onWheel={(e) => {
                if (isZoomed) {
                    const next = Math.min(Math.max(zoomScale - e.deltaY * 0.005, 1), maxZoom);
                    // Only update state if difference is significant to prevent React from hanging
                    if (Math.abs(next - zoomScale) > 0.05 || next === 1 || next === maxZoom) {
                        setZoomScale(next);
                    }
                }
            }}
            style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                x,
                zIndex,
                opacity,
                cursor: isZoomed ? (zoomScale > 1 ? "grab" : "ew-resize") : "zoom-in",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
            <motion.div
                style={{
                    x: "-50%",
                    y: yOffset,
                    width,
                    height,
                    borderRadius,
                    overflow: "hidden", 
                    background: useTransform(() => zoomProgress.get() > 0.5 ? "#000" : (hasGradient ? gradient : "#1a1a1a")),
                    boxShadow,
                    border: useTransform(() => zoomProgress.get() > 0.5 ? "none" : "1px solid rgba(255,255,255,0.1)"),
                }}
                className={`flex flex-col`}
            >
                <div ref={containerRef} className={`flex-1 w-full h-full relative ${paddingClasses || 'bg-black'} overflow-hidden flex items-center justify-center`}>
                    {src ? (
                        <motion.div
                            className="w-full h-full flex items-center justify-center"
                            drag={isZoomed ? (zoomScale > 1 ? true : "x") : false}
                            dragConstraints={zoomScale > 1 ? dragBounds : { left: 0, right: 0 }}
                            dragDirectionLock={true}
                            dragElastic={0.2}
                            onDragEnd={handleDragEnd}
                            style={{ x: panX, y: panY }}
                            animate={{ scale: isZoomed ? zoomScale : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <img
                                src={src}
                                srcSet={srcSet}
                                alt={item?.alt || ""}
                                draggable={false}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: isZoomed ? "contain" : (isLandingPage ? "cover" : (isMobileOrDashboard ? "contain" : "cover")),
                                    objectPosition: isZoomed ? "center" : (isLandingPage ? "top" : (isMobileOrDashboard ? "center" : "top")), 
                                    display: "block",
                                    pointerEvents: "none",
                                    userSelect: "none",
                                }}
                            />
                        </motion.div>
                    ) : null}
                </div>
            </motion.div>
        </motion.div>
    )
}

// -----------------------------------------------------------------------------
// ArrowButton
// -----------------------------------------------------------------------------

function ArrowButton({
    side,
    onClick,
    color,
    background,
    size,
    position,
}: {
    side: "left" | "right"
    onClick: () => void
    color: string
    background: string
    size: number
    position: number
}) {
    const isLeft = side === "left"
    const p = Math.max(0, Math.min(100, position))
    const inset = `calc((50% - ${size}px) * ${(100 - p) / 100})`
    return (
        <button
            type="button"
            aria-label={isLeft ? "Previous" : "Next"}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
                e.stopPropagation()
                onClick()
            }}
            className="transition-opacity duration-300 opacity-50 hover:opacity-100"
            style={{
                position: "absolute",
                top: "50%",
                [isLeft ? "left" : "right"]: inset,
                transform: "translateY(-50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "none",
                background,
                color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: 0,
                zIndex: 2000,
                boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
                WebkitTapHighlightColor: "transparent",
            }}
        >
            <svg
                width={size * 0.4}
                height={size * 0.4}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ pointerEvents: "none" }}
            >
                {isLeft ? (
                    <polyline points="15 18 9 12 15 6" />
                ) : (
                    <polyline points="9 18 15 12 9 6" />
                )}
            </svg>
        </button>
    )
}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

export default function CoverflowCarousel(__props: Props) {
    const props = { ...COMPONENT_DEFAULTS, ...__props }
    const {
        images: rawImages,
    } = props
    const [sizing, setSizing] = React.useState({
        activeWidth: 800,
        activeHeight: 600,
        restWidth: 500,
        restHeight: 375,
    });

    React.useEffect(() => {
        const updateSize = () => {
            const w = window.innerWidth;
            if (w > 1600) {
                setSizing({ activeWidth: 960, activeHeight: 720, restWidth: 640, restHeight: 480 });
            } else if (w > 1200) {
                setSizing({ activeWidth: 880, activeHeight: 660, restWidth: 580, restHeight: 435 });
            } else if (w > 768) {
                setSizing({ activeWidth: 800, activeHeight: 600, restWidth: 500, restHeight: 375 });
            } else {
                setSizing({ activeWidth: w * 0.8, activeHeight: w * 0.8 * 1.25, restWidth: w * 0.6, restHeight: w * 0.6 * 1.25 });
            }
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    
    const {
        activeWidth,
        activeHeight,
        restWidth,
        restHeight,
        gap,
        radius,
        showArrows,
        arrowColor,
        arrowBackground,
        arrowSize,
        arrowPosition,
        autoplay,
        autoplayDirection,
        transition: transitionProp,
        style,
        onClose,
        isMobile,
        activeIndexExternal,
        onActiveIndexChange,
        onZoomChange,
    } = props

    const renderTarget = RenderTarget.current()
    const isStatic =
        renderTarget === RenderTarget.export ||
        renderTarget === RenderTarget.thumbnail
    const prefersReducedMotion = useReducedMotion()

    const images = useMemo(() => {
        let arr = Array.isArray(rawImages) && rawImages.length > 0 ? rawImages : DEFAULT_IMAGES;
        // Duplicate array if it's too small to ensure the infinite loop has enough items
        if (arr.length > 0 && arr.length < 5) {
            let duplicated = [...arr];
            while (duplicated.length < 5) {
                duplicated = [...duplicated, ...arr];
            }
            return duplicated;
        }
        return arr;
    }, [rawImages]);
    const count = Math.max(1, images.length);

    // Using the responsive sizing state defined above

    const moveDur =
        typeof transitionProp?.duration === "number"
            ? transitionProp.duration
            : 0.5
    const dwell =
        typeof transitionProp?.delay === "number"
            ? Math.max(0, transitionProp.delay)
            : 1.2

    const R = Math.max(1, Math.min(RENDER_RANGE, Math.floor(count / 2) - 1))

    const pos = useMotionValue(0)
    const targetRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const lastTRef = useRef<number | null>(null)

    // Global Zoom State
    const [zoomedIndex, setZoomedIndex] = React.useState<number | null>(null)
    const [zoomScale, setZoomScale] = React.useState(1)

    // Sync active index back up for thumbnails
    const lastReportedIdx = useRef<number | null>(null);
    React.useEffect(() => {
        const unsubscribe = pos.on("change", (latest) => {
            if (onActiveIndexChange) {
                const targetIdx = Math.round(latest);
                let normalized = ((targetIdx % count) + count) % count;
                if (lastReportedIdx.current !== normalized) {
                    lastReportedIdx.current = normalized;
                    onActiveIndexChange(normalized);
                }
            }
        });
        return () => unsubscribe();
    }, [pos, count, onActiveIndexChange]);

    // useEffect for zoomedIndexExternal moved below ensureRunning

    const zoomedItem = zoomedIndex !== null ? images[zoomedIndex] : null;
    const isGlobalLandingPage = zoomedItem?.alt?.toLowerCase().includes('landing page');
    const isGlobalMobile = zoomedItem?.alt?.toLowerCase().includes('mobile') || zoomedItem?.alt?.toLowerCase().includes('mob');
    const maxZoomGlobal = isGlobalLandingPage ? 8 : (isGlobalMobile ? 4 : 2);

    const handleZoomIn = () => setZoomScale(s => Math.min(s + 1, maxZoomGlobal))
    const handleZoomOut = () => {
        setZoomScale(s => {
            const next = Math.max(s - 1, 1)
            if (next === 1) setZoomedIndex(null)
            return next
        })
    }
    const handleZoomReset = () => {
        setZoomScale(1)
        setZoomedIndex(null)
    }

    React.useEffect(() => {
        if (onZoomChange) {
            onZoomChange(zoomedIndex !== null)
        }
    }, [zoomedIndex, onZoomChange])

    const autoplayingRef = useRef(false)
    const dirRef = useRef(1)
    const dwellAccRef = useRef(0)
    const moveDurRef = useRef(moveDur)
    moveDurRef.current = moveDur
    const dwellRef = useRef(dwell)
    dwellRef.current = dwell
    const reducedRef = useRef(prefersReducedMotion)
    reducedRef.current = prefersReducedMotion

    const tick = useCallback(
        (t: number) => {
            const last = lastTRef.current ?? t
            const dt = Math.min((t - last) / 1000, 1 / 30)
            lastTRef.current = t

            const cur = pos.get()
            const diff = targetRef.current - cur
            const dur = Math.max(0.08, moveDurRef.current)
            const step = (1 / dur) * dt
            const arriving = reducedRef.current || Math.abs(diff) <= step

            if (arriving) {
                pos.set(targetRef.current)
                if (autoplayingRef.current) {
                    dwellAccRef.current += dt
                    if (dwellAccRef.current >= Math.max(0, dwellRef.current)) {
                        dwellAccRef.current = 0
                        targetRef.current += dirRef.current
                    }
                    rafRef.current = requestAnimationFrame(tick)
                    return
                }
                rafRef.current = null
                lastTRef.current = null
                return
            }

            pos.set(cur + Math.sign(diff) * step)
            rafRef.current = requestAnimationFrame(tick)
        },
        [pos]
    )

    const ensureRunning = useCallback(() => {
        if (rafRef.current == null) {
            lastTRef.current = null
            rafRef.current = requestAnimationFrame(tick)
        }
    }, [tick])

    const goNext = useCallback(() => {
        if (count <= 1) return
        setZoomedIndex(null)
        setZoomScale(1)
        targetRef.current += 1
        ensureRunning()
    }, [ensureRunning, count, setZoomedIndex, setZoomScale])
    const goPrev = useCallback(() => {
        if (count <= 1) return
        setZoomedIndex(null)
        setZoomScale(1)
        targetRef.current -= 1
        ensureRunning()
    }, [ensureRunning, count, setZoomedIndex, setZoomScale])
    
    const goTo = useCallback(
        (index: number) => {
            const cur = targetRef.current
            let d = index - cur
            d = ((d % count) + count) % count
            if (d > count / 2) d -= count
            setZoomedIndex(null)
            setZoomScale(1)
            targetRef.current = cur + d
            ensureRunning()
        },
        [ensureRunning, count, setZoomedIndex, setZoomScale]
    )

    React.useEffect(() => {
        if (activeIndexExternal !== undefined && activeIndexExternal !== null && images.length > 0) {
            const cur = targetRef.current;
            const currentNorm = ((cur % count) + count) % count;
            if (currentNorm === activeIndexExternal) return; // already there
            
            let d = activeIndexExternal - cur;
            d = ((d % count) + count) % count;
            if (d > count / 2) d -= count;
            targetRef.current = cur + d;
            ensureRunning();
        }
    }, [activeIndexExternal, count, ensureRunning, images.length]);

    useEffect(() => {
        return () => {
            if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
            rafRef.current = null
        }
    }, [])

    useEffect(() => {
        const on = !isStatic && autoplay && count > 1
        autoplayingRef.current = on
        if (on) {
            dirRef.current = autoplayDirection === "leftToRight" ? -1 : 1
            dwellAccRef.current = 0
            ensureRunning()
        }
        return () => {
            autoplayingRef.current = false
        }
    }, [isStatic, autoplay, autoplayDirection, count, ensureRunning])

    const isHoveredRef = useRef(false)
    useEffect(() => {
        if (isStatic || autoplay) return
        const onKey = (e: KeyboardEvent) => {
            if (!isHoveredRef.current) return
            if (e.key === "ArrowLeft") {
                e.preventDefault()
                goPrev()
            } else if (e.key === "ArrowRight") {
                e.preventDefault()
                goNext()
            }
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [isStatic, autoplay, goPrev, goNext])

    const lastWheelTimeRef = useRef(0)
    const handleWheel = (e: React.WheelEvent) => {
        if (isStatic || autoplay || zoomedIndex !== null) return
        const now = Date.now()
        if (now - lastWheelTimeRef.current < 500) return
        
        // Handle both vertical and horizontal scrolling
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 20) {
            if (delta > 0) {
                goNext()
            } else {
                goPrev()
            }
            lastWheelTimeRef.current = now
        }
    }

    const containerStyle: React.CSSProperties = {
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        minWidth: 320,
        minHeight: 240,
        overflow: "hidden",
        userSelect: "none",
        touchAction: isStatic ? undefined : "pan-y",
        outline: "none",
    }

    const selectable = !isStatic && !autoplay
    const cards = images.map((img, i) => (
        <Card
            key={i}
            item={img}
            index={i}
            pos={pos}
            count={count}
            R={R}
            sizing={sizing}
            gap={gap}
            radius={radius}
            gradient={GRADIENT_FALLBACKS[i % GRADIENT_FALLBACKS.length]}
            onSelect={selectable ? goTo : undefined}
            isMobile={isMobile}
            zoomedIndexExternal={zoomedIndexExternal}
            onZoomedIndexChange={onZoomedIndexChange}
            zoomedIndex={zoomedIndex}
            setZoomedIndex={setZoomedIndex}
            zoomScale={zoomScale}
            setZoomScale={setZoomScale}
        />
    ))

    const arrows = showArrows && count > 1 && (
        <>
            <ArrowButton
                side="left"
                onClick={isStatic ? () => {} : goPrev}
                color={arrowColor}
                background={arrowBackground}
                size={arrowSize}
                position={arrowPosition}
            />
            <ArrowButton
                side="right"
                onClick={isStatic ? () => {} : goNext}
                color={arrowColor}
                background={arrowBackground}
                size={arrowSize}
                position={arrowPosition}
            />
        </>
    )

    return (
        <motion.div
            tabIndex={0}
            onWheel={handleWheel}
            onMouseEnter={() => {
                isHoveredRef.current = true
            }}
            onMouseLeave={() => {
                isHoveredRef.current = false
            }}
            onFocus={() => {
                isHoveredRef.current = true
            }}
            onBlur={() => {
                isHoveredRef.current = false
            }}
            style={containerStyle}
            drag={zoomedIndex !== null ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={(e, { offset }) => {
                if (offset.x < -50) {
                    goNext()
                } else if (offset.x > 50) {
                    goPrev()
                }
            }}
        >
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    isolation: "isolate",
                    zIndex: 0,
                }}
            >
                {cards}
            </div>
            {arrows}
            
            {/* Zoom Controls Overlay */}
            {zoomedIndex !== null && (
                <div className="absolute bottom-8 right-8 z-[2002] flex md:flex-row flex-col gap-3">
                    <div className="bg-black/50 backdrop-blur-md rounded-full p-1.5 flex md:flex-row flex-col gap-1 border border-white/10 shadow-xl">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
                            aria-label="Zoom In"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleZoomReset(); }}
                            className="px-3 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white font-medium text-sm transition-colors"
                        >
                            {Math.round(zoomScale * 100)}%
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/20 text-white transition-colors"
                            aria-label="Zoom Out"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </div>
                </div>
            )}

            <div className="absolute top-8 right-8 z-[2001] flex items-center gap-4">
                {zoomedIndex !== null && (
                    <button
                        onClick={(e) => { e.stopPropagation(); handleZoomReset(); }}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full px-5 py-2.5 backdrop-blur-md transition-all shadow-lg border border-white/10 font-mono text-sm tracking-widest font-bold uppercase"
                    >
                        Exit Zoom
                    </button>
                )}
                {onClose && (
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 text-white rounded-full p-3 backdrop-blur-md transition-all shadow-lg border border-white/10"
                        aria-label="Close"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                )}
            </div>
        </motion.div>
    )
}
