import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { Instagram, Facebook } from 'lucide-react'
import { images } from '@/lib/images'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { number: '7+', label: 'YEARS OF EXCELLENCE' },
  { number: '500+', label: 'HAPPY MEMBERS' },
  { number: '10+', label: 'EXPERT TRAINERS' },
]

const trainers = [
  {
    name: 'ALEX MORRIS',
    role: 'HEAD TRAINER',
    specialty: 'Strength & Conditioning Specialist',
    bio: 'Former collegiate athlete focused on power, biomechanics, and long-term performance.',
    tags: ['POWER', 'MOBILITY', 'HYBRID'],
    image: images.trainers.one,
  },
  {
    name: 'JORDAN LEE',
    role: 'NUTRITION EXPERT',
    specialty: 'Certified Dietitian & Weight Loss Coach',
    bio: 'Precision nutrition plans built around data, lifestyle, and sustainable results.',
    tags: ['NUTRITION', 'CUT', 'LIFESTYLE'],
    image: images.trainers.two,
  },
  {
    name: 'CASEY PATEL',
    role: 'PHYSIQUE COACH',
    specialty: 'Bodybuilding & Muscle Gain Expert',
    bio: 'Hypertrophy strategist specializing in transformation cycles and recovery protocols.',
    tags: ['MUSCLE', 'RECOVERY', 'PROGRESS'],
    image: images.trainers.three,
  },
]

const milestones = [
  {
    year: '2018',
    title: 'Founded in Austin',
    description: 'A boutique studio with a mission to redefine premium training.',
  },
  {
    year: '2020',
    title: 'Expanded Coaching Team',
    description: 'Brought in specialists across strength, nutrition, and mobility.',
  },
  {
    year: '2022',
    title: '500+ Member Milestone',
    description: 'Growing community of committed, results-driven athletes.',
  },
  {
    year: '2024',
    title: 'Recovery Lounge Launch',
    description: 'Premium recovery protocols integrated into every membership.',
  },
]

const galleryImages = images.gallery

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!statsRef.current) return
    const numbers = statsRef.current.querySelectorAll('.stat-number')
    numbers.forEach((num, i) => {
      const final = parseInt(stats[i].number)
      gsap.fromTo(
        { val: 0 },
        { val: final },
        {
          val: final,
          duration: 1.5,
          delay: i * 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 80%',
          },
          onUpdate: function () {
            (num as HTMLElement).textContent = Math.floor(this.targets()[0].val) + '+'
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <>
      <PageHero
        label="ABOUT US"
        heading="THE STORY BEHIND THE SWEAT"
        background={images.aboutHero}
      />

      {/* Our Story */}
      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <img
                src={images.aboutStory}
                alt="Gym interior"
                className="w-full rounded-2xl object-cover aspect-[4/5] premium-border"
              />
            </AnimatedSection>

            <AnimatedSection direction="right">
              <span className="label-tag block mb-4">OUR STORY</span>
              <h2 className="section-heading mb-6">
                BUILT FOR THOSE WHO REFUSE TO SETTLE
              </h2>
              <p className="font-inter text-base text-text-secondary leading-[1.7] mb-8">
                Summit Core Fitness started in 2018 with one mission — to bring serious fitness to Austin.
                No gimmicks. No shortcuts. Just hard work, expert guidance, and a community that pushes
                each other to be better every single day. What began as a small local gym has grown into
                a trusted fitness destination in the region, with over 500 members who call this place
                their second home.
              </p>

              <div ref={statsRef} className="flex gap-8 md:gap-12">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <div className="stat-number font-oswald font-bold text-3xl md:text-4xl text-accent-red">
                      0+
                    </div>
                    <div className="font-inter text-xs text-text-muted uppercase tracking-wider mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <AnimatedSection className="text-center mb-14">
            <span className="label-tag block mb-4">MILESTONES</span>
            <h2 className="section-heading">OUR JOURNEY</h2>
          </AnimatedSection>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-red/40 to-transparent" />
            <div className="space-y-10">
              {milestones.map((milestone, index) => (
                <AnimatedSection key={milestone.year} delay={index * 0.1}>
                  <div className={`relative pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:ml-auto md:pl-10'}`}>
                    <div className={`absolute left-2 md:left-1/2 md:-translate-x-1/2 top-2 w-5 h-5 rounded-full bg-accent-red shadow-glow-red`} />
                    <span className="font-space font-bold text-accent-gold text-sm tracking-widest">{milestone.year}</span>
                    <h3 className="font-oswald font-semibold text-xl text-white uppercase mt-2">
                      {milestone.title}
                    </h3>
                    <p className="font-inter text-sm text-text-muted mt-2">
                      {milestone.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers */}
      <section className="section-padding bg-bg-alt">
        <div className="content-max">
          <AnimatedSection className="text-center mb-16">
            <span className="label-tag block mb-4">MEET THE TEAM</span>
            <h2 className="section-heading">THE MINDS BEHIND THE MUSCLE</h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer, index) => (
              <AnimatedSection key={trainer.name} delay={index * 0.12}>
                <div className="group relative rounded-lg overflow-hidden cursor-pointer premium-border">
                  <div className="aspect-[3/4]">
                    <img
                      src={trainer.image}
                      alt={trainer.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,11,0.95)] via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-bg-dark/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-oswald font-bold text-xl md:text-2xl text-white uppercase">
                      {trainer.name}
                    </h3>
                    <p className="font-inter text-sm text-accent-red mt-1">{trainer.role}</p>
                    <p className="font-inter text-sm text-text-muted mt-1">{trainer.specialty}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {trainer.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-inter uppercase tracking-wider text-accent-gold border border-accent-gold/30 rounded-full px-2.5 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="font-inter text-sm text-text-secondary mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {trainer.bio}
                    </p>
                    <div className="flex gap-3 mt-4">
                      <a href="#" className="text-white hover:text-accent-red transition-colors">
                        <Instagram size={20} />
                      </a>
                      <a href="#" className="text-white hover:text-accent-red transition-colors">
                        <Facebook size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <AnimatedSection className="text-center mb-12">
            <span className="label-tag block mb-4">GALLERY</span>
            <h2 className="section-heading">STEP INSIDE</h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.08}
                className={index === 1 || index === 4 ? 'row-span-2' : ''}
              >
                <div className="group relative rounded-lg overflow-hidden h-full">
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
