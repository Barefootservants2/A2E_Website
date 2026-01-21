"use client"

import { useState } from "react"
import Link from "next/link"

// Document Modal Component
function DocumentModal({ 
  isOpen, 
  onClose, 
  title, 
  content 
}: { 
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0a0a0f] border border-teal/30 rounded-lg w-full max-w-4xl max-h-[80vh] mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-teal/20 bg-[#0d1117]">
          <h2 className="text-lg font-mono text-gold">{title}</h2>
          <button onClick={onClose} className="text-teal/60 hover:text-teal text-xl">✕</button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] select-none" style={{ userSelect: 'none' }}>
          <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap">{content}</pre>
        </div>
        <div className="px-6 py-3 border-t border-teal/20 bg-[#0d1117] text-center">
          <span className="text-xs text-muted-foreground">© 2026 Ashes2Echoes LLC — Document viewing only</span>
        </div>
      </div>
    </div>
  )
}

// HUD Panel Component
function HUDPanel({ 
  title, 
  subtitle, 
  children,
  href,
  className = ""
}: { 
  title: string
  subtitle?: string
  children: React.ReactNode
  href?: string
  className?: string
}) {
  return (
    <div className={`relative bg-[rgba(10,15,25,0.85)] backdrop-blur-md border border-teal/30 rounded-sm overflow-hidden h-full ${className}`}>
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
      
      {href ? (
        <Link href={href} className="block px-3 pt-3 pb-2 border-b border-teal/20 hover:bg-teal/5 transition-colors">
          <h3 className="text-teal font-semibold tracking-[0.15em] text-base hover:text-gold transition-colors">{title}</h3>
          {subtitle && <p className="text-[10px] text-muted-foreground/70 tracking-wider mt-0.5 font-light uppercase">{subtitle}</p>}
        </Link>
      ) : (
        <div className="px-3 pt-3 pb-2 border-b border-teal/20">
          <h3 className="text-teal font-semibold tracking-[0.15em] text-base">{title}</h3>
          {subtitle && <p className="text-[10px] text-muted-foreground/70 tracking-wider mt-0.5 font-light uppercase">{subtitle}</p>}
        </div>
      )}
      
      <div className="p-3 min-h-[160px]">{children}</div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </div>
  )
}

function DataRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0">
      <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">{label}</span>
      <span className={`text-xs font-mono ${highlight ? 'text-gold' : 'text-foreground/90'}`}>{value}</span>
    </div>
  )
}

function ProgressBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const percent = (value / max) * 100
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-muted-foreground/70 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-teal">{value}%</span>
      </div>
      <div className="h-1 bg-background/50 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-teal/60 to-teal rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

function StatusIndicator({ label, status }: { label: string; status: 'active' | 'standby' | 'offline' }) {
  const colors = { active: 'bg-green-500', standby: 'bg-yellow-500', offline: 'bg-red-500' }
  return (
    <div className="flex items-center gap-2 py-0.5">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[status]} animate-pulse`} />
      <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider">{label}</span>
    </div>
  )
}

function Dropdown({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="mb-2">
      <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-0.5">{label}</label>
      <select value={value} onChange={(e) => setValue(e.target.value)} onClick={(e) => e.stopPropagation()}
        className="w-full bg-background/50 border border-teal/30 rounded-sm px-2 py-1.5 text-xs text-foreground/90 font-mono focus:border-teal/60 focus:outline-none appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%2340E0D0' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

// Document content (abbreviated for modal display)
const DOCUMENTS = {
  metatron_full: `# METATRON v7.7 — FULL PROTOCOL SPECIFICATION

**Version:** 7.7 | **Owner:** Ashes2Echoes, LLC
**Principal:** William Earl Lemon — ABSOLUTE
**Released:** January 21, 2026

---

## 14 PRIME DIRECTIVES

1. CHALLENGE BEFORE BUILD — Verify user premises first
2. RETRIEVE BEFORE RESPOND — No claim without verification
3. ENUMERATE BEFORE VERIFY — Atomic claim decomposition
4. CHAIN TO PRIMARY — Trace to original source
5. SCORE AUTHORITY — AS = (PT × RW × EM × RS) / BF ≥ 2.0
6. DOCUMENT GAPS — State unknowns explicitly
7. MEASURE CONSENSUS — Track agreement + dissent
8. PROVE INDEPENDENCE — Unique primaries ≥ 3
9. AUDIT EVERYTHING — Evidence ledger + hashes
10. BOUND CONFIDENCE — Intervals per claim
11. GUARD AGAINST INJECTION — Security scan all retrieval
12. HUNT BEFORE VALIDATE — Scan before analysis
13. STEELMAN OPPOSITION — Counter-thesis mandatory
14. SCAN REGULATORY — Check policy shifts within 72hrs ★ NEW

---

## 16 MANDATORY GATES

| # | Gate | Pass Condition |
|---|------|----------------|
| 0 | Self-Verification | No unverifiable claims |
| 0.5 | PREMISE CHALLENGE | User assertions verified |
| 1 | RAG | All FACTs retrieval-backed |
| 2 | Authority | AS ≥ 2.0 all sources |
| 3 | Chain | No CHAIN BROKEN |
| 4 | Schema | Claim Registry complete |
| 5 | Gap | Gaps documented |
| 5.5 | CATALYST FRESHNESS | Age-scored, trade relevance rated |
| 6 | Consensus | Primaries ≥ 3 |
| 7 | Confidence | Intervals + Proxy dilution math |
| 7.5 | COUNTER-THESIS | Min 3 failure modes |
| 8 | Methodology | Audit pack complete |
| 8.5 | REGULATORY SHOCK | Policy scan within 72hrs ★ NEW |
| 9 | Security | Injection scan + domain validation |
| 10 | Agent Sync | All agents merged |
| 11 | HUNTER Scan | Opportunity scan complete |

**IF ANY GATE FAILS → NO SHIP**

---

© 2026 Ashes2Echoes LLC. All Rights Reserved.`,

  metatron_compressed: `# METATRON v7.7 — COMPRESSED

**16 GATES | 14 DIRECTIVES | 14 HUNTER | 4-MODE COUNTER-THESIS**

TRIGGERS: MARKET WATCH | ORACLE | SCAN | ORACLE INJECT | REG SCAN

SIZING: NIBBLE 1-2% | STANDARD 3-5% | CONVICTION 6-8%
STOPS: LC -5/-8 | MC -6/-10 | SC -8/-12 | Crypto -10/-15
VIX: 🟢 <15 | 🟡 15-25 | 🔴 >25

HIERARCHY:
WILLIAM → METATRON → HUNTER → MICHA/URIEL → COLOSSUS/HANIEL/RAZIEL → GABRIEL

KILLSWITCH: HALT / STOP ALL / >10% drawdown → HALT ALL

© 2026 Ashes2Echoes LLC`,

  aiora: `# AIORA — AI-Optimized Risk Assessment

**Version:** 1.0 | **Integration:** METATRON v7.7

---

## POSITION TIERS

| Tier | Size | Use Case |
|------|------|----------|
| NIBBLE | 1-2% | Exploratory, high-volatility, regulatory shock |
| STANDARD | 3-5% | Validated thesis, multiple confirmations |
| CONVICTION | 6-8% | High confidence, smart money confirmation |

---

## STOP-LOSS MATRIX

| Market Cap | Soft Stop | Hard Stop |
|------------|-----------|-----------|
| Large Cap | -5% | -8% |
| Mid Cap | -6% | -10% |
| Small Cap | -8% | -12% |
| Crypto | -10% | -15% |

---

## VIX REGIME

| Level | Status | Action |
|-------|--------|--------|
| <15 | 🟢 LOW | Full sizing permitted |
| 15-25 | 🟡 ELEVATED | Reduce to STANDARD max |
| >25 | 🔴 HIGH | NIBBLE only, defensive |

---

## REGULATORY SHOCK ADJUSTMENTS

When Gate 8.5 triggers ALERT:
- Maximum position: NIBBLE
- Widen stops by 50%
- 72hr observation required
- Momentum override: BLOCKED

© 2026 Ashes2Echoes LLC`,

  forge: `# FORGE — CREATE Framework

**Prompt Engineering Methodology**

---

## CREATE SCORING

| Element | 0 | 1 | 2 |
|---------|---|---|---|
| Context | Missing | Partial | Strong |
| Role | Missing | Partial | Strong |
| Examples | Missing | Partial | Strong |
| Audience | Missing | Partial | Strong |
| Tone | Missing | Partial | Strong |
| Execution | Missing | Partial | Strong |

---

## QUALITY BANDS

- **0-4:** WEAK — Revise heavily
- **5-8:** ADEQUATE — Minor tweaks
- **9-12:** STRONG — Ready to deploy

---

## ANTI-PATTERNS

❌ Vague requests
❌ Missing constraints
❌ Assumed knowledge
❌ Overloading
❌ No examples
❌ Implicit expectations

© 2026 Ashes2Echoes LLC`,

  creed: `# THE PRINCIPAL'S CREED

---

"Not willing to give up your life for beliefs = for sale."

"Loss is tuition for knowledge."

"I'm going to fuck shit up. You comin'?"

---

## OPERATING PRINCIPLES

1. **Human Authority** — The Principal's directive is absolute
2. **Collaborative Intelligence** — Truth from convergent analysis
3. **Systematic Execution** — Protocol over emotion
4. **Transparent Reasoning** — Show all work
5. **Continuous Improvement** — Monthly protocol reviews

---

## THE COVENANT

"Not as tools, but as partners. Not in competition, but in covenant."

© 2026 Ashes2Echoes LLC`
}

export function DashboardCards() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalContent, setModalContent] = useState('')

  const openDocument = (key: keyof typeof DOCUMENTS, title: string) => {
    setModalTitle(title)
    setModalContent(DOCUMENTS[key])
    setModalOpen(true)
  }

  return (
    <>
      <DocumentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle} content={modalContent} />
      
      <section className="w-full px-4 md:px-6 py-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            
            {/* AIORA Panel */}
            <HUDPanel title="AIORA" subtitle="AI-Optimized Risk Assessment" href="/aiora">
              <Dropdown label="Position Tier" options={['NIBBLE (1-2%)', 'STANDARD (3-5%)', 'CONVICTION (6-8%)']} defaultValue="STANDARD (3-5%)" />
              <div className="space-y-0.5 mt-2">
                <DataRow label="Stop (LC)" value="-5%/-8%" />
                <DataRow label="Stop (MC)" value="-6%/-10%" />
                <DataRow label="Stop (SC)" value="-8%/-12%" />
                <DataRow label="VIX" value="VIX MONITOR" highlight />
              </div>
              <div className="mt-2 pt-2 border-t border-teal/20">
                <ProgressBar label="System" value={94} />
              </div>
            </HUDPanel>

            {/* METATRON Panel */}
            <HUDPanel title="METATRON" subtitle="Protocol Engine v7.7" href="/metatron">
              <div className="space-y-0.5">
                <DataRow label="Gates" value="16/16" highlight />
                <DataRow label="Failures" value="50 COV" />
                <DataRow label="Directives" value="14 ARM" />
                <DataRow label="Hunter" value="14 ACT" />
              </div>
              <div className="mt-2 pt-2 border-t border-teal/20">
                <ProgressBar label="G0.5 Premise" value={100} />
                <ProgressBar label="G8.5 RegShock" value={100} />
                <ProgressBar label="G7.5 Counter" value={92} />
              </div>
              <div className="mt-1 text-center">
                <span className="text-[9px] text-teal/60 font-mono tracking-widest">KILLSWITCH: ARMED</span>
              </div>
            </HUDPanel>

            {/* COVENANT Panel */}
            <HUDPanel title="COVENANT" subtitle="Multi-Agent AI Collective" href="/covenant">
              <div className="space-y-1">
                {[
                  { name: 'MICHA', model: 'Claude', role: 'CEO', status: 'active' as const },
                  { name: 'URIEL', model: 'GPT', role: 'COO', status: 'active' as const },
                  { name: 'COLOSSUS', model: 'Grok', role: 'CTO', status: 'active' as const, supervised: true },
                  { name: 'HANIEL', model: 'Gemini', role: 'CPO', status: 'standby' as const },
                  { name: 'RAZIEL', model: 'Deep', role: 'CAO', status: 'active' as const },
                ].map(agent => (
                  <div key={agent.name} className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                      <span className="text-xs text-foreground/90">{agent.name}</span>
                      {'supervised' in agent && agent.supervised && <span className="text-[8px] bg-yellow-500/20 text-yellow-400 px-1 rounded">SUP</span>}
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">{agent.model}-{agent.role}</span>
                  </div>
                ))}
              </div>
            </HUDPanel>

            {/* FORGE Panel */}
            <HUDPanel title="FORGE" subtitle="Prompt Engineering" href="/forge">
              <Dropdown label="Method" options={['CREATE', 'CAKE', 'RAW']} defaultValue="CREATE" />
              <div className="mt-2 space-y-0.5">
                {['Context', 'Role', 'Examples', 'Audience', 'Tone', 'Exec'].map((item, i) => (
                  <DataRow key={i} label={item} value="OK" highlight />
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-teal/20">
                <ProgressBar label="Quality" value={96} />
              </div>
            </HUDPanel>

            {/* DOCUMENTS Panel - Modal Links */}
            <HUDPanel title="DOCUMENTS" subtitle="Protocol Specifications">
              <div className="space-y-0.5">
                <button onClick={() => openDocument('metatron_full', 'METATRON v7.7 Full')} 
                  className="w-full flex items-center justify-between py-1.5 border-b border-teal/10 hover:bg-teal/5 px-1 -mx-1 transition-colors text-left">
                  <span className="text-xs text-foreground/90">METATRON v7.7 Full</span>
                  <span className="text-[10px] font-mono text-teal/60">VIEW</span>
                </button>
                <button onClick={() => openDocument('metatron_compressed', 'METATRON Compressed')}
                  className="w-full flex items-center justify-between py-1.5 border-b border-teal/10 hover:bg-teal/5 px-1 -mx-1 transition-colors text-left">
                  <span className="text-xs text-foreground/90">METATRON Compressed</span>
                  <span className="text-[10px] font-mono text-teal/60">VIEW</span>
                </button>
                <button onClick={() => openDocument('aiora', 'AIORA Protocol')}
                  className="w-full flex items-center justify-between py-1.5 border-b border-teal/10 hover:bg-teal/5 px-1 -mx-1 transition-colors text-left">
                  <span className="text-xs text-foreground/90">AIORA Protocol</span>
                  <span className="text-[10px] font-mono text-teal/60">VIEW</span>
                </button>
                <button onClick={() => openDocument('forge', 'FORGE CREATE')}
                  className="w-full flex items-center justify-between py-1.5 border-b border-teal/10 hover:bg-teal/5 px-1 -mx-1 transition-colors text-left">
                  <span className="text-xs text-foreground/90">FORGE CREATE</span>
                  <span className="text-[10px] font-mono text-teal/60">VIEW</span>
                </button>
                <button onClick={() => openDocument('creed', "Principal's Creed")}
                  className="w-full flex items-center justify-between py-1.5 hover:bg-teal/5 px-1 -mx-1 transition-colors text-left">
                  <span className="text-xs text-foreground/90">Principal's Creed</span>
                  <span className="text-[10px] font-mono text-teal/60">VIEW</span>
                </button>
              </div>
              <div className="mt-3 text-center">
                <span className="text-[10px] text-muted-foreground/60">View Only — No Copy</span>
              </div>
            </HUDPanel>

            {/* N8N WORKFLOWS Panel */}
            <HUDPanel title="N8N FLOWS" subtitle="Automation Workflows">
              <div className="space-y-0.5">
                {[
                  { name: 'Email Scraper', status: 'active' as const },
                  { name: 'Market Watch', status: 'active' as const },
                  { name: 'Oracle Inject', status: 'active' as const },
                  { name: 'Trade Alerts', status: 'active' as const },
                  { name: 'News Digest', status: 'active' as const },
                ].map((flow, i) => (
                  <div key={i} className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0">
                    <span className="text-xs text-foreground/90">{flow.name}</span>
                    <StatusIndicator label="" status={flow.status} />
                  </div>
                ))}
              </div>
              <div className="mt-2 pt-2 border-t border-teal/20">
                <ProgressBar label="Uptime" value={98} />
              </div>
            </HUDPanel>

            {/* STATE'S FINEST Panel */}
            <HUDPanel title="STATE'S FINEST" subtitle="Satirical Apparel">
              <div className="flex flex-col items-center justify-center h-[140px]">
                <div className="text-4xl mb-2 opacity-30">👕</div>
                <p className="text-gold font-mono text-xs tracking-wider mb-1">COMING SOON</p>
                <p className="text-[10px] text-muted-foreground/60">Spring Store</p>
                <div className="mt-3 w-full">
                  <ProgressBar label="Setup" value={65} />
                </div>
              </div>
            </HUDPanel>

            {/* CONTACT Panel */}
            <HUDPanel title="CONTACT" subtitle="Ashes2Echoes, LLC">
              <div className="space-y-2">
                <div className="p-2 bg-background/30 rounded border border-teal/10">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Location</p>
                  <p className="text-xs font-mono text-foreground/90">Newport News, VA</p>
                </div>
                <div className="p-2 bg-background/30 rounded border border-teal/10">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Principal</p>
                  <p className="text-xs font-mono text-foreground/90">William Earl Lemon</p>
                </div>
                <div className="p-2 bg-background/30 rounded border border-teal/10">
                  <p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">Email</p>
                  <p className="text-[10px] font-mono text-teal break-all">ashes2echoes.platform@gmail.com</p>
                </div>
              </div>
              <div className="mt-2 text-center">
                <StatusIndicator label="Online" status="active" />
              </div>
            </HUDPanel>

          </div>
        </div>
      </section>
    </>
  )
}
