import { useState } from 'react'
import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { MessageCircle, Clock, CheckCircle, ChevronDown } from 'lucide-react'
import { images } from '@/lib/images'

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    goal: '',
    time: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const currentStep = formData.goal && formData.time
    ? 3
    : formData.name && formData.phone
      ? 2
      : 1

  const floatLabelClass = (filled: boolean) => (
    `absolute left-4 top-3.5 text-sm text-white/60 transition-all duration-200 ${
      filled ? 'text-xs -translate-y-3 text-accent-red' : ''
    } peer-focus:text-xs peer-focus:-translate-y-3 peer-focus:text-accent-red`
  )

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number'
    }
    if (!formData.goal) newErrors.goal = 'Please select a fitness goal'
    if (!formData.time) newErrors.time = 'Please select a preferred time'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
      }
    } catch {
      setErrors({ general: 'Something went wrong. Please try again.' })
    }
    setSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <>
      <PageHero
        label="BOOK NOW"
        heading="START YOUR JOURNEY TODAY"
        background={images.booking}
      />

      <section className="section-padding bg-bg-dark">
        <div className="content-max">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form */}
            <AnimatedSection direction="left" className="lg:col-span-7">
              {submitted ? (
                <div className="text-center py-16">
                  <CheckCircle size={48} className="text-accent-red mx-auto mb-6" />
                  <h3 className="font-oswald font-semibold text-2xl text-white uppercase mb-4">
                    Thank You!
                  </h3>
                  <p className="font-inter text-text-secondary">
                    We'll call you within 24 hours to confirm your session.
                  </p>
                </div>
              ) : (
                <>
                  <span className="label-tag block mb-4">FREE TRIAL SESSION</span>
                  <h2 className="section-heading mb-4">BOOK YOUR FREE SESSION</h2>
                  <p className="font-inter text-base text-text-muted mb-10">
                    Fill out the form below and our team will contact you within 24 hours to schedule your session.
                  </p>

                  <div className="glass rounded-2xl p-6 mb-8 premium-border">
                    <div className="flex items-center justify-between gap-4">
                      {[
                        { id: 1, label: 'Details' },
                        { id: 2, label: 'Goals' },
                        { id: 3, label: 'Schedule' },
                      ].map((step, index) => (
                        <div key={step.id} className="flex items-center gap-3 flex-1">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-inter font-semibold ${
                              currentStep >= step.id
                                ? 'bg-accent-red text-white shadow-glow-red'
                                : 'bg-white/10 text-text-muted'
                            }`}
                          >
                            0{step.id}
                          </div>
                          <span className="font-inter text-xs uppercase tracking-wider text-text-muted">{step.label}</span>
                          {index < 2 && (
                            <div className="hidden sm:block h-px flex-1 bg-white/10" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder=" "
                        className={`peer w-full bg-white/5 border ${errors.name ? 'border-accent-red' : 'border-white/10'} rounded px-4 pt-5 pb-3 text-white font-inter text-base placeholder:text-white/30 focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-colors`}
                      />
                      <label className={floatLabelClass(!!formData.name)}>Full Name</label>
                      {errors.name && <span className="text-accent-red text-xs mt-1 block">{errors.name}</span>}
                    </div>

                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" "
                        className={`peer w-full bg-white/5 border ${errors.phone ? 'border-accent-red' : 'border-white/10'} rounded px-4 pt-5 pb-3 text-white font-inter text-base placeholder:text-white/30 focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-colors`}
                      />
                      <label className={floatLabelClass(!!formData.phone)}>Phone Number</label>
                      {errors.phone && <span className="text-accent-red text-xs mt-1 block">{errors.phone}</span>}
                    </div>

                    <div className="relative">
                      <select
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        className={`peer w-full bg-white/5 border ${errors.goal ? 'border-accent-red' : 'border-white/10'} rounded px-4 pt-5 pb-3 text-white font-inter text-base focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-colors appearance-none`}
                      >
                        <option value="" className="bg-bg-dark">Select your goal</option>
                        <option value="Weight Loss" className="bg-bg-dark">Weight Loss</option>
                        <option value="Muscle Gain" className="bg-bg-dark">Muscle Gain</option>
                        <option value="Strength Training" className="bg-bg-dark">Strength Training</option>
                        <option value="General Fitness" className="bg-bg-dark">General Fitness</option>
                        <option value="Other" className="bg-bg-dark">Other</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                      <label className={floatLabelClass(!!formData.goal)}>Fitness Goal</label>
                      {errors.goal && <span className="text-accent-red text-xs mt-1 block">{errors.goal}</span>}
                    </div>

                    <div className="relative">
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className={`peer w-full bg-white/5 border ${errors.time ? 'border-accent-red' : 'border-white/10'} rounded px-4 pt-5 pb-3 text-white font-inter text-base focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-colors appearance-none`}
                      >
                        <option value="" className="bg-bg-dark">Select preferred time</option>
                        <option value="Morning (6AM - 10AM)" className="bg-bg-dark">Morning (6AM - 10AM)</option>
                        <option value="Midday (10AM - 2PM)" className="bg-bg-dark">Midday (10AM - 2PM)</option>
                        <option value="Evening (4PM - 8PM)" className="bg-bg-dark">Evening (4PM - 8PM)</option>
                        <option value="Night (8PM - 10PM)" className="bg-bg-dark">Night (8PM - 10PM)</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                      <label className={floatLabelClass(!!formData.time)}>Preferred Time</label>
                      {errors.time && <span className="text-accent-red text-xs mt-1 block">{errors.time}</span>}
                    </div>

                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder=" "
                        className="peer w-full bg-white/5 border border-white/10 rounded px-4 pt-5 pb-3 text-white font-inter text-base placeholder:text-white/30 focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-colors resize-none"
                      />
                      <label className={floatLabelClass(!!formData.message)}>Message (Optional)</label>
                    </div>

                    {errors.general && (
                      <p className="text-accent-red text-sm">{errors.general}</p>
                    )}

                    <button type="submit" className="btn-primary w-full" disabled={submitting}>
                      {submitting ? 'Submitting...' : 'BOOK MY SESSION'}
                    </button>
                  </form>
                </>
              )}
            </AnimatedSection>

            {/* Side panel */}
            <AnimatedSection direction="right" delay={0.2} className="lg:col-span-5">
              <img
                src={images.booking}
                alt="Motivational workout"
                className="w-full rounded-lg object-cover aspect-[4/5] mb-8"
              />

              <div>
                <span className="label-tag block mb-4">OR CALL US DIRECTLY</span>
                <div className="font-oswald font-bold text-2xl md:text-3xl text-white mb-2">
                  +1 (555) 013-4827
                </div>
                <div className="flex items-center gap-2 font-inter text-sm text-text-muted mb-4">
                  <MessageCircle size={16} />
                  <span>Available on WhatsApp</span>
                </div>
                <div className="flex items-center gap-2 font-inter text-sm text-text-muted">
                  <Clock size={16} />
                  <span>Mon-Sat: 6AM - 10PM | Sun: 7AM - 8PM</span>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
