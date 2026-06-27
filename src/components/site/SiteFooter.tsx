import { Link } from 'react-router-dom'
import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer style={{ background: '#0d3d8a' }} className="text-white">
      <div className="container-x mx-auto max-w-7xl py-16">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <img src="/logo-white.png" alt="Blue Rhino Mortgages" className="h-12 w-auto object-contain mb-6" />
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Toronto's mortgage team for entrepreneurs, first-time buyers, and growing families. Powered by 50+ lender relationships.
            </p>
            <p className="mt-6 text-sm font-display font-semibold italic" style={{ color: '#7fb8e0' }}>
              "{site.tagline}"
            </p>
            <div className="mt-6 flex gap-4">
              <a
                href={`tel:${site.phone.replace(/-/g, '')}`}
                className="text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >
                {site.phone}
              </a>
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
              <a
                href={`mailto:${site.email}`}
                className="text-sm transition-colors"
                style={{ color: 'rgba(255,255,255,0.7)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'}
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {site.footerNav.map((col) => (
            <nav key={col.heading} className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {col.heading}
              </p>
              {col.links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#fff'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)'}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <div className="mt-12 pt-8 flex flex-col md:flex-row gap-3 justify-between text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}>
          <p>{site.compliance}</p>
          <p>© {new Date().getFullYear()} Blue Rhino Mortgages</p>
        </div>
      </div>
    </footer>
  )
}
