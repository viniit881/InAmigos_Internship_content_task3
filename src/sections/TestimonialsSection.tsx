import AnimatedSection from '../components/AnimatedSection'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { images } from '@/lib/images'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Lost 22 lbs · 6 months',
    quote:
      'Summit Core feels like a private studio, not a warehouse gym. The coaching is surgical — every session has purpose.',
    avatar: images.avatars[1],
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Competition prep',
    quote:
      'The atmosphere alone elevates your training. Glass-clean facility, elite equipment, and trainers who actually care.',
    avatar: images.avatars[2],
    rating: 5,
  },
  {
    name: 'Elena Rodriguez',
    role: 'Strength athlete',
    quote:
      'I have trained at gyms across Texas. Nothing matches the premium vibe and results-driven culture here.',
    avatar: images.avatars[4],
    rating: 5,
  },
  {
    name: 'James Okonkwo',
    role: 'Executive member',
    quote:
      'Early mornings, zero chaos. Just me, my coach, and a space that looks like it belongs in a design magazine.',
    avatar: images.avatars[3],
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-bg-alt relative overflow-hidden noise-texture">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent-red/6 blur-[120px] rounded-full pointer-events-none" />
      {/* Decorative watermark */}
      <div className="absolute bottom-10 right-10 pointer-events-none select-none">
        <Quote size={200} className="text-white/[0.015]" />
      </div>

      <div className="content-max relative">
        <AnimatedSection className="text-center mb-14">
          <span className="label-tag block mb-4">MEMBER VOICES</span>
          <h2 className="section-heading mb-4">TRUSTED BY AUSTIN&apos;S BEST</h2>
          <p className="section-subtext">
            Real stories from members who chose excellence over ordinary.
          </p>
          {/* Overall rating */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="star-filled" fill="currentColor" />
              ))}
            </div>
            <span className="font-space font-bold text-lg text-white">4.9</span>
            <span className="font-inter text-sm text-text-muted">from 500+ reviews</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((t) => (
                <CarouselItem key={t.name} className="pl-4 md:basis-1/2 lg:basis-1/2">
                  <article className="glass-elevated premium-border rounded-2xl p-8 h-full flex flex-col relative overflow-hidden group">
                    {/* Decorative corner glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-red/5 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <Quote size={32} className="text-accent-red/40 mb-4 shrink-0" />

                    {/* Star rating */}
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={14} className="star-filled" fill="currentColor" />
                      ))}
                    </div>

                    <p className="font-inter text-base text-text-secondary leading-relaxed flex-1">
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                      {/* Avatar with gradient ring */}
                      <div className="relative">
                        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-br from-accent-red via-accent-red-light to-accent-gold opacity-60" />
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="relative w-12 h-12 rounded-full object-cover border-2 border-bg-dark"
                        />
                      </div>
                      <div>
                        <p className="font-oswald text-lg text-white uppercase">{t.name}</p>
                        <Badge
                          variant="outline"
                          className="mt-1 border-white/15 text-text-muted text-[10px]"
                        >
                          {t.role}
                        </Badge>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="glass border-white/10 text-white -left-4 md:-left-12 hover:bg-accent-red hover:border-accent-red transition-all duration-300" />
            <CarouselNext className="glass border-white/10 text-white -right-4 md:-right-12 hover:bg-accent-red hover:border-accent-red transition-all duration-300" />
          </Carousel>
        </AnimatedSection>
      </div>
    </section>
  )
}
