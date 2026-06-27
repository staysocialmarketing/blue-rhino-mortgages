import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { Reveal } from '@/components/site/Reveal'
import { site, team } from '@/lib/site'

gsap.registerPlugin(SplitText)

const services = [
  { title: 'First-Time Buyers', desc: 'Condos, entry-level homes, and the Toronto market decoded. We help you qualify, compare, and close with confidence.' },
  { title: 'Refinancing', desc: 'Lower your rate, unlock equity, or adjust your term. We run the numbers and show you when it actually makes sense.' },
  { title: 'Equity Takeouts', desc: 'Your home is working capital. Access equity for renovations, investments, or business growth.' },
  { title: 'Debt Consolidation', desc: 'Combine high-interest debt into one manageable payment. Better cash flow. One lender.' },
  { title: 'Self-Employed', desc: "Banks misread self-employed income. We understand T1s, corporate draws, and retained earnings — and we get you approved." },
  { title: 'Pre-Qualification', desc: 'Know your numbers before you shop. A clear picture of what we can do for you — no commitment required.' },
]

const stats = [
  { value: '50+', label: 'Lender relationships' },
  { value: '3', label: 'Expert agents' },
  { value: 'GTA', label: 'Market expertise' },
  { value: 'Direct', label: 'Contact always' },
]

const steps = [
  { n: '01', title: 'The conversation', body: 'A relaxed call about where you are and what you\'re working toward. No forms, no pressure.' },
  { n: '02', title: 'The review', body: 'We look at the full picture: income, debts, goals, and the lender landscape for your situation right now.' },
  { n: '03', title: 'The search', body: 'We shop across 50+ lenders and structure what genuinely fits — not what\'s easiest to place.' },
  { n: '04', title: 'Your options', body: 'You see real choices, explained plainly. Nothing moves until you\'re comfortable.' },
  { n: '05', title: 'The close', body: 'We handle the paperwork, coordinate with the lender, and keep you updated at every step.' },
  { n: '06', title: 'After closing', body: 'The relationship doesn\'t end at closing. We stay available for renewals, refinancing, and anything that comes up.' },
]

const agents = team.filter(m => m.role === 'agent')

export function HomePage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      const split = new SplitText(headlineRef.current!, { type: 'words' })
      gsap.set(split.words, { y: 40, opacity: 0 })
      gsap.set([subRef.current, ctaRef.current], { y: 20, opacity: 0 })

      tl.to(split.words, {
        y: 0, opacity: 1, duration: 0.7, stagger: 0.07,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
      .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }, '-=0.35')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }, '-=0.25')
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 40%, #1a5fb4 100%)' }}
      >
        {/* Subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        {/* Rhino watermark right */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center pointer-events-none select-none opacity-[0.06]">
          <img src="/rhino-mark.svg" alt="" className="w-[520px] h-auto" />
        </div>

        <div className="container-x mx-auto max-w-7xl w-full relative z-10 pt-36 pb-28">
          <div className="max-w-3xl">
            <p style={{ color: '#7fb8e0' }} className="text-xs font-body font-semibold uppercase tracking-[0.3em] mb-8">
              Toronto · GTA · Mortgage Team
            </p>
            <h1
              ref={headlineRef}
              className="font-display font-bold text-white leading-[1.05] text-5xl md:text-6xl xl:text-7xl"
              style={{ opacity: 0 }}
            >
              Could've been any broker. Wasn't.
            </h1>
            <p
              ref={subRef}
              className="mt-8 font-body text-white/70 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ opacity: 0 }}
            >
              Three agents. 50+ lenders. Direct contact every time. We work with Toronto's entrepreneurs, first-time buyers, and growing families.
            </p>
            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
              <a
                href={`tel:${site.phone.replace(/-/g, '')}`}
                className="inline-flex items-center bg-white font-body font-semibold px-7 py-4 transition-colors text-sm tracking-wide"
                style={{ color: '#1a5fb4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e6f0f8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                Call {site.phone}
              </a>
              <Link
                to="/about"
                className="inline-flex items-center border font-body font-semibold px-7 py-4 transition-colors text-sm tracking-wide text-white"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; (e.currentTarget as HTMLElement).style.background = '' }}
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #f4f7fa, transparent)' }} />
      </section>

      {/* Stats */}
      <section style={{ background: '#e6f0f8', borderTop: '1px solid rgba(26,95,180,0.1)', borderBottom: '1px solid rgba(26,95,180,0.1)' }} className="py-10">
        <div className="container-x mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="text-center">
                  <p className="font-display font-bold text-3xl" style={{ color: '#1a5fb4' }}>{s.value}</p>
                  <p className="mt-1 font-body text-xs uppercase tracking-wider" style={{ color: '#1a1a1a', opacity: 0.5 }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>The team</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl max-w-xl leading-tight" style={{ color: '#1a1a1a' }}>
              Three agents.<br />One standard.
            </h2>
            <p className="mt-5 font-body leading-relaxed max-w-lg" style={{ color: '#1a1a1a', opacity: 0.65 }}>
              Blue Rhino is built on direct relationships. You always know who you're working with and why they recommended what they did.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {agents.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="bg-white border p-8 flex flex-col h-full transition-all"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,95,180,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0"
                    style={{ background: '#e6f0f8' }}>
                    <img src="/rhino-mark.svg" alt="" className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-display font-bold text-xl" style={{ color: '#1a1a1a' }}>{member.name}</h3>
                  <p className="font-body text-xs mt-1 mb-4" style={{ color: '#1a5fb4' }}>{member.title}</p>
                  <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#1a1a1a', opacity: 0.65 }}>{member.bio}</p>
                  <p className="font-body text-xs mt-4 pt-4" style={{ borderTop: '1px solid rgba(26,95,180,0.1)', color: '#7fb8e0' }}>
                    {member.specialty}
                  </p>
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="mt-3 font-body text-xs transition-colors"
                      style={{ color: 'rgba(26,26,26,0.45)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a5fb4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,26,0.45)'}
                    >
                      {member.email}
                    </a>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-8">
            <Link to="/about" className="font-body text-sm font-semibold transition-colors" style={{ color: '#1a5fb4' }}>
              Full team & story →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ background: '#e6f0f8' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>What we do</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl max-w-xl leading-tight" style={{ color: '#1a1a1a' }}>
              Every file is different.<br />We treat it that way.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <div className="bg-white p-8 border transition-all"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(26,95,180,0.07)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                >
                  <h3 className="font-display font-bold text-lg" style={{ color: '#1a1a1a' }}>{s.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <Link to="/services" className="font-body text-sm font-semibold transition-colors" style={{ color: '#1a5fb4' }}>
              Full services overview →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#7fb8e0' }}>The process</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white max-w-xl leading-tight">How we work with you</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="p-8 border transition-colors" style={{ borderColor: 'rgba(255,255,255,0.12)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(127,184,224,0.4)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'}
                >
                  <p className="font-display font-bold text-4xl mb-4" style={{ color: 'rgba(255,255,255,0.15)' }}>{s.n}</p>
                  <h3 className="font-display font-semibold text-lg text-white">{s.title}</h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-white/60">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tools strip */}
      <section className="py-20" style={{ background: '#f4f7fa', borderBottom: '1px solid rgba(26,95,180,0.08)' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: 'Mortgage Calculators', desc: 'Payment, affordability, CMHC, and more. Know your numbers before you meet with us.', href: '/calculators', cta: 'Open calculators' },
                { title: 'Should I Refinance?', desc: 'Answer a few questions. We\'ll tell you if it makes sense — and by how much.', href: '/should-i-refinance', cta: 'Start the flow' },
                { title: 'Common Questions', desc: 'Rates, pre-approval, self-employed income, closing costs — answered plainly.', href: '/faq', cta: 'Browse FAQ' },
              ].map((tool, i) => (
                <Reveal key={tool.title} delay={i * 80}>
                  <Link to={tool.href} className="block bg-white border p-8 transition-all group"
                    style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(26,95,180,0.07)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                  >
                    <h3 className="font-display font-bold text-lg mb-3" style={{ color: '#1a1a1a' }}>{tool.title}</h3>
                    <p className="font-body text-sm leading-relaxed mb-5" style={{ color: '#1a1a1a', opacity: 0.6 }}>{tool.desc}</p>
                    <span className="font-body text-sm font-semibold" style={{ color: '#1a5fb4' }}>{tool.cta} →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: '#1a5fb4' }}>
        <div className="container-x mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white max-w-2xl mx-auto leading-tight">
              Ready to find out what we can do?
            </h2>
            <p className="mt-6 font-body max-w-lg mx-auto leading-relaxed text-white/70">
              No forms. No wait. Call or email directly and we'll talk through your situation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${site.phone.replace(/-/g, '')}`}
                className="bg-white font-body font-semibold px-8 py-4 transition-colors text-sm tracking-wide"
                style={{ color: '#1a5fb4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e6f0f8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}
                className="border font-body font-semibold text-white px-8 py-4 transition-colors text-sm tracking-wide"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.8)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'}
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
