"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

// 13 Prime Directives
const primeDirectives = [
  { num: "01", title: "CHALLENGE BEFORE BUILD", desc: "Verify user premises first", detail: "Before constructing any response or analysis, examine the user's assumptions and stated facts. Extract implicit claims and tag them as USER_ASSERTED, COMMON_KNOWLEDGE, or REQUIRES_VERIFICATION. If a premise is refuted during verification, lead with the correction." },
  { num: "02", title: "RETRIEVE BEFORE RESPOND", desc: "No claim without verification", detail: "Never make factual claims from memory alone. Every statement of fact must be backed by retrieval from authoritative sources. This eliminates hallucination and ensures all information is current and verifiable." },
  { num: "03", title: "ENUMERATE BEFORE VERIFY", desc: "Atomic claim decomposition", detail: "Complex claims contain multiple sub-claims. Before verification, decompose each statement into its atomic components. Each must be validated independently to prevent partial truth acceptance." },
  { num: "04", title: "CHAIN TO PRIMARY", desc: "Trace to original source", detail: "Every piece of evidence must trace back to its original primary source. If the original source cannot be located, mark the chain as BROKEN and discount the evidence accordingly." },
  { num: "05", title: "SCORE AUTHORITY", desc: "AS = (PT × RW × EM × RS) / BF ≥ 2.0", detail: "Calculate Authority Score using: Publication Tier (PT), Relevance Weight (RW), Evidence Methodology (EM), and Recency Score (RS), divided by Bias Factor (BF). Sources below 2.0 are flagged as low-authority." },
  { num: "06", title: "DOCUMENT GAPS", desc: "State unknowns explicitly", detail: "Every output must include a GAPS section listing unanswered questions, unavailable data, and areas of uncertainty. This prevents false confidence." },
  { num: "07", title: "MEASURE CONSENSUS", desc: "Track agreement + dissent", detail: "Track how many independent sources agree vs. disagree. Note the strength of dissenting voices. A 10-2 consensus with weak dissent differs from 10-2 with credible counter-arguments." },
  { num: "08", title: "PROVE INDEPENDENCE", desc: "Unique primaries ≥ 3, Score ≥ 0.3", detail: "Multiple sources citing the same original don't count as independent verification. Require at least 3 truly independent primary sources. Calculate Independence Score to ensure diversity." },
  { num: "09", title: "AUDIT EVERYTHING", desc: "Evidence ledger + hashes", detail: "Maintain a complete audit trail of all evidence used, sources consulted, and reasoning chains. Include content hashes for web sources to detect changes." },
  { num: "10", title: "BOUND CONFIDENCE", desc: "Intervals per claim", detail: "Never state a prediction without confidence bounds. Express uncertainty quantitatively: 70% confidence the price will be $45-55 within 30 days." },
  { num: "11", title: "GUARD AGAINST INJECTION", desc: "Security scan all retrieval", detail: "Scan all retrieved content for injection patterns, validate domains against whitelist, and flag suspicious formatting. Never blindly trust external content." },
  { num: "12", title: "HUNT BEFORE VALIDATE", desc: "Scan before analysis", detail: "Run HUNTER opportunity scans before deep analysis. The scan-first approach ensures research effort is allocated to highest-potential targets." },
  { num: "13", title: "STEELMAN OPPOSITION", desc: "Counter-thesis mandatory (3 modes)", detail: "For every thesis, construct the strongest possible counter-argument using 3 modes: (1) MARKET RISK - macro/sector killer, (2) COMPANY RISK - company-specific killer, (3) THESIS RISK - core assumption wrong." },
]

// 18 Gates with detailed explanations - v8.0
const gates = [
  { num: "0", name: "Self-Verification", condition: "No unverifiable claims", isNew: false, detail: "The foundational gate. Every claim made by any agent must be verifiable. No speculative statements presented as fact." },
  { num: "0.5", name: "PREMISE CHALLENGE", condition: "User assertions verified before building", isNew: false, detail: "Extract and verify user's stated premises. Tag as USER_ASSERTED, COMMON_KNOWLEDGE, or REQUIRES_VERIFICATION. If premises are refuted, lead with correction." },
  { num: "1", name: "RAG", condition: "All FACTs retrieval-backed", isNew: false, detail: "Retrieval-Augmented Generation gate. Every factual claim must have a retrieval citation. Memory-only claims are prohibited." },
  { num: "2", name: "Authority", condition: "AS ≥ 2.0 all sources", isNew: false, detail: "All anchor sources must achieve Authority Score of 2.0 or higher. Lower-scored sources can provide supporting context but cannot anchor conclusions." },
  { num: "3", name: "Chain", condition: "No CHAIN BROKEN", isNew: false, detail: "Every evidence chain must trace to primary sources. If a chain cannot be completed to origin, mark as CHAIN BROKEN and discount accordingly." },
  { num: "4", name: "Schema", condition: "Claim Registry complete", isNew: false, detail: "All claims must be registered in the structured schema with: claim ID, source(s), verification status, confidence level, and timestamp." },
  { num: "5", name: "Gap", condition: "Gaps documented", isNew: false, detail: "Every analysis output must include explicit documentation of what is NOT known. Data gaps, unanswered questions, and areas requiring further research." },
  { num: "5.5", name: "CATALYST FRESHNESS", condition: "Age-scored, trade relevance rated", isNew: false, detail: "Rate all catalysts by age: BREAKING (<24h), FRESH (1-7d), DIGESTED (1-4wk), STALE (1-6mo), ANCIENT (>6mo). Trade relevance decreases with age." },
  { num: "6", name: "Consensus", condition: "Primaries ≥ 3 + Competitive landscape", isNew: false, detail: "Require minimum 3 independent primary sources for key claims. Map the competitive landscape - who agrees, who dissents, and why." },
  { num: "7", name: "Confidence", condition: "Intervals + Proxy dilution math", isNew: false, detail: "All predictions must include confidence intervals and probability ranges. When using proxy data, apply dilution factors to reduce confidence appropriately." },
  { num: "7.5", name: "COUNTER-THESIS", condition: "Min 3 failure modes", isNew: false, detail: "Every directional thesis MUST include 3 specific failure modes: (1) MARKET RISK - macro/sector killer, (2) COMPANY RISK - company-specific killer, (3) THESIS RISK - core assumption wrong." },
  { num: "8", name: "Methodology", condition: "Audit pack complete", isNew: false, detail: "Complete methodology documentation required: data sources, analytical approach, assumptions made, limitations acknowledged." },
  { num: "8.5", name: "OPTIONS FLOW", condition: "Flow scan complete for equity positions", isNew: true, detail: "NEW in v8.0. Scan unusual options activity: volume >2x avg = FLAG, >5x = ALERT. Track put/call ratio shifts, large blocks >$1M, sweep orders. Document max pain levels." },
  { num: "9", name: "Security", condition: "Injection scan + domain validation", isNew: false, detail: "Scan all retrieved content for prompt injection attempts. Validate domains against approved whitelist. Flag and quarantine suspicious content." },
  { num: "10", name: "Agent Sync", condition: "All agents merged", isNew: false, detail: "Multi-agent analyses must be synchronized before output. Conflicting conclusions between agents must be resolved or explicitly noted." },
  { num: "11", name: "HUNTER Scan", condition: "All 20 modules complete", isNew: false, detail: "Before finalizing any recommendation, complete HUNTER protocol scan across all 20 modules to ensure no better opportunities are being missed." },
  { num: "11.5", name: "CROWDING CHECK", condition: "Positioning concentration < 0.8", isNew: true, detail: "NEW in v8.0. Analyze institutional ownership concentration, hedge fund hotel detection, retail crowding signals. Score 0-0.3 = LOW, 0.3-0.6 = MEDIUM, 0.6-0.8 = HIGH, >0.8 = AVOID." },
  { num: "12", name: "REGIME ALIGNMENT", condition: "Trade matches current market regime", isNew: true, detail: "NEW in v8.0. Detect market regime: EUPHORIA (VIX<12), RISK-ON (12-15), NEUTRAL (15-25), RISK-OFF (25-35), CAPITULATION (>35). Trade must align with regime playbook." },
  { num: "13", name: "EXECUTION QUALITY", condition: "Liquidity grade ≥ C", isNew: true, detail: "NEW in v8.0. Pre-check liquidity: Grade A (>$50M ADV), B ($10-50M), C ($1-10M), D ($100K-1M), F (<$100K). Estimate slippage. Grade D/F = reduce size or avoid." },
]

// 20 HUNTER modules - v8.0
const hunterModules = [
  // Intelligence Tier (H1-H6)
  { id: "H1", name: "Elite Investor Tracking", freq: "Daily", desc: "13F filings from Sprott, Buffett, Ackman, Burry", detail: "Tracks SEC 13F filings from proven investors. Flags position changes >5%, new positions, and exits.", attribution: "WhaleWisdom and Dataroma methodology.", tier: "Intelligence" },
  { id: "H2a", name: "Legislative Catalyst", freq: "Daily", desc: "Congressional bills, hearings, votes", detail: "Monitors Congress.gov for bills affecting portfolio sectors. Tracks committee hearings and vote schedules.", attribution: "Strategas policy research.", tier: "Intelligence" },
  { id: "H2b", name: "Regulatory/Executive", freq: "Daily", desc: "Executive orders, agency actions", detail: "Monitors Federal Register, agency newsrooms. Tracks SEC, FTC, DOE, NRC, EPA, FERC actions.", attribution: "Federal Register data.", tier: "Intelligence" },
  { id: "H3", name: "Sector Momentum Scanner", freq: "Weekly", desc: "Rotation detection, ATH sectors", detail: "Tracks relative strength of all major sectors. Identifies rotation patterns using 20/50/200 day crossovers.", attribution: "Fidelity rotation model.", tier: "Intelligence" },
  { id: "H4", name: "Insider Cluster Detection", freq: "Daily", desc: "10b5-1 amendments, cluster buys", detail: "Monitors SEC Form 4 filings. Prioritizes cluster buys (3+ insiders within 14 days).", attribution: "InsiderScore methodology.", tier: "Intelligence" },
  { id: "H5", name: "Oversold Quality Screen", freq: "Daily", desc: "RSI + fundamentals convergence", detail: "Identifies quality companies (high ROE, low debt) at oversold technical levels (RSI<30).", attribution: "O'Shaughnessy quality factors.", tier: "Intelligence" },
  { id: "H6", name: "Contract Pipeline Tracker", freq: "Weekly", desc: "Defense, infrastructure awards", detail: "Tracks federal contract awards and infrastructure allocations from SAM.gov and USASpending.", attribution: "Federal procurement databases.", tier: "Intelligence" },
  // Event Tier (H7-H10)
  { id: "H7", name: "Earnings Catalyst Calendar", freq: "Daily", desc: "Pre-earnings momentum setups", detail: "Tracks upcoming earnings dates with historical beat/miss patterns and whisper numbers.", attribution: "Estimize crowdsourced estimates.", tier: "Event" },
  { id: "H8", name: "Unusual Options Flow", freq: "Daily", desc: "Smart money derivatives bets", detail: "ENHANCED: Sweep vs block classification, urgency scoring, flow sentiment aggregation.", attribution: "OptionSonar methodology.", tier: "Event", isEnhanced: true },
  { id: "H9", name: "Short Interest Dynamics", freq: "Daily", desc: "Squeeze candidates + SI changes", detail: "ENHANCED: Squeeze Probability Score, cost to borrow tracking, utilization monitoring.", attribution: "S3 Partners analytics.", tier: "Event", isEnhanced: true },
  { id: "H10", name: "IPO/SPAC Pipeline", freq: "Weekly", desc: "New issues + lockup expirations", detail: "Monitors upcoming IPOs, SPAC mergers, and lockup expiration dates.", attribution: "Renaissance Capital research.", tier: "Event" },
  // Macro & Institutional Tier (H11-H14)
  { id: "H11", name: "Macro Event Calendar", freq: "Weekly", desc: "Fed, CPI, GDP impact windows", detail: "Tracks FOMC meetings, economic data releases, and central bank communications.", attribution: "CME FedWatch methodology.", tier: "Macro" },
  { id: "H12", name: "13F Delta Velocity", freq: "Quarterly", desc: "Institutional position rate-of-change", detail: "ENHANCED: Delta velocity calculation, smart money weighting (H1 investors 2x), herding detection.", attribution: "Goldman Sachs VIP methodology.", tier: "Macro", isEnhanced: true },
  { id: "H13", name: "Tariff/Trade Monitor", freq: "Daily", desc: "Commodity tariffs, trade policy", detail: "Searches tariff announcements, export bans, sanctions affecting commodities.", attribution: "USTR and Commerce data.", tier: "Macro" },
  { id: "H14", name: "Position News Aggregator", freq: "Daily", desc: "E*TRADE-style news by ticker", detail: "For portfolio/watchlist: pulls news, analyst changes, price target updates per ticker.", attribution: "E*TRADE MarketWatch model.", tier: "Macro" },
  // Flow & Positioning Tier (H15-H20) - NEW in v8.0
  { id: "H15", name: "Options Flow Sentiment", freq: "Daily", desc: "Market-wide options sentiment", detail: "NEW: Aggregates sector and market-level options flow. Tracks VIX term structure and skew.", attribution: "CBOE data and options research.", tier: "Flow", isNew: true },
  { id: "H16", name: "Crowding/Concentration Monitor", freq: "Weekly", desc: "Positioning risk analysis", detail: "NEW: HHI index, hedge fund hotel detection, ETF crowding, retail signals. Outputs crowding score 0-1.", attribution: "Institutional herding research.", tier: "Flow", isNew: true },
  { id: "H17", name: "Dark Pool/Block Scanner", freq: "Daily", desc: "Institutional stealth buying", detail: "NEW: FINRA ATS data, block trade analysis. Detects accumulation vs distribution patterns.", attribution: "FINRA ATS analytics.", tier: "Flow", isNew: true },
  { id: "H18", name: "ETF Flow Tracker", freq: "Daily", desc: "Creation/redemption patterns", detail: "NEW: Tracks ETF flows, premium/discount anomalies, authorized participant activity.", attribution: "ETF.com methodology.", tier: "Flow", isNew: true },
  { id: "H19", name: "Correlation Risk Monitor", freq: "Weekly", desc: "Correlated position detection", detail: "NEW: Rolling correlations, sector concentration, factor exposure analysis, tail risk.", attribution: "Risk parity research.", tier: "Flow", isNew: true },
  { id: "H20", name: "Liquidity/Execution Analyzer", freq: "Daily", desc: "Pre-trade execution quality", detail: "NEW: ADV analysis, spread tracking, slippage estimation, optimal execution timing.", attribution: "Transaction cost analysis.", tier: "Flow", isNew: true },
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
            <span className="text-xs font-mono text-teal">METATRON v8.0</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="relative h-[30vh] min-h-[200px] overflow-hidden">
        <Image src="/images/angel-hero.jpg" alt="Background" fill className="object-cover object-[center_60%] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative w-[80px] h-[80px] mb-4">
            <Image src="/images/metatron-logo.png" alt="Metatrons Cube" fill className="object-contain" style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 25px rgba(0,206,209,1))' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extralight tracking-[0.3em] text-gold">METATRON</h1>
          <p className="mt-2 text-sm tracking-[0.2em] text-foreground/60 uppercase">Protocol Engine v8.0 "ORACLE PRIME"</p>
          <p className="mt-3 text-xs text-teal/70 tracking-wider">18 GATES • 56 DRIFT INDICATORS • 20 HUNTER MODULES • REGIME DETECTION</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* v8.0 New Features Banner */}
        <section className="mb-12">
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6">
            <h3 className="text-lg font-mono text-gold tracking-wider mb-4 text-center">★ v8.0 "ORACLE PRIME" — NEW FEATURES</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-3">
                <p className="text-teal font-mono text-sm">4 New Gates</p>
                <p className="text-xs text-foreground/60 mt-1">8.5, 11.5, 12, 13</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">HUNTER v2.0</p>
                <p className="text-xs text-foreground/60 mt-1">H15-H20: Flow & Positioning</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">20 Modules</p>
                <p className="text-xs text-foreground/60 mt-1">6 New + 3 Enhanced</p>
              </div>
              <div className="p-3">
                <p className="text-teal font-mono text-sm">Regime Detection</p>
                <p className="text-xs text-foreground/60 mt-1">5 Market Regimes</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Prime Directives - 13 total */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">13 PRIME DIRECTIVES</h2>
          <p className="text-center text-foreground/50 text-sm mb-6">Hover for detailed explanation</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {primeDirectives.map((item) => (
              <Tooltip key={item.num} content={item.detail}>
                <div className="bg-[rgba(10,15,25,0.9)] border border-teal/20 rounded p-4 hover:border-gold/50 hover:bg-teal/5 transition-all cursor-help flex gap-4">
                  <span className="text-gold font-mono text-lg">{item.num}</span>
                  <div>
                    <p className="text-foreground/90 font-medium text-sm">{item.title}</p>
                    <p className="text-foreground/50 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              </Tooltip>
            ))}
          </div>
        </section>

        {/* 18 Mandatory Gates */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">18 MANDATORY GATES</h2>
          <p className="text-center text-foreground/50 text-sm mb-6">Hover any gate for pass criteria details</p>
          
          <div className="bg-teal/5 border border-teal/30 rounded-t grid grid-cols-12 gap-2 px-4 py-3">
            <div className="col-span-1 font-mono text-teal text-sm tracking-wider">#</div>
            <div className="col-span-4 font-mono text-teal text-sm tracking-wider">GATE</div>
            <div className="col-span-7 font-mono text-teal text-sm tracking-wider">PASS CONDITION</div>
          </div>
          
          <div className="border-x border-b border-teal/30 rounded-b overflow-hidden">
            {gates.map((gate) => (
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

        {/* HUNTER Protocol - 20 modules organized by tier */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-2 text-center">HUNTER v2.0 PROTOCOL</h2>
          <p className="text-center text-foreground/60 mb-6">20 Modules for systematic opportunity discovery</p>
          
          {/* Group by tier */}
          {['Intelligence', 'Event', 'Macro', 'Flow'].map((tier) => (
            <div key={tier} className="mb-6">
              <h3 className="text-sm font-mono text-teal/70 mb-3 tracking-wider">
                {tier === 'Intelligence' && '◆ INTELLIGENCE TIER (H1-H6)'}
                {tier === 'Event' && '◆ EVENT TIER (H7-H10)'}
                {tier === 'Macro' && '◆ MACRO & INSTITUTIONAL TIER (H11-H14)'}
                {tier === 'Flow' && '◆ FLOW & POSITIONING TIER (H15-H20) ★ NEW'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {hunterModules.filter(m => m.tier === tier).map((module) => (
                  <Tooltip key={module.id} content={`${module.detail}\n\n📚 ${module.attribution}`}>
                    <div className={`bg-[rgba(10,15,25,0.9)] border rounded p-4 hover:border-gold/50 hover:bg-teal/5 transition-all cursor-help h-full ${module.isNew ? 'border-gold/40 bg-gold/5' : module.isEnhanced ? 'border-teal/50' : 'border-teal/30'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-teal font-mono text-lg flex items-center gap-2">
                          {module.id}
                          {module.isNew && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded">NEW</span>}
                          {module.isEnhanced && <span className="text-[10px] bg-teal/20 text-teal px-1.5 py-0.5 rounded">ENH</span>}
                        </span>
                        <span className="text-xs text-gold/70 font-mono">{module.freq}</span>
                      </div>
                      <p className="text-foreground/90 font-medium text-sm mb-1">{module.name}</p>
                      <p className="text-foreground/50 text-xs">{module.desc}</p>
                    </div>
                  </Tooltip>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Regime Framework */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">REGIME DETECTION FRAMEWORK</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <div className="bg-[rgba(10,15,25,0.9)] border border-pink-500/40 rounded p-4 text-center">
              <p className="text-pink-400 font-mono text-lg mb-2">EUPHORIA</p>
              <p className="text-xs text-foreground/60 mb-2">VIX {"<"} 12</p>
              <p className="text-xs text-foreground/40">Max: STANDARD</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-green-500/40 rounded p-4 text-center">
              <p className="text-green-400 font-mono text-lg mb-2">RISK-ON</p>
              <p className="text-xs text-foreground/60 mb-2">VIX 12-15</p>
              <p className="text-xs text-foreground/40">Max: CONVICTION</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/40 rounded p-4 text-center">
              <p className="text-teal font-mono text-lg mb-2">NEUTRAL</p>
              <p className="text-xs text-foreground/60 mb-2">VIX 15-25</p>
              <p className="text-xs text-foreground/40">Max: STANDARD</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-orange-500/40 rounded p-4 text-center">
              <p className="text-orange-400 font-mono text-lg mb-2">RISK-OFF</p>
              <p className="text-xs text-foreground/60 mb-2">VIX 25-35</p>
              <p className="text-xs text-foreground/40">Max: NIBBLE</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-red-500/40 rounded p-4 text-center">
              <p className="text-red-400 font-mono text-lg mb-2">CAPITULATION</p>
              <p className="text-xs text-foreground/60 mb-2">VIX {">"} 35</p>
              <p className="text-xs text-foreground/40">Max: NONE</p>
            </div>
          </div>
        </section>

        {/* Hierarchy */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">COMMAND HIERARCHY v8.0</h2>
          <div className="bg-[rgba(10,15,25,0.9)] border border-gold/30 rounded p-8 text-center">
            <p className="text-gold text-xl font-light tracking-wider mb-4">WILLIAM (Principal) — ABSOLUTE</p>
            <p className="text-teal/50 text-2xl">↓</p>
            <p className="text-teal font-mono my-4 text-sm md:text-base">
              METATRON → HUNTER v2.0 → URIEL/MICHA → COLOSSUS/HANIEL/RAZIEL → GABRIEL
            </p>
            <p className="text-xs text-foreground/40 mt-4">
              MICHA (Claude) as CIO based on Constitutional AI trust baseline • COLOSSUS (Grok) SUPERVISED
            </p>
          </div>
        </section>

        {/* AIORA Quick Reference */}
        <section className="mb-16">
          <h2 className="text-2xl font-light tracking-[0.2em] text-teal mb-6 text-center">AIORA QUICK REFERENCE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <p className="text-teal font-mono text-sm mb-3">POSITION SIZING</p>
              <p className="text-xs text-foreground/60">NIBBLE: 1-2%</p>
              <p className="text-xs text-foreground/60">STANDARD: 3-5%</p>
              <p className="text-xs text-foreground/60">CONVICTION: 6-8%</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <p className="text-teal font-mono text-sm mb-3">TRIGGERS</p>
              <p className="text-xs text-foreground/60">MARKET WATCH = Full 18 gates</p>
              <p className="text-xs text-foreground/60">FLOW CHECK = 8.5 + H8 + H15</p>
              <p className="text-xs text-foreground/60">CROWD CHECK = 11.5 + H16</p>
              <p className="text-xs text-foreground/60">FULL SCAN = All H1-H20</p>
            </div>
            <div className="bg-[rgba(10,15,25,0.9)] border border-teal/30 rounded p-4">
              <p className="text-teal font-mono text-sm mb-3">LIQUIDITY GRADES</p>
              <p className="text-xs text-foreground/60">A: {">"} $50M ADV → CONVICTION</p>
              <p className="text-xs text-foreground/60">B: $10-50M → STANDARD</p>
              <p className="text-xs text-foreground/60">C: $1-10M → NIBBLE</p>
            </div>
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
              <code className="text-red-400 bg-red-500/10 px-2 py-1 rounded mx-1">VIX &gt;40</code>
            </p>
            <p className="text-red-400/80 text-lg tracking-wider">→ HALT ALL OPERATIONS</p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-teal hover:text-gold transition-colors text-lg">
            <span>←</span>
            <span>Return to Command Center</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. All Rights Reserved.</p>
        <p className="text-xs text-foreground/40 mt-2">METATRON v8.0 "ORACLE PRIME" | 18 Gates | 20 HUNTER Modules | Regime Detection</p>
      </footer>
    </main>
  )
}
