import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

export function ContactPage() {
  return (
    <>
      <section className="pt-40 pb-24 container-x" style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>Contact</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] max-w-3xl">
              Talk to us directly.
            </h1>
            <p className="mt-8 text-white/70 max-w-xl leading-relaxed text-lg">
              No forms, no phone trees. Call or email and you'll reach an agent who actually knows your file.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 container-x">
        <div className="mx-auto max-w-3xl space-y-5">
          <Reveal>
            <a href={`tel:${site.phone.replace(/-/g, '')}`}
              className="flex items-center gap-6 group p-8 bg-white border transition-all"
              style={{ borderColor: 'rgba(26,95,180,0.1)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,95,180,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              <span className="h-14 w-14 inline-flex items-center justify-center shrink-0 font-display font-bold text-xl text-white" style={{ background: '#1a5fb4' }}>↗</span>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#1a1a1a', opacity: 0.5 }}>Call</p>
                <p className="font-display font-bold text-2xl transition-colors" style={{ color: '#1a1a1a' }}>{site.phone}</p>
                <p className="mt-1 text-sm" style={{ color: '#1a1a1a', opacity: 0.5 }}>Direct line. Same-day response most days.</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={80}>
            <a href={`mailto:${site.email}`}
              className="flex items-center gap-6 group p-8 bg-white border transition-all"
              style={{ borderColor: 'rgba(26,95,180,0.1)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,95,180,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
            >
              <span className="h-14 w-14 inline-flex items-center justify-center shrink-0 font-display font-bold text-xl text-white" style={{ background: '#1a5fb4' }}>@</span>
              <div>
                <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#1a1a1a', opacity: 0.5 }}>Email</p>
                <p className="font-display font-bold text-xl transition-colors break-all" style={{ color: '#1a1a1a' }}>{site.email}</p>
                <p className="mt-1 text-sm" style={{ color: '#1a1a1a', opacity: 0.5 }}>For detailed questions or when you'd rather write it out.</p>
              </div>
            </a>
          </Reveal>

          <Reveal delay={160}>
            <div className="p-8 border" style={{ background: '#e6f0f8', borderColor: 'rgba(26,95,180,0.1)' }}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: '#1a1a1a', opacity: 0.5 }}>Location</p>
              <p className="font-display font-semibold" style={{ color: '#1a1a1a' }}>Toronto, Ontario</p>
              <p className="mt-1 text-sm" style={{ color: '#1a1a1a', opacity: 0.6 }}>Serving the GTA and surrounding areas. Remote-friendly.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 border-t" style={{ background: '#e6f0f8', borderColor: 'rgba(26,95,180,0.1)' }}>
        <div className="container-x mx-auto max-w-7xl text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>Blue Rhino Mortgages</p>
            <p className="font-display font-semibold" style={{ color: '#1a1a1a' }}>{site.brokerage}</p>
            <p className="mt-2 text-sm" style={{ color: '#1a1a1a', opacity: 0.6 }}>{site.compliance}</p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
