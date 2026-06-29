import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

interface FAQItem {
  q: string
  a: string
}

interface FAQSection {
  heading: string
  items: FAQItem[]
}

const faq: FAQSection[] = [
  {
    heading: 'Getting started',
    items: [
      {
        q: 'What does a mortgage agent actually do?',
        a: 'We shop on your behalf. Instead of walking into one bank and accepting whatever rate they offer, we access dozens of lenders: banks, credit unions, mono-lenders, and alternative options. We find the best fit for your specific situation, handle the application and the paperwork, and coordinate with the lender. You make the decisions. We do the work.',
      },
      {
        q: 'How do you get paid?',
        a: 'In most cases, the lender pays us a finder\'s fee at closing. This means our service is free to you in the vast majority of transactions. In some situations (typically alternative or private lending), a broker fee may apply. We\'ll always tell you upfront if that\'s the case, before anything moves forward.',
      },
      {
        q: 'How do I know which agent I\'ll work with?',
        a: 'You contact us directly by phone, email, or the contact form, and we match you based on your situation. Entrepreneurs and self-employed clients typically work with Scott. First-time buyers and newcomers often work with Neil or Meghna. Either way, you\'ll always know who your agent is and have their direct contact.',
      },
      {
        q: 'How quickly can I get a response?',
        a: 'Most days, same day. We don\'t run a call centre or use contact forms that route to a queue. You reach your agent directly. If we\'re in a meeting or with another client, you\'ll hear from us within a few hours.',
      },
    ],
  },
  {
    heading: 'Rates and products',
    items: [
      {
        q: 'Can you get me a better rate than my bank?',
        a: 'In most cases, yes. Banks negotiate with themselves. We\'re negotiating on behalf of our book across dozens of lenders, and that creates real buying power. Even a 0.25% difference on a $600K mortgage over 5 years is roughly $7,000 in interest. The bigger win is often the overall structure: rate type, term, prepayment privileges, and portability. Not just the rate alone.',
      },
      {
        q: 'Fixed or variable: which should I choose?',
        a: 'It depends on your risk tolerance, your income stability, and where rates are relative to each other right now. Fixed gives you certainty; variable has historically performed better over long periods but requires comfort with fluctuation. There\'s no universal right answer. We\'ll walk through both scenarios with your actual numbers.',
      },
      {
        q: 'What is a stress test?',
        a: 'Since 2018, most mortgage applicants must qualify at the higher of their contract rate plus 2%, or 5.25%. This means you\'re tested at a higher rate than you\'ll actually pay. The purpose is to ensure you can handle rate increases. Self-employed income, alternative lenders, and some credit union products have different rules. We\'ll walk you through what applies to your file.',
      },
      {
        q: 'What\'s the difference between a rate hold and a pre-approval?',
        a: 'A rate hold locks in a rate for 90 to 120 days while you shop. A pre-approval is a fuller review of your income, credit, and assets that gives you a realistic purchase price range. Rate holds are faster; pre-approvals give more confidence. We recommend a pre-approval if you\'re actively shopping. It puts you in a stronger negotiating position.',
      },
    ],
  },
  {
    heading: 'Self-employed income',
    items: [
      {
        q: 'I\'m self-employed. Can I get a mortgage?',
        a: 'Yes. Banks often misread self-employed income because they look at what\'s on your T1 after write-offs, which underrepresents what you actually earn. We work with lenders who understand corporate draws, retained earnings, and stated income programs. Your situation isn\'t an obstacle. It\'s something we specialize in.',
      },
      {
        q: 'What income documents do I need as a self-employed borrower?',
        a: 'Typically: 2 years of T1 Generals, 2 years of Notices of Assessment, and business financial statements if incorporated. Depending on the program, we may also be able to use 12 months of business bank statements or a stated income declaration. The right document set depends on which lender program fits your situation. We\'ll tell you exactly what to gather.',
      },
      {
        q: 'My accountant minimizes my income on paper. Is that a problem?',
        a: 'It\'s the most common challenge for self-employed buyers. The good news: we have access to lenders who look beyond net income. Some use gross revenue, some use add-backs, and some use stated income programs for strong-profile borrowers. We\'ll find the right lens for your file.',
      },
    ],
  },
  {
    heading: 'First-time buyers',
    items: [
      {
        q: 'How much do I need for a down payment?',
        a: 'The minimum depends on purchase price. Under $500K: 5%. Between $500K–$999K: 5% on the first $500K, 10% on the portion above. $1M and above: 20% minimum. CMHC mortgage insurance applies when your down payment is less than 20%. We\'ll walk through what this means for your specific purchase price.',
      },
      {
        q: 'What are closing costs and how much should I budget?',
        a: 'Budget 1.5–4% of the purchase price for closing costs. The main items: land transfer tax (Ontario charges provincial; Toronto charges municipal on top of that), legal fees, title insurance, and home inspection. First-time buyers in Ontario may qualify for a land transfer tax rebate. We\'ll give you a full estimate once you have a target purchase price.',
      },
      {
        q: 'Should I get pre-approved before I start shopping?',
        a: 'Yes. A pre-approval tells you what you can actually afford, not what feels possible. It also speeds up the process when you find a property. Sellers take offers from pre-approved buyers more seriously, and you can move faster when a deal comes together. The pre-approval process typically takes a few days and costs nothing.',
      },
    ],
  },
  {
    heading: 'Renewals and refinancing',
    items: [
      {
        q: 'My mortgage is coming up for renewal. What should I do?',
        a: 'Don\'t just sign what your lender sends you. Most renewal offers are not their best rate. They\'re betting on inertia. Start looking 4 to 6 months out. We\'ll shop the market, compare renewal vs. refinance options, and make sure you\'re going into the next term with the right structure. Not just the same one by default.',
      },
      {
        q: 'Can I break my mortgage early to get a better rate?',
        a: 'Yes, but there\'s a penalty: either 3 months\' interest or the Interest Rate Differential (IRD), whichever is higher. The IRD can be significant if rates have dropped since you signed. The math depends on how much you\'ll save vs. the penalty, and whether you\'re also changing the loan structure. Use our "Should I Refinance?" tool as a starting point, then let\'s run the real numbers.',
      },
      {
        q: 'What is a HELOC?',
        a: 'A Home Equity Line of Credit lets you access up to 80% of your home\'s appraised value, minus what you owe. It\'s a revolving credit facility. You borrow and repay as needed, and only pay interest on what you\'ve drawn. HELOCs are useful for renovations, investment capital, or ongoing liquidity. They require at least 20% equity and come with variable rates.',
      },
    ],
  },
]

function AccordionItem({ q, a }: FAQItem) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b" style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-body font-semibold text-sm leading-relaxed" style={{ color: '#1a1a1a' }}>{q}</span>
        <span className="flex-shrink-0 mt-0.5 font-body font-bold text-lg transition-transform"
          style={{ color: '#1a5fb4', transform: open ? 'rotate(45deg)' : 'none' }}>
          +
        </span>
      </button>
      {open && (
        <div className="pb-5">
          <p className="font-body text-sm leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.7 }}>{a}</p>
        </div>
      )}
    </div>
  )
}

export function FAQPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null)

  return (
    <>
      <section className="pt-40 pb-24 container-x"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>FAQ</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl">
              Common questions.
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-xl leading-relaxed">
              Answered plainly, not in banker. If something isn't here, just call us.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 container-x">
        <div className="mx-auto max-w-4xl">
          {/* Section nav */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-12">
              {faq.map((section) => (
                <button
                  key={section.heading}
                  onClick={() => setActiveSection(activeSection === section.heading ? null : section.heading)}
                  className="font-body text-sm px-4 py-2 border transition-all"
                  style={{
                    borderColor: activeSection === section.heading ? '#1a5fb4' : 'rgba(26,95,180,0.2)',
                    background: activeSection === section.heading ? '#1a5fb4' : 'transparent',
                    color: activeSection === section.heading ? '#fff' : 'rgba(26,26,26,0.65)',
                  }}
                >
                  {section.heading}
                </button>
              ))}
              {activeSection && (
                <button
                  onClick={() => setActiveSection(null)}
                  className="font-body text-sm px-4 py-2 transition-colors"
                  style={{ color: 'rgba(26,26,26,0.4)' }}
                >
                  Show all
                </button>
              )}
            </div>
          </Reveal>

          {/* Sections */}
          <div className="space-y-14">
            {faq
              .filter(s => !activeSection || s.heading === activeSection)
              .map((section, i) => (
                <Reveal key={section.heading} delay={i * 60}>
                  <div>
                    <h2 className="font-display font-bold text-2xl mb-6" style={{ color: '#1a1a1a' }}>
                      {section.heading}
                    </h2>
                    <div>
                      {section.items.map((item) => (
                        <AccordionItem key={item.q} {...item} />
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* Still have a question */}
      <section className="py-20" style={{ background: '#e6f0f8' }}>
        <div className="container-x mx-auto max-w-4xl">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display font-bold text-3xl mb-4" style={{ color: '#1a1a1a' }}>
                  Still have a question?
                </h2>
                <p className="font-body leading-relaxed" style={{ color: '#1a1a1a', opacity: 0.65 }}>
                  Call or email directly. No contact form routing, no wait queue. You reach your agent.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a href={`tel:${site.phone.replace(/-/g, '')}`}
                  className="font-body font-semibold px-7 py-4 text-sm text-white text-center transition-colors"
                  style={{ background: '#1a5fb4' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d3d8a'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a5fb4'}
                >
                  {site.phone}
                </a>
                <a href={`mailto:${site.email}`}
                  className="font-body font-semibold px-7 py-4 text-sm border text-center transition-colors"
                  style={{ borderColor: '#1a5fb4', color: '#1a5fb4' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a5fb4'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#1a5fb4' }}
                >
                  {site.email}
                </a>
                <Link to="/contact"
                  className="font-body text-sm text-center transition-colors pt-1"
                  style={{ color: 'rgba(26,26,26,0.45)' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a5fb4'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,26,0.45)'}
                >
                  Send a message →
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
