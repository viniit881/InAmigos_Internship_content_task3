import AnimatedSection from '../components/AnimatedSection'
import { images, videos } from '@/lib/images'
import { FramerLiquidImage } from '@/framer/components'
import { Sparkles } from 'lucide-react'

const facility = images.facility

export default function FacilityShowcase() {
  return (
    <section className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      <div className="content-max relative">
        <AnimatedSection className="text-center mb-14">
          <span className="label-tag block mb-4">THE SPACE</span>
          <h2 className="section-heading mb-4">
            A <span className="text-gradient-red">PREMIUM</span> TRAINING SANCTUARY
          </h2>
          <p className="section-subtext">
            Industrial-grade equipment, curated lighting, and spaces designed for focus — not crowds.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[180px]">
          <AnimatedSection className="col-span-2 row-span-2" delay={0}>
            <div className="group relative h-full min-h-[280px] md:min-h-[376px] rounded-2xl overflow-hidden premium-border">
              <FramerLiquidImage
                sourceType="image"
                image={{ src: facility[0], alt: 'Main training floor' }}
                strength={0.12}
                speed={0.2}
                fit="cover"
                borderRadius={16}
                style={{ width: '100%', height: '100%', minHeight: 280 }}
              />
              <div className="absolute inset-0 gradient-overlay-card pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 pointer-events-none">
                <div className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 mb-3">
                  <Sparkles size={14} className="text-accent-red" />
                  <span className="font-inter text-xs uppercase tracking-wider text-white">
                    Flagship floor
                  </span>
                </div>
                <h3 className="font-oswald text-2xl md:text-3xl text-white uppercase">
                  Open training deck
                </h3>
              </div>
            </div>
          </AnimatedSection>

          {facility.slice(1, 5).map((src, i) => (
            <AnimatedSection key={src} delay={(i + 1) * 0.08} className={i === 2 ? 'col-span-2 md:col-span-1' : ''}>
              <div className="group relative h-full min-h-[140px] md:min-h-[180px] rounded-xl overflow-hidden glass border-white/5">
                <img
                  src={src}
                  alt={`Facility ${i + 2}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.3} className="mt-8">
          <div className="glass rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-oswald text-xl md:text-2xl text-white uppercase">
                Recovery lounge &amp; cold plunge
              </p>
              <p className="font-inter text-sm text-text-muted mt-2 max-w-md">
                Members-only recovery zone with compression, stretching bays, and premium amenities.
              </p>
            </div>
            <div className="w-full md:w-56 h-36 md:h-32 rounded-xl overflow-hidden border border-white/10">
              <FramerLiquidImage
                sourceType="video"
                video={videos.training}
                strength={0.1}
                speed={0.16}
                fit="cover"
                borderRadius={12}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
