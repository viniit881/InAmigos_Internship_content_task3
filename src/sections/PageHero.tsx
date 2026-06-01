import { Link, useLocation } from 'react-router'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface PageHeroProps {
  label: string
  heading: string
  background: string
}

export default function PageHero({ label, heading, background }: PageHeroProps) {
  const location = useLocation()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const breadcrumbRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to([labelRef.current, breadcrumbRef.current], { opacity: 1, stagger: 0.1, duration: 0.5 }, '-=0.4')

    // Parallax
    if (imgRef.current && sectionRef.current) {
      gsap.fromTo(
        imgRef.current,
        { y: -20 },
        {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  const pathName = location.pathname === '/' ? 'Home' : location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)

  return (
    <section ref={sectionRef} className="relative min-h-[55vh] md:min-h-[450px] flex items-center justify-center overflow-hidden">
      <img
        ref={imgRef}
        src={background}
        alt=""
        className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
      />
      <div className="absolute inset-0 gradient-overlay-dark" />
      <div className="absolute inset-0 ambient-glow" />

      <div className="relative z-10 text-center px-6">
        <div className="glass-elevated inline-block rounded-2xl px-8 py-10 md:px-14 md:py-14 premium-border">
          <span ref={labelRef} className="label-tag block mb-4 opacity-0">{label}</span>
          <h1
            ref={headingRef}
            className="opacity-0 translate-y-10 font-oswald font-bold text-4xl md:text-5xl lg:text-6xl text-white uppercase leading-[1.05]"
          >
            {heading}
          </h1>
          <div ref={breadcrumbRef} className="flex items-center justify-center gap-2 mt-5 opacity-0">
            <Link to="/" className="font-inter text-sm text-text-muted hover:text-accent-red transition-colors duration-200">
              Home
            </Link>
            <ChevronRight size={14} className="text-text-muted/50" />
            <span className="font-inter text-sm text-accent-red">
              {pathName}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
