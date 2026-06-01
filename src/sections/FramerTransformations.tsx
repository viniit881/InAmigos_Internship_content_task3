import AnimatedSection from '../components/AnimatedSection'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { images } from '@/lib/images'
import { FramerCarousel } from '@/framer/components'

const carouselImages = [
  images.transforms.after1,
  images.transforms.after2,
  images.transforms.after3,
  images.services.muscleGain,
  images.services.strength,
  images.gallery[0],
  images.gallery[1],
]

export default function FramerTransformations() {
  return (
    <section className="section-padding bg-bg-alt relative overflow-hidden">
      <div className="content-max relative">
        <AnimatedSection className="text-center mb-10">
          <span className="label-tag block mb-4">TRANSFORMATIONS</span>
          <h2 className="section-heading mb-4">DRAG TO EXPLORE RESULTS</h2>
          <p className="section-subtext">
            Swipe through member wins — 3D carousel powered by Framer.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="w-full h-[420px] md:h-[480px] rounded-2xl overflow-hidden glass premium-border">
            <FramerCarousel
              images={carouselImages}
              preset="Deep 3D"
              slideWidth={280}
              slideHeight={380}
              gap={24}
              borderRadius={16}
              objectFit="cover"
              showArrows
              showDots
              arrowColor="#FF2E2E"
              arrowSize={28}
              dotColor="#FF2E2E"
              autoplay
              autoplayDelay={3000}
              pauseOnHover
              loop
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </AnimatedSection>

        <div className="text-center mt-10">
          <Link to="/transformations" className="btn-secondary glass !border-white/20">
            SEE ALL TRANSFORMATIONS <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
