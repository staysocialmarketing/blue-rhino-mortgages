import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { RhinoParticles } from '@/components/site/RhinoParticles'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

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
  { value: 'Direct', label: 'Contact always' },
  { value: 'GTA', label: 'Market expertise' },
  { value: 'Same day', label: 'Response most days' },
]

const steps = [
  { n: '01', title: 'The conversation', body: 'A relaxed call about where you are and what you\'re working toward. No forms, no pressure.' },
  { n: '02', title: 'The review', body: 'We look at the full picture: income, debts, goals, and the lender landscape for your situation right now.' },
  { n: '03', title: 'The search', body: 'We shop across 50+ lenders and structure what genuinely fits — not what\'s easiest to place.' },
  { n: '04', title: 'Your options', body: 'You see real choices, explained plainly. Nothing moves until you\'re comfortable.' },
  { n: '05', title: 'The close', body: 'We handle the paperwork, coordinate with the lender, and keep you updated at every step.' },
  { n: '06', title: 'After closing', body: 'The relationship doesn\'t end at closing. We stay available for renewals, refinancing, and anything that comes up.' },
]

export function HomePage() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headlineRef.current) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15 })
      const split = new SplitText(headlineRef.current!, { type: 'words' })
      gsap.set(split.words, { y: 32, opacity: 0 })
      gsap.set([subRef.current, ctaRef.current], { y: 20, opacity: 0 })

      tl.to(split.words, {
        y: 0, opacity: 1, duration: 0.65, stagger: 0.065,
        ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
      })
      .to(subRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }, '-=0.3')
      .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'cubic-bezier(0.22, 1, 0.36, 1)' }, '-=0.2')
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        id="hero-section"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 55%, #2568c4 100%)' }}
      >
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="container-x mx-auto max-w-7xl w-full relative z-10 pt-32 pb-24">
          <div className="max-w-3xl">
            <p style={{ color: '#7fb8e0' }} className="text-xs font-display font-semibold uppercase tracking-[0.3em] mb-8">
              Toronto · GTA · Mortgage Agent
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
              className="mt-8 text-white/75 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{ opacity: 0 }}
            >
              We work with Toronto's entrepreneurs, first-time buyers, and growing families. Direct contact. Real advice. 50+ lenders on your side.
            </p>
            <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4" style={{ opacity: 0 }}>
              <a
                href={`tel:${site.phone.replace(/-/g, '')}`}
                className="inline-flex items-center bg-white text-rhino font-display font-bold px-7 py-4 hover:bg-accent-light transition-colors tracking-wide text-sm"
                style={{ color: '#1a5fb4' }}
              >
                Call {site.phone}
              </a>
              <Link
                to="/services"
                className="inline-flex items-center border text-white font-display font-semibold px-7 py-4 transition-colors text-sm tracking-wide"
                style={{ borderColor: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.8)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'; (e.currentTarget as HTMLElement).style.background = '' }}
              >
                What we do
              </Link>
            </div>
          </div>
        </div>

        <RhinoParticles />

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
                  <p className="mt-1 text-xs uppercase tracking-wider" style={{ color: '#1a1a1a', opacity: 0.55 }}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>What we do</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl max-w-xl leading-tight" style={{ color: '#1a1a1a' }}>
              Every file is different.<br />We treat it that way.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 80}>
                <div className="bg-white p-8 border transition-all group"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.4)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(26,95,180,0.08)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'; (e.currentTarget as HTMLElement).style.boxShadow = '' }}
                >
                  <h3 className="font-display font-bold text-lg group-hover:text-rhino transition-colors" style={{ color: '#1a1a1a' }}>{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10">
            <Link to="/services" className="inline-flex items-center text-sm font-display font-semibold transition-colors" style={{ color: '#1a5fb4' }}>
              Full services overview →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 100%)' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#7fb8e0' }}>The process</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white max-w-xl leading-tight">How we work with you</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="p-8 border border-white/15 hover:border-sky/40 transition-colors" style={{}}>
                  <p className="font-display font-bold text-4xl mb-4" style={{ color: 'rgba(255,255,255,0.18)' }}>{s.n}</p>
                  <h3 className="font-display font-semibold text-lg text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="aspect-square flex items-center justify-center relative overflow-hidden" style={{ background: '#e6f0f8' }}>
              <img src="/rhino-mark.svg" alt="" className="w-1/2 absolute opacity-10" />
              <div className="relative z-10 text-center">
                <p className="font-display font-bold text-2xl" style={{ color: '#1a5fb4' }}>Scott Pattinson</p>
                <p className="text-sm mt-1" style={{ color: '#1a1a1a', opacity: 0.5 }}>Headshot coming soon</p>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>About Scott</p>
              <h2 className="font-display font-bold text-4xl leading-tight" style={{ color: '#1a1a1a' }}>
                Entrepreneur. Dad. Mortgage Agent.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-6 leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                Before Scott was a mortgage agent, he was a business owner who understood what it means to make decisions with real money on the line. That background shapes how we approach every file.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                Based in Toronto. Available to you directly. No hand-offs, no call centres — just straight talk and a plan that actually fits.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <Link to="/about" className="mt-8 inline-flex items-center text-white font-display font-bold px-7 py-4 transition-colors text-sm tracking-wide"
                style={{ background: '#1a5fb4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#7fb8e0'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a5fb4'}
              >
                Scott's story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24" style={{ background: '#1a5fb4' }}>
        <div className="container-x mx-auto max-w-7xl text-center">
          <Reveal>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white max-w-2xl mx-auto leading-tight">
              Ready to find out what we can do?
            </h2>
            <p className="mt-6 max-w-lg mx-auto leading-relaxed text-white/70">
              No forms. No wait. Call or email directly and we'll talk through your situation.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href={`tel:${site.phone.replace(/-/g, '')}`}
                className="bg-white font-display font-bold px-8 py-4 transition-colors text-sm tracking-wide"
                style={{ color: '#1a5fb4' }}
              >
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`}
                className="border font-display font-semibold text-white px-8 py-4 transition-colors text-sm tracking-wide"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
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
