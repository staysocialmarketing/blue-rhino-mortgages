import { Reveal } from '@/components/site/Reveal'
import { RhinoWatermark } from '@/components/site/RhinoWatermark'
import { team } from '@/lib/site'

const pillars = [
  { title: 'Entrepreneur first', body: 'Building a business teaches you how to solve problems with what you actually have. That mindset is in every file we work.' },
  { title: 'Direct contact', body: 'You know your agent. Not an assistant, not a call centre. The person who knows your file is the person you talk to.' },
  { title: 'Toronto market depth', body: 'We know this market. Condos, freehold, income properties, the self-employed buyer the bank turned down.' },
  { title: 'Straight talk', body: 'We tell you what\'s realistic. If something doesn\'t make sense for you, we say so. Trust is built on honesty, not on closes.' },
]

const agents = team.filter(m => m.role === 'agent')
const support = team.filter(m => m.role === 'support')

export function AboutPage() {
  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-24 container-x"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>About us</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] max-w-3xl">
              The Blue Rhino way.
            </h1>
            <p className="mt-8 font-body text-lg text-white/70 max-w-2xl leading-relaxed">
              A bold name for a specific reason. Powerful, thick-skinned, moves with intention, and completely unexpected in an industry full of banks.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden" style={{ background: '#e6f0f8' }}>
              <img src="/rhino-mark.svg" alt="" className="absolute w-2/3 opacity-10" />
              <div className="relative z-10 text-center p-8">
                <img src="/logo-color.png" alt="Blue Rhino Mortgages" className="h-16 w-auto object-contain mx-auto" />
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <h2 className="font-display font-bold text-3xl md:text-4xl leading-tight" style={{ color: '#1a1a1a' }}>
                We built this differently.
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="font-body leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                Blue Rhino started with a simple frustration: mortgage clients were being handled, not helped. Call centres. Hand-offs. Generic advice that didn't fit their actual situations.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="font-body leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                The team is built around entrepreneurs, self-employed professionals, first-time buyers, and anyone whose situation the banks haven't bothered to understand. We operate under Premiere Mortgage Centre, giving every client access to dozens of lenders: banks, credit unions, mono-lenders, and alternative options.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="font-body leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                The Blue Rhino standard is simple: direct contact, real advice, and a plan that actually fits. Not what's easiest to place.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Agent profiles */}
      <section className="py-24" style={{ background: '#e6f0f8' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>The agents</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl leading-tight mb-14" style={{ color: '#1a1a1a' }}>
              Three agents.<br />One standard.
            </h2>
          </Reveal>

          <div className="space-y-10">
            {agents.map((member, i) => (
              <Reveal key={member.name} delay={i * 100}>
                <div className="bg-white border p-8 md:p-10 grid md:grid-cols-[1fr_2fr] gap-8 items-start"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
                  {/* Photo placeholder */}
                  <div className="aspect-square flex items-center justify-center relative overflow-hidden max-w-[240px]"
                    style={{ background: 'linear-gradient(135deg, #e6f0f8 0%, #d0e4f4 100%)' }}>
                    <img src="/rhino-mark.svg" alt="" className="absolute w-2/3 opacity-10" />
                    <div className="relative z-10 text-center">
                      <p className="font-display font-bold text-lg" style={{ color: '#1a5fb4' }}>
                        {member.name.split(' ')[0]}
                      </p>
                      <p className="font-body text-xs mt-1" style={{ opacity: 0.45 }}>Photo coming</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-5">
                      <h3 className="font-display font-bold text-2xl" style={{ color: '#1a1a1a' }}>{member.name}</h3>
                      <p className="font-body text-sm" style={{ color: '#1a5fb4' }}>{member.title}</p>
                      {member.license && (
                        <p className="font-body text-xs" style={{ color: 'rgba(26,26,26,0.4)' }}>Lic #{member.license}</p>
                      )}
                    </div>
                    <p className="font-body leading-relaxed mb-5" style={{ color: '#1a1a1a', opacity: 0.7 }}>{member.bio}</p>
                    <p className="font-body text-xs uppercase tracking-wider mb-5" style={{ color: '#7fb8e0' }}>
                      {member.specialty}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {member.phone && (
                        <a href={`tel:${member.phone.replace(/-/g, '')}`}
                          className="font-body text-sm font-semibold px-5 py-2.5 transition-colors text-white"
                          style={{ background: '#1a5fb4' }}
                          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d3d8a'}
                          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a5fb4'}
                        >
                          {member.phone}
                        </a>
                      )}
                      {member.email && (
                        <a href={`mailto:${member.email}`}
                          className="font-body text-sm font-semibold px-5 py-2.5 border transition-colors"
                          style={{ borderColor: '#1a5fb4', color: '#1a5fb4' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a5fb4'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#1a5fb4' }}
                        >
                          {member.email}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support team */}
      <section className="py-20 container-x">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-4" style={{ color: '#1a5fb4' }}>Support</p>
            <h2 className="font-display font-bold text-3xl mb-10" style={{ color: '#1a1a1a' }}>
              The team behind the team
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {support.map((member, i) => (
              <Reveal key={member.name} delay={i * 80}>
                <div className="bg-white border p-8 transition-all"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'}
                >
                  <h3 className="font-display font-bold text-xl" style={{ color: '#1a1a1a' }}>{member.name}</h3>
                  <p className="font-body text-sm mt-1 mb-4" style={{ color: '#1a5fb4' }}>{member.title}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{member.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What working with us looks like */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#e6f0f8' }}>
        <RhinoWatermark position="center-right" size="380px" opacity={0.035} />
        <div className="container-x mx-auto max-w-7xl relative z-[1]">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl" style={{ color: '#1a1a1a' }}>
              What working with us looks like
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="bg-white p-8 border transition-colors"
                  style={{ borderColor: 'rgba(26,95,180,0.1)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.3)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.1)'}
                >
                  <h3 className="font-display font-bold text-lg mb-3" style={{ color: '#1a5fb4' }}>{p.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="relative py-24 overflow-hidden" style={{ background: '#0d3d8a' }}>
        <RhinoWatermark position="bottom-right" size="280px" opacity={0.06} light />
        <div className="container-x mx-auto max-w-7xl relative z-[1]">
          <Reveal>
            <blockquote className="max-w-3xl mx-auto text-center">
              <p className="font-display font-bold text-3xl md:text-4xl text-white leading-snug">
                "Built different. On purpose."
              </p>
              <p className="mt-8 font-body text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
                The Blue Rhino Standard
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </>
  )
}
