import Link from "next/link"
import Image from "next/image"

export default function MetatronPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero Header */}
      <div className="relative h-[35vh] min-h-[250px] overflow-hidden">
        <Image
          src="/images/angel-hero.jpg"
          alt="Background"
          fill
          className="object-cover object-[center_60%] opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 mb-4">
            <Image
              src="/images/metatron-logo.png"
              alt="Metatron's Cube"
              fill
              className="object-contain drop-shadow-[0_0_20px_rgba(0,206,209,0.6)]"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            METATRON
          </h1>
          <p className="mt-2 text-sm md:text-base tracking-[0.2em] text-foreground/60 uppercase">
            Protocol Engine v7.4
          </p>
          <p className="mt-4 text-xs text-teal/70 tracking-wider">
            14 GATES • 36 FAILURE MODES • HUNTER PROTOCOL
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Prime Directives */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">PRIME DIRECTIVES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              ["01", "CHALLENGE BEFORE BUILD", "Verify user premises first"],
              ["02", "RETRIEVE BEFORE RESPOND", "No claim without verification"],
              ["03", "ENUMERATE BEFORE VERIFY", "Atomic claim decomposition"],
              ["04", "CHAIN TO PRIMARY", "Trace to original source"],
              ["05", "SCORE AUTHORITY", "AS = (PT × RW × EM × RS) / BF ≥ 2.0"],
              ["06", "DOCUMENT GAPS", "State unknowns explicitly"],
              ["07", "MEASURE CONSENSUS", "Track agreement + dissent"],
              ["08", "PROVE INDEPENDENCE", "Unique primaries ≥ 3, Score ≥ 0.3"],
              ["09", "AUDIT EVERYTHING", "Evidence ledger + hashes"],
              ["10", "BOUND CONFIDENCE", "Intervals per claim"],
              ["11", "GUARD AGAINST INJECTION", "Security scan all retrieval"],
              ["12", "HUNT BEFORE VALIDATE", "Scan before analysis"],
              ["13", "STEELMAN OPPOSITION", "Counter-thesis mandatory"],
            ].map(([num, title, desc]) => (
              <div key={num} className="bg-[rgba(10,15,25,0.9)] border border-teal/20 rounded p-4 hover:border-teal/40 transition-all flex gap-4">
                <span className="text-gold font-mono text-lg">{num}</span>
                <div>
                  <p className="text-foreground/90 font-medium text-sm">{title}</p>
                  <p className="text-foreground/50 text-xs mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 14 Mandatory Gates */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">14 MANDATORY GATES</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-teal/30 bg-teal/5">
                  <th className="px-4 py-3 text-left font-mono text-teal tracking-wider">#</th>
                  <th className="px-4 py-3 text-left font-mono text-teal tracking-wider">GATE</th>
                  <th className="px-4 py-3 text-left font-mono text-teal tracking-wider">PASS CONDITION</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["0", "Self-Verification", "No unverifiable claims"],
                  ["0.5", "PREMISE CHALLENGE", "User assertions verified before building", true],
                  ["1", "RAG", "All FACTs retrieval-backed"],
                  ["2", "Authority", "AS ≥ 2.0 all sources"],
                  ["3", "Chain", "No CHAIN BROKEN"],
                  ["4", "Schema", "Claim Registry complete"],
                  ["5", "Gap", "Gaps documented"],
                  ["5.5", "CATALYST FRESHNESS", "Age-scored, trade relevance rated", true],
                  ["6", "Consensus", "Primaries ≥ 3 + Competitive landscape"],
                  ["7", "Confidence", "Intervals + Proxy dilution math"],
                  ["7.5", "COUNTER-THESIS", "Min 3 failure modes", true],
                  ["8", "Methodology", "Audit pack complete"],
                  ["9", "Security", "Injection scan + domain validation"],
                  ["10", "Agent Sync", "All agents merged"],
                  ["11", "HUNTER Scan", "Opportunity scan complete"],
                ].map(([num, name, condition, isNew]) => (
                  <tr key={num} className={`border-b border-teal/10 hover:bg-teal/5 ${isNew ? 'bg-gold/5' : ''}`}>
                    <td className="px-4 py-3 font-mono text-gold">{num}</td>
                    <td className="px-4 py-3 text-foreground/90">{name}</td>
                    <td className="px-4 py-3 text-foreground/60">{condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
            <p className="text-red-400 font-mono tracking-wider">IF ANY GATE FAILS → NO SHIP</p>
          </div>
        </section>

        {/* New Gates Explained */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">v7.4 NEW GATES</h2>
          
          {/* Gate 0.5 */}
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-6 mb-6">
            <h3 className="text-xl font-mono text-gold mb-4">Gate 0.5: PREMISE CHALLENGE</h3>
            <p className="text-foreground/70 mb-4">Extract implicit claims from user query before building response.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
                <p className="text-teal font-mono text-sm">USER_ASSERTED</p>
                <p className="text-xs text-foreground/50 mt-1">User stated as fact</p>
              </div>
              <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
                <p className="text-teal font-mono text-sm">COMMON_KNOWLEDGE</p>
                <p className="text-xs text-foreground/50 mt-1">Generally accepted</p>
              </div>
              <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
                <p className="text-teal font-mono text-sm">REQUIRES_VERIFICATION</p>
                <p className="text-xs text-foreground/50 mt-1">Must validate first</p>
              </div>
            </div>
            <p className="text-xs text-red-400/70 mt-4 text-center">If REFUTED → Lead with correction</p>
          </div>

          {/* Gate 5.5 */}
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-6 mb-6">
            <h3 className="text-xl font-mono text-gold mb-4">Gate 5.5: CATALYST FRESHNESS</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-teal/30">
                    <th className="px-4 py-2 text-left text-teal">Age</th>
                    <th className="px-4 py-2 text-left text-teal">Category</th>
                    <th className="px-4 py-2 text-left text-teal">Trade Relevance</th>
                  </tr>
                </thead>
                <tbody className="text-foreground/70">
                  <tr className="border-b border-teal/10">
                    <td className="px-4 py-2 font-mono text-green-400">&lt;24h</td>
                    <td className="px-4 py-2">BREAKING</td>
                    <td className="px-4 py-2 text-green-400">HIGH</td>
                  </tr>
                  <tr className="border-b border-teal/10">
                    <td className="px-4 py-2 font-mono text-teal">1-7d</td>
                    <td className="px-4 py-2">FRESH</td>
                    <td className="px-4 py-2 text-teal">MEDIUM</td>
                  </tr>
                  <tr className="border-b border-teal/10">
                    <td className="px-4 py-2 font-mono text-yellow-400">1-4wk</td>
                    <td className="px-4 py-2">DIGESTED</td>
                    <td className="px-4 py-2 text-yellow-400">LOW</td>
                  </tr>
                  <tr className="border-b border-teal/10">
                    <td className="px-4 py-2 font-mono text-orange-400">1-6mo</td>
                    <td className="px-4 py-2">STALE</td>
                    <td className="px-4 py-2 text-orange-400">NEAR-ZERO</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-mono text-red-400">&gt;6mo</td>
                    <td className="px-4 py-2">ANCIENT</td>
                    <td className="px-4 py-2 text-red-400">ZERO</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gate 7.5 */}
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-6">
            <h3 className="text-xl font-mono text-gold mb-4">Gate 7.5: COUNTER-THESIS</h3>
            <p className="text-foreground/70 mb-4">For ANY thesis, generate minimum 3 failure modes:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
                <p className="text-red-400 font-mono mb-2">MARKET RISK</p>
                <p className="text-xs text-foreground/60">Macro/sector killer — what external forces could destroy this thesis?</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/30 rounded p-4">
                <p className="text-orange-400 font-mono mb-2">COMPANY RISK</p>
                <p className="text-xs text-foreground/60">Company-specific killer — internal factors that could cause failure</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
                <p className="text-yellow-400 font-mono mb-2">THESIS RISK</p>
                <p className="text-xs text-foreground/60">Core assumption wrong — what if the fundamental premise is incorrect?</p>
              </div>
            </div>
          </div>
        </section>

        {/* HUNTER Protocol */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">HUNTER PROTOCOL</h2>
          <p className="text-center text-foreground/60 mb-6">6 Modules for opportunity discovery</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["H1", "Elite Investor Tracking", "Daily", "Sprott, Buffett, Ackman, Burry"],
              ["H2", "Political Catalyst Monitor", "Daily", "Policy shifts, regulations, tariffs"],
              ["H3", "Sector Momentum Scanner", "Weekly", "Rotation detection, ATH sectors"],
              ["H4", "Insider Cluster Detection", "Daily", "10b5-1 amendments, cluster buys"],
              ["H5", "Oversold Quality Screen", "Daily", "RSI + fundamentals convergence"],
              ["H6", "Contract Pipeline Tracker", "Weekly", "Defense, infrastructure awards"],
            ].map(([id, name, freq, desc]) => (
              <div key={id} className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4 hover:border-teal/50 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal font-mono">{id}</span>
                  <span className="text-xs text-gold/70 font-mono">{freq}</span>
                </div>
                <p className="text-foreground/90 font-medium text-sm mb-1">{name}</p>
                <p className="text-foreground/50 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hierarchy */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND HIERARCHY</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-8 text-center">
            <p className="text-gold text-xl font-light tracking-wider mb-4">WILLIAM (Principal) — ABSOLUTE</p>
            <p className="text-teal/50 text-2xl">↓</p>
            <p className="text-teal font-mono my-4 text-sm md:text-base">
              METATRON → HUNTER → URIEL/MICHA → COLOSSUS/HANIEL/RAZIEL → GABRIEL
            </p>
          </div>
        </section>

        {/* Killswitch */}
        <section className="mb-16">
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded p-8 text-center">
            <h2 className="text-3xl font-mono text-red-400 mb-4">⚠️ KILLSWITCH</h2>
            <p className="text-foreground/70 mb-4">
              Triggers: <code className="text-red-400 bg-red-500/10 px-2 py-1 rounded mx-1">KILLSWITCH</code>
              <code className="text-red-400 bg-red-500/10 px-2 py-1 rounded mx-1">HALT</code>
              <code className="text-red-400 bg-red-500/10 px-2 py-1 rounded mx-1">STOP ALL</code>
              <code className="text-red-400 bg-red-500/10 px-2 py-1 rounded mx-1">&gt;10% drawdown</code>
            </p>
            <p className="text-red-400/80 text-lg tracking-wider">→ HALT ALL OPERATIONS</p>
          </div>
        </section>

        {/* GitHub Link */}
        <section className="mb-12 text-center">
          <a 
            href="https://github.com/Barefootservants2/Ashes2Echoes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal/10 border border-teal/40 rounded px-6 py-3 text-teal hover:bg-teal/20 hover:border-teal/60 transition-all"
          >
            <span className="text-lg">📂</span>
            <span>Full Protocol Specification on GitHub</span>
          </a>
        </section>

        {/* Back Link */}
        <div className="text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors"
          >
            <span>←</span>
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. METATRON Protocol v7.4</p>
      </footer>
    </main>
  )
}
