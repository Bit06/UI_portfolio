"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Matter from "matter-js";
import { aboutContent } from "@/lib/constants";

const skills = aboutContent.skills;

function makeWalls(bounding: any, world: any) {
  const { width: w, height: h } = bounding;
  const t = 400; // Thicker walls to prevent tunneling
  const walls = [];
  // Bottom wall (lifted slightly to prevent bottom clipping)
  walls.push(Matter.Bodies.rectangle(w / 2, h - 5 + t / 2, w + 2 * t, t, { isStatic: true }));
  // Left wall
  walls.push(Matter.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
  // Right wall
  walls.push(Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, { isStatic: true }));
  // No top wall so items can fall in
  Matter.Composite.add(world, walls);
  return walls;
}

export default function PhysicsSkills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const rafRef = useRef(0);
  const engineRef = useRef<any>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getPillHeight = () => isMobile ? 45 : 70;
  const getPillWidth = (str: string) => {
    const w = Math.max(isMobile ? 110 : 160, str.length * (isMobile ? 11 : 16) + (isMobile ? 30 : 60));
    // Clamp to container width to avoid getting stuck in walls
    const containerWidth = containerRef.current?.clientWidth || 400;
    return Math.min(w, containerWidth - 40);
  };

  useEffect(() => {
    if (!mounted || !isInView) return;

    const container = containerRef.current;
    if (!container) return;

    const engine = Matter.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1.2 },
    });
    engineRef.current = engine;

    const bounding = container.getBoundingClientRect();
    makeWalls(bounding, engine.world);

    // Mouse control
    const mouse = Matter.Mouse.create(container);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Disable scroll hijacking by matter.js mouse
    mouse.element.removeEventListener("mousewheel", (mouse as any).mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", (mouse as any).mousewheel);

    // Create pills
    const made: any[] = [];
    const els = Array.from(container.querySelectorAll<HTMLElement>("[data-physics-body]"));

    skills.forEach((skill, i) => {
      const width = getPillWidth(skill);
      const height = getPillHeight();

      // Spawn systematically so they land in a nicely arranged pile
      const cols = isMobile ? 3 : 4;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellWidth = bounding.width / cols;

      const x = (col * cellWidth) + (cellWidth / 2) + (Math.random() * 20 - 10);
      const y = -height - (row * 150) - (Math.random() * 50);

      const bodyOpts = {
        friction: 0.8,
        frictionAir: 0.02,
        restitution: 0.4, // Slightly less bouncy so they settle faster
        chamfer: { radius: height / 2 }, // Rounded corners
      };

      const body = Matter.Bodies.rectangle(x, y, width, height, bodyOpts);
      made.push(body);
    });

    Matter.Composite.add(engine.world, made);

    const update = () => {
      rafRef.current = requestAnimationFrame(update);
      for (let i = 0; i < made.length; i++) {
        const el = els[i];
        if (!el) continue;
        const { position, angle } = made[i];
        el.style.visibility = "visible";
        el.style.left = `${position.x}px`;
        el.style.top = `${position.y}px`;
        el.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      }
      Matter.Engine.update(engine);
    };
    update();

    return () => {
      cancelAnimationFrame(rafRef.current);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [mounted, isInView, isMobile]);

  if (!mounted) return <div ref={containerRef} className="h-[600px] md:h-[450px] w-full bg-transparent rounded-2xl" />;

  const getPillStyle = (index: number) => {
    const styles = [
      "bg-foreground text-background font-bold text-lg md:text-3xl border-2 border-transparent", // Filled solid bold
      "bg-transparent text-foreground font-medium text-lg md:text-3xl border-2 border-foreground", // Outlined strong
      "bg-transparent text-foreground font-light text-base md:text-2xl border border-foreground/50 italic font-serif", // Outlined light serif
      "bg-zinc-800 text-white font-bold text-lg md:text-3xl border-2 border-transparent shadow-lg", // Dark filled
      "bg-transparent text-foreground font-pixel uppercase tracking-widest text-xs md:text-lg border-2 border-foreground/30" // Pixel font outlined
    ];
    return styles[index % styles.length];
  };

  return (
    <div
      ref={containerRef}
      className="relative h-[450px] md:h-[450px] w-full overflow-hidden bg-transparent rounded-2xl cursor-crosshair"
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
    >
      {skills.map((skill, i) => {
        const width = getPillWidth(skill);
        const height = getPillHeight();
        const styleClass = getPillStyle(i);
        return (
          <div
            key={i}
            data-physics-body=""
            className={`absolute flex items-center justify-center px-4 md:px-8 py-2 md:py-3 cursor-grab active:cursor-grabbing hover:scale-105 transition-transform duration-200 ${styleClass}`}
            style={{
              visibility: "hidden",
              width: width,
              height: height,
              borderRadius: height / 2,
              userSelect: "none",
              willChange: "transform, left, top",
              whiteSpace: "nowrap"
            }}
            draggable={false}
          >
            <span className="w-full text-center tracking-wide leading-none">{skill}</span>
          </div>
        );
      })}
    </div>
  );
}
