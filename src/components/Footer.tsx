import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, ArrowUp, Send } from 'lucide-react'

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 600)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <>
      <footer className="bg-bg-dark border-t border-white/10 relative overflow-hidden noise-texture">
        <div className="absolute inset-0 bg-mesh-dark pointer-events-none opacity-50" />

        {/* Newsletter Banner */}
        <div className="relative border-b border-white/5">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 md:py-16">
            <div className="glass rounded-2xl p-8 md:p-10 premium-border flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="font-oswald font-bold text-2xl md:text-3xl text-white uppercase">
                  GET <span className="text-gradient-red">FITNESS TIPS</span> WEEKLY
                </h3>
                <p className="font-inter text-sm text-text-muted mt-2">
                  Join 500+ members getting exclusive workout tips, nutrition guides & offers.
                </p>
              </div>
              <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
                <div className="relative flex-1 md:w-[280px]">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3.5 text-white font-inter text-sm placeholder:text-white/30 focus:border-accent-red focus:outline-none focus:ring-2 focus:ring-accent-red/10 transition-all duration-300"
                  />
                </div>
                <button type="submit" className="btn-primary !py-3.5 !px-5 shrink-0">
                  {subscribed ? '✓' : <Send size={18} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16 md:py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="flex items-center gap-2.5 mb-6"
              >
                <div className="w-8 h-8 rounded-lg bg-accent-red/20 flex items-center justify-center border border-accent-red/30">
                  <span className="font-oswald font-bold text-sm text-accent-red">SC</span>
                </div>
                <span className="font-oswald font-semibold text-lg text-white tracking-[2px] uppercase text-gradient-animated">
                  SUMMIT CORE
                </span>
              </Link>
              <div className="space-y-3 text-text-muted font-inter text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-accent-red mt-0.5 shrink-0" />
                  <span>Riverfront District, Austin, Texas</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-accent-red shrink-0" />
                  <span>+1 (555) 013-4827</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent-red shrink-0" />
                  <span>hello@summitcorefitness.com</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={18} className="text-accent-red mt-0.5 shrink-0" />
                  <span>Mon-Sat: 6AM - 10PM<br />Sun: 7AM - 8PM</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-oswald font-semibold text-base text-white uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-accent-red rounded" />
                Quick Links
              </h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Membership'].map((item) => (
                  <li key={item}>
                    <Link
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="font-inter text-sm text-text-muted hover:text-accent-red hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-accent-red transition-all duration-200" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-oswald font-semibold text-base text-white uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-accent-red rounded" />
                Services
              </h4>
              <ul className="space-y-3">
                {['Personal Training', 'Weight Loss', 'Muscle Gain', 'Strength Training'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/services"
                      className="font-inter text-sm text-text-muted hover:text-accent-red hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-[1px] bg-accent-red transition-all duration-200" />
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-oswald font-semibold text-base text-white uppercase tracking-wide mb-6 flex items-center gap-2">
                <span className="w-6 h-[2px] bg-accent-red rounded" />
                Follow Us
              </h4>
              <p className="font-inter text-sm text-text-muted mb-4">Stay connected for daily motivation.</p>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-white transition-all duration-300 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:scale-110 hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-white transition-all duration-300 hover:bg-[#1877F2] hover:border-transparent hover:scale-110 hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl glass flex items-center justify-center text-white transition-all duration-300 hover:bg-[#FF0000] hover:border-transparent hover:scale-110 hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 py-6 px-6 md:px-12 relative">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-inter text-sm text-text-muted">
              © {currentYear} Summit Core Fitness. All Rights Reserved.
            </p>
            <p className="font-inter text-xs text-text-muted/60">
              Designed with ❤️ for fitness
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl glass flex items-center justify-center text-white transition-all duration-500 hover:bg-accent-red hover:border-accent-red hover:shadow-glow-red group ${
          showBackToTop ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-16 opacity-0 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
      </button>
    </>
  )
}
