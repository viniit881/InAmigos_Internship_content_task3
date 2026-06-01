import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PageHero from '../sections/PageHero'
import AnimatedSection from '../components/AnimatedSection'
import { Check, Shield, Star, Zap } from 'lucide-react'
import { images } from '@/lib/images'

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: 'MONTHLY',
    monthlyPrice: 1500,
    annualPrice: 1350,
    featured: false,
    features: [
      'Full gym access',
      'Locker & shower facilities',
      'Basic equipment orientation',
      'Group classes access',
    ],
    cta: 'GET STARTED',
    ctaStyle: 'secondary' as const,
    icon: Zap,
  },
  {
    name: 'ANNUAL',
    monthlyPrice: 1200,
    annualPrice: 1000,
    featured: true,
    saveText: 'Save ₹3,600/year',
    features: [
      'Everything in Monthly',
      '2 personal training sessions/month',
      'Custom diet plan',
      'Priority class booking',
      'Body composition analysis',
      'Recovery lounge access',
    ],
    cta: 'JOIN NOW',
    ctaStyle: 'primary' as const,
    icon: Star,
  },
  {
    name: 'QUARTERLY',
    monthlyPrice: 1350,
    annualPrice: 1150,
    featured: false,
    features: [
      'Full gym access',
      'Locker & shower facilities',
      '1 personal training session/month',
      'Group classes access',
    ],
    cta: 'GET STARTED',
    ctaStyle: 'secondary' as const,
    icon: Zap,
  },
]

const comparison = [
  { feature: 'Gym Access', monthly: true, quarterly: true, annual: true },
  { feature: 'Group Classes', monthly: true, quarterly: true, annual: true },
  { feature: 'Personal Training', monthly: false, quarterly: '1/month', annual: '2/month' },
  { feature: 'Custom Diet Plan', monthly: false, quarterly: false, annual: true },
  { feature: 'Priority Booking', monthly: false, quarterly: false, annual: true },
  { feature: 'Body Composition Analysis', monthly: false, quarterly: false, annual: true },
  { feature: 'Recovery Lounge', monthly: false, quarterly: false, annual: true },
]

export default function Membership() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')
  const [priceValues, setPriceValues] = useState(plans.map(() => 0))
  const priceValuesRef = useRef(priceValues)
  const pricingRef = useRef<HTMLDivElement>(null)
  const pricesInView = useRef(false)

  useEffect(() => {
    priceValuesRef.current = priceValues
  }, [priceValues])

  const getPlanPrice = (index: number) => {
    const plan = plans[index]
    return billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice
  }

  const animatePrices = () => {
    plans.forEach((_, i) => {
      const target = getPlanPrice(i)
      const start = priceValuesRef.current[i] || 0
      const obj = { val: start }
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          setPriceValues((prev) => {
            const next = [...prev]
            next[i] = Math.round(obj.val)
            return next
          })
        },
      })
    })
  }

  useEffect(() => {
    if (!pricingRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: pricingRef.current,
      start: 'top 80%',
      onEnter: () => {
        if (pricesInView.current) return
        pricesInView.current = true
        animatePrices()
      },
    })

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (pricesInView.current) animatePrices()
  }, [billingCycle])

  const periodLabel = billingCycle === 'annual' ? '/month billed annually' : '/month'

  return (
    <>
      <PageHero
        label="MEMBERSHIP"
        heading="INVEST IN YOURSELF"
        background={images.membership}
      />

      <section className="section-padding bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-rich pointer-events-none" />
        <div className="content-max relative" ref={pricingRef}>
          <AnimatedSection className="text-center mb-16">
            <span className="label-tag block mb-4">PRICING</span>
            <h2 className="section-heading mb-4">CHOOSE YOUR PLAN</h2>
            <p className="section-subtext">
              Flexible plans for every commitment level. No hidden fees. No long-term contracts.
            </p>
          </AnimatedSection>

          <div className="flex items-center justify-center mb-10">
            <div className="glass rounded-full p-1.5 inline-flex items-center gap-1 border border-white/10 relative">
              <span
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-full bg-accent-red/20 transition-all duration-300 ${
                  billingCycle === 'monthly' ? 'left-1.5' : 'left-[calc(50%+3px)]'
                }`}
              />
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`relative z-10 px-5 py-2 text-xs font-inter font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                  billingCycle === 'monthly' ? 'text-white' : 'text-text-muted'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`relative z-10 px-5 py-2 text-xs font-inter font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                  billingCycle === 'annual' ? 'text-white' : 'text-text-muted'
                }`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan, index) => (
              <AnimatedSection
                key={plan.name}
                delay={index * 0.12}
                className={plan.featured ? 'md:-translate-y-6' : ''}
              >
                <div
                  className={`relative rounded-2xl p-8 md:p-10 h-full transition-all duration-500 hover:-translate-y-3 group ${
                    plan.featured
                      ? 'glass-elevated premium-border-animated'
                      : 'glass premium-border hover:border-accent-red/20'
                  }`}
                >
                  {/* Featured ribbon */}
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="bg-gradient-to-r from-accent-red to-accent-red-light text-white font-inter font-bold text-xs uppercase tracking-wider px-6 py-2 rounded-full shadow-glow-red flex items-center gap-2">
                        <Star size={12} fill="currentColor" />
                        Best Value
                      </div>
                    </div>
                  )}

                  {/* Plan icon */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    plan.featured
                      ? 'bg-gradient-to-br from-accent-red/20 to-accent-gold/10 border border-accent-red/30'
                      : 'glass'
                  }`}>
                    <plan.icon size={22} className={plan.featured ? 'text-accent-red' : 'text-text-muted'} />
                  </div>

                  <h3 className="font-oswald font-semibold text-xl text-white uppercase">
                    {plan.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-space font-bold text-4xl md:text-5xl text-white">
                      ₹{priceValues[index].toLocaleString()}
                    </span>
                    <span className="font-inter text-sm text-text-muted">{periodLabel}</span>
                  </div>

                  {plan.saveText && billingCycle === 'annual' && (
                    <p className="font-inter text-sm text-accent-gold mt-1 flex items-center gap-1">
                      <Zap size={14} />
                      {plan.saveText}
                    </p>
                  )}

                  <div className="h-px bg-white/10 my-8" />

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                          plan.featured
                            ? 'bg-accent-red/20'
                            : 'bg-white/5'
                        }`}>
                          <Check size={12} className={plan.featured ? 'text-accent-red' : 'text-text-muted'} />
                        </div>
                        <span className="font-inter text-base text-text-secondary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full mt-8 ${plan.ctaStyle === 'primary' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Comparison table */}
          <AnimatedSection delay={0.3} className="mt-20">
            <div className="text-center mb-10">
              <span className="label-tag block mb-4">COMPARE</span>
              <h3 className="font-oswald font-bold text-2xl md:text-3xl text-white uppercase">Feature Comparison</h3>
            </div>
            <div className="glass rounded-2xl overflow-hidden premium-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left font-inter font-semibold text-sm text-text-muted uppercase tracking-wide px-6 py-5">Feature</th>
                      <th className="text-center font-oswald font-semibold text-base text-white uppercase px-6 py-5">Monthly</th>
                      <th className="text-center font-oswald font-semibold text-base text-white uppercase px-6 py-5">Quarterly</th>
                      <th className="text-center font-oswald font-semibold text-base text-accent-red uppercase px-6 py-5">Annual ★</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, i) => (
                      <tr key={row.feature} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                        <td className="font-inter text-sm text-text-secondary px-6 py-4">{row.feature}</td>
                        <td className="text-center px-6 py-4">
                          {row.monthly === true ? (
                            <Check size={18} className="text-accent-red mx-auto" />
                          ) : row.monthly === false ? (
                            <span className="text-white/20">—</span>
                          ) : (
                            <span className="font-inter text-sm text-text-secondary">{row.monthly}</span>
                          )}
                        </td>
                        <td className="text-center px-6 py-4">
                          {row.quarterly === true ? (
                            <Check size={18} className="text-accent-red mx-auto" />
                          ) : row.quarterly === false ? (
                            <span className="text-white/20">—</span>
                          ) : (
                            <span className="font-inter text-sm text-text-secondary">{row.quarterly}</span>
                          )}
                        </td>
                        <td className="text-center px-6 py-4">
                          {row.annual === true ? (
                            <Check size={18} className="text-accent-red mx-auto" />
                          ) : row.annual === false ? (
                            <span className="text-white/20">—</span>
                          ) : (
                            <span className="font-inter text-sm text-text-secondary">{row.annual}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </AnimatedSection>

          {/* Money-back guarantee */}
          <AnimatedSection delay={0.4} className="mt-12">
            <div className="glass rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-xl bg-accent-gold/10 flex items-center justify-center border border-accent-gold/20 shrink-0">
                <Shield size={28} className="text-accent-gold" />
              </div>
              <div>
                <h4 className="font-oswald font-semibold text-lg text-white uppercase">30-Day Money-Back Guarantee</h4>
                <p className="font-inter text-sm text-text-muted mt-1">
                  Not satisfied? Get a full refund within 30 days — no questions asked.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
