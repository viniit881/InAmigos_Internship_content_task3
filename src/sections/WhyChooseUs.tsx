import AnimatedSection from '../components/AnimatedSection'
import { Dumbbell, Apple, Cog, Trophy } from 'lucide-react'

const features = [
  {
    icon: Dumbbell,
    title: 'PERSONAL TRAINING',
    description: '1-on-1 coaching from certified trainers who push you to your limits and beyond.',
    number: '01',
  },
  {
    icon: Apple,
    title: 'DIET GUIDANCE',
    description: 'Customized meal plans and nutrition coaching to fuel your transformation.',
    number: '02',
  },
  {
    icon: Cog,
    title: 'MODERN EQUIPMENT',
    description: 'Premium strength & cardio machines — maintained, sanitized, and always ready.',
    number: '03',
  },
  {
    icon: Trophy,
    title: 'PROVEN RESULTS',
    description: '500+ success stories. Real people. Real transformations. Real proof.',
    number: '04',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      {/* Decorative large text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-oswald font-bold text-[200px] md:text-[300px] text-white/[0.015] uppercase leading-none whitespace-nowrap">
          WHY US
        </span>
      </div>

      <div className="content-max relative">
        <AnimatedSection className="text-center mb-16">
          <span className="label-tag block mb-4">WHY US</span>
          <h2 className="section-heading mb-4">WHY CHOOSE SUMMIT CORE FITNESS</h2>
          <p className="section-subtext">
            We don't just give you equipment. We give you results.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <AnimatedSection key={feature.title} delay={index * 0.12}>
              <div className="card-3d-hover glass premium-border rounded-2xl p-8 md:p-8 text-center h-full relative group overflow-hidden">
                {/* Number badge */}
                <span className="absolute top-4 right-4 font-space font-bold text-5xl text-white/[0.04] group-hover:text-accent-red/10 transition-colors duration-500">
                  {feature.number}
                </span>

                {/* Icon with gradient background */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent-red/20 to-accent-red/5 flex items-center justify-center mb-6 border border-accent-red/20 group-hover:shadow-glow-red group-hover:border-accent-red/40 transition-all duration-500">
                  <feature.icon size={26} className="text-accent-red" />
                </div>

                <h3 className="font-oswald font-semibold text-xl md:text-2xl text-white uppercase mb-3">
                  {feature.title}
                </h3>
                <p className="font-inter text-base text-text-muted leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom gradient line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent-red/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Connecting line under cards */}
        <div className="hidden lg:block mt-8">
          <div className="section-divider" />
        </div>
      </div>
    </section>
  )
}
