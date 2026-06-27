import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

const services = [
  {
    title: 'First-Time Buyers',
    sub: 'The Toronto market decoded.',
    body: "Condos, freehold, entry-level — we walk you through every step. Pre-qualification, lender shopping, and closing support. We make sure you understand the process before you're in it.",
    bullets: ['Pre-qualification without commitment', 'First Home Savings Account guidance', 'Condo vs. freehold comparison', 'CMHC and down payment options'],
  },
  {
    title: 'Refinancing',
    sub: 'When it makes sense to revisit.',
    body: "Refinancing isn't always the right move. We run the actual numbers — penalty calculation, break-even timeline, long-term savings — and tell you honestly whether it makes sense.",
    bullets: ['Rate and term refinance', 'Cash-out for renovations or investments', 'Penalty analysis included', 'Short vs. long-term comparison'],
  },
  {
    title: 'Equity Takeouts',
    sub: 'Your home is working capital.',
    body: "For entrepreneurs and growing families, equity access can be the lever that changes everything. We structure it to fit your cash flow and your goals.",
    bullets: ['HELOC vs. mortgage refinance', 'Business investment funding', 'Renovation financing', 'Debt consolidation via equity'],
  },
  {
    title: 'Debt Consolidation',
    sub: 'One payment. Better terms.',
    body: 'High-interest debt has a real cost. Rolling it into your mortgage can save thousands monthly. We model it out so you can see the exact trade-off before deciding.',
    bullets: ['Credit card and line of credit rollup', 'Monthly cash flow improvement analysis', 'Impact on mortgage term explained', 'Re-amortization options'],
  },
  {
    title: 'Self-Employed Mortgages',
    sub: "Banks don't understand your income. We do.",
    body: "Corporate draws, retained earnings, T1 generals, stated income programs — we know how to present your file to the right lender. The bank said no. We've heard that before.",
    bullets: ['T1 general income qualification', 'Corporate structure analysis', 'Stated income lender matching', "Alt-lending options when traditional doesn't fit"],
  },
  {
    title: 'Pre-Qualification',
    sub: 'Know before you shop.',
    body: "Before you make an offer, know what you can borrow, what your payments look like, and where you actually stand. A real pre-qualification from a real person, not a calculator.",
    bullets: ['Full income and debt review', 'Rate hold where available', 'Lender strategy outlined upfront', 'No pressure to proceed'],
  },
]

export function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-24 container-x" style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>Services</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl">What we actually do.</h1>
            <p className="mt-8 text-white/70 max-w-xl leading-relaxed text-lg">
              Six ways we work with clients. Every file is different — this is where we start.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="bg-white border p-10 md:p-12 grid md:grid-cols-2 gap-10 transition-all"
                style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.35)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'}
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] mb-3" style={{ color: '#7fb8e0' }}>{s.sub}</p>
                  <h2 className="font-display font-bold text-2xl md:text-3xl" style={{ color: '#1a1a1a' }}>{s.title}</h2>
                  <p className="mt-5 leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{s.body}</p>
                </div>
                <ul className="space-y-3 self-start">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                      <span className="h-1.5 w-1.5 rounded-full mt-2 shrink-0" style={{ background: '#1a5fb4' }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24" style={{ background: '#1a5fb4' }}>
        <div className="container-x mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl text-white">Not sure where you fit?</h2>
            <p className="mt-4 text-white/70 max-w-md mx-auto">Call or email. We'll figure it out together.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${site.phone.replace(/-/g, '')}`} className="bg-white font-display font-bold px-8 py-4 transition-colors text-sm tracking-wide" style={{ color: '#1a5fb4' }}>
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="border font-display font-semibold text-white px-8 py-4 transition-colors text-sm tracking-wide" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
