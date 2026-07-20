"use client";
import React, { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#01';

export default function ScrambleText({ text, isActive, speed = 1 }: { text: string; isActive: boolean; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    if (isActive) {
      let iteration = 0;
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setDisplayText((prev) =>
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(intervalRef.current);
          setDisplayText(text);
        }
        iteration += (1 / 3) * speed; 
      }, 30);
    } else {
      clearInterval(intervalRef.current);
      setDisplayText(text);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, text, speed]);

  return (
    <span className="text-pixel tracking-widest uppercase">
      {displayText}
    </span>
  );
}
