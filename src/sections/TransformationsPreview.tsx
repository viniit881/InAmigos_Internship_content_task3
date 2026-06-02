import { useState } from 'react'
import { Link } from 'react-router'
import AnimatedSection from '../components/AnimatedSection'
import { ArrowRight } from 'lucide-react'
import { images } from '@/lib/images'
import { Badge } from '@/components/ui/badge'

const transformations = [
  {
    name: 'Logan R.',
    result: 'Lost 18kg in 5 months',
    image: images.transforms.t6,
  },
  {
    name: 'Maya K.',
    result: 'Gained lean muscle — 12kg',
    image: images.transforms.t5,
  },
  {
    name: 'Ethan S.',
    result: 'Transformed from skinny to shredded',
    image: images.transforms.t3,
  },
]

export default function TransformationsPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="section-padding bg-bg-dark relative">
      <div className="absolute inset-0 ambient-glow pointer-events-none" />
      <div className="content-max relative">
        <AnimatedSection className="text-center mb-16">
          <span className="label-tag block mb-4">TRANSFORMATIONS</span>
          <h2 className="section-heading mb-4">REAL PEOPLE. REAL RESULTS.</h2>
          <p className="section-subtext">
            Our members don&apos;t just show up. They show off.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {transformations.map((t, index) => (
            <AnimatedSection key={t.name} delay={index * 0.15}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer premium-border"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="aspect-[9/16] relative bg-black">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-102 group-hover:brightness-110"
                  />

                  <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Badge className="bg-accent-red/90 text-white uppercase tracking-wider">
                      View result
                    </Badge>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 glass border-0 border-t border-white/10 p-6 rounded-none z-10">
                    <h3 className="font-oswald font-semibold text-lg text-white uppercase text-center">
                      {t.name}
                    </h3>
                    <p className="font-inter text-sm text-text-secondary text-center mt-1">
                      {t.result}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/transformations" className="btn-secondary glass !border-white/20">
            SEE ALL TRANSFORMATIONS <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
