import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { ArrowUpRight } from 'lucide-react'
import { images } from '@/lib/images'

const services = [
  {
    number: '01',
    title: 'PERSONAL TRAINING',
    description: 'Dedicated 1-on-1 coaching tailored to your goals, body type, and fitness level.',
    image: images.services.pt,
    features: ['Custom workout plans', 'Form correction & injury prevention', 'Progress tracking', 'Flexible scheduling'],
  },
  {
    number: '02',
    title: 'WEIGHT LOSS',
    description: 'Science-backed fat loss programs that actually work — no fad diets, no shortcuts.',
    image: images.services.weightLoss,
    features: ['HIIT & cardio protocols', 'Calorie-deficit meal planning', 'Weekly progress check-ins', 'Metabolic conditioning'],
  },
  {
    number: '03',
    title: 'MUSCLE GAIN',
    description: 'Hypertrophy-focused training for those who want to build size and strength.',
    image: images.services.muscleGain,
    features: ['Progressive overload programs', 'Split training routines', 'Supplement guidance', 'Recovery optimization'],
  },
  {
    number: '04',
    title: 'STRENGTH TRAINING',
    description: 'Powerlifting and functional strength for athletes and serious lifters.',
    image: images.services.strength,
    features: ['Compound lift mastery', 'Periodization programming', 'Strength assessments', 'Competition prep'],
  },
  {
    number: '05',
    title: 'DIET PLANS',
    description: 'Nutrition is 80% of the battle. We help you win it.',
    image: images.services.diet,
    features: ['Macro-balanced meal plans', 'Grocery shopping guides', 'Cheat meal strategies', 'Monthly diet adjustments'],
  },
]

export default function Services() {
  return (
    <>
      <PageHero
        label="OUR SERVICES"
        heading="EVERYTHING YOU NEED TO TRANSFORM"
        background={images.services.strength}
      />

      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <AnimatedSection className="text-center mb-16 max-w-[700px] mx-auto">
            <span className="label-tag block mb-4">WHAT WE OFFER</span>
            <h2 className="section-heading mb-4">SERVICES BUILT FOR RESULTS</h2>
            <p className="font-inter text-base md:text-lg text-text-muted">
              Whether you're here to lose weight, build muscle, or completely transform your lifestyle — we have the expertise and equipment to get you there.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.1}>
                <div className="group relative h-[380px] rounded-lg overflow-hidden cursor-pointer">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 gradient-overlay-card" />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-red transition-all duration-300 rounded-lg" />

                  <span className="absolute top-6 left-6 font-oswald font-bold text-5xl text-white/10 group-hover:text-accent-red/30 transition-colors duration-300">
                    {service.number}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <h3 className="font-oswald font-bold text-2xl md:text-3xl text-white uppercase">
                      {service.title}
                    </h3>
                    <p className="font-inter text-base text-text-secondary mt-2 max-w-[400px]">
                      {service.description}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 font-inter text-sm text-text-muted">
                          <span className="text-accent-red">—</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex items-center gap-2 font-inter text-sm text-white uppercase group-hover:text-accent-red transition-colors">
                      Learn More <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
