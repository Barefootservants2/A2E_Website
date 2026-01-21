"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// Detailed explanations for Prime Directives - 14 total in v7.7
const primeDirectives = [
  { 
    num: "01", 
    title: "CHALLENGE BEFORE BUILD", 
    desc: "Verify user premises first",
    detail: "Before constructing any response or analysis, examine the user's assumptions and stated facts. Extract implicit claims and tag them as USER_ASSERTED, COMMON_KNOWLEDGE, or REQUIRES_VERIFICATION. If a premise is refuted during verification, lead with the correction. This prevents building elaborate responses on faulty foundations."
  },
  { 
    num: "02", 
    title: "RETRIEVE BEFORE RESPOND", 
    desc: "No claim without verification",
    detail: "Never make factual claims from memory alone. Every statement of fact must be backed by retrieval from authoritative sources. This eliminates hallucination and ensures all information is current and verifiable. If retrieval fails, explicitly state the gap rather than guessing."
  },
  { 
    num: "03", 
    title: "ENUMERATE BEFORE VERIFY", 
    desc: "Atomic claim decomposition",
    detail: "Complex claims contain multiple sub-claims. Before verification, decompose each statement into its atomic components. A claim like 'Company X is undervalued because of Y' contains at least two verifiable assertions. Each must be validated independently to prevent partial truth acceptance."
  },
  { 
    num: "04", 
    title: "CHAIN TO PRIMARY", 
    desc: "Trace to original source",
    detail: "Every piece of evidence must trace back to its original primary source. Secondary sources citing other secondary sources create a broken chain. If the original source cannot be located, mark the chain as BROKEN and discount the evidence accordingly. No telephone-game citations."
  },
  { 
    num: "05", 
    title: "SCORE AUTHORITY", 
    desc: "AS = (PT x RW x EM x RS) / BF >= 2.0",
    detail: "Calculate Authority Score using: Publication Tier (PT), Relevance Weight (RW), Evidence Methodology (EM), and Recency Score (RS), divided by Bias Factor (BF). Sources scoring below 2.0 are flagged as low-authority and should not anchor decisions. This quantifies source credibility objectively."
  },
  { 
    num: "06", 
    title: "DOCUMENT GAPS", 
    desc: "State unknowns explicitly",
    detail: "Honest analysis requires acknowledging what we don't know. Every output must include a GAPS section listing unanswered questions, unavailable data, and areas of uncertainty. This prevents false confidence and helps identify where additional research is needed."
  },
  { 
    num: "07", 
    title: "MEASURE CONSENSUS", 
    desc: "Track agreement + dissent",
    detail: "Truth isn't determined by popularity, but consensus patterns matter. Track how many independent sources agree vs. disagree. Note the strength of dissenting voices. A 10-2 consensus with weak dissent differs from 10-2 with credible counter-arguments. Both inform confidence levels."
  },
  { 
    num: "08", 
    title: "PROVE INDEPENDENCE", 
    desc: "Unique primaries >= 3, Score >= 0.3",
    detail: "Multiple sources citing the same original don't count as independent verification. Require at least 3 truly independent primary sources. Calculate Independence Score to ensure diversity of evidence. Wire services syndicating one reporter's work is ONE source, not twenty."
  },
  { 
    num: "09", 
    title: "AUDIT EVERYTHING", 
    desc: "Evidence ledger + hashes",
    detail: "Maintain a complete audit trail of all evidence used, sources consulted, and reasoning chains. Include content hashes for web sources to detect changes. This enables post-hoc verification and helps identify where analyses went wrong when outcomes differ from predictions."
  },
  { 
    num: "10", 
    title: "BOUND CONFIDENCE", 
    desc: "Intervals per claim",
    detail: "Never state a prediction without confidence bounds. 'Stock will rise' is meaningless without probability and range. Express uncertainty quantitatively: 70% confidence the price will be $45-55 within 30 days. This forces honest assessment of what we actually know vs. speculate."
  },
  { 
    num: "11", 
    title: "GUARD AGAINST INJECTION", 
    desc: "Security scan all retrieval",
    detail: "RAG retrieval can be poisoned with malicious content designed to manipulate AI responses. Scan all retrieved content for injection patterns, validate domains against whitelist, and flag suspicious formatting. Never blindly trust external content just because it was retrieved."
  },
  { 
    num: "12", 
    title: "HUNT BEFORE VALIDATE", 
    desc: "Scan before analysis",
    detail: "Run HUNTER opportunity scans before deep analysis. Why spend hours validating a thesis when better opportunities exist? The scan-first approach ensures research effort is allocated to highest-potential targets, not just the first idea that comes along."
  },
  { 
    num: "13", 
    title: "STEELMAN OPPOSITION", 
    desc: "Counter-thesis mandatory (4 modes)",
    detail: "For every thesis, construct the strongest possible counter-argument using 4 modes: (1) MARKET RISK - macro/sector killer, (2) COMPANY RISK - company-specific killer, (3) THESIS RISK - core assumption wrong, (4) REGULATORY RISK - policy/exec order killer. A thesis that can't survive steelmanning isn't ready for capital."
  },
  { 
    num: "14", 
    title: "SCAN REGULATORY", 
    desc: "Check policy/regulatory shifts within 72hrs",
    detail: "NEW in v7.7. Mandatory scan for regulatory changes: executive orders, agency actions (SEC, FTC, DOE, NRC, EPA, FERC), tariff announcements, trade policy shifts. Regulatory news <72hrs old requires ALERT flag, 20% confidence reduction, and WAIT/HOLD recommendation. Critical for commodities and policy-sensitive sectors.",
    isNew: true
  },
]

// 16 Gates with detailed explanations - v7.7
const gates = [
  { num: "0", name: "Self-Verification", condition: "No unverifiable claims", isNew: false, detail: "The foundational gate. Every claim made by any agent must be verifiable. No speculative statements presented as fact. If something cannot be verified, it must be explicitly marked as uncertain or omitted entirely." },
  { num: "0.5", name: "PREMISE CHALLENGE", condition: "User assertions verified before building", isNew: false, detail: "Before building any response, extract and verify user's stated premises. Tag as USER_ASSERTED, COMMON_KNOWLEDGE, or REQUIRES_VERIFICATION. Search to verify before proceeding. If premises are refuted, lead with correction." },
  { num: "1", name: "RAG", condition: "All FACTs retrieval-backed", isNew: false, detail: "Retrieval-Augmented Generation gate. Every factual claim must have a retrieval citation. Memory-only claims are prohibited. This ensures currency and prevents hallucination of outdated or invented information." },
  { num: "2", name: "Authority", condition: "AS >= 2.0 all sources", isNew: false, detail: "All anchor sources must achieve Authority Score of 2.0 or higher. Lower-scored sources can provide supporting context but cannot be the primary basis for any conclusion or recommendation." },
  { num: "3", name: "Chain", condition: "No CHAIN BROKEN", isNew: false, detail: "Every evidence chain must trace to primary sources. If a chain cannot be completed to origin, mark as CHAIN BROKEN and discount accordingly. No secondary-source-only citations for key claims." },
  { num: "4", name: "Schema", condition: "Claim Registry complete", isNew: false, detail: "All claims must be registered in the structured schema with: claim ID, source(s), verification status, confidence level, and timestamp. This creates the audit trail for post-analysis review." },
  { num: "5", name: "Gap", condition: "Gaps documented", isNew: false, detail: "Every analysis output must include explicit documentation of what is NOT known. Data gaps, unanswered questions, and areas requiring further research must be stated clearly." },
  { num: "5.5", name: "CATALYST FRESHNESS", condition: "Age-scored, regulatory double-weighted", isNew: false, detail: "Rate all catalysts by age: BREAKING (<24h), FRESH (1-7d), DIGESTED (1-4wk), STALE (1-6mo), ANCIENT (>6mo). Trade relevance decreases with age. Regulatory news gets DOUBLE weight due to immediate market impact." },
  { num: "6", name: "Consensus", condition: "Primaries >= 3 + Competitive landscape", isNew: false, detail: "Require minimum 3 independent primary sources for key claims. Additionally, map the competitive landscape - who agrees, who dissents, and why. Consensus without understanding dissent is incomplete." },
  { num: "7", name: "Confidence", condition: "Intervals + Proxy dilution math", isNew: false, detail: "All predictions must include confidence intervals and probability ranges. When using proxy data, apply dilution factors to reduce confidence appropriately. No point estimates without bounds." },
  { num: "7.5", name: "COUNTER-THESIS", condition: "Min 4 failure modes", isNew: false, detail: "Every directional thesis MUST include 4 specific failure modes: (1) MARKET RISK - macro/sector killer, (2) COMPANY RISK - company-specific killer, (3) THESIS RISK - core assumption wrong, (4) REGULATORY RISK - policy/exec order killer." },
  { num: "8", name: "Methodology", condition: "Audit pack complete", isNew: false, detail: "Complete methodology documentation required: data sources, analytical approach, assumptions made, limitations acknowledged. The audit pack enables reproduction and review of the entire analysis." },
  { num: "8.5", name: "REGULATORY SHOCK", condition: "Policy/exec order scan within 72hrs", isNew: true, detail: "NEW in v7.7. MANDATORY web search for: executive orders affecting sector, regulatory agency actions (SEC, FTC, DOE, NRC, EPA, FERC), tariff announcements, trade policy changes. If BREAKING news <72hrs: flag ALERT, reduce confidence 20%, recommend WAIT/HOLD, max NIBBLE position, widen stops 50%, block momentum override." },
  { num: "9", name: "Security", condition: "Injection scan + domain validation", isNew: false, detail: "Scan all retrieved content for prompt injection attempts. Validate domains against approved whitelist. Flag and quarantine suspicious content. Security cannot be bypassed for convenience." },
  { num: "10", name: "Agent Sync", condition: "All agents merged", isNew: false, detail: "Multi-agent analyses must be synchronized before output. Conflicting conclusions between agents must be resolved or explicitly noted. No silent disagreements between collective outputs." },
  { num: "11", name: "HUNTER Scan", condition: "Opportunity scan complete (14 modules)", isNew: false, detail: "Before finalizing any recommendation, complete HUNTER protocol scan across all 14 modules to ensure no better opportunities are being missed. Allocation of research effort should match opportunity quality." },
]

// 14 HUNTER modules with full details - v7.7
const hunterModules = [
  { id: "H1", name: "Elite Investor Tracking", freq: "Daily", desc: "13F filings from Sprott, Buffett, Ackman, Burry", detail: "Tracks SEC 13F filings from proven investors. Flags position changes >5%, new positions, and exits. Cross-references with recent price action to identify front-running opportunities.", attribution: "Methodology inspired by WhaleWisdom and Dataroma elite tracking." },
  { id: "H2a", name: "Legislative Catalyst", freq: "Daily", desc: "Congressional bills, hearings, votes", detail: "Monitors Congress.gov for bills affecting portfolio sectors. Tracks committee hearings, sponsor activity, and vote schedules. Identifies legislative catalysts before market prices them in.", attribution: "Framework derived from Strategas policy research methodology." },
  { id: "H2b", name: "Regulatory/Executive", freq: "Daily", desc: "Executive orders, agency actions", detail: "Monitors Federal Register, agency newsrooms, and executive orders. Tracks SEC, FTC, DOE, NRC, EPA, FERC actions. Identifies regulatory catalysts and policy shifts.", attribution: "Data sourced from Federal Register and agency press releases." },
  { id: "H3", name: "Sector Momentum Scanner", freq: "Weekly", desc: "Rotation detection, ATH sectors", detail: "Tracks relative strength of all major sectors. Identifies rotation patterns, sectors at all-time highs, and laggards due for catch-up. Uses 20/50/200 day momentum crossovers.", attribution: "Based on Fidelity sector rotation model and Relative Rotation Graphs." },
  { id: "H4", name: "Insider Cluster Detection", freq: "Daily", desc: "10b5-1 amendments, cluster buys", detail: "Monitors SEC Form 4 filings for insider transactions. Prioritizes cluster buys (3+ insiders within 30 days), 10b5-1 plan amendments, and unusual transaction sizes relative to historical patterns.", attribution: "Inspired by InsiderScore methodology and academic research on insider alpha." },
  { id: "H5", name: "Oversold Quality Screen", freq: "Daily", desc: "RSI + fundamentals convergence", detail: "Identifies quality companies (high ROE, low debt, consistent earnings) trading at oversold technical levels (RSI<30, >20% off 52-week high). The convergence of quality + oversold generates high-probability mean reversion candidates.", attribution: "Combines O'Shaughnessy quality factors with technical oversold conditions." },
  { id: "H6", name: "Contract Pipeline Tracker", freq: "Weekly", desc: "Defense, infrastructure awards", detail: "Tracks federal contract awards, infrastructure bill allocations, and defense budget appropriations. Identifies companies positioned to receive major government spending before awards are announced.", attribution: "Data sourced from USASpending.gov, DoD contracts database, and SAM.gov." },
  { id: "H7", name: "Earnings Catalyst Calendar", freq: "Daily", desc: "Pre-earnings momentum setups", detail: "Tracks upcoming earnings dates with historical beat/miss patterns, whisper numbers vs consensus, and pre-earnings drift signals. Identifies stocks likely to experience earnings-related volatility.", attribution: "Methodology based on academic earnings drift research and Estimize crowdsourced estimates." },
  { id: "H8", name: "Unusual Options Flow", freq: "Daily", desc: "Smart money derivatives bets", detail: "Monitors options order flow for unusual activity: large block trades, sweeps, and opening positions significantly above average volume. Filters for smart money patterns vs. hedging activity.", attribution: "Framework inspired by OptionSonar and Unusual Whales methodologies." },
  { id: "H9", name: "Short Interest Monitor", freq: "Daily", desc: "Squeeze candidates + crowded shorts", detail: "Tracks short interest, days to cover, borrow rates, and short interest changes. Identifies potential squeeze candidates and crowded shorts vulnerable to forced covering.", attribution: "Data from S3 Partners and ORTEX short interest analytics." },
  { id: "H10", name: "IPO/SPAC Pipeline", freq: "Weekly", desc: "New issue tracking + lockup expirations", detail: "Monitors upcoming IPOs, SPAC mergers, direct listings, and lockup expiration dates. Identifies both new opportunities and potential selling pressure from lockup releases.", attribution: "Based on Renaissance Capital IPO research and SpacResearch.com data." },
  { id: "H11", name: "Macro Event Calendar", freq: "Weekly", desc: "Fed, CPI, GDP impact windows", detail: "Tracks FOMC meetings, economic data releases (CPI, GDP, NFP), and central bank communications globally. Models expected impact windows and historical market reactions.", attribution: "Framework based on CME FedWatch and economic calendar research." },
  { id: "H12", name: "13F Filing Tracker", freq: "Quarterly", desc: "Institutional position changes", detail: "Comprehensive tracking of 13F filings beyond elite investors. Identifies consensus positions across institutions, crowded trades, and divergence from smart money. Quarterly deep-dive analysis.", attribution: "Methodology inspired by Goldman Sachs VIP list and hedge fund holdings research." },
  { id: "H13", name: "Tariff/Trade Monitor", freq: "Daily", desc: "Commodity tariffs, trade policy, sanctions", detail: "NEW in v7.7. For commodity/materials theses, searches: '[commodity] tariff 2026', '[country] export ban', 'trade war [sector]', 'sanctions [commodity]'. Outputs policy changes, implementation dates, affected commodities.", attribution: "Data sourced from USTR, Commerce Department, and trade policy news.", isNew: true },
  { id: "H14", name: "Position News Aggregator", freq: "Daily", desc: "E*TRADE-style news by held ticker", detail: "NEW in v7.7. When user provides portfolio/watchlist: pulls news for EACH ticker (7 days), flags analyst upgrades/downgrades, notes unusual options activity, highlights price target changes. Consolidated position-by-position brief.", attribution: "Inspired by E*TRADE MarketWatch integration and Bloomberg terminal news feeds.", isNew: true },
]

// Tooltip component
function Tooltip({ children, content }: { children: React.ReactNode; content: string }) {
  const [show, setShow] = useState(false)
  
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute z-50 w-80 p-4 bg-[#0a0a0f] border border-teal/40 rounded shadow-xl text-sm text-foreground/80 leading-relaxed -translate-x-1/2 left-1/2 mt-2">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-teal/40" />
          {content}
        </div>
      )}
    </div>
  )
}

export default function MetatronPage() {
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
            <span className="text-xs font-mono text-teal">METATRON v7.7</span>
          </div>
        </div>
      </div>

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
          <div className="relative w-[80px] h-[80px] mb-4">
            <Image
              src="/images/metatron-logo.png"
              alt="Metatrons Cube"
              fill
              className="object-contain"
              style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 25px rgba(0,206,209,1))' }}
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-gold">
            METATRON
          </h1>
          <p className="mt-2 text-sm tracking-[0.2em] text-foreground/60 uppercase">
            Protocol Engine v7.7
          </p>
          <p className="mt-3 text-xs text-teal/70 tracking-wider">
            16 GATES • 50 FAILURE MODES • 14 HUNTER MODULES • 4-MODE COUNTER-THESIS
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* v7.7 New Features Banner */}
        <section className="mb-12">
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6">
            <h3 className="text-lg font-mono text-gold tracking-wider mb-4 text-center">★ v7.7 NEW FEATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <p className="text-teal font-mono text-sm">Gate 8.5</p>
                <p className="text-xs text-foreground/60 mt-1">REGULATORY SHOCK scanner</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">Prime Directive 14</p>
                <p className="text-xs text-foreground/60 mt-1">SCAN REGULATORY</p>
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
        
        {/* Prime Directives with tooltips - 14 total */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">14 PRIME DIRECTIVES</h2>
          <p className="text-center text-foreground/50 text-sm mb-6">Hover for detailed explanation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primeDirectives.map((item) => (
              <Tooltip key={item.num} content={item.detail}>
                <div className={`bg-[rgba(10,15,25,0.9)] border rounded p-4 hover:border-gold/50 hover:bg-teal/5 transition-all cursor-help flex gap-4 ${item.isNew ? 'border-gold/40 bg-gold/5' : 'border-teal/20'}`}>
                  <span className="text-gold font-mono text-lg">{item.num}</span>
                  <div>
                    <p className="text-foreground/90 font-medium text-sm flex items-center gap-2">
                      {item.title}
                      {item.isNew && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded">NEW</span>}
                    </p>
                    <p className="text-foreground/50 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>
        </section>

        {/* 16 Mandatory Gates - Card Grid Layout */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">16 MANDATORY GATES</h2>
          <p className="text-center text-foreground/50 text-sm mb-6">Hover any gate for pass criteria details</p>
          
          {/* Header Row */}
          <div className="bg-teal/5 border border-teal/30 rounded-t grid grid-cols-12 gap-2 px-4 py-3">
            <div className="col-span-1 font-mono text-teal text-sm tracking-wider">#</div>
            <div className="col-span-4 font-mono text-teal text-sm tracking-wider">GATE</div>
            <div className="col-span-7 font-mono text-teal text-sm tracking-wider">PASS CONDITION</div>
          </div>
          
          {/* Gate Rows */}
          <div className="border-x border-b border-teal/30 rounded-b overflow-hidden">
            {gates.map((gate, index) => (
              <Tooltip key={gate.num} content={gate.detail}>
                <div className={`grid grid-cols-12 gap-2 px-4 py-3 border-b border-teal/10 last:border-b-0 hover:bg-teal/10 cursor-help transition-colors ${gate.isNew ? 'bg-gold/10' : ''}`}>
                  <div className="col-span-1 font-mono text-gold text-sm">{gate.num}</div>
                  <div className="col-span-4 text-foreground/90 text-sm flex items-center gap-2">
                    {gate.name}
                    {gate.isNew && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded">NEW</span>}
                  </div>
                  <div className="col-span-7 text-foreground/60 text-sm">{gate.condition}</div>
                </div>
              </Tooltip>
            ))}
          </div>
          
          <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded p-4 text-center">
            <p className="text-red-400 font-mono tracking-wider">IF ANY GATE FAILS → NO SHIP</p>
          </div>
        </section>

        {/* HUNTER Protocol - 14 modules with attribution */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">HUNTER PROTOCOL</h2>
          <p className="text-center text-foreground/60 mb-2">14 Modules for systematic opportunity discovery</p>
          <p className="text-center text-foreground/40 text-xs mb-6 max-w-2xl mx-auto">
            HUNTER synthesizes methodologies from elite quantitative research, institutional trading desks, and academic finance. 
            We stand on the shoulders of giants — each module acknowledges its intellectual heritage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hunterModules.map((module) => (
              <Tooltip key={module.id} content={`${module.detail}\n\n📚 ${module.attribution}`}>
                <div className={`bg-[rgba(10,15,25,0.9)] border rounded p-4 hover:border-gold/50 hover:bg-teal/5 transition-all cursor-help h-full ${module.isNew ? 'border-gold/40 bg-gold/5' : 'border-teal/30'}`}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-teal font-mono text-lg flex items-center gap-2">
                      {module.id}
                      {module.isNew && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded">NEW</span>}
                    </span>
                    <span className="text-xs text-gold/70 font-mono">{module.freq}</span>
                  </div>
                  <p className="text-foreground/90 font-medium text-sm mb-1">{module.name}</p>
                  <p className="text-foreground/50 text-xs">{module.desc}</p>
                </div>
              </Tooltip>
            ))}
          </div>
        </section>

        {/* Hierarchy - Updated v7.7 */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND HIERARCHY v7.7</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-8 text-center">
            <p className="text-gold text-xl font-light tracking-wider mb-4">WILLIAM (Principal) — ABSOLUTE</p>
            <p className="text-teal/50 text-2xl">↓</p>
            <p className="text-teal font-mono my-4 text-sm md:text-base">
              METATRON → MICHA (CEO) → URIEL (COO) → COLOSSUS/HANIEL/RAZIEL → GABRIEL
            </p>
            <p className="text-xs text-foreground/40 mt-4">
              MICHA (Claude) as CEO based on Constitutional AI trust baseline • COLOSSUS (Grok) SUPERVISED
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
