import HeroSection from '../sections/HeroSection'
import StatsStrip from '../sections/StatsStrip'
import BrandMarquee from '../sections/BrandMarquee'
import WhyChooseUs from '../sections/WhyChooseUs'
import FacilityShowcase from '../sections/FacilityShowcase'
import ExperienceVideo from '../sections/ExperienceVideo'
import ServicesPreview from '../sections/ServicesPreview'
import FramerTransformations from '../sections/FramerTransformations'
import TestimonialsSection from '../sections/TestimonialsSection'
import CTABanner from '../sections/CTABanner'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <BrandMarquee />
      <WhyChooseUs />
      <FacilityShowcase />
      <ExperienceVideo />
      <ServicesPreview />
      <FramerTransformations />
      <TestimonialsSection />
      <CTABanner />
    </>
  )
}
