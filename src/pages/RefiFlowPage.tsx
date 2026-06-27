import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

interface Question {
  id: string
  text: string
  sub?: string
  options: { label: string; value: string }[]
}

const questions: Question[] = [
  {
    id: 'goal',
    text: 'What\'s driving this?',
    sub: 'Understanding the goal shapes the whole conversation.',
    options: [
      { label: 'Lower my monthly payment', value: 'payment' },
      { label: 'Access equity (renovations, investment, etc.)', value: 'equity' },
      { label: 'Pay off my mortgage faster', value: 'payoff' },
      { label: 'Consolidate debt', value: 'debt' },
      { label: 'Not sure — just exploring', value: 'explore' },
    ],
  },
  {
    id: 'remaining',
    text: 'How much time is left on your current term?',
    sub: 'This determines whether penalties are in play.',
    options: [
      { label: 'Under 6 months', value: 'under6' },
      { label: '6–12 months', value: '6to12' },
      { label: '1–2 years', value: '1to2' },
      { label: '2+ years', value: 'over2' },
      { label: 'I don\'t know', value: 'unknown' },
    ],
  },
  {
    id: 'rate',
    text: 'What\'s your current interest rate (roughly)?',
    options: [
      { label: 'Under 4%', value: 'under4' },
      { label: '4–5%', value: '4to5' },
      { label: '5–6%', value: '5to6' },
      { label: '6–7%', value: '6to7' },
      { label: 'Over 7%', value: 'over7' },
      { label: 'I\'m not sure', value: 'unknown' },
    ],
  },
  {
    id: 'equity',
    text: 'Roughly how much equity do you have?',
    sub: 'Equity = current value minus what you owe.',
    options: [
      { label: 'Under $100K', value: 'under100' },
      { label: '$100K–$250K', value: '100to250' },
      { label: '$250K–$500K', value: '250to500' },
      { label: 'Over $500K', value: 'over500' },
      { label: 'Not sure', value: 'unknown' },
    ],
  },
  {
    id: 'employed',
    text: 'How would you describe your income?',
    sub: 'Lender options differ significantly based on employment type.',
    options: [
      { label: 'Salaried employee', value: 'salaried' },
      { label: 'Self-employed / incorporated', value: 'self' },
      { label: 'Commission-based', value: 'commission' },
      { label: 'Mix of employment types', value: 'mixed' },
    ],
  },
]

type Answers = Record<string, string>

function getResult(answers: Answers) {
  const { goal, remaining, rate, employed } = answers
  const highRate = rate === 'over7' || rate === '6to7'
  const lowRate = rate === 'under4'
  const earlyBreak = remaining === 'over2' || remaining === '1to2'
  const selfEmployed = employed === 'self' || employed === 'commission'

  // Determine recommendation
  if (lowRate && earlyBreak) {
    return {
      verdict: 'Probably not worth it right now.',
      detail: 'Your current rate is already low, and breaking early means a penalty that likely wipes out any savings. That said, if your goal is equity access or debt consolidation, the math might still work — it depends on the penalty amount and what you\'d do with the funds.',
      cta: 'Let\'s run the actual penalty number.',
      tone: 'caution',
    }
  }

  if (highRate && (remaining === 'under6' || remaining === '6to12')) {
    return {
      verdict: 'Strong case for refinancing.',
      detail: 'A high rate with your term ending soon is exactly the scenario where refinancing makes the most sense. You\'re close to the end of your penalty window, and today\'s lender landscape likely has better options for you. We\'d want to look at lender options across dozens of sources and structure the best fit.',
      cta: 'Let\'s find you better options.',
      tone: 'positive',
    }
  }

  if (goal === 'equity' || goal === 'debt') {
    return {
      verdict: 'Worth a serious look.',
      detail: 'Equity access and debt consolidation refinances are often worth the penalty cost — especially when the resulting cash flow improvement is significant. The key calculation is whether the penalty is less than 12–18 months of interest savings (or the value of the capital you\'re accessing).',
      cta: 'Let\'s run the numbers on your file.',
      tone: 'positive',
    }
  }

  if (earlyBreak && !highRate) {
    return {
      verdict: 'The math needs work.',
      detail: 'Breaking 1–2+ years early typically comes with a meaningful penalty — usually the greater of 3 months\' interest or the Interest Rate Differential. We\'d want to calculate your exact penalty before recommending you move. In some cases it still makes sense, but you need the real numbers first.',
      cta: 'Let\'s calculate your penalty first.',
      tone: 'neutral',
    }
  }

  if (selfEmployed) {
    return {
      verdict: 'Likely yes — with the right lender.',
      detail: 'Self-employed borrowers are often underserved by the big banks at renewal. Alternative lenders and mono-lenders may have significantly better options for your structure — especially if your income is through corporate draws or retained earnings. This is where we do our best work.',
      cta: 'Tell us about your income structure.',
      tone: 'positive',
    }
  }

  return {
    verdict: 'It depends — but let\'s find out.',
    detail: 'Your answers suggest a scenario that could go either way. The real answer lives in your penalty amount, the current rate spread, and what lenders are offering for your specific profile right now. A 20-minute call will give you a clear answer.',
    cta: 'Let\'s talk it through.',
    tone: 'neutral',
  }
}

export function RefiFlowPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [done, setDone] = useState(false)

  const q = questions[step]
  const isFirst = step === 0
  const total = questions.length

  function choose(value: string) {
    const next = { ...answers, [q.id]: value }
    setAnswers(next)
    if (step < total - 1) {
      setStep(step + 1)
    } else {
      setDone(true)
    }
  }

  function reset() {
    setStep(0)
    setAnswers({})
    setDone(false)
  }

  const result = done ? getResult(answers) : null

  const toneColors: Record<string, string> = {
    positive: '#1a5fb4',
    caution: '#0d3d8a',
    neutral: '#1a5fb4',
  }

  return (
    <>
      <section className="pt-40 pb-24 container-x"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>Tools</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl">
              Should I refinance?
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-xl leading-relaxed">
              Five questions. A real answer — not a generic yes or no, but the logic behind your specific situation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 container-x">
        <div className="mx-auto max-w-2xl">
          {!done ? (
            <Reveal key={step}>
              <div className="bg-white border p-8 md:p-10" style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
                {/* Progress */}
                <div className="flex gap-1.5 mb-8">
                  {questions.map((_, i) => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-all"
                      style={{ background: i <= step ? '#1a5fb4' : 'rgba(26,95,180,0.15)' }} />
                  ))}
                </div>

                <p className="font-body text-xs uppercase tracking-wider mb-2" style={{ color: 'rgba(26,26,26,0.4)' }}>
                  Question {step + 1} of {total}
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl mb-2" style={{ color: '#1a1a1a' }}>
                  {q.text}
                </h2>
                {q.sub && (
                  <p className="font-body text-sm mb-6" style={{ color: 'rgba(26,26,26,0.55)' }}>{q.sub}</p>
                )}

                <div className="flex flex-col gap-3 mt-6">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className="text-left px-5 py-4 border font-body font-medium text-sm transition-all"
                      style={{ borderColor: 'rgba(26,95,180,0.2)', color: '#1a1a1a' }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = '#1a5fb4'
                        ;(e.currentTarget as HTMLElement).style.background = '#e6f0f8'
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.2)'
                        ;(e.currentTarget as HTMLElement).style.background = ''
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {!isFirst && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="mt-6 font-body text-sm transition-colors"
                    style={{ color: 'rgba(26,26,26,0.45)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#1a5fb4'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'rgba(26,26,26,0.45)'}
                  >
                    ← Back
                  </button>
                )}
              </div>
            </Reveal>
          ) : (
            <Reveal>
              <div className="bg-white border overflow-hidden" style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
                <div className="p-8 md:p-10" style={{ background: toneColors[result!.tone] }}>
                  <p className="font-body text-xs uppercase tracking-wider mb-3 text-white/60">Our read</p>
                  <p className="font-display font-bold text-3xl text-white">{result!.verdict}</p>
                </div>
                <div className="p-8 md:p-10">
                  <p className="font-body leading-relaxed mb-8" style={{ color: '#1a1a1a', opacity: 0.75 }}>
                    {result!.detail}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a href={`tel:${site.phone.replace(/-/g, '')}`}
                      className="font-body font-semibold px-6 py-3.5 text-sm text-white transition-colors"
                      style={{ background: '#1a5fb4' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d3d8a'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a5fb4'}
                    >
                      {result!.cta} · {site.phone}
                    </a>
                    <button
                      onClick={reset}
                      className="font-body font-semibold px-6 py-3.5 text-sm border transition-colors"
                      style={{ borderColor: 'rgba(26,95,180,0.3)', color: 'rgba(26,26,26,0.5)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#1a5fb4'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(26,95,180,0.3)'}
                    >
                      Start over
                    </button>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <p className="font-body text-xs mt-4" style={{ color: 'rgba(26,26,26,0.4)' }}>
                This is directional guidance based on general patterns — not financial advice specific to your file. Actual recommendations depend on your full mortgage details, credit profile, and current lender landscape. Talk to one of our agents for the real picture.
              </p>
            </Reveal>
          )}
        </div>
      </section>

      {/* Tools link */}
      <section className="py-12" style={{ background: '#e6f0f8', borderTop: '1px solid rgba(26,95,180,0.08)' }}>
        <div className="container-x mx-auto max-w-2xl flex flex-wrap gap-6 justify-between items-center">
          <p className="font-body text-sm" style={{ color: 'rgba(26,26,26,0.55)' }}>
            Want to run payment scenarios while you think it over?
          </p>
          <Link to="/calculators"
            className="font-body font-semibold text-sm transition-colors"
            style={{ color: '#1a5fb4' }}
          >
            Open mortgage calculators →
          </Link>
        </div>
      </section>
    </>
  )
}
