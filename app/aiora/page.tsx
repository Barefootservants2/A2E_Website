import Link from "next/link"
import Image from "next/image"

export default function AioraPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[50px] h-[50px]">
              <Image 
                src="/images/metatron-logo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 15px rgba(0,206,209,1))' }}
              />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-teal">AIORA v7.7</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative h-[25vh] min-h-[180px] overflow-hidden">
        <Image
          src="/images/angel-hero.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_60%] opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-[80px] h-[80px] mb-3">
            <Image
              src="/images/metatron-logo.png"
              alt="Metatrons Cube"
              fill
              className="object-contain"
              style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 25px rgba(0,206,209,1))' }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-teal">
            AIORA
          </h1>
          <p className="mt-2 text-sm tracking-[0.2em] text-foreground/60 uppercase">
            AI-Optimized Risk Assessment • METATRON v7.7
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Mission Statement */}
        <section className="mb-12 text-center">
          <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-3xl mx-auto">
            Systematic trading protocol enforcing disciplined position sizing, 
            stop-loss compliance, and risk-adjusted decision making. 
            <span className="text-gold"> No emotion. No deviation. No excuses.</span>
          </p>
        </section>

        {/* v7.7 New Features Banner */}
        <section className="mb-12">
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6">
            <h3 className="text-lg font-mono text-gold tracking-wider mb-4 text-center">★ v7.7 NEW FEATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3">
                <p className="text-teal font-mono text-sm">Gate 8.5</p>
                <p className="text-xs text-foreground/60 mt-1">REGULATORY SHOCK scanner</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">H13 + H14</p>
                <p className="text-xs text-foreground/60 mt-1">Tariff Monitor + Position News</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">4-Mode Counter-Thesis</p>
                <p className="text-xs text-foreground/60 mt-1">Added REGULATORY RISK</p>
              </div>
            </div>
          </div>
        </section>

        {/* Position Sizing Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">POSITION TIERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* NIBBLE */}
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-6">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
              
              <h3 className="text-xl font-mono text-gold tracking-wider mb-2">NIBBLE</h3>
              <p className="text-3xl font-light text-teal mb-4">1-2%</p>
              <p className="text-sm text-foreground/60">
                Exploratory position. Testing thesis. Limited conviction. 
                Used for high-volatility, unproven setups, or regulatory shock.
              </p>
              <div className="mt-4 text-xs text-red-400/60 tracking-wider">⚠️ DEFAULT DURING REG SHOCK</div>
            </div>

            {/* STANDARD */}
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-gold/40 rounded p-6">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-gold/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-gold/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-gold/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-gold/60" />
              
              <h3 className="text-xl font-mono text-gold tracking-wider mb-2">STANDARD</h3>
              <p className="text-3xl font-light text-gold mb-4">3-5%</p>
              <p className="text-sm text-foreground/60">
                Default position size. Validated thesis with multiple confirmations.
                Core of the portfolio strategy.
              </p>
              <div className="mt-4 text-xs text-gold/60 tracking-wider">★ RECOMMENDED DEFAULT</div>
            </div>

            {/* CONVICTION */}
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-6">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
              
              <h3 className="text-xl font-mono text-gold tracking-wider mb-2">CONVICTION</h3>
              <p className="text-3xl font-light text-teal mb-4">6-8%</p>
              <p className="text-sm text-foreground/60">
                High-confidence position. Multiple catalysts aligned. 
                Smart money confirmation. Rare deployment.
              </p>
            </div>
          </div>
        </section>

        {/* Stop-Loss Matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">STOP-LOSS MATRIX</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-teal/30">
                  <th className="px-6 py-4 text-left text-sm font-mono text-teal tracking-wider">ASSET CLASS</th>
                  <th className="px-6 py-4 text-center text-sm font-mono text-teal tracking-wider">SOFT STOP</th>
                  <th className="px-6 py-4 text-center text-sm font-mono text-teal tracking-wider">HARD STOP</th>
                  <th className="px-6 py-4 text-center text-sm font-mono text-gold tracking-wider">REG SHOCK</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-teal/10">
                  <td className="px-6 py-4 text-foreground/80">Large Cap (LC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-5%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-8%</td>
                  <td className="px-6 py-4 text-center text-yellow-400 font-mono">-12%</td>
                </tr>
                <tr className="border-b border-teal/10">
                  <td className="px-6 py-4 text-foreground/80">Mid Cap (MC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-6%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-10%</td>
                  <td className="px-6 py-4 text-center text-yellow-400 font-mono">-15%</td>
                </tr>
                <tr className="border-b border-teal/10">
                  <td className="px-6 py-4 text-foreground/80">Small Cap (SC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-8%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-12%</td>
                  <td className="px-6 py-4 text-center text-yellow-400 font-mono">-18%</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-foreground/80">Crypto</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-10%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-15%</td>
                  <td className="px-6 py-4 text-center text-yellow-400 font-mono">-22.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-foreground/50 mt-4 tracking-wider">
            HARD STOP = NON-NEGOTIABLE EXIT • REG SHOCK = +50% WIDER STOPS
          </p>
        </section>

        {/* VIX Regime */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">VIX REGIME SIGNALS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[rgba(10,15,25,0.9)] border border-green-500/30 rounded p-6 text-center">
              <div className="text-4xl mb-2">🟢</div>
              <p className="text-2xl font-mono text-green-400 mb-2">&lt;15</p>
              <p className="text-sm text-foreground/60">LOW VOLATILITY</p>
              <p className="text-xs text-green-400/70 mt-2">Full position sizing permitted</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-yellow-500/30 rounded p-6 text-center">
              <div className="text-4xl mb-2">🟡</div>
              <p className="text-2xl font-mono text-yellow-400 mb-2">15-25</p>
              <p className="text-sm text-foreground/60">ELEVATED VOLATILITY</p>
              <p className="text-xs text-yellow-400/70 mt-2">Reduce position sizes 25-50%</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-red-500/30 rounded p-6 text-center">
              <div className="text-4xl mb-2">🔴</div>
              <p className="text-2xl font-mono text-red-400 mb-2">&gt;25</p>
              <p className="text-sm text-foreground/60">HIGH VOLATILITY</p>
              <p className="text-xs text-red-400/70 mt-2">Defensive posture • Cash preservation</p>
            </div>
          </div>
        </section>

        {/* Triggers - ENHANCED with REG SCAN */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND TRIGGERS</h2>
          <p className="text-center text-sm text-foreground/50 mb-6">Use these commands in any MICHA conversation to activate protocols</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5">
              <code className="text-teal font-mono text-lg">MARKET WATCH</code>
              <p className="text-sm text-foreground/60 mt-3 mb-2">Full protocol — 16 gates + AIORA sizing</p>
              <p className="text-xs text-teal/50">HOW: Type "MARKET WATCH" for complete analysis</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5">
              <code className="text-teal font-mono text-lg">ORACLE</code>
              <p className="text-sm text-foreground/60 mt-3 mb-2">Context Package only — thesis + evidence</p>
              <p className="text-xs text-teal/50">HOW: Type "ORACLE" for quick analysis</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5">
              <code className="text-teal font-mono text-lg">SCAN</code>
              <p className="text-sm text-foreground/60 mt-3 mb-2">Scanner only — Quick market pulse</p>
              <p className="text-xs text-teal/50">HOW: Type "SCAN" for fast overview</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-5">
              <code className="text-gold font-mono text-lg">ORACLE INJECT:</code>
              <p className="text-sm text-foreground/60 mt-3 mb-2">Ingest external data → full protocol</p>
              <p className="text-xs text-gold/50">HOW: Paste data after command</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-red-500/30 rounded p-5 md:col-span-2 lg:col-span-1">
              <code className="text-red-400 font-mono text-lg">REG SCAN</code>
              <div className="text-[10px] text-red-400/60 mt-1">★ NEW v7.7</div>
              <p className="text-sm text-foreground/60 mt-2 mb-2">Gate 8.5 deep dive — Regulatory focus only</p>
              <p className="text-xs text-red-400/50">HOW: Type "REG SCAN [ticker/sector]" for policy risk</p>
            </div>
          </div>
        </section>

        {/* Regulatory Shock Section - NEW */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-red-400 mb-6 text-center">⚠️ REGULATORY SHOCK PROTOCOL</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-red-500/30 rounded p-6">
            <p className="text-center text-foreground/70 mb-6">
              Gate 8.5 scans for policy shifts within 72 hours. If ALERT triggered:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-3 border border-red-500/20 rounded">
                <p className="text-red-400 font-mono text-sm">MAX POSITION</p>
                <p className="text-xs text-foreground/60 mt-1">NIBBLE only (1-2%)</p>
              </div>
              <div className="text-center p-3 border border-red-500/20 rounded">
                <p className="text-red-400 font-mono text-sm">STOP WIDTH</p>
                <p className="text-xs text-foreground/60 mt-1">+50% wider than normal</p>
              </div>
              <div className="text-center p-3 border border-red-500/20 rounded">
                <p className="text-red-400 font-mono text-sm">HOLD PERIOD</p>
                <p className="text-xs text-foreground/60 mt-1">72hr observation required</p>
              </div>
              <div className="text-center p-3 border border-red-500/20 rounded">
                <p className="text-red-400 font-mono text-sm">OVERRIDE</p>
                <p className="text-xs text-foreground/60 mt-1">Momentum override BLOCKED</p>
              </div>
            </div>
            <p className="text-center text-xs text-red-400/50 mt-6 tracking-wider">
              Scans: Executive orders • Tariffs • SEC/FTC/DOE/FERC actions • Grid policy
            </p>
          </div>
        </section>

        {/* Momentum Override */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">MOMENTUM OVERRIDE</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-6">
            <p className="text-center text-foreground/70 mb-6">
              ANY 3 OF 5 conditions = GO despite overbought signals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="text-center p-3 border border-teal/20 rounded">
                <p className="text-gold font-mono text-sm">1</p>
                <p className="text-xs text-foreground/60 mt-1">Catalyst &lt;48 hours</p>
              </div>
              <div className="text-center p-3 border border-teal/20 rounded">
                <p className="text-gold font-mono text-sm">2</p>
                <p className="text-xs text-foreground/60 mt-1">Smart money within 7 days</p>
              </div>
              <div className="text-center p-3 border border-teal/20 rounded">
                <p className="text-gold font-mono text-sm">3</p>
                <p className="text-xs text-foreground/60 mt-1">Volume &gt;5x average</p>
              </div>
              <div className="text-center p-3 border border-teal/20 rounded">
                <p className="text-gold font-mono text-sm">4</p>
                <p className="text-xs text-foreground/60 mt-1">Sector tailwind (ATH)</p>
              </div>
              <div className="text-center p-3 border border-teal/20 rounded">
                <p className="text-gold font-mono text-sm">5</p>
                <p className="text-xs text-foreground/60 mt-1">Price &gt;50% above 50MA</p>
              </div>
            </div>
            <p className="text-center text-xs text-red-400/70 mt-6 tracking-wider">
              → NIBBLE SIZE ONLY • -10% HARD STOP • BLOCKED DURING REG SHOCK
            </p>
          </div>
        </section>

        {/* Counter-Thesis Section - NEW */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">4-MODE COUNTER-THESIS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5 text-center">
              <p className="text-teal font-mono text-lg mb-2">1. MARKET</p>
              <p className="text-xs text-foreground/60">Macro/sector killer</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5 text-center">
              <p className="text-teal font-mono text-lg mb-2">2. COMPANY</p>
              <p className="text-xs text-foreground/60">Company-specific killer</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-5 text-center">
              <p className="text-teal font-mono text-lg mb-2">3. THESIS</p>
              <p className="text-xs text-foreground/60">Core assumption wrong</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-5 text-center">
              <p className="text-gold font-mono text-lg mb-2">4. REGULATORY</p>
              <p className="text-xs text-foreground/60">Policy/exec order killer</p>
              <p className="text-[10px] text-gold/50 mt-1">★ NEW v7.7</p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="text-center mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors text-lg"
          >
            <span>←</span>
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. All Rights Reserved.</p>
        <p className="text-xs text-foreground/40 mt-2">METATRON v7.7 | 16 Gates | 14 HUNTER Modules | 4-Mode Counter-Thesis</p>
      </footer>
    </main>
  )
}
