import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { images, videos } from '@/lib/images'
import { FramerLiquidBg } from '@/framer/components'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lettersRef = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const floatRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 })

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })

    // Split text letter animation for "ELEVATE"
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

    gsap.fromTo(
      videoRef.current,
      { scale: 1.06 },
      { scale: 1, duration: 10, ease: 'sine.out' }
    )

    return () => {
      tl.kill()
    }
  }, [])

  const elevatLetters = 'ELEVATE'.split('')

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Framer liquid shader — ambient layer */}
      <div className="absolute inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none">
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

      <img
        src={images.heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        aria-hidden
      />

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={images.heroBg}
        className="absolute inset-0 w-full h-full object-cover z-[2]"
      >
        <source src={videos.hero} type="video/mp4" />
      </video>

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

      <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-12">
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
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-28 object-cover rounded-lg mb-3"
            poster={images.gallery[0]}
          >
            <source src={videos.training} type="video/mp4" />
          </video>
          <p className="font-oswald text-sm text-white uppercase">Open 6AM — 10PM</p>
          <p className="font-inter text-xs text-text-muted mt-1">Personal coaching available daily</p>
        </div>
      </div>

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
    </section>
  )
}
