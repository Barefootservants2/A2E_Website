import Link from "next/link"
import Image from "next/image"
import { OracleInject } from "@/components/oracle-inject"

export default function AioraPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <div className="relative h-[30vh] min-h-[200px] overflow-hidden">
        <Image
          src="/images/angel-hero.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_60%] opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* METATRON LOGO - STANDARDIZED: 100px, BRIGHT */}
          <div className="relative w-[100px] h-[100px] mb-4">
            <Image
              src="/images/metatron-logo.png"
              alt="Metatrons Cube"
              fill
              className="object-contain"
              style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 25px rgba(0,206,209,1)) drop-shadow(0 0 50px rgba(0,206,209,0.7))' }}
              quality={100}
            />
            <div className="absolute inset-[-8px] rounded-full border-2 border-teal/60 animate-pulse" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-[-16px] rounded-full border border-teal/30 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-teal drop-shadow-[0_0_30px_rgba(0,206,209,0.5)]">
            AIORA
          </h1>
          <p className="mt-2 text-sm md:text-base tracking-[0.2em] text-foreground/60 uppercase">
            AI-Optimized Risk Assessment
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

        {/* Position Sizing Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">POSITION TIERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* NIBBLE */}
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-6 hover:border-teal/60 transition-all">
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
              
              <h3 className="text-xl font-mono text-gold tracking-wider mb-2">NIBBLE</h3>
              <p className="text-3xl font-light text-teal mb-4">1-2%</p>
              <p className="text-sm text-foreground/60">
                Exploratory position. Testing thesis. Limited conviction. 
                Used for high-volatility or unproven setups.
              </p>
            </div>

            {/* STANDARD */}
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-gold/40 rounded p-6 hover:border-gold/70 transition-all">
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
            <div className="relative bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-6 hover:border-teal/60 transition-all">
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
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-teal/10 hover:bg-teal/5">
                  <td className="px-6 py-4 text-foreground/80">Large Cap (LC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-5%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-8%</td>
                </tr>
                <tr className="border-b border-teal/10 hover:bg-teal/5">
                  <td className="px-6 py-4 text-foreground/80">Mid Cap (MC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-6%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-10%</td>
                </tr>
                <tr className="border-b border-teal/10 hover:bg-teal/5">
                  <td className="px-6 py-4 text-foreground/80">Small Cap (SC)</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-8%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-12%</td>
                </tr>
                <tr className="hover:bg-teal/5">
                  <td className="px-6 py-4 text-foreground/80">Crypto</td>
                  <td className="px-6 py-4 text-center text-gold font-mono">-10%</td>
                  <td className="px-6 py-4 text-center text-red-400 font-mono">-15%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-foreground/50 mt-4 tracking-wider">
            HARD STOP = NON-NEGOTIABLE EXIT • NO EXCEPTIONS
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

        {/* Triggers */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND TRIGGERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <code className="text-teal font-mono">MARKET WATCH</code>
              <p className="text-sm text-foreground/60 mt-2">Full protocol execution — Scanner + Oracle + Context Package</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <code className="text-teal font-mono">ORACLE</code>
              <p className="text-sm text-foreground/60 mt-2">Context Package only — Elite investor tracking + sentiment</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <code className="text-teal font-mono">SCAN</code>
              <p className="text-sm text-foreground/60 mt-2">Scanner only — Quick market pulse check</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <code className="text-gold font-mono">ORACLE INJECT:</code>
              <p className="text-sm text-foreground/60 mt-2">Ingest external data, then run full protocol</p>
            </div>
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
              → NIBBLE SIZE ONLY • -10% HARD STOP
            </p>
          </div>
        </section>

        {/* Back Link */}
        <div className="text-center mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors"
          >
            <span>←</span>
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>

      {/* Oracle Inject Component */}
      <OracleInject />

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. All Rights Reserved.</p>
      </footer>
    </main>
  )
}
