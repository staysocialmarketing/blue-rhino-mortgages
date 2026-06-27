import { Link } from 'react-router-dom'
import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer style={{ background: '#1a5fb4' }} className="text-white">
      <div className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/rhino-mark.svg" alt="Blue Rhino" className="h-10 w-10" style={{ filter: 'brightness(0) invert(1)' }} />
              <div>
                <p className="font-display font-bold text-lg leading-none">Blue Rhino</p>
                <p style={{ color: '#7fb8e0' }} className="text-xs tracking-[0.2em] uppercase mt-0.5">Mortgages</p>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Toronto's mortgage agent for entrepreneurs, first-time buyers, and growing families.
            </p>
            <p className="mt-6 font-display font-semibold" style={{ color: '#7fb8e0' }}>{site.tagline}</p>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Navigate</p>
            {site.nav.map((l) => (
              <Link key={l.href} to={l.href} className="text-sm text-white/70 hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="space-y-3 text-sm">
            <p className="text-xs uppercase tracking-widest text-white/40 mb-1">Contact</p>
            <a href={`tel:${site.phone.replace(/-/g, '')}`} className="block text-white/80 hover:text-white transition-colors">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block text-white/80 hover:text-white transition-colors break-all">{site.email}</a>
            <p className="pt-2 text-white/50">Toronto, ON · GTA</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row gap-3 justify-between text-xs text-white/40">
          <p>{site.compliance}</p>
          <p>© {new Date().getFullYear()} Blue Rhino Mortgages</p>
        </div>
      </div>
    </footer>
  )
}
