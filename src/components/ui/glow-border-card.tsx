"use client";

import { cn } from "@/lib/utils";
import React from "react";

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string;
  gradientColors?: string[];
  animationDuration?: number;
  children?: React.ReactNode;
}

export function GlowBorderCard({
  width = "100%",
  gradientColors = ["#ff0080", "#ff8c00", "#40e0d0", "#7b68ee", "#ff0080"],
  animationDuration = 3,
  children,
  className,
  ...props
}: GlowBorderCardProps) {
  const gradientString = gradientColors.join(", ");

  return (
    <div
      style={{
        width,
        "--animation-duration": `${animationDuration}s`,
        "--gradient": `conic-gradient(from 0deg, ${gradientString})`,
      } as React.CSSProperties}
      className={cn(
        "relative overflow-hidden rounded-2xl p-[1px] bg-background group",
        className
      )}
      {...props}
    >
      <div
        className="absolute inset-[-100%] z-0"
        style={{
          background: "var(--gradient)",
          animation: "spin var(--animation-duration) linear infinite",
        }}
      />
      <div className="absolute inset-[1px] z-10 rounded-2xl bg-bg-dark" />
      <div className="relative z-20 h-full w-full bg-transparent">
        {children}
      </div>
    </div>
  );
}
