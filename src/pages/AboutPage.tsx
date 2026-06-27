import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

const pillars = [
  { title: 'Entrepreneur first', body: 'Building a business teaches you how to solve problems with what you actually have. That mindset is in every file we work.' },
  { title: 'Direct contact', body: "You work with Scott. Not an assistant, not a call centre. The person who knows your file is the person you talk to." },
  { title: 'Toronto market depth', body: "We know this market — condos, freehold, income properties, the self-employed buyer the bank turned down. We've seen it." },
  { title: 'Straight talk', body: "We tell you what's realistic. If something doesn't make sense for you, we say so. Trust is built on honesty, not on closes." },
]

export function AboutPage() {
  return (
    <>
      <section className="pt-40 pb-24 container-x"
        style={{ background: 'linear-gradient(135deg, #0d3d8a 0%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>About</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl xl:text-7xl text-white leading-[1.05] max-w-3xl">
              The Blue Rhino way.
            </h1>
            <p className="mt-8 text-lg text-white/70 max-w-2xl leading-relaxed">
              A bold name for a specific reason. Powerful, thick-skinned, moves with intention — and completely unexpected in an industry full of banks. That's exactly the point.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-24 container-x">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <div className="aspect-[4/5] flex items-center justify-center relative overflow-hidden" style={{ background: '#e6f0f8' }}>
              <img src="/rhino-mark.svg" alt="" className="absolute w-2/3 opacity-10" />
              <div className="relative z-10 text-center p-8">
                <p className="font-display font-bold text-xl" style={{ color: '#1a5fb4' }}>Scott Pattinson</p>
                <p className="text-sm mt-1" style={{ opacity: 0.5 }}>Photo coming soon</p>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5">
            <Reveal>
              <h2 className="font-display font-bold text-3xl" style={{ color: '#1a1a1a' }}>Scott Pattinson</h2>
              <p className="font-display font-semibold mt-1" style={{ color: '#1a5fb4' }}>Mortgage Agent, Level 1 · Blue Rhino Mortgages</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                Scott came to mortgage from a business background — and that matters. Before this, he was building companies and making decisions with real money on the line. He understands corporate draws, retained earnings, and the way banks misread self-employed income, because he's lived it.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                He's also a dad. That shapes how he thinks about what a mortgage actually is — not a transaction, but the foundation of the life you're building. When we work a file, we're thinking about your whole picture, not just today's rate.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p className="leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>
                Blue Rhino operates under Premiere Mortgage Centre, giving our clients access to 50+ lenders — banks, credit unions, mono-lenders, and alternative options.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={`tel:${site.phone.replace(/-/g, '')}`}
                  className="text-white font-display font-bold px-7 py-4 transition-colors text-sm tracking-wide"
                  style={{ background: '#1a5fb4' }}
                >
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`}
                  className="font-display font-semibold px-7 py-4 transition-colors text-sm tracking-wide border"
                  style={{ borderColor: '#1a5fb4', color: '#1a5fb4' }}
                >
                  {site.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#e6f0f8' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-14 max-w-xl" style={{ color: '#1a1a1a' }}>
              What working with us looks like
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="bg-white p-8 border border-transparent hover:border-rhino/30 transition-colors" style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
                  <h3 className="font-display font-bold text-lg mb-3" style={{ color: '#1a5fb4' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" style={{ background: '#1a5fb4' }}>
        <div className="container-x mx-auto max-w-7xl">
          <Reveal>
            <blockquote className="max-w-3xl mx-auto text-center">
              <p className="font-display font-bold text-3xl md:text-4xl text-white leading-snug">
                "Could've been any broker. Wasn't."
              </p>
              <p className="mt-8 text-xs uppercase tracking-widest text-white/50">The Blue Rhino Standard</p>
            </blockquote>
          </Reveal>
        </div>
      </section>
    </>
  )
}
