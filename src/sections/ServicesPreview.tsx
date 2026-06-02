import { useRef, useEffect } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { images } from '@/lib/images'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'PERSONAL TRAINING',
    description: 'One-on-one dedicated coaching sessions',
    image: images.services.pt,
    category: 'COACHING',
  },
  {
    title: 'WEIGHT LOSS',
    description: 'Burn fat, build endurance, feel unstoppable',
    image: images.services.weightLoss,
    category: 'PROGRAM',
  },
  {
    title: 'MUSCLE GAIN',
    description: 'Hypertrophy-focused programs for serious gains',
    image: images.services.muscleGain,
    category: 'PROGRAM',
  },
  {
    title: 'STRENGTH TRAINING',
    description: 'Powerlifting and functional strength programs',
    image: images.services.strength,
    category: 'TRAINING',
  },
  {
    title: 'DIET PLANS',
    description: 'Macro-balanced nutrition for your goals',
    image: images.services.diet,
    category: 'NUTRITION',
  },
]

export default function ServicesPreview() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    cardsRef.current.forEach((card) => {
      if (!card) return
      const img = card.querySelector('img')
      gsap.fromTo(
        img,
        { scale: 1.1 },
        {
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="section-padding bg-bg-alt relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-rich pointer-events-none opacity-60" />
      <div className="content-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:h-[calc(100vh-120px)] flex flex-col justify-center">
            <div className="glass-elevated rounded-2xl p-8 md:p-10 md:py-16 premium-border-animated relative overflow-hidden group">
              {/* Subtle background glow/graphic */}
              <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent-red/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-accent-red/20 transition-colors duration-700" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-accent-gold/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="label-tag block mb-4">OUR SERVICES</span>
                <h2 className="section-heading mb-6 text-4xl lg:text-5xl">WHAT WE OFFER</h2>
                <p className="font-inter text-base md:text-lg text-text-muted max-w-[400px] mb-8 leading-relaxed">
                  Everything you need to transform your physique under one roof — curated programs,
                  not cookie-cutter plans. Our expert coaches and premium facilities are here to guide your journey.
                </p>
                <div className="section-divider mb-8" />
                <Link to="/services" className="btn-ghost group">
                  VIEW ALL SERVICES
                  <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 lg:py-12">
            {services.map((service, index) => (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el }}
                className="group relative h-[280px] rounded-2xl overflow-hidden cursor-pointer premium-border"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 gradient-overlay-card" />
                <div className="absolute inset-0 border border-transparent group-hover:border-accent-red/40 transition-all duration-300 rounded-2xl" />

                {/* Category floating tag */}
                <div className="absolute top-6 left-6">
                  <span className="glass rounded-full px-4 py-1.5 font-inter text-[10px] font-semibold uppercase tracking-[2px] text-accent-red border-accent-red/20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-400">
                    {service.category}
                  </span>
                </div>

                {/* Large watermark number */}
                <span className="absolute top-4 right-6 font-oswald font-bold text-6xl text-white/[0.04] group-hover:text-accent-red/15 transition-colors duration-500">
                  0{index + 1}
                </span>

                <div className="absolute bottom-0 left-0 right-0 p-8 transition-all duration-500 translate-y-6 group-hover:translate-y-0">
                  <h3 className="font-oswald font-bold text-xl md:text-2xl text-white uppercase group-hover:text-gradient-red transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="font-inter text-sm md:text-base text-text-secondary mt-2 max-w-[400px] opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {service.description}
                  </p>
                </div>

                <div className="absolute bottom-8 right-8 w-11 h-11 glass rounded-full flex items-center justify-center group-hover:bg-accent-red group-hover:border-accent-red transition-all duration-300">
                  <ArrowUpRight
                    size={20}
                    className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45 transition-transform duration-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
