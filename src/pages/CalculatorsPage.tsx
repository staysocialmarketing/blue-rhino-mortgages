import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/site/Reveal'
import { site } from '@/lib/site'

// ─── Payment Calculator ───────────────────────────────────────────────────────
function PaymentCalc() {
  const [price, setPrice] = useState(750000)
  const [down, setDown] = useState(150000)
  const [rate, setRate] = useState(5.25)
  const [amort, setAmort] = useState(25)

  const principal = price - down
  const monthlyRate = rate / 100 / 12
  const n = amort * 12
  const payment = monthlyRate === 0
    ? principal / n
    : (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
  const downPct = ((down / price) * 100).toFixed(1)

  const fmt = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })
  const fmtM = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

  return (
    <div>
      <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#1a1a1a' }}>Monthly Payment</h3>
      <div className="space-y-5">
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Home price: {fmt(price)}
          </span>
          <input type="range" min={300000} max={2500000} step={25000} value={price}
            onChange={e => setPrice(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Down payment: {fmt(down)} ({downPct}%)
          </span>
          <input type="range" min={Math.round(price * 0.05)} max={Math.round(price * 0.5)} step={5000} value={down}
            onChange={e => setDown(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Interest rate: {rate.toFixed(2)}%
          </span>
          <input type="range" min={2} max={10} step={0.05} value={rate}
            onChange={e => setRate(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Amortization: {amort} years
          </span>
          <input type="range" min={5} max={30} step={5} value={amort}
            onChange={e => setAmort(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
      </div>

      <div className="mt-6 p-6 rounded-sm" style={{ background: '#1a5fb4' }}>
        <p className="font-body text-sm text-white/70 mb-1">Estimated monthly payment</p>
        <p className="font-display font-bold text-4xl text-white">{fmtM(payment)}<span className="text-lg text-white/60">/mo</span></p>
        <p className="font-body text-xs mt-3 text-white/50">
          Mortgage: {fmt(principal)} · {rate}% · {amort}yr amortization
        </p>
      </div>
      <p className="font-body text-xs mt-3" style={{ color: 'rgba(26,26,26,0.4)' }}>
        Estimate only. Does not include CMHC insurance, property tax, or closing costs. Contact us for exact numbers.
      </p>
    </div>
  )
}

// ─── Affordability Calculator ─────────────────────────────────────────────────
function AffordabilityCalc() {
  const [income, setIncome] = useState(120000)
  const [debts, setDebts] = useState(500)
  const [down, setDown] = useState(80000)
  const [rate, setRate] = useState(5.25)

  // Stress test rate: max of contract rate + 2% or 5.25%
  const stressRate = Math.max(rate + 2, 5.25)
  const monthlyRate = stressRate / 100 / 12
  const n = 25 * 12 // 25yr amortization standard
  // GDS: max 39% of gross monthly income for housing costs
  // TDS: max 44% of gross monthly income total debt service
  const grossMonthly = income / 12
  const maxTDS = grossMonthly * 0.44 - debts
  const maxGDS = grossMonthly * 0.39

  // Use the more conservative
  const maxMonthly = Math.min(maxTDS, maxGDS)
  // Solve for principal from monthly payment
  const principal = maxMonthly > 0
    ? (maxMonthly * (Math.pow(1 + monthlyRate, n) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, n))
    : 0
  const maxPrice = principal + down

  const fmt = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

  return (
    <div>
      <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#1a1a1a' }}>Affordability</h3>
      <div className="space-y-5">
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Annual household income: {fmt(income)}
          </span>
          <input type="range" min={40000} max={500000} step={5000} value={income}
            onChange={e => setIncome(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Monthly debt obligations: {debts.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })}
          </span>
          <input type="range" min={0} max={5000} step={50} value={debts}
            onChange={e => setDebts(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Down payment: {fmt(down)}
          </span>
          <input type="range" min={20000} max={500000} step={5000} value={down}
            onChange={e => setDown(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Expected rate: {rate.toFixed(2)}%
          </span>
          <input type="range" min={2} max={10} step={0.05} value={rate}
            onChange={e => setRate(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
      </div>

      <div className="mt-6 p-6" style={{ background: '#1a5fb4' }}>
        <p className="font-body text-sm text-white/70 mb-1">Estimated maximum purchase price</p>
        <p className="font-display font-bold text-4xl text-white">{fmt(Math.max(0, maxPrice))}</p>
        <p className="font-body text-xs mt-3 text-white/50">
          Stress test rate: {stressRate.toFixed(2)}% · GDS/TDS rules applied
        </p>
      </div>
      <p className="font-body text-xs mt-3" style={{ color: 'rgba(26,26,26,0.4)' }}>
        Based on OSFI stress test. Self-employed income may be assessed differently. Ask us.
      </p>
    </div>
  )
}

// ─── CMHC Calculator ─────────────────────────────────────────────────────────
function CMHCCalc() {
  const [price, setPrice] = useState(600000)
  const [down, setDown] = useState(60000)

  const pct = (down / price) * 100
  const insurable = price < 1500000 && pct < 20

  let premium = 0
  if (insurable) {
    if (pct >= 5 && pct < 10) premium = 0.04
    else if (pct >= 10 && pct < 15) premium = 0.031
    else if (pct >= 15 && pct < 20) premium = 0.028
  }
  const cmhcAmt = (price - down) * premium
  const totalMortgage = (price - down) + cmhcAmt

  const fmt = (n: number) => n.toLocaleString('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })

  return (
    <div>
      <h3 className="font-display font-bold text-xl mb-6" style={{ color: '#1a1a1a' }}>CMHC Insurance</h3>
      <div className="space-y-5">
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Purchase price: {fmt(price)}
          </span>
          <input type="range" min={300000} max={1499000} step={25000} value={price}
            onChange={e => { setPrice(+e.target.value); setDown(Math.max(down, Math.round(+e.target.value * 0.05))) }}
            className="w-full accent-rhino" />
        </label>
        <label className="block">
          <span className="font-body text-sm font-medium mb-1 block" style={{ color: '#1a1a1a' }}>
            Down payment: {fmt(down)} ({pct.toFixed(1)}%)
          </span>
          <input type="range" min={Math.round(price * 0.05)} max={Math.round(price * 0.199)} step={5000} value={down}
            onChange={e => setDown(+e.target.value)}
            className="w-full accent-rhino" />
        </label>
      </div>

      <div className="mt-6 p-6" style={{ background: '#1a5fb4' }}>
        {insurable ? (
          <>
            <p className="font-body text-sm text-white/70 mb-1">CMHC insurance premium</p>
            <p className="font-display font-bold text-4xl text-white">{fmt(cmhcAmt)}</p>
            <div className="mt-3 space-y-1">
              <p className="font-body text-xs text-white/50">Premium rate: {(premium * 100).toFixed(1)}%</p>
              <p className="font-body text-xs text-white/50">Total mortgage: {fmt(totalMortgage)}</p>
            </div>
          </>
        ) : (
          <>
            <p className="font-body text-sm text-white/70 mb-1">CMHC insurance premium</p>
            <p className="font-display font-bold text-3xl text-white">Not required</p>
            <p className="font-body text-xs mt-2 text-white/50">
              {pct >= 20 ? 'Down payment is 20% or more.' : 'Price above $1.5M threshold.'}
            </p>
          </>
        )}
      </div>
      <p className="font-body text-xs mt-3" style={{ color: 'rgba(26,26,26,0.4)' }}>
        CMHC insurance is added to your mortgage and amortized. Ontario also charges PST on the premium. Ask us for the full picture.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
const TABS = ['Payment', 'Affordability', 'CMHC Insurance']

export function CalculatorsPage() {
  const [tab, setTab] = useState(0)

  return (
    <>
      <section className="pt-40 pb-24 container-x"
        style={{ background: 'linear-gradient(150deg, #081f4a 0%, #0d3d8a 50%, #1a5fb4 100%)' }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-6" style={{ color: '#7fb8e0' }}>Tools</p>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white leading-[1.05] max-w-3xl">
              Mortgage calculators.
            </h1>
            <p className="mt-6 font-body text-lg text-white/70 max-w-xl leading-relaxed">
              Run your own numbers before we talk. These are directional. For real numbers specific to your file, give us a call.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 container-x">
        <div className="mx-auto max-w-4xl">
          {/* Tab bar */}
          <div className="flex gap-2 mb-10 border-b" style={{ borderColor: 'rgba(26,95,180,0.15)' }}>
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className="font-body font-semibold text-sm pb-3 px-1 border-b-2 transition-colors -mb-px"
                style={{
                  borderColor: tab === i ? '#1a5fb4' : 'transparent',
                  color: tab === i ? '#1a5fb4' : 'rgba(26,26,26,0.5)',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          <Reveal>
            <div className="bg-white border p-8 md:p-10" style={{ borderColor: 'rgba(26,95,180,0.1)' }}>
              {tab === 0 && <PaymentCalc />}
              {tab === 1 && <AffordabilityCalc />}
              {tab === 2 && <CMHCCalc />}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: '#e6f0f8' }}>
        <div className="container-x mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4" style={{ color: '#1a1a1a' }}>
              Want to see your actual numbers?
            </h2>
            <p className="font-body max-w-lg mx-auto leading-relaxed mb-8" style={{ color: '#1a1a1a', opacity: 0.65 }}>
              Calculators give you a direction. We give you a real picture: rate options, lender fit, and a plan.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`tel:${site.phone.replace(/-/g, '')}`}
                className="font-body font-semibold px-7 py-4 text-sm text-white transition-colors"
                style={{ background: '#1a5fb4' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0d3d8a'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#1a5fb4'}
              >
                Call {site.phone}
              </a>
              <Link to="/should-i-refinance"
                className="font-body font-semibold px-7 py-4 text-sm border transition-colors"
                style={{ borderColor: '#1a5fb4', color: '#1a5fb4' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a5fb4'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#1a5fb4' }}
              >
                Should I Refinance? →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
