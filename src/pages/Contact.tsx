import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Youtube, Twitter } from 'lucide-react'
import { images } from '@/lib/images'

const contactInfo = [
  {
    icon: MapPin,
    label: 'ADDRESS',
    value: '101 Demo Avenue, Suite 200, Austin, TX 78701',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+1 (555) 013-4827',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'hello@summitcorefitness.com',
  },
  {
    icon: Clock,
    label: 'HOURS',
    value: 'Mon-Sat: 6:00 AM - 10:00 PM | Sun: 7:00 AM - 8:00 PM',
  },
]

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
]

export default function Contact() {
  return (
    <>
      <PageHero
        label="CONTACT"
        heading="LET'S TALK GAINS"
        background={images.contactGym}
      />

      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact details */}
            <div className="lg:col-span-5">
              <AnimatedSection>
                <span className="label-tag block mb-4">GET IN TOUCH</span>
                <h2 className="section-heading mb-4">VISIT US TODAY</h2>
                <p className="font-inter text-base text-text-muted mb-10">
                  Drop by for a tour, call us for inquiries, or fill out the booking form for a free trial.
                </p>
              </AnimatedSection>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <AnimatedSection key={info.label} delay={index * 0.1}>
                    <div className="flex gap-4 p-6 glass rounded-xl premium-border items-start">
                      <div className="w-12 h-12 rounded-full bg-accent-red/10 flex items-center justify-center shrink-0 shadow-glow-red">
                        <info.icon size={24} className="text-accent-red" />
                      </div>
                      <div>
                        <span className="font-inter font-semibold text-xs text-text-muted uppercase tracking-wider block">
                          {info.label}
                        </span>
                        <span className="font-inter text-base text-white mt-1 block">
                          {info.value}
                        </span>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              <AnimatedSection delay={0.4} className="mt-8">
                <span className="font-inter font-semibold text-xs text-text-muted uppercase tracking-wider block mb-4">
                  FOLLOW US
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-bg-alt border border-white/10 flex items-center justify-center text-white hover:text-accent-red hover:border-accent-red transition-all duration-200"
                      aria-label={social.label}
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Map + Photo */}
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden h-[400px] mb-6 premium-border">
                <iframe
                  src="https://www.google.com/maps?q=101%20Demo%20Avenue%2C%20Austin%2C%20TX%2078701&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%) saturate(120%)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Summit Core Fitness Location"
                />
              </div>
              <img
                src={images.aboutStory}
                alt="Gym interior"
                className="w-full rounded-lg object-cover h-[200px]"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
