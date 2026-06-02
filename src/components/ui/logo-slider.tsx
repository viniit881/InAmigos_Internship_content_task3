"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LogoSliderProps {
  logos: React.ReactNode[];
  speed?: number; // in seconds, default 60
  direction?: "left" | "right";
  className?: string;
}

export function LogoSlider({
  logos,
  speed = 60,
  direction = "left",
  className,
}: LogoSliderProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden bg-transparent py-4",
        className
      )}
    >
      <div
        className="flex w-max min-w-full shrink-0 animate-marquee"
        style={
          {
            "--duration": `${speed}s`,
            animationDirection: direction === "right" ? "reverse" : "normal",
            animationDuration: `var(--duration)`,
          } as React.CSSProperties
        }
      >
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center justify-center">
            {logo}
          </div>
        ))}
        {/* Duplicate for seamless looping */}
        {logos.map((logo, index) => (
          <div key={`dup-${index}`} className="mx-8 flex items-center justify-center">
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
