import Link from "next/link"
import Image from "next/image"

const primeDirectives = [
  { num: "01", title: "CHALLENGE BEFORE BUILD", desc: "Verify user premises first" },
  { num: "02", title: "RETRIEVE BEFORE RESPOND", desc: "No claim without verification" },
  { num: "03", title: "ENUMERATE BEFORE VERIFY", desc: "Atomic claim decomposition" },
  { num: "04", title: "CHAIN TO PRIMARY", desc: "Trace to original source" },
  { num: "05", title: "SCORE AUTHORITY", desc: "AS = (PT x RW x EM x RS) / BF >= 2.0" },
  { num: "06", title: "DOCUMENT GAPS", desc: "State unknowns explicitly" },
  { num: "07", title: "MEASURE CONSENSUS", desc: "Track agreement + dissent" },
  { num: "08", title: "PROVE INDEPENDENCE", desc: "Unique primaries >= 3, Score >= 0.3" },
  { num: "09", title: "AUDIT EVERYTHING", desc: "Evidence ledger + hashes" },
  { num: "10", title: "BOUND CONFIDENCE", desc: "Intervals per claim" },
  { num: "11", title: "GUARD AGAINST INJECTION", desc: "Security scan all retrieval" },
  { num: "12", title: "HUNT BEFORE VALIDATE", desc: "Scan before analysis" },
  { num: "13", title: "STEELMAN OPPOSITION", desc: "Counter-thesis mandatory" },
]

const gates = [
  { num: "0", name: "Self-Verification", condition: "No unverifiable claims", isNew: false },
  { num: "0.5", name: "PREMISE CHALLENGE", condition: "User assertions verified before building", isNew: true },
  { num: "1", name: "RAG", condition: "All FACTs retrieval-backed", isNew: false },
  { num: "2", name: "Authority", condition: "AS >= 2.0 all sources", isNew: false },
  { num: "3", name: "Chain", condition: "No CHAIN BROKEN", isNew: false },
  { num: "4", name: "Schema", condition: "Claim Registry complete", isNew: false },
  { num: "5", name: "Gap", condition: "Gaps documented", isNew: false },
  { num: "5.5", name: "CATALYST FRESHNESS", condition: "Age-scored, trade relevance rated", isNew: true },
  { num: "6", name: "Consensus", condition: "Primaries >= 3 + Competitive landscape", isNew: false },
  { num: "7", name: "Confidence", condition: "Intervals + Proxy dilution math", isNew: false },
  { num: "7.5", name: "COUNTER-THESIS", condition: "Min 3 failure modes", isNew: true },
  { num: "8", name: "Methodology", condition: "Audit pack complete", isNew: false },
  { num: "9", name: "Security", condition: "Injection scan + domain validation", isNew: false },
  { num: "10", name: "Agent Sync", condition: "All agents merged", isNew: false },
  { num: "11", name: "HUNTER Scan", condition: "Opportunity scan complete", isNew: false },
]

const hunterModules = [
  { id: "H1", name: "Elite Investor Tracking", freq: "Daily", desc: "Sprott, Buffett, Ackman, Burry" },
  { id: "H2", name: "Political Catalyst Monitor", freq: "Daily", desc: "Policy shifts, regulations, tariffs" },
  { id: "H3", name: "Sector Momentum Scanner", freq: "Weekly", desc: "Rotation detection, ATH sectors" },
  { id: "H4", name: "Insider Cluster Detection", freq: "Daily", desc: "10b5-1 amendments, cluster buys" },
  { id: "H5", name: "Oversold Quality Screen", freq: "Daily", desc: "RSI + fundamentals convergence" },
  { id: "H6", name: "Contract Pipeline Tracker", freq: "Weekly", desc: "Defense, infrastructure awards" },
]

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
          <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            METATRON
          </h1>
          <p className="mt-2 text-sm md:text-base tracking-[0.2em] text-foreground/60 uppercase">
            Protocol Engine v7.4
          </p>
          <p className="mt-4 text-xs text-teal/70 tracking-wider">
            14 GATES - 36 FAILURE MODES - HUNTER PROTOCOL
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Prime Directives */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">PRIME DIRECTIVES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primeDirectives.map((item) => (
              <div key={item.num} className="bg-[rgba(10,15,25,0.9)] border border-teal/20 rounded p-4 hover:border-teal/40 transition-all flex gap-4">
                <span className="text-gold font-mono text-lg">{item.num}</span>
                <div>
                  <p className="text-foreground/90 font-medium text-sm">{item.title}</p>
                  <p className="text-foreground/50 text-xs mt-1">{item.desc}</p>
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
                {gates.map((gate) => (
                  <tr key={gate.num} className={`border-b border-teal/10 hover:bg-teal/5 ${gate.isNew ? 'bg-gold/5' : ''}`}>
                    <td className="px-4 py-3 font-mono text-gold">{gate.num}</td>
                    <td className="px-4 py-3 text-foreground/90">{gate.name}</td>
                    <td className="px-4 py-3 text-foreground/60">{gate.condition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
            <p className="text-red-400 font-mono tracking-wider">IF ANY GATE FAILS - NO SHIP</p>
          </div>
        </section>

        {/* HUNTER Protocol */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">HUNTER PROTOCOL</h2>
          <p className="text-center text-foreground/60 mb-6">6 Modules for opportunity discovery</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hunterModules.map((module) => (
              <div key={module.id} className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4 hover:border-teal/50 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-teal font-mono">{module.id}</span>
                  <span className="text-xs text-gold/70 font-mono">{module.freq}</span>
                </div>
                <p className="text-foreground/90 font-medium text-sm mb-1">{module.name}</p>
                <p className="text-foreground/50 text-xs">{module.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Hierarchy */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND HIERARCHY</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-8 text-center">
            <p className="text-gold text-xl font-light tracking-wider mb-4">WILLIAM (Principal) - ABSOLUTE</p>
            <p className="text-teal/50 text-2xl">↓</p>
            <p className="text-teal font-mono my-4 text-sm md:text-base">
              METATRON → HUNTER → URIEL/MICHA → COLOSSUS/HANIEL/RAZIEL → GABRIEL
            </p>
          </div>
        </section>

        {/* Killswitch */}
        <section className="mb-16">
          <div className="bg-red-500/10 border-2 border-red-500/50 rounded p-8 text-center">
            <h2 className="text-3xl font-mono text-red-400 mb-4">KILLSWITCH</h2>
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
