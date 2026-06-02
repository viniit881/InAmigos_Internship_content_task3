import type { CSSProperties, ComponentType } from 'react'
import AnimatedLiquidBackground from '@/framer/bundled/AnimatedLiquidBackground.js'
import DragableCarousel from '@/framer/bundled/DragableCarousel.js'
import LiquidImage from '@/framer/bundled/LiquidImage.js'

export { AnimatedLiquidBackground, DragableCarousel, LiquidImage }

export type LiquidImageProps = {
  sourceType?: 'image' | 'video'
  image?: { src: string; alt?: string }
  video?: string
  strength?: number
  speed?: number
  fit?: 'cover' | 'contain' | 'fill'
  borderRadius?: number
  style?: CSSProperties
}

export type DragableCarouselProps = {
  images?: string[]
  preset?: string
  slideWidth?: number
  slideHeight?: number
  gap?: number
  borderRadius?: number
  objectFit?: 'cover' | 'contain' | 'fill'
  showArrows?: boolean
  showDots?: boolean
  arrowColor?: string
  arrowSize?: number | string
  dotColor?: string
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  style?: CSSProperties
}

export type AnimatedLiquidBackgroundProps = {
  preset?: string
  colorMode?: string
  color1?: string
  color2?: string
  color3?: string
  speed?: number
  radius?: string
  style?: CSSProperties
  preview?: boolean
}

export const FramerLiquidBg = AnimatedLiquidBackground as ComponentType<AnimatedLiquidBackgroundProps>
export const FramerCarousel = DragableCarousel as ComponentType<DragableCarouselProps>
export const FramerLiquidImage = LiquidImage as ComponentType<LiquidImageProps>

import { GlowBorderCard } from "@/components/ui/glow-border-card";

export function GlowBorderCardCustom() {
  return (
    <GlowBorderCard
      width="220px"
      gradientColors={['#ff0080', '#ff8c00', '#40e0d0', '#7b68ee', '#ff0080']}
      animationDuration={3}
    />
  );
}

import { LogoSlider } from "@/components/ui/logo-slider";
import { Dumbbell, Trophy, Activity, HeartPulse, Flame } from "lucide-react";

const Logo1 = () => <div className="flex items-center gap-2 font-oswald text-2xl font-bold text-white/50"><Dumbbell size={32} /> SUMMIT</div>;
const Logo2 = () => <div className="flex items-center gap-2 font-oswald text-2xl font-bold text-white/50"><Trophy size={32} /> CHAMPION</div>;
const Logo3 = () => <div className="flex items-center gap-2 font-oswald text-2xl font-bold text-white/50"><Activity size={32} /> CORE</div>;
const Logo4 = () => <div className="flex items-center gap-2 font-oswald text-2xl font-bold text-white/50"><HeartPulse size={32} /> VITAL</div>;
const Logo5 = () => <div className="flex items-center gap-2 font-oswald text-2xl font-bold text-white/50"><Flame size={32} /> IGNITE</div>;

const logos = [
  <Logo1 key="1" />,
  <Logo2 key="2" />,
  <Logo3 key="3" />,
  <Logo4 key="4" />,
  <Logo5 key="5" />,
];

export function TrustedBy() {
  return (
    <LogoSlider
      logos={logos}
      speed={60}
      direction="left"
    />
  );
}
