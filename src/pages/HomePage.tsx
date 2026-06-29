import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/site/Reveal'
import { site, team } from '@/lib/site'

const services = [
  { title: 'First-Time Buyers', desc: 'Condos, entry-level homes, and the Toronto market decoded. We help you qualify, compare, and close with confidence.' },
  { title: 'Refinancing', desc: 'Lower your rate, access equity, or adjust your term. We run the numbers and show you when it actually makes sense.' },
  { title: 'Equity Takeouts', desc: 'Your home is working capital. Access equity for renovations, investments, or business growth.' },
  { title: 'Debt Consolidation', desc: 'Combine high-interest debt into one manageable payment. Better cash flow. One lender.' },
  { title: 'Self-Employed', desc: "Banks misread self-employed income. We understand T1s, corporate draws, and retained earnings, and we get you approved." },
  { title: 'Pre-Qualification', desc: 'Know your numbers before you shop. A clear picture of what we can do for you. No commitment required.' },
]

const steps = [
  { n: '01', title: 'The conversation', body: 'A relaxed call about where you are and what you\'re working toward. No forms, no pressure.' },
  { n: '02', title: 'The review', body: 'We look at the full picture: income, debts, goals, and the lender market for your situation right now.' },
  { n: '03', title: 'The search', body: 'We shop across dozens of lenders and structure what genuinely fits. Not what\'s easiest to place.' },
  { n: '04', title: 'Your options', body: 'You see real choices, explained plainly. Nothing moves until you\'re comfortable.' },
  { n: '05', title: 'The close', body: 'We handle the paperwork, coordinate with the lender, and keep you updated at every step.' },
  { n: '06', title: 'After closing', body: 'The relationship doesn\'t end at closing. We stay available for renewals, refinancing, and anything that comes up.' },
]

const agents = team.filter(m => m.role === 'agent')

const heroStats = [
  { value: 'Dozens', label: 'Of Lenders' },
  { value: '3', label: 'Expert Agents' },
  { value: 'GTA', label: 'Market Expertise' },
]

export function HomePage() {
  return (
    <>
      {/* ─── VIDEO HERO ───────────────────────────────────────────────────── */}
      <section
        className="relative h-screen w-full overflow-hidden flex flex-col"
      >
        {/* Video — full bleed background */}
        <video
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{ objectPosition: '72% 50%' }}
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay — dark on left for text readability */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(8,31,74,0.96) 0%, rgba(8,31,74,0.92) 32%, rgba(8,31,74,0.45) 52%, rgba(8,31,74,0.10) 70%, transparent 100%)' }} />
        {/* Bottom darkening for stats */}
        <div className="absolute inset-x-0 bottom-0 h-48"
          style={{ background: 'linear-gradient(to top, rgba(8,31,74,0.85), transparent)' }} />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col justify-center flex-1 px-6 sm:px-10 lg:px-16 pt-24 pb-8">
          <div className="max-w-4xl md:max-w-[52%]">
            <div className="animate-fade-up flex items-center gap-3 mb-6 lg:mb-8">
              <img src="/rhino-mark.svg" alt="" className="w-4 h-4 opacity-70" style={{ filter: 'brightness(0) invert(1)' }} />
              <p className="font-body text-white/70 text-xs sm:text-sm tracking-[0.3em] uppercase">Toronto Mortgage Team</p>
            </div>

            <h1 className="animate-fade-up-delay-1 font-display font-bold text-white uppercase leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
              <span className="block">Built</span>
              <span className="block">different.</span>
              <span className="block">On purpose.</span>
            </h1>

            <p className="animate-fade-up-delay-2 font-body text-white/70 text-sm sm:text-base leading-relaxed max-w-md mt-6 lg:mt-8">
              Three agents. Dozens of lenders. One standard.{' '}
              <strong className="text-white font-semibold">Toronto entrepreneurs, first-time buyers, growing families. We do this differently.</strong>
            </p>

            <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 bg-white font-body font-semibold px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase transition-colors"
                style={{ color: '#0d3d8a' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#e6f0f8'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
              >
                Meet the Team
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <a
                href={`tel:${site.phone.replace(/-/g, '')}`}
                className="group inline-flex items-center gap-2 font-body font-semibold px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase text-white border transition-colors"
                style={{ borderColor: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'}
              >
                {site.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Stats — pinned to bottom */}
        <div className="animate-fade-up-delay-4 relative z-10 px-6 sm:px-10 lg:px-16 pb-10 sm:pb-12">
          <div className="flex flex-wrap gap-6 sm:gap-12 lg:gap-16">
            {heroStats.map((s) => (
              <div key={s.label}>
                <p className="font-body text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-none">{s.value}</p>
                <p className="font-body text-white/50 text-[9px] sm:text-xs tracking-widest uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────────────────── */}
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
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0" style={{ background: '#e6f0f8' }}>
                    <img src="/rhino-mark.svg" alt="" className="w-8 h-8 opacity-40" />
                  </div>
                  <h3 className="font-display font-bold text-xl" style={{ color: '#1a1a1a' }}>{member.name}</h3>
                  <p className="font-body text-xs mt-1 mb-4" style={{ color: '#1a5fb4' }}>{member.title}</p>
                  <p className="font-body text-sm leading-relaxed flex-1" style={{ color: '#1a1a1a', opacity: 0.65 }}>{member.bio}</p>
                  <p className="font-body text-xs mt-4 pt-4" style={{ borderTop: '1px solid rgba(26,95,180,0.1)', color: '#7fb8e0' }}>{member.specialty}</p>
                  {member.email && (
                    <a href={`mailto:${member.email}`}
                      className="mt-3 font-body text-xs transition-colors"
                      style={{ color: 'rgba(26,26,26,0.45)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a5fb4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,26,0.45)'}
                    >{member.email}</a>
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

      {/* ─── SERVICES ─────────────────────────────────────────────────────── */}
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

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-24"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
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

      {/* ─── TOOLS STRIP ──────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#f4f7fa', borderBottom: '1px solid rgba(26,95,180,0.08)' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: 'Mortgage Calculators', desc: 'Payment, affordability, CMHC, and more. Know your numbers before we talk.', href: '/calculators', cta: 'Open calculators' },
                { title: 'Should I Refinance?', desc: 'Answer a few questions. We\'ll tell you if it makes sense, and by how much.', href: '/should-i-refinance', cta: 'Start the flow' },
                { title: 'Common Questions', desc: 'Rates, pre-approval, self-employed income, closing costs. Answered plainly.', href: '/faq', cta: 'Browse FAQ' },
              ].map((tool, i) => (
                <Reveal key={tool.title} delay={i * 80}>
                  <Link to={tool.href} className="block bg-white border p-8 transition-all"
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

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
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
              >{site.phone}</a>
              <a href={`mailto:${site.email}`}
                className="border font-body font-semibold text-white px-8 py-4 transition-colors text-sm tracking-wide"
                style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.8)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'}
              >{site.email}</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
