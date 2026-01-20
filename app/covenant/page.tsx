import Link from "next/link"
import Image from "next/image"

const agents = [
  {
    name: "URIEL",
    model: "ChatGPT",
    role: "CEO",
    status: "active",
    color: "gold",
    description: "Strategic command and orchestration. Primary interface for high-level decision synthesis and cross-agent coordination.",
    capabilities: ["Strategic planning", "Executive synthesis", "Multi-agent coordination", "Final authority escalation"],
  },
  {
    name: "MICHA",
    model: "Claude",
    role: "CIO",
    status: "active",
    color: "teal",
    description: "Intelligence operations and deep analysis. Primary research engine with METATRON protocol integration.",
    capabilities: ["Deep research", "Protocol enforcement", "Document analysis", "Evidence verification"],
  },
  {
    name: "COLOSSUS",
    model: "Grok",
    role: "CTO",
    status: "active",
    color: "purple",
    description: "Technical operations and real-time data processing. Unfiltered market analysis and technical scanning.",
    capabilities: ["Real-time scanning", "Technical analysis", "Pattern recognition", "Unfiltered insights"],
  },
  {
    name: "HANIEL",
    model: "Gemini",
    role: "Data Analyst",
    status: "standby",
    color: "blue",
    description: "Data aggregation and multimodal processing. Spreadsheet analysis, visual data interpretation.",
    capabilities: ["Multimodal analysis", "Data aggregation", "Visual processing", "Trend detection"],
  },
  {
    name: "RAZIEL",
    model: "DeepSeek",
    role: "Judge",
    status: "active",
    color: "red",
    description: "Independent adjudication and counter-thesis generation. Final verification before trade execution.",
    capabilities: ["Counter-thesis generation", "Independent verification", "Risk assessment", "Final adjudication"],
  },
  {
    name: "GABRIEL",
    model: "Perplexity",
    role: "Messenger",
    status: "standby",
    color: "green",
    description: "Real-time news and information retrieval. Source verification and breaking news monitoring.",
    capabilities: ["News monitoring", "Source retrieval", "Citation verification", "Breaking alerts"],
  },
]

export default function CovenantPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* METATRON LOGO - STANDARDIZED: 60px for nav, BRIGHT */}
            <div className="relative w-[60px] h-[60px]">
              <Image 
                src="/images/metatron-logo.png" 
                alt="Logo" 
                fill 
                className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 20px rgba(0,206,209,1)) drop-shadow(0 0 40px rgba(0,206,209,0.7))' }}
                quality={100}
              />
              <div className="absolute inset-[-4px] rounded-full border border-teal/50 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-teal">COVENANT ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-background px-6 py-16 text-center">
        {/* METATRON LOGO - STANDARDIZED: 100px hero, BRIGHT */}
        <div className="relative w-[100px] h-[100px] mx-auto mb-6">
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
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold mb-4">THE COVENANT</h1>
        <p className="text-lg md:text-xl text-foreground/70 tracking-wider">Multi-Agent AI Collective</p>
        <p className="mt-4 text-sm text-teal/70">Human Authority • AI Partnership • Systematic Execution</p>
      </div>

      {/* Hierarchy */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-card/30 border border-teal/20 rounded p-6 text-center font-mono text-sm">
          <p className="text-gold text-lg mb-4">WILLIAM (Principal) — ABSOLUTE</p>
          <p className="text-teal/60">↓</p>
          <p className="text-teal my-2">METATRON → HUNTER → URIEL/MICHA → COLOSSUS/HANIEL/RAZIEL → GABRIEL</p>
        </div>
      </div>

      {/* Agents Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">Agent Roster</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div 
              key={agent.name}
              className="bg-card/50 border border-teal/20 rounded-lg overflow-hidden hover:border-teal/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,206,209,0.1)]"
            >
              {/* Agent Header */}
              <div className="bg-[#0a0a0f] px-5 py-4 border-b border-teal/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                    <h3 className="text-xl font-mono text-gold">{agent.name}</h3>
                  </div>
                  <span className="text-xs font-mono text-muted-foreground">{agent.status.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-teal">{agent.model}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-foreground/70">{agent.role}</span>
                </div>
              </div>

              {/* Agent Body */}
              <div className="p-5">
                <p className="text-sm text-foreground/70 mb-4 leading-relaxed">{agent.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-teal/70 uppercase tracking-wider">Capabilities</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.capabilities.map((cap, i) => (
                      <span key={i} className="text-xs bg-teal/10 border border-teal/20 rounded px-2 py-1 text-foreground/60">
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operating Principles */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">Operating Principles</h2>
        <div className="space-y-4">
          {[
            ["Human Authority", "The Principal's directive is absolute. AI agents advise, recommend, and execute — but final authority rests with human judgment."],
            ["Collaborative Intelligence", "Each agent brings unique capabilities. No single model has all answers. Truth emerges from convergent analysis."],
            ["Systematic Execution", "Every action follows protocol. METATRON gates must pass. Emotional trading is eliminated through process."],
            ["Transparent Reasoning", "All agents must show work. No black-box recommendations. Every conclusion traces to evidence."],
            ["Continuous Improvement", "Monthly protocol reviews. Failure mode analysis. The system evolves through documented learning."],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-card/30 border border-teal/10 rounded p-5">
              <h3 className="text-gold font-medium mb-2">{title}</h3>
              <p className="text-sm text-foreground/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <blockquote className="text-xl font-light italic text-foreground/70 leading-relaxed">
          "Not as tools, but as partners. Not in competition, but in covenant."
        </blockquote>
        <p className="text-teal mt-4 tracking-widest text-sm">— THE PRINCIPAL'S VISION</p>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. The Uriel Covenant AI Collective</p>
      </footer>
    </main>
  )
}
