import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { site } from '@/lib/site'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Reset both menu and scroll state on route change (ScrollToTop resets scrollY but doesn't fire scroll events)
  useEffect(() => {
    setOpen(false)
    setScrolled(false)
  }, [location.pathname])

  // All pages have dark hero headers — use white logo when not scrolled, color logo when scrolled
  const useWhiteLogo = !scrolled

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(244,247,250,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,95,180,0.1)' : '1px solid transparent',
      }}
    >
      <div className="container-x mx-auto max-w-7xl flex items-center justify-between h-20">
        {/* Logo — swaps based on scroll */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={useWhiteLogo ? '/logo-white.png' : '/logo-color.png'}
            alt="Blue Rhino Mortgages"
            className="h-10 w-auto object-contain transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {site.nav.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-body font-medium transition-colors relative"
              style={{
                color: useWhiteLogo ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.65)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = useWhiteLogo ? '#ffffff' : '#1a5fb4' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = useWhiteLogo ? 'rgba(255,255,255,0.8)' : 'rgba(26,26,26,0.65)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${site.phone.replace(/-/g, '')}`}
            className="hidden lg:block text-sm font-body font-semibold transition-colors"
            style={{ color: useWhiteLogo ? 'rgba(255,255,255,0.8)' : '#1a5fb4' }}
          >
            {site.phone}
          </a>
          <Link
            to="/contact"
            className="text-sm font-body font-semibold px-5 py-2.5 transition-colors tracking-wide"
            style={{
              background: useWhiteLogo ? 'rgba(255,255,255,0.15)' : '#1a5fb4',
              color: '#ffffff',
              border: useWhiteLogo ? '1px solid rgba(255,255,255,0.35)' : '1px solid #1a5fb4',
            }}
          >
            Get Started
          </Link>
          <button
            className="md:hidden p-1"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 transition-all origin-center ${open ? 'rotate-45 translate-y-2' : ''}`}
                style={{ background: useWhiteLogo ? '#fff' : '#1a1a1a' }} />
              <span className={`block h-0.5 transition-all ${open ? 'opacity-0 scale-x-0' : ''}`}
                style={{ background: useWhiteLogo ? '#fff' : '#1a1a1a' }} />
              <span className={`block h-0.5 transition-all origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`}
                style={{ background: useWhiteLogo ? '#fff' : '#1a1a1a' }} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden border-t"
            style={{
              background: scrolled ? 'rgba(244,247,250,0.98)' : 'rgba(13,61,138,0.97)',
              borderColor: scrolled ? 'rgba(26,95,180,0.12)' : 'rgba(255,255,255,0.15)',
            }}
          >
            <nav className="container-x py-6 flex flex-col gap-4">
              <Link to="/" className="text-base font-body font-semibold transition-colors"
                style={{ color: scrolled ? '#1a1a1a' : '#ffffff' }}>
                Home
              </Link>
              {site.nav.map((l) => (
                <Link key={l.href} to={l.href}
                  className="text-base font-body font-semibold transition-colors"
                  style={{ color: scrolled ? '#1a1a1a' : '#ffffff' }}>
                  {l.label}
                </Link>
              ))}
              <a href={`tel:${site.phone.replace(/-/g, '')}`}
                className="mt-2 font-body font-semibold"
                style={{ color: scrolled ? '#1a5fb4' : '#7fb8e0' }}>
                {site.phone}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
