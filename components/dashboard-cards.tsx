"use client"

import { useState } from "react"
import Link from "next/link"

// HUD Panel Component - Modified to handle href only on title click
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
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
      
      {/* Header - clickable if href provided */}
      {href ? (
        <Link href={href} className="block px-3 pt-3 pb-2 border-b border-teal/20 hover:bg-teal/5 transition-colors">
          <h3 className="text-teal font-semibold tracking-[0.15em] text-base hover:text-gold transition-colors">{title}</h3>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground/70 tracking-wider mt-0.5 font-light uppercase">{subtitle}</p>
          )}
        </Link>
      ) : (
        <div className="px-3 pt-3 pb-2 border-b border-teal/20">
          <h3 className="text-teal font-semibold tracking-[0.15em] text-base">{title}</h3>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground/70 tracking-wider mt-0.5 font-light uppercase">{subtitle}</p>
          )}
        </div>
      )}
      
      {/* Content - NOT linked */}
      <div className="p-3 min-h-[160px]">
        {children}
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </div>
  )
}

// Data Row Component - Compact
function DataRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0">
      <span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider">{label}</span>
      <span className={`text-xs font-mono ${highlight ? 'text-gold' : 'text-foreground/90'}`}>{value}</span>
    </div>
  )
}

// Progress Bar Component - Compact
function ProgressBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const percent = (value / max) * 100
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[10px] mb-0.5">
        <span className="text-muted-foreground/70 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-teal">{value}%</span>
      </div>
      <div className="h-1 bg-background/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-teal/60 to-teal rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

// Status Indicator Component
function StatusIndicator({ label, status }: { label: string; status: 'active' | 'standby' | 'offline' }) {
  const colors = {
    active: 'bg-green-500',
    standby: 'bg-yellow-500',
    offline: 'bg-red-500'
  }
  return (
    <div className="flex items-center gap-2 py-0.5">
      <div className={`w-1.5 h-1.5 rounded-full ${colors[status]} animate-pulse`} />
      <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider">{label}</span>
    </div>
  )
}

// Dropdown Selector Component - Compact, functional
function Dropdown({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="mb-2">
      <label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-0.5">{label}</label>
      <select 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-background/50 border border-teal/30 rounded-sm px-2 py-1.5 text-xs text-foreground/90 font-mono focus:border-teal/60 focus:outline-none appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%2340E0D0' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

// Document Link Component
function DocLink({ title, type, href }: { title: string; type: string; href: string }) {
  return (
    <Link href={href} className="flex items-center justify-between py-1.5 border-b border-teal/10 last:border-0 hover:bg-teal/5 px-1 -mx-1 transition-colors">
      <span className="text-xs text-foreground/90">{title}</span>
      <span className="text-[10px] font-mono text-teal/60">{type}</span>
    </Link>
  )
}

export function DashboardCards() {
  return (
    <section className="w-full px-4 md:px-6 py-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          
          {/* AIORA Panel - Click TITLE to navigate, dropdowns work locally */}
          <HUDPanel title="AIORA" subtitle="AI-Optimized Risk Assessment" href="/aiora">
            <Dropdown 
              label="Position Tier" 
              options={['NIBBLE (1-2%)', 'STANDARD (3-5%)', 'CONVICTION (6-8%)']} 
              defaultValue="STANDARD (3-5%)"
            />
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

          {/* METATRON Panel - v7.7 */}
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

          {/* THE COVENANT Panel - v7.7 HIERARCHY */}
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
            <Dropdown 
              label="Method" 
              options={['CREATE', 'CAKE', 'RAW']} 
              defaultValue="CREATE"
            />
            <div className="mt-2 space-y-0.5">
              {['Context', 'Role', 'Examples', 'Audience', 'Tone', 'Exec'].map((item, i) => (
                <DataRow key={i} label={item} value="OK" highlight />
              ))}
            </div>
            <div className="mt-2 pt-2 border-t border-teal/20">
              <ProgressBar label="Quality" value={96} />
            </div>
          </HUDPanel>

          {/* DOCUMENTS Panel - v7.7 links */}
          <HUDPanel title="DOCUMENTS" subtitle="Protocol Specifications">
            <div className="space-y-0.5">
              <DocLink title="METATRON v7.7 Full" type="MD" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/METATRON_v7.7_FULL.md" />
              <DocLink title="METATRON Compressed" type="TXT" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/metatron-v7.7-compressed.txt" />
              <DocLink title="AIORA Protocol" type="MD" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/AIORA_QUICK_REFERENCE.md" />
              <DocLink title="FORGE CREATE" type="MD" href="#" />
              <DocLink title="Principal's Creed" type="MD" href="#" />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] text-muted-foreground/60">GitHub Repository</span>
            </div>
          </HUDPanel>

          {/* N8N WORKFLOWS Panel - No href, no hover */}
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

          {/* STATE'S FINEST Panel - No href since coming soon */}
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

          {/* CONTACT Panel - No href */}
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
  )
}
