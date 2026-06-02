import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/transformations', label: 'Transformations' },
  { path: '/membership', label: 'Membership' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 80)
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
    setScrollProgress(progress)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px]">
        <div
          className="h-full bg-gradient-to-r from-accent-red via-accent-red-light to-accent-red transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-[2px] left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong border-b border-white/10 shadow-lg noise-texture relative'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-[76px] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-bg-elevated flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-accent-red/50 transition-all duration-300">
                <img src="/images/gym_logo.png" alt="Summit Core Logo" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 pulse-dot !w-2 !h-2" />
            </div>
            <span className="font-oswald font-semibold text-base md:text-lg text-white tracking-[2px] uppercase">
              SUMMIT CORE
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 group"
              >
                <span className={`font-inter font-medium text-sm transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-accent-red'
                    : 'text-white/80 group-hover:text-white'
                }`}>
                  {link.label}
                </span>
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-accent-red to-transparent transition-all duration-400 ease-out ${
                    location.pathname === link.path ? 'w-3/4 opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-60'
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              to="/booking"
              className="inline-flex items-center gap-2 bg-accent-red/10 border border-accent-red/40 text-accent-red font-inter font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded-lg transition-all duration-300 hover:bg-accent-red hover:text-white hover:shadow-glow-red group shimmer-border"
            >
              Book Now
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white p-2 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-7 h-7 flex items-center justify-center">
              <Menu
                size={28}
                className={`absolute transition-all duration-300 ${mobileOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}
              />
              <X
                size={28}
                className={`absolute transition-all duration-300 ${mobileOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-bg-dark/95 backdrop-blur-2xl flex flex-col items-center justify-center transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent-red/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col items-center gap-6 relative">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-oswald font-bold text-3xl uppercase transition-all duration-300 ${
                location.pathname === link.path
                  ? 'text-accent-red'
                  : 'text-white/70 hover:text-white'
              }`}
              style={{
                transitionDelay: mobileOpen ? `${index * 60}ms` : '0ms',
                transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileOpen ? 1 : 0,
              }}
            >
              <span className="text-accent-red/40 font-space text-sm mr-3">0{index + 1}</span>
              {link.label}
            </Link>
          ))}
          <Link
            to="/booking"
            className="btn-primary mt-6"
            onClick={() => setMobileOpen(false)}
            style={{
              transitionDelay: mobileOpen ? `${navLinks.length * 60}ms` : '0ms',
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              opacity: mobileOpen ? 1 : 0,
            }}
          >
            Book Now <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  )
}
