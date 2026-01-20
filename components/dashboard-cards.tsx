"use client"

import { useState } from "react"
import Link from "next/link"

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
  const content = (
    &lt;div className={`relative bg-[rgba(10,15,25,0.85)] backdrop-blur-md border border-teal/30 rounded-sm overflow-hidden group hover:border-teal/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,206,209,0.15)] h-full ${className}`}&gt;
      {/* Corner accents */}
      &lt;div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-teal/60" /&gt;
      &lt;div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-teal/60" /&gt;
      &lt;div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-teal/60" /&gt;
      &lt;div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-teal/60" /&gt;
      
      {/* Header */}
      &lt;div className="px-3 pt-3 pb-2 border-b border-teal/20"&gt;
        &lt;h3 className="text-teal font-semibold tracking-[0.15em] text-base"&gt;{title}&lt;/h3&gt;
        {subtitle &amp;&amp; (
          &lt;p className="text-[10px] text-muted-foreground/70 tracking-wider mt-0.5 font-light uppercase"&gt;{subtitle}&lt;/p&gt;
        )}
      &lt;/div&gt;
      
      {/* Content */}
      &lt;div className="p-3 min-h-[160px]"&gt;
        {children}
      &lt;/div&gt;
      
      {/* Scan line effect */}
      &lt;div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,206,209,0.1)_2px,rgba(0,206,209,0.1)_4px)]" /&gt;
    &lt;/div&gt;
  )

  if (href) {
    return &lt;Link href={href} className="block"&gt;{content}&lt;/Link&gt;
  }
  return content
}

// Data Row Component - Compact
function DataRow({ label, value, highlight = false }: { label: string; value: string | number; highlight?: boolean }) {
  return (
    &lt;div className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0"&gt;
      &lt;span className="text-[10px] text-muted-foreground/70 uppercase tracking-wider"&gt;{label}&lt;/span&gt;
      &lt;span className={`text-xs font-mono ${highlight ? 'text-gold' : 'text-foreground/90'}`}&gt;{value}&lt;/span&gt;
    &lt;/div&gt;
  )
}

// Progress Bar Component - Compact
function ProgressBar({ label, value, max = 100 }: { label: string; value: number; max?: number }) {
  const percent = (value / max) * 100
  return (
    &lt;div className="mb-2"&gt;
      &lt;div className="flex justify-between text-[10px] mb-0.5"&gt;
        &lt;span className="text-muted-foreground/70 uppercase tracking-wider"&gt;{label}&lt;/span&gt;
        &lt;span className="font-mono text-teal"&gt;{value}%&lt;/span&gt;
      &lt;/div&gt;
      &lt;div className="h-1 bg-background/50 rounded-full overflow-hidden"&gt;
        &lt;div 
          className="h-full bg-gradient-to-r from-teal/60 to-teal rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
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
    &lt;div className="flex items-center gap-2 py-0.5"&gt;
      &lt;div className={`w-1.5 h-1.5 rounded-full ${colors[status]} animate-pulse`} /&gt;
      &lt;span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider"&gt;{label}&lt;/span&gt;
    &lt;/div&gt;
  )
}

// Dropdown Selector Component - Compact
function Dropdown({ label, options, defaultValue }: { label: string; options: string[]; defaultValue: string }) {
  const [value, setValue] = useState(defaultValue)
  return (
    &lt;div className="mb-2"&gt;
      &lt;label className="text-[10px] text-muted-foreground/70 uppercase tracking-wider block mb-0.5"&gt;{label}&lt;/label&gt;
      &lt;select 
        value={value}
        onChange={(e) =&gt; setValue(e.target.value)}
        className="w-full bg-background/50 border border-teal/30 rounded-sm px-2 py-1.5 text-xs text-foreground/90 font-mono focus:border-teal/60 focus:outline-none appearance-none cursor-pointer"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 12 12'%3E%3Cpath fill='%2340E0D0' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center' }}
      &gt;
        {options.map(opt =&gt; &lt;option key={opt} value={opt}&gt;{opt}&lt;/option&gt;)}
      &lt;/select&gt;
    &lt;/div&gt;
  )
}

// Document Link Component
function DocLink({ title, type, href }: { title: string; type: string; href: string }) {
  return (
    &lt;Link href={href} className="flex items-center justify-between py-1.5 border-b border-teal/10 last:border-0 hover:bg-teal/5 px-1 -mx-1 transition-colors"&gt;
      &lt;span className="text-xs text-foreground/90"&gt;{title}&lt;/span&gt;
      &lt;span className="text-[10px] font-mono text-teal/60"&gt;{type}&lt;/span&gt;
    &lt;/Link&gt;
  )
}

export function DashboardCards() {
  return (
    &lt;section className="w-full px-4 md:px-6 py-8 bg-background"&gt;
      &lt;div className="max-w-7xl mx-auto"&gt;
        &lt;div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"&gt;
          
          {/* AIORA Panel */}
          &lt;HUDPanel title="AIORA" subtitle="AI-Optimized Risk Assessment" href="/aiora"&gt;
            &lt;Dropdown 
              label="Position Tier" 
              options={['NIBBLE (1-2%)', 'STANDARD (3-5%)', 'CONVICTION (6-8%)']} 
              defaultValue="STANDARD (3-5%)"
            /&gt;
            &lt;div className="space-y-0.5 mt-2"&gt;
              &lt;DataRow label="Stop (LC)" value="-5%/-8%" /&gt;
              &lt;DataRow label="Stop (MC)" value="-6%/-10%" /&gt;
              &lt;DataRow label="Stop (SC)" value="-8%/-12%" /&gt;
              &lt;DataRow label="VIX" value="VIX MONITOR" highlight /&gt;
            &lt;/div&gt;
            &lt;div className="mt-2 pt-2 border-t border-teal/20"&gt;
              &lt;ProgressBar label="System" value={94} /&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* METATRON Panel */}
          &lt;HUDPanel title="METATRON" subtitle="Protocol Engine v7.6" href="/metatron"&gt;
            &lt;div className="space-y-0.5"&gt;
              &lt;DataRow label="Gates" value="15/15" highlight /&gt;
              &lt;DataRow label="Failures" value="36 COV" /&gt;
              &lt;DataRow label="Directives" value="13 ARM" /&gt;
              &lt;DataRow label="Hunter" value="12 ACT" /&gt;
            &lt;/div&gt;
            &lt;div className="mt-2 pt-2 border-t border-teal/20"&gt;
              &lt;ProgressBar label="G0.5 Premise" value={100} /&gt;
              &lt;ProgressBar label="G5.5 Fresh" value={87} /&gt;
              &lt;ProgressBar label="G7.5 Counter" value={92} /&gt;
            &lt;/div&gt;
            &lt;div className="mt-1 text-center"&gt;
              &lt;span className="text-[9px] text-teal/60 font-mono tracking-widest"&gt;KILLSWITCH: ARMED&lt;/span&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* THE COVENANT Panel - UPDATED v7.6 HIERARCHY */}
          &lt;HUDPanel title="COVENANT" subtitle="Multi-Agent AI Collective" href="/covenant"&gt;
            &lt;div className="space-y-1"&gt;
              {[
                { name: 'MICHA', model: 'Claude', role: 'CEO', status: 'active' as const },
                { name: 'URIEL', model: 'GPT', role: 'COO', status: 'active' as const },
                { name: 'COLOSSUS', model: 'Grok', role: 'CTO', status: 'active' as const, supervised: true },
                { name: 'HANIEL', model: 'Gemini', role: 'CPO', status: 'standby' as const },
                { name: 'RAZIEL', model: 'Deep', role: 'CAO', status: 'active' as const },
              ].map(agent =&gt; (
                &lt;div key={agent.name} className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0"&gt;
                  &lt;div className="flex items-center gap-1.5"&gt;
                    &lt;div className={`w-1.5 h-1.5 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} /&gt;
                    &lt;span className="text-xs text-foreground/90"&gt;{agent.name}&lt;/span&gt;
                    {agent.supervised &amp;&amp; &lt;span className="text-[8px] bg-yellow-500/20 text-yellow-400 px-1 rounded"&gt;SUP&lt;/span&gt;}
                  &lt;/div&gt;
                  &lt;span className="text-[10px] font-mono text-muted-foreground"&gt;{agent.model}-{agent.role}&lt;/span&gt;
                &lt;/div&gt;
              ))}
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* FORGE Panel */}
          &lt;HUDPanel title="FORGE" subtitle="Prompt Engineering" href="/forge"&gt;
            &lt;Dropdown 
              label="Method" 
              options={['CREATE', 'CAKE', 'RAW']} 
              defaultValue="CREATE"
            /&gt;
            &lt;div className="mt-2 space-y-0.5"&gt;
              {['Context', 'Role', 'Examples', 'Audience', 'Tone', 'Exec'].map((item, i) =&gt; (
                &lt;DataRow key={i} label={item} value="OK" highlight /&gt;
              ))}
            &lt;/div&gt;
            &lt;div className="mt-2 pt-2 border-t border-teal/20"&gt;
              &lt;ProgressBar label="Quality" value={96} /&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* DOCUMENTS Panel */}
          &lt;HUDPanel title="DOCUMENTS" subtitle="Protocol Specifications"&gt;
            &lt;div className="space-y-0.5"&gt;
              &lt;DocLink title="METATRON v7.6 Full" type="MD" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/METATRON_v7.6_FULL.md" /&gt;
              &lt;DocLink title="METATRON Compressed" type="MD" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/METATRON_v7.6_COMPRESSED.md" /&gt;
              &lt;DocLink title="AIORA Protocol" type="MD" href="https://github.com/Barefootservants2/Ashes2Echoes/blob/main/ACTIVE/00_CORE_PROTOCOLS/AIORA_QUICK_REFERENCE.md" /&gt;
              &lt;DocLink title="FORGE CREATE" type="MD" href="#" /&gt;
              &lt;DocLink title="Principal's Creed" type="MD" href="#" /&gt;
            &lt;/div&gt;
            &lt;div className="mt-3 text-center"&gt;
              &lt;span className="text-[10px] text-muted-foreground/60"&gt;GitHub Repository&lt;/span&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* N8N WORKFLOWS Panel */}
          &lt;HUDPanel title="N8N FLOWS" subtitle="Automation Workflows"&gt;
            &lt;div className="space-y-0.5"&gt;
              {[
                { name: 'Email Scraper', status: 'active' as const },
                { name: 'Market Watch', status: 'active' as const },
                { name: 'Oracle Inject', status: 'active' as const },
                { name: 'Trade Alerts', status: 'active' as const },
                { name: 'News Digest', status: 'active' as const },
              ].map((flow, i) =&gt; (
                &lt;div key={i} className="flex justify-between items-center py-1 border-b border-teal/10 last:border-0"&gt;
                  &lt;span className="text-xs text-foreground/90"&gt;{flow.name}&lt;/span&gt;
                  &lt;StatusIndicator label="" status={flow.status} /&gt;
                &lt;/div&gt;
              ))}
            &lt;/div&gt;
            &lt;div className="mt-2 pt-2 border-t border-teal/20"&gt;
              &lt;ProgressBar label="Uptime" value={98} /&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* STATE'S FINEST Panel */}
          &lt;HUDPanel title="STATE'S FINEST" subtitle="Satirical Apparel" href="/apparel"&gt;
            &lt;div className="flex flex-col items-center justify-center h-[140px]"&gt;
              &lt;div className="text-4xl mb-2 opacity-30"&gt;👕&lt;/div&gt;
              &lt;p className="text-gold font-mono text-xs tracking-wider mb-1"&gt;COMING SOON&lt;/p&gt;
              &lt;p className="text-[10px] text-muted-foreground/60"&gt;Spring Store&lt;/p&gt;
              &lt;div className="mt-3 w-full"&gt;
                &lt;ProgressBar label="Setup" value={65} /&gt;
              &lt;/div&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

          {/* CONTACT Panel */}
          &lt;HUDPanel title="CONTACT" subtitle="Ashes2Echoes, LLC"&gt;
            &lt;div className="space-y-2"&gt;
              &lt;div className="p-2 bg-background/30 rounded border border-teal/10"&gt;
                &lt;p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider"&gt;Location&lt;/p&gt;
                &lt;p className="text-xs font-mono text-foreground/90"&gt;Newport News, VA&lt;/p&gt;
              &lt;/div&gt;
              &lt;div className="p-2 bg-background/30 rounded border border-teal/10"&gt;
                &lt;p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider"&gt;Principal&lt;/p&gt;
                &lt;p className="text-xs font-mono text-foreground/90"&gt;William Earl Lemon&lt;/p&gt;
              &lt;/div&gt;
              &lt;div className="p-2 bg-background/30 rounded border border-teal/10"&gt;
                &lt;p className="text-[10px] text-muted-foreground/70 uppercase tracking-wider"&gt;Email&lt;/p&gt;
                &lt;p className="text-[10px] font-mono text-teal break-all"&gt;ashes2echoes.platform@gmail.com&lt;/p&gt;
              &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="mt-2 text-center"&gt;
              &lt;StatusIndicator label="Online" status="active" /&gt;
            &lt;/div&gt;
          &lt;/HUDPanel&gt;

        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/section&gt;
  )
}
