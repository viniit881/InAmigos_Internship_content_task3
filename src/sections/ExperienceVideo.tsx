import { Link } from 'react-router'
import AnimatedSection from '../components/AnimatedSection'
import { images, videos } from '@/lib/images'
import { FramerLiquidImage } from '@/framer/components'
import { Play } from 'lucide-react'

export default function ExperienceVideo() {
  return (
    <section className="section-padding bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
      <div className="content-max relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection direction="left">
            <span className="label-tag block mb-4">INSIDE THE GYM</span>
            <h2 className="section-heading mb-4">
              SEE THE <span className="text-gradient-red">EXPERIENCE</span>
            </h2>
            <p className="font-inter text-base text-text-muted max-w-md mb-8 leading-relaxed">
              Walk through our training floor, recovery lounge, and coaching bays — built for
              serious athletes who expect more than a typical gym.
            </p>
            <Link to="/about" className="btn-primary inline-flex">
              Tour the facility
            </Link>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.12}>
            <div className="relative rounded-2xl overflow-hidden premium-border glass-red-glow aspect-video group min-h-[280px]">
              <FramerLiquidImage
                sourceType="video"
                video={videos.hero}
                strength={0.14}
                speed={0.18}
                fit="cover"
                borderRadius={16}
                style={{ width: '100%', height: '100%', minHeight: 280 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div className="glass rounded-xl px-4 py-3">
                  <p className="font-oswald text-sm text-white uppercase">Live floor energy</p>
                  <p className="font-inter text-xs text-text-muted mt-0.5">Summit Core Fitness · Austin</p>
                </div>
                <div
                  className="w-12 h-12 rounded-full glass flex items-center justify-center shrink-0"
                  aria-hidden
                >
                  <Play size={20} className="text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {images.gallery.slice(0, 3).map((src, i) => (
                <div
                  key={src}
                  className="rounded-xl h-28 w-full overflow-hidden border border-white/10"
                >
                  <FramerLiquidImage
                    sourceType="image"
                    image={{ src, alt: `Gym gallery ${i + 1}` }}
                    strength={0.08}
                    speed={0.15}
                    fit="cover"
                    borderRadius={12}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
