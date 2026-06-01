import { useState } from 'react'
import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { images } from '@/lib/images'

const transformations = [
  {
    name: 'Logan R.',
    result: 'Lost 18kg in 5 months',
    category: 'Weight Loss',
    before: images.transforms.before1,
    after: images.transforms.after1,
  },
  {
    name: 'Maya K.',
    result: 'Gained 12kg lean muscle',
    category: 'Muscle Gain',
    before: images.transforms.before2,
    after: images.transforms.after2,
  },
  {
    name: 'Ethan S.',
    result: 'From skinny to shredded',
    category: 'Body Recomposition',
    before: images.transforms.before3,
    after: images.transforms.after3,
  },
  {
    name: 'Olivia P.',
    result: 'Lost 22kg post-pregnancy',
    category: 'Weight Loss',
    before: images.transforms.before1,
    after: images.transforms.after1,
  },
  {
    name: 'Noah T.',
    result: 'Gained 8kg muscle in 6 months',
    category: 'Muscle Gain',
    before: images.transforms.before3,
    after: images.transforms.after3,
  },
  {
    name: 'Sasha W.',
    result: 'Complete lifestyle transformation',
    category: 'Overall Fitness',
    before: images.transforms.before2,
    after: images.transforms.after2,
  },
]

const testimonials = [
  {
    quote: "I walked in overweight and doubtful. 5 months later, I'm 18kg lighter and genuinely confident. Coach Alex doesn't just train you — he transforms your mindset.",
    name: 'Logan R.',
    result: 'Lost 18kg',
    avatar: images.avatars[0],
  },
  {
    quote: "As a working mom, I thought I'd never have time. The flexible schedule and nutrition support made it possible. Best decision I ever made.",
    name: 'Olivia P.',
    result: 'Lost 22kg',
    avatar: images.avatars[1],
  },
  {
    quote: "I was a skinny guy who couldn't gain weight no matter what. Casey's muscle gain program added 12kg of solid mass. I'm unrecognizable.",
    name: 'Maya K.',
    result: 'Gained 12kg muscle',
    avatar: images.avatars[2],
  },
  {
    quote: "The equipment, the atmosphere, the people — everything pushes you to be better. This isn't just a gym, it's a community.",
    name: 'Ethan S.',
    result: 'Complete transformation',
    avatar: images.avatars[3],
  },
  {
    quote: "Jordan's nutrition plans changed everything. I finally understand nutrition. No more crash diets, just sustainable results.",
    name: 'Noah T.',
    result: 'Gained 8kg muscle',
    avatar: images.avatars[4],
  },
]

export default function Transformations() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <>
      <PageHero
        label="TRANSFORMATIONS"
        heading="REAL RESULTS. REAL STORIES."
        background={images.services.muscleGain}
      />

      {/* Transformation Gallery */}
      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <AnimatedSection className="text-center mb-16">
            <span className="label-tag block mb-4">SUCCESS STORIES</span>
            <h2 className="section-heading mb-4">BEFORE & AFTER</h2>
            <p className="section-subtext">
              These are real members who committed to the process and trusted the journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transformations.map((t, index) => (
              <AnimatedSection key={t.name} delay={index * 0.1}>
                <div
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="aspect-[3/4] relative">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={t.before}
                          alt={`${t.name} before`}
                          className="absolute inset-0 w-full h-full object-cover grayscale"
                        />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[rgba(11,11,11,0.8)] px-4 py-1.5 rounded">
                          <span className="font-inter text-xs font-semibold uppercase text-text-muted">Before</span>
                        </div>
                      </div>
                      <div className="w-1/2 relative overflow-hidden">
                        <img
                          src={t.after}
                          alt={`${t.name} after`}
                          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 ${hoveredIndex === index ? 'brightness-110 scale-105' : ''}`}
                        />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-[rgba(11,11,11,0.8)] px-4 py-1.5 rounded">
                          <span className="font-inter text-xs font-semibold uppercase text-accent-red">After</span>
                        </div>
                      </div>
                    </div>

                    <div className={`absolute inset-0 bg-[rgba(11,11,11,0.6)] flex items-center justify-center transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                      <span className="font-oswald font-semibold text-base text-white uppercase underline underline-offset-4 decoration-accent-red">View Result</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[rgba(11,11,11,0.9)] to-transparent p-6">
                      <h3 className="font-oswald font-semibold text-lg text-white uppercase text-center">{t.name}</h3>
                      <p className="font-inter text-sm text-text-secondary text-center mt-1">{t.result}</p>
                      <span className="font-inter text-xs text-accent-red text-center block mt-1">{t.category}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-bg-alt">
        <div className="content-max max-w-[1000px]">
          <AnimatedSection className="text-center mb-16">
            <span className="label-tag block mb-4">TESTIMONIALS</span>
            <h2 className="section-heading">WHAT OUR MEMBERS SAY</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="relative">
              <div className="bg-[#1A1A1A] border border-white/5 rounded-lg p-8 md:p-12">
                <Quote size={32} className="text-accent-red/20 mb-6" />
                <p className="font-inter text-lg md:text-xl text-text-secondary leading-relaxed italic">
                  {testimonials[activeTestimonial].quote}
                </p>

                <div className="flex items-center gap-4 mt-8">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-accent-red"
                  />
                  <div>
                    <div className="font-oswald font-semibold text-lg text-white uppercase">
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="font-inter text-sm text-accent-red">
                      {testimonials[activeTestimonial].result}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-accent-red hover:text-accent-red transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${i === activeTestimonial ? 'bg-accent-red w-6' : 'bg-white/20'}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-accent-red hover:text-accent-red transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
