import { Link } from 'react-router'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { images } from '@/lib/images'
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react'
import GradientText from '@/components/ui/GradientText'

gsap.registerPlugin(ScrollTrigger)

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imgRef.current || !sectionRef.current) return

    gsap.fromTo(
      imgRef.current,
      { y: -40 },
      {
        y: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative h-[580px] md:h-[680px] overflow-hidden">
      <img
        ref={imgRef}
        src={images.cta}
        alt="Premium gym interior"
        className="absolute inset-0 w-full h-[130%] object-cover -top-[15%]"
      />
      <div className="absolute inset-0 bg-[rgba(11,11,11,0.7)]" />
      <div className="absolute inset-0 ambient-glow" />

      {/* Floating decorative icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Zap size={40} className="absolute top-[15%] left-[10%] text-accent-red/[0.06] animate-float" style={{ animationDelay: '0s' }} />
        <Shield size={50} className="absolute top-[25%] right-[15%] text-accent-red/[0.05] animate-float" style={{ animationDelay: '2s' }} />
        <Zap size={30} className="absolute bottom-[30%] left-[20%] text-accent-red/[0.04] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        <div className="glass-elevated premium-border-animated rounded-3xl p-10 md:p-16 max-w-[780px]">
          {/* Urgency indicator */}
          <div className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/30 rounded-full px-4 py-2 mb-8">
            <div className="pulse-dot !w-2 !h-2 !bg-accent-red" />
            <span className="font-inter text-xs font-semibold uppercase tracking-wider text-accent-red">
              Limited spots this month
            </span>
          </div>

          <h2 className="font-oswald font-bold text-3xl md:text-4xl lg:text-5xl text-white uppercase leading-[1.08]">
            START YOUR{' '}
            <GradientText 
              colors={["#ff2e2e", "#ff6b6b", "#ff2e2e", "#ff6b6b", "#ff2e2e"]} 
              animationSpeed={4} 
              className="inline-block"
            >
              FITNESS JOURNEY
            </GradientText>{' '}
            TODAY
          </h2>
          <p className="font-inter text-lg text-text-secondary mt-5 max-w-[500px] mx-auto">
            No contracts. No excuses. Just a premium experience built for results.
          </p>

          {/* Trust points */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 mb-8">
            <div className="flex items-center gap-2 text-text-muted">
              <Shield size={16} className="text-accent-gold" />
              <span className="font-inter text-xs uppercase tracking-wide">Money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted">
              <Clock size={16} className="text-accent-gold" />
              <span className="font-inter text-xs uppercase tracking-wide">Cancel anytime</span>
            </div>
          </div>

          <Link to="/membership" className="btn-glow inline-flex shadow-glow-red-xl">
            GET STARTED <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
