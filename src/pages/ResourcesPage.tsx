import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

const guides = [
  { category: 'Self-Employed', title: 'How your income actually gets assessed', blurb: 'Banks misread self-employed income constantly. This breaks down T1 generals, corporate draws, and stated income options.' },
  { category: 'First-Time Buyers', title: 'Condo vs. freehold in Toronto', blurb: 'Not just a lifestyle question — maintenance fees, appreciation history, and how each type affects your qualification.' },
  { category: 'Refinancing', title: 'When breaking your mortgage actually makes sense', blurb: 'Penalties are real. So is the math. This walks through the break-even calculation and when refinancing wins.' },
  { category: 'Market', title: 'What a Bank of Canada rate change means for you', blurb: 'Through the lens of someone with a variable rate, a renewal coming up, or a business that owns real estate.' },
  { category: 'Pre-Qualification', title: 'Pre-qualification vs. pre-approval: what actually matters', blurb: 'The real differences, what each one commits you to, and why a proper pre-qualification with a mortgage agent wins.' },
  { category: 'Equity', title: 'Using home equity to fund a business', blurb: 'HELOC vs. refinance vs. second mortgage. The trade-offs, tax considerations, and when it makes sense for an entrepreneur.' },
]

export function ResourcesPage() {
  return (
    <>
      <section className="pt-40 pb-24 container-x" style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>Resources</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl">
              The Blue Rhino guide to mortgages in Toronto.
            </h1>
            <p className="mt-8 text-white/70 max-w-xl leading-relaxed text-lg">
              Not generic advice. Guides for Toronto's entrepreneurs, first-time buyers, and anyone the bank has already turned down.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <div className="bg-white border p-8 transition-all group cursor-pointer"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,95,180,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                >
                  <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#7fb8e0' }}>{g.category}</p>
                  <h2 className="font-display font-bold text-lg leading-snug" style={{ color: '#1a1a1a' }}>{g.title}</h2>
                  <p className="mt-4 text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.6 }}>{g.blurb}</p>
                  <p className="mt-6 text-xs font-display font-semibold" style={{ color: '#1a5fb4' }}>Coming soon →</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#1a5fb4' }}>
        <div className="container-x mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl text-white">Have a specific question?</h2>
            <p className="mt-4 text-white/70 max-w-md mx-auto">These guides cover the common stuff. For your specific situation, the fastest path is a conversation.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${site.phone.replace(/-/g, '')}`} className="bg-white font-display font-bold px-8 py-4 text-sm tracking-wide" style={{ color: '#1a5fb4' }}>{site.phone}</a>
              <a href={`mailto:${site.email}`} className="border font-display font-semibold text-white px-8 py-4 text-sm tracking-wide" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>{site.email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
