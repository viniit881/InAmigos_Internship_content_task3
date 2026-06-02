import { useRef, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { useScroll, useTransform, motion } from 'framer-motion'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { images } from '@/lib/images'
import { FramerLiquidBg } from '@/framer/components'

// Total number of extracted frames
const TOTAL_FRAMES = 60

// Preload all frames into memory for instant switching
function useFramePreloader(total: number) {
  const [loaded, setLoaded] = useState(false)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    let mounted = true
    const imgs: HTMLImageElement[] = []
    let count = 0

    for (let i = 1; i <= total; i++) {
      const img = new Image()
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      img.onload = () => {
        count++
        if (count >= total && mounted) setLoaded(true)
      }
      img.onerror = () => {
        count++
        if (count >= total && mounted) setLoaded(true)
      }
      imgs.push(img)
    }

    imagesRef.current = imgs
    return () => { mounted = false }
  }, [total])

  return { loaded, images: imagesRef }
}

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const lastFrameRef = useRef(0)

  const { loaded, images: preloadedImages } = useFramePreloader(TOTAL_FRAMES)

  // Track scroll progress within the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax effects for text content
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -180])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Draw frame to canvas on scroll
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current
      const imgs = preloadedImages.current
      if (!canvas || !imgs.length) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = imgs[frameIndex]
      if (!img || !img.complete) return

      // Set canvas size to match image on first draw
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
    },
    [preloadedImages]
  )

  // Subscribe to scroll progress and update canvas
  useEffect(() => {
    if (!loaded) return

    // Draw the first frame immediately
    drawFrame(0)

    const unsubscribe = scrollYProgress.on('change', (value) => {
      const frame = Math.min(
        Math.max(Math.floor(value * TOTAL_FRAMES), 0),
        TOTAL_FRAMES - 1
      )

      if (frame !== lastFrameRef.current) {
        lastFrameRef.current = frame
        requestAnimationFrame(() => drawFrame(frame))
      }
    })

    return () => unsubscribe()
  }, [loaded, scrollYProgress, drawFrame])

  // GSAP entrance animations (same as before)
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })

    if (lettersRef.current) {
      const letters = lettersRef.current.querySelectorAll('.hero-letter')
      tl.to(letters, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.06,
        stagger: 0.04,
        ease: 'power3.out',
      }, '-=0.3')
    }

    tl.to(line2Ref.current, { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to(trustRef.current, { opacity: 1, duration: 0.4, ease: 'power3.out' }, '-=0.2')
      .to(floatRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(scrollRef.current, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')

    return () => { tl.kill() }
  }, [])

  const elevatLetters = 'ELEVATE'.split('')

  return (
    <section ref={containerRef} className="hero-scroll-container">
      {/* Sticky viewport */}
      <div className="hero-scroll-sticky">
        {/* Framer liquid shader — ambient layer */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <FramerLiquidBg
            preset="custom"
            colorMode="custom"
            color1="#0B0B0B"
            color2="#FF2E2E"
            color3="#1a0505"
            speed={18}
            radius="0px"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Fallback static image while frames load */}
        <img
          src={images.heroBg}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover z-[1] transition-opacity duration-500 ${loaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden
        />

        {/* Canvas-rendered frame sequence */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full object-cover z-[2] transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          style={{ objectFit: 'cover' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 gradient-overlay z-[3]" />
        <div className="absolute inset-0 vignette-overlay z-[3]" />
        <div className="absolute inset-0 ambient-glow z-[3]" />

        {/* Floating particles */}
        <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent-red/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${6 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: 0.2 + Math.random() * 0.4,
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
              }}
            />
          ))}
        </div>

        {/* Hero content with parallax */}
        <motion.div
          className="relative z-10 h-full flex items-center justify-center px-6 md:px-12"
          style={{ y: contentY, opacity: contentOpacity }}
        >
          <div className="max-w-[900px] w-full">
            <div
              ref={labelRef}
              className="opacity-0 translate-y-5 flex flex-wrap items-center gap-3 mb-6"
            >
              <Badge
                variant="outline"
                className="border-white/20 bg-white/5 backdrop-blur-md text-white uppercase tracking-[3px] text-[10px] px-3 py-1"
              >
                <Sparkles size={12} className="text-accent-red mr-1" />
                Austin, Texas
              </Badge>
              <span className="font-inter text-xs text-text-muted uppercase tracking-widest">
                Premium · Since 2018
              </span>
            </div>

            <h1 className="font-oswald font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] text-white uppercase leading-[1.0] mb-2">
              {/* Split text letter reveal */}
              <div ref={lettersRef} className="flex flex-wrap">
                {elevatLetters.map((letter, i) => (
                  <span
                    key={i}
                    className="hero-letter opacity-0 translate-y-[60px] inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <div ref={line2Ref} className="opacity-0 translate-y-[40px] scale-[0.95] text-gradient-animated">
                YOUR LIMITS
              </div>
            </h1>

            <p
              ref={subRef}
              className="opacity-0 translate-y-[30px] font-inter text-lg md:text-xl text-text-secondary max-w-[600px] mt-6 leading-relaxed"
            >
              Where elite coaching meets a sanctuary-grade training environment. Build strength,
              discipline, and the best version of you.
            </p>

            <div
              ref={ctaRef}
              className="opacity-0 translate-y-5 flex flex-wrap gap-4 mt-10"
            >
              <Link to="/membership" className="btn-primary shadow-glow-red group">
                Join the elite
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link to="/booking" className="btn-secondary btn-magnetic glass !border-white/30 hover:!bg-white/10">
                Book free trial
              </Link>
            </div>

            <div
              ref={trustRef}
              className="opacity-0 glass-elevated inline-flex items-center gap-4 mt-8 rounded-full px-5 py-3"
            >
              <div className="flex -space-x-2">
                {images.avatars.slice(0, 5).map((src, i) => (
                  <img
                    key={`${src}-${i}`}
                    src={src}
                    alt="Member"
                    className="w-9 h-9 rounded-full border-2 border-bg-dark object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="pulse-dot !w-2 !h-2" />
                <span className="font-inter text-sm text-text-secondary">
                  <strong className="text-white">500+</strong> members transformed
                </span>
              </div>
            </div>
          </div>

          <div
            ref={floatRef}
            className="opacity-0 translate-y-8 hidden xl:block absolute right-0 bottom-24 glass-elevated rounded-2xl p-5 w-[220px] animate-float overflow-hidden premium-border"
          >
            <img
              src={images.gallery[0]}
              alt="Gym facility"
              className="w-full h-28 object-cover rounded-lg mb-3"
            />
            <p className="font-oswald text-sm text-white uppercase">Open 6AM — 10PM</p>
            <p className="font-inter text-xs text-text-muted mt-1">Personal coaching available daily</p>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="opacity-0 absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="font-inter text-[10px] text-text-muted uppercase tracking-[3px]">Scroll</span>
          <div className="scroll-indicator">
            <div className="scroll-indicator-dot" />
          </div>
          <ChevronDown size={16} className="text-text-muted animate-bounce-subtle" />
        </div>
      </div>
    </section>
  )
}
