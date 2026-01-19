import Link from "next/link"
import Image from "next/image"

export default function AioraPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain" />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-teal">AIORA ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-background px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold mb-4">AIORA</h1>
        <p className="text-lg md:text-xl text-foreground/70 tracking-wider">AI-Optimized Risk Assessment</p>
        <p className="mt-4 text-sm text-teal/70">Trading • Analysis • Signals</p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Protocol Overview</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            AIORA is a systematic trading protocol designed to enforce discipline, manage risk, and eliminate emotional decision-making. 
            It integrates with the METATRON verification framework to ensure every trade decision passes rigorous validation gates.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            Built on decades of engineering discipline and refined through real market exposure, AIORA transforms trading from gambling into systematic execution.
          </p>
        </section>

        {/* Position Sizing */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Position Sizing Tiers</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/50 border border-teal/20 rounded p-6">
              <h3 className="text-gold font-mono text-lg mb-2">NIBBLE</h3>
              <p className="text-3xl font-light text-teal mb-2">1-2%</p>
              <p className="text-sm text-foreground/60">Exploratory positions. Testing thesis. Minimal capital at risk.</p>
            </div>
            <div className="bg-card/50 border border-gold/30 rounded p-6">
              <h3 className="text-gold font-mono text-lg mb-2">STANDARD</h3>
              <p className="text-3xl font-light text-teal mb-2">3-5%</p>
              <p className="text-sm text-foreground/60">Confirmed thesis. Multiple validations. Core position size.</p>
            </div>
            <div className="bg-card/50 border border-teal/20 rounded p-6">
              <h3 className="text-gold font-mono text-lg mb-2">CONVICTION</h3>
              <p className="text-3xl font-light text-teal mb-2">6-8%</p>
              <p className="text-sm text-foreground/60">High-confidence. Elite signal convergence. Maximum allocation.</p>
            </div>
          </div>
        </section>

        {/* Stop Loss Matrix */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Stop-Loss Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal/30">
                  <th className="text-left py-3 px-4 text-teal font-mono">Asset Class</th>
                  <th className="text-center py-3 px-4 text-teal font-mono">Soft Stop</th>
                  <th className="text-center py-3 px-4 text-teal font-mono">Hard Stop</th>
                </tr>
              </thead>
              <tbody className="text-foreground/80">
                <tr className="border-b border-teal/10">
                  <td className="py-3 px-4">Large Cap (LC)</td>
                  <td className="py-3 px-4 text-center font-mono text-gold">-5%</td>
                  <td className="py-3 px-4 text-center font-mono text-red-400">-8%</td>
                </tr>
                <tr className="border-b border-teal/10">
                  <td className="py-3 px-4">Mid Cap (MC)</td>
                  <td className="py-3 px-4 text-center font-mono text-gold">-6%</td>
                  <td className="py-3 px-4 text-center font-mono text-red-400">-10%</td>
                </tr>
                <tr className="border-b border-teal/10">
                  <td className="py-3 px-4">Small Cap (SC)</td>
                  <td className="py-3 px-4 text-center font-mono text-gold">-8%</td>
                  <td className="py-3 px-4 text-center font-mono text-red-400">-12%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Crypto</td>
                  <td className="py-3 px-4 text-center font-mono text-gold">-10%</td>
                  <td className="py-3 px-4 text-center font-mono text-red-400">-15%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* VIX Protocol */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">VIX Protocol</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 rounded p-6 text-center">
              <p className="text-4xl mb-2">🟢</p>
              <p className="text-green-400 font-mono text-lg mb-1">&lt;15</p>
              <p className="text-sm text-foreground/60">Full deployment. Standard sizing.</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-6 text-center">
              <p className="text-4xl mb-2">🟡</p>
              <p className="text-yellow-400 font-mono text-lg mb-1">15-25</p>
              <p className="text-sm text-foreground/60">Reduced sizing. Tighten stops.</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded p-6 text-center">
              <p className="text-4xl mb-2">🔴</p>
              <p className="text-red-400 font-mono text-lg mb-1">&gt;25</p>
              <p className="text-sm text-foreground/60">Defensive mode. Cash preservation.</p>
            </div>
          </div>
        </section>

        {/* Triggers */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Command Triggers</h2>
          <div className="space-y-4">
            <div className="bg-card/50 border border-teal/20 rounded p-4">
              <code className="text-gold font-mono">MARKET WATCH</code>
              <p className="text-sm text-foreground/60 mt-1">Full protocol activation — ORACLE + Scanner + All modules</p>
            </div>
            <div className="bg-card/50 border border-teal/20 rounded p-4">
              <code className="text-gold font-mono">ORACLE</code>
              <p className="text-sm text-foreground/60 mt-1">Context Package only — Elite investor tracking, news synthesis</p>
            </div>
            <div className="bg-card/50 border border-teal/20 rounded p-4">
              <code className="text-gold font-mono">SCAN</code>
              <p className="text-sm text-foreground/60 mt-1">Scanner only — Quick technical analysis, no full protocol</p>
            </div>
            <div className="bg-card/50 border border-teal/20 rounded p-4">
              <code className="text-gold font-mono">ORACLE INJECT: [data]</code>
              <p className="text-sm text-foreground/60 mt-1">Ingest external data, then run full protocol</p>
            </div>
          </div>
        </section>

        {/* Killswitch */}
        <section className="mb-12">
          <div className="bg-red-500/10 border border-red-500/30 rounded p-6 text-center">
            <h2 className="text-2xl font-mono text-red-400 mb-4">⚠️ KILLSWITCH</h2>
            <p className="text-foreground/80 mb-4">Triggers: <code className="text-red-400">KILLSWITCH</code> | <code className="text-red-400">HALT</code> | <code className="text-red-400">STOP ALL</code> | <code className="text-red-400">&gt;10% drawdown</code></p>
            <p className="text-sm text-foreground/60">Immediately halts all trading activity. No exceptions.</p>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. AIORA Protocol v1.0</p>
      </footer>
    </main>
  )
}
