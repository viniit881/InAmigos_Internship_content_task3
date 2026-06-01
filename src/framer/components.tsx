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
