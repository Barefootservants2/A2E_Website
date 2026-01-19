"use client"

import { useState } from "react"

// HUD Panel Component
function HUDPanel({ 
  title, 
  subtitle, 
  children,
  className = ""
}: { 
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative bg-[rgba(10,15,25,0.85)] backdrop-blur-md border border-teal/30 rounded-sm overflow-hidden group hover:border-teal/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,206,209,0.15)] ${className}`}>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" />
      
      {/* Header */}
      <div className="px-4 pt-4 pb-2 border-b border-teal/20">
        <h3 className="text-teal font-semibold tracking-[0.2em] text-lg">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground/70 tracking-wider mt-1 font-light">{subtitle}</p>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 min-h-[200px]">
        {children}
      </div>
      
      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" />
    </div>
  )
}

// Data Row Component
function DataRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-teal/10 last:border-0">
      <span className="text-xs text-muted-foreground/70 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-mono ${highlight ? 'text-gold' : 'text-foreground/90'}`}>{value}</span>
    </div>
  )
}

// Progress Bar Component
function ProgressBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const percent = (value / max) * 100
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground/70 uppercase tracking-wider">{label}</span>
        <span className="font-mono text-teal">{value}%</span>
      </div>
      <div className="h-1.5 bg-background/50 rounded-full overflow-hidden">
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
    <div className="flex items-center gap-2 py-1">
      <div className={`w-2 h-2 rounded-full ${colors[status]} animate-pulse`} />
      <span className="text-xs text-muted-foreground/80 uppercase tracking-wider">{label}</span>
    </div>
  )
}

// Dropdown Selector Component
function Dropdown({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    <div className="mb-3">
      <label className="text-xs text-muted-foreground/70 uppercase tracking-wider block mb-1">{label}</label>
      <select 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full bg-background/50 border border-teal/30 rounded-sm px-3 py-2 text-sm text-foreground/90 font-mono focus:border-teal/60 focus:outline-none appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2340E0D0' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center' }}
      >
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  )
}

export function DashboardCards() {
  return (
    <section className="w-full px-4 md:px-8 py-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* AIORA Panel */}
          <HUDPanel title="AIORA" subtitle="AI-OPTIMIZED RISK ASSESSMENT">
            <Dropdown 
              label="Position Tier" 
              options={['NIBBLE (1-2%)', 'STANDARD (3-5%)', 'CONVICTION (6-8%)']} 
              defaultValue="STANDARD (3-5%)"
            />
            <div className="space-y-1 mt-4">
              <DataRow label="Stop Loss (LC)" value="-5% / -8%" />
              <DataRow label="Stop Loss (MC)" value="-6% / -10%" />
              <DataRow label="Stop Loss (SC)" value="-8% / -12%" />
              <DataRow label="VIX Status" value="🟢 <15" highlight />
            </div>
            <div className="mt-4 pt-3 border-t border-teal/20">
              <ProgressBar label="System Ready" value={94} />
            </div>
          </HUDPanel>

          {/* METATRON Panel */}
          <HUDPanel title="METATRON" subtitle="PROTOCOL ENGINE v7.4">
            <div className="space-y-1">
              <DataRow label="Active Gates" value="14 / 14" highlight />
              <DataRow label="Failure Modes" value="36 COVERED" />
              <DataRow label="Prime Directives" value="13 ARMED" />
              <DataRow label="Hunter Modules" value="6 ACTIVE" />
            </div>
            <div className="mt-4 pt-3 border-t border-teal/20">
              <ProgressBar label="Gate 0.5 Premise" value={100} />
              <ProgressBar label="Gate 5.5 Freshness" value={87} />
              <ProgressBar label="Gate 7.5 Counter" value={92} />
            </div>
            <div className="mt-3 text-center">
              <span className="text-[10px] text-teal/60 font-mono tracking-widest">KILLSWITCH: ARMED</span>
            </div>
          </HUDPanel>

          {/* THE COVENANT Panel */}
          <HUDPanel title="THE COVENANT" subtitle="MULTI-AGENT AI COLLECTIVE">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-teal/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-foreground/90">URIEL</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">ChatGPT • CEO</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-teal/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-foreground/90">MICHA</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Claude • CIO</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-teal/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-foreground/90">COLOSSUS</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Grok • CTO</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-teal/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-sm text-foreground/90">HANIEL</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">Gemini • Data</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm text-foreground/90">RAZIEL</span>
                </div>
                <span className="text-xs font-mono text-muted-foreground">DeepSeek • Judge</span>
              </div>
            </div>
          </HUDPanel>

          {/* FORGE Panel */}
          <HUDPanel title="FORGE" subtitle="PROMPT ENGINEERING FRAMEWORK">
            <Dropdown 
              label="Methodology" 
              options={['CREATE Framework', 'CAKE Standards', 'RAW Mode']} 
              defaultValue="CREATE Framework"
            />
            <div className="mt-4 space-y-1">
              <DataRow label="C - Context" value="✓" highlight />
              <DataRow label="R - Role" value="✓" highlight />
              <DataRow label="E - Examples" value="✓" highlight />
              <DataRow label="A - Audience" value="✓" highlight />
              <DataRow label="T - Tone" value="✓" highlight />
              <DataRow label="E - Execution" value="✓" highlight />
            </div>
            <div className="mt-4 pt-3 border-t border-teal/20">
              <ProgressBar label="Prompt Quality" value={96} />
            </div>
          </HUDPanel>

          {/* STATE'S FINEST Panel */}
          <HUDPanel title="STATE'S FINEST™" subtitle="SATIRICAL APPAREL COLLECTION">
            <div className="flex flex-col items-center justify-center h-[180px]">
              <div className="text-6xl mb-4 opacity-30">👕</div>
              <div className="text-center">
                <p className="text-gold font-mono text-sm tracking-wider mb-2">COMING SOON</p>
                <p className="text-xs text-muted-foreground/60">Spring Storefront Integration</p>
              </div>
              <div className="mt-4 w-full">
                <ProgressBar label="Store Setup" value={65} />
              </div>
            </div>
          </HUDPanel>

          {/* CONTACT Panel */}
          <HUDPanel title="CONTACT" subtitle="ASHES2ECHOES, LLC">
            <div className="space-y-3">
              <div className="p-3 bg-background/30 rounded border border-teal/10">
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm font-mono text-foreground/90">Newport News, Virginia</p>
              </div>
              <div className="p-3 bg-background/30 rounded border border-teal/10">
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1">Principal</p>
                <p className="text-sm font-mono text-foreground/90">William Earl Lemon</p>
              </div>
              <div className="p-3 bg-background/30 rounded border border-teal/10">
                <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-1">Email</p>
                <p className="text-xs font-mono text-teal break-all">ashes2echoes.platform@gmail.com</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <StatusIndicator label="Systems Online" status="active" />
            </div>
          </HUDPanel>

        </div>
      </div>
    </section>
  )
}
