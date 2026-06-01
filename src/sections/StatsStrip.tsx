import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Users, Dumbbell, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Award, value: 7, suffix: '+', label: 'Years of excellence' },
  { icon: Users, value: 500, suffix: '+', label: 'Members transformed' },
  { icon: Dumbbell, value: 10, suffix: 'K', label: 'Sq ft premium floor' },
  { icon: Star, value: 4.9, suffix: '', label: 'Average member rating', decimal: true },
]

export default function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [counters, setCounters] = useState(stats.map(() => 0))
  const animated = useRef(false)

  useEffect(() => {
    if (!ref.current) return

    gsap.fromTo(
      ref.current.children,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
          onEnter: () => {
            if (animated.current) return
            animated.current = true
            // Animate counters
            stats.forEach((stat, i) => {
              const obj = { val: 0 }
              gsap.to(obj, {
                val: stat.value,
                duration: 2,
                delay: i * 0.15,
                ease: 'power2.out',
                onUpdate: () => {
                  setCounters(prev => {
                    const next = [...prev]
                    next[i] = stat.decimal
                      ? Math.round(obj.val * 10) / 10
                      : Math.floor(obj.val)
                    return next
                  })
                },
              })
            })
          },
        },
      }
    )
    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [])

  return (
    <section className="relative z-20 -mt-16 md:-mt-20 px-6 md:px-12">
      <div
        className="absolute inset-0 -z-10 rounded-3xl bg-mesh-rich opacity-60"
        style={{ backgroundSize: '200% 200%', animation: 'gradient-shift 10s ease-in-out infinite' }}
      />
      <div className="content-max">
        <div
          ref={ref}
          className="glass-elevated premium-border rounded-2xl p-6 md:p-10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-3 relative group">
              {/* Divider (not on first item) */}
              {i > 0 && (
                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </div>
              )}

              <div className="w-12 h-12 rounded-xl glass flex items-center justify-center relative group-hover:shadow-glow-red transition-all duration-500 animate-glow-pulse">
                <stat.icon size={22} className="text-accent-red" />
                {/* Glow pulse behind icon */}
                <div className="absolute inset-0 rounded-xl bg-accent-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </div>
              <span className="font-space font-bold text-4xl md:text-5xl text-white tabular-nums">
                {stat.decimal ? counters[i].toFixed(1) : counters[i]}
                <span className="text-accent-red">{stat.suffix}</span>
              </span>
              <span className="font-inter text-xs md:text-sm text-text-muted uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Badge
            variant="outline"
            className="border-accent-red/40 bg-accent-red/10 text-accent-red uppercase tracking-widest text-[10px] px-4 py-1"
          >
            Austin&apos;s premium training destination
          </Badge>
        </div>
      </div>
    </section>
  )
}
