import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { site } from '@/lib/site'

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(244,247,250,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(26,95,180,0.12)' : '1px solid transparent',
      }}
    >
      <div className="container-x mx-auto max-w-7xl flex items-center justify-between h-20">
        <Link to="/" className="flex items-center gap-3">
          <img src="/rhino-mark.svg" alt="Blue Rhino Mortgages" className="h-10 w-10" />
          <div className="leading-none">
            <p className="font-display font-bold text-[17px] text-rhino tracking-tight">Blue Rhino</p>
            <p className="text-[10px] font-display font-semibold text-sky tracking-[0.2em] uppercase mt-0.5">Mortgages</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {site.nav.slice(1).map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className="text-sm font-display font-semibold text-body/70 hover:text-rhino transition-colors relative after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-rhino after:transition-all hover:after:w-full after:content-['']"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href={`tel:${site.phone.replace(/-/g, '')}`} className="hidden md:block text-sm font-display font-semibold text-rhino hover:text-sky transition-colors">
            {site.phone}
          </a>
          <Link to="/contact" className="bg-rhino text-white text-sm font-display font-bold px-5 py-2.5 hover:bg-sky transition-colors tracking-wide">
            Get Started
          </Link>
          <button className="md:hidden p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-body transition-all origin-center ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-body transition-all ${open ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 bg-body transition-all origin-center ${open ? '-rotate-45 -translate-y-2' : ''}`} />
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
            className="md:hidden overflow-hidden bg-bg border-t border-rhino/10"
          >
            <nav className="container-x py-6 flex flex-col gap-5">
              {site.nav.map((l) => (
                <Link key={l.href} to={l.href} className="text-lg font-display font-bold text-body hover:text-rhino transition-colors">
                  {l.label}
                </Link>
              ))}
              <a href={`tel:${site.phone.replace(/-/g, '')}`} className="mt-2 text-rhino font-display font-semibold">{site.phone}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
