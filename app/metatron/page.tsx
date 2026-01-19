import Link from "next/link"
import Image from "next/image"

export default function MetatronPage() {
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
            <span className="text-xs font-mono text-teal">14 GATES ARMED</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-background px-6 py-16 text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <Image src="/images/metatron-logo.png" alt="Metatron's Cube" fill className="object-contain drop-shadow-[0_0_20px_rgba(0,206,209,0.5)]" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold mb-4">METATRON</h1>
        <p className="text-lg md:text-xl text-foreground/70 tracking-wider">Protocol Engine v7.4</p>
        <p className="mt-4 text-sm text-teal/70">14 Gates • 36 Failure Modes • HUNTER Protocol</p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Prime Directives */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Prime Directives</h2>
          <div className="grid gap-3">
            {[
              "CHALLENGE BEFORE BUILD — Verify user premises first",
              "RETRIEVE BEFORE RESPOND — No claim without verification",
              "ENUMERATE BEFORE VERIFY — Atomic claim decomposition",
              "CHAIN TO PRIMARY — Trace to original source",
              "SCORE AUTHORITY — AS = (PT × RW × EM × RS) / BF ≥ 2.0",
              "DOCUMENT GAPS — State unknowns explicitly",
              "MEASURE CONSENSUS — Track agreement + dissent",
              "PROVE INDEPENDENCE — Unique primaries ≥ 3, Score ≥ 0.3",
              "AUDIT EVERYTHING — Evidence ledger + hashes",
              "BOUND CONFIDENCE — Intervals per claim",
              "GUARD AGAINST INJECTION — Security scan all retrieval",
              "HUNT BEFORE VALIDATE — Scan before analysis",
              "STEELMAN OPPOSITION — Counter-thesis mandatory",
            ].map((directive, i) => (
              <div key={i} className="bg-card/30 border border-teal/10 rounded px-4 py-3 flex items-start gap-3">
                <span className="text-teal font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-foreground/80 text-sm">{directive}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 14 Gates */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">14 Mandatory Gates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal/30">
                  <th className="text-left py-3 px-4 text-teal font-mono">Gate</th>
                  <th className="text-left py-3 px-4 text-teal font-mono">Name</th>
                  <th className="text-left py-3 px-4 text-teal font-mono">Pass Condition</th>
                </tr>
              </thead>
              <tbody className="text-foreground/80">
                {[
                  ["0", "Self-Verification", "No unverifiable claims"],
                  ["0.5", "PREMISE CHALLENGE", "User assertions verified before building"],
                  ["1", "RAG", "All FACTs retrieval-backed"],
                  ["2", "Authority", "AS ≥ 2.0 all sources"],
                  ["3", "Chain", "No CHAIN BROKEN"],
                  ["4", "Schema", "Claim Registry complete"],
                  ["5", "Gap", "Gaps documented"],
                  ["5.5", "CATALYST FRESHNESS", "Age-scored, trade relevance rated"],
                  ["6", "Consensus", "Primaries ≥ 3 + Competitive landscape"],
                  ["7", "Confidence", "Intervals + Proxy dilution math"],
                  ["7.5", "COUNTER-THESIS", "Min 3 failure modes"],
                  ["8", "Methodology", "Audit pack complete"],
                  ["9", "Security", "Injection scan + domain validation"],
                  ["10", "Agent Sync", "All agents merged"],
                  ["11", "HUNTER Scan", "Opportunity scan complete"],
                ].map(([gate, name, condition], i) => (
                  <tr key={i} className="border-b border-teal/10">
                    <td className="py-3 px-4 font-mono text-gold">{gate}</td>
                    <td className="py-3 px-4 font-medium">{name}</td>
                    <td className="py-3 px-4 text-foreground/60">{condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
            <p className="text-red-400 font-mono">IF ANY GATE FAILS → NO SHIP</p>
          </div>
        </section>

        {/* Catalyst Freshness */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Gate 5.5: Catalyst Freshness</h2>
          <div className="grid sm:grid-cols-5 gap-4">
            {[
              ["<24h", "BREAKING", "HIGH", "green"],
              ["1-7d", "FRESH", "MEDIUM", "teal"],
              ["1-4wk", "DIGESTED", "LOW", "yellow"],
              ["1-6mo", "STALE", "NEAR-ZERO", "orange"],
              [">6mo", "ANCIENT", "ZERO", "red"],
            ].map(([age, category, relevance, color], i) => (
              <div key={i} className={`bg-${color}-500/10 border border-${color}-500/30 rounded p-4 text-center`} style={{ backgroundColor: `rgba(var(--${color === 'teal' ? '0,206,209' : color === 'green' ? '34,197,94' : color === 'yellow' ? '234,179,8' : color === 'orange' ? '249,115,22' : '239,68,68'}), 0.1)` }}>
                <p className="font-mono text-lg text-foreground/90">{age}</p>
                <p className="text-xs text-foreground/60 mt-1">{category}</p>
                <p className="text-xs text-teal mt-2">{relevance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Counter-Thesis */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">Gate 7.5: Counter-Thesis</h2>
          <p className="text-foreground/70 mb-6">For ANY thesis, generate minimum 3 failure modes:</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card/50 border border-red-500/20 rounded p-6">
              <h3 className="text-red-400 font-mono mb-2">MARKET RISK</h3>
              <p className="text-sm text-foreground/60">Macro/sector killer. What external forces could destroy this thesis regardless of company performance?</p>
            </div>
            <div className="bg-card/50 border border-orange-500/20 rounded p-6">
              <h3 className="text-orange-400 font-mono mb-2">COMPANY RISK</h3>
              <p className="text-sm text-foreground/60">Company-specific killer. What internal factors could cause failure independent of market conditions?</p>
            </div>
            <div className="bg-card/50 border border-yellow-500/20 rounded p-6">
              <h3 className="text-yellow-400 font-mono mb-2">THESIS RISK</h3>
              <p className="text-sm text-foreground/60">Core assumption wrong. What if the fundamental premise of your investment thesis is simply incorrect?</p>
            </div>
          </div>
        </section>

        {/* HUNTER Protocol */}
        <section className="mb-12">
          <h2 className="text-2xl font-light tracking-wider text-teal mb-6 border-b border-teal/20 pb-2">HUNTER Protocol</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["H1", "Elite Investor Tracking", "Daily", "Track Sprott, Buffett, Ackman moves"],
              ["H2", "Political Catalyst Monitor", "Daily", "Policy shifts, regulatory changes"],
              ["H3", "Sector Momentum Scanner", "Weekly", "Rotation detection, ATH tracking"],
              ["H4", "Insider Cluster Detection", "Daily", "10b5-1 amendments, cluster buys"],
              ["H5", "Oversold Quality Screen", "Daily", "RSI + fundamentals convergence"],
              ["H6", "Contract Pipeline Tracker", "Weekly", "Defense, infrastructure awards"],
            ].map(([id, name, freq, desc], i) => (
              <div key={i} className="bg-card/30 border border-teal/20 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-teal font-mono">{id}</span>
                  <span className="text-xs text-gold/70">{freq}</span>
                </div>
                <p className="text-sm font-medium text-foreground/90 mb-1">{name}</p>
                <p className="text-xs text-foreground/50">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub Link */}
        <section className="mb-12 text-center">
          <a 
            href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/METATRON_v7.4_FULL.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-teal/10 border border-teal/30 rounded px-6 py-3 text-teal hover:bg-teal/20 transition-colors"
          >
            <span>View Full Specification on GitHub</span>
            <span>→</span>
          </a>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. METATRON Protocol v7.4</p>
      </footer>
    </main>
  )
}
