import Link from "next/link"
import Image from "next/image"

const createFramework = [
  {
    letter: "C",
    name: "Context",
    description: "Set the stage. What background information does the AI need to understand your request?",
    examples: ["You are analyzing Q3 financial reports...", "Given the current market conditions...", "In the context of our trading strategy..."],
  },
  {
    letter: "R",
    name: "Role",
    description: "Define who the AI should be. What expertise, perspective, or persona should it adopt?",
    examples: ["Act as a senior risk analyst...", "You are a skeptical investor...", "Respond as a METATRON protocol auditor..."],
  },
  {
    letter: "E",
    name: "Examples",
    description: "Show, don't just tell. Provide concrete examples of the output format or style you want.",
    examples: ["Format like: TICKER | THESIS | RISK LEVEL", "Similar to how Warren Buffett would analyze...", "Use this template: [CLAIM] → [EVIDENCE] → [CONFIDENCE]"],
  },
  {
    letter: "A",
    name: "Audience",
    description: "Who is the output for? This shapes complexity, tone, and assumed knowledge level.",
    examples: ["For a technical trader familiar with options...", "Explain to someone new to investing...", "For internal team review..."],
  },
  {
    letter: "T",
    name: "Tone",
    description: "How should the response feel? Direct, analytical, conversational, formal?",
    examples: ["Be direct and brutally honest...", "Maintain professional skepticism...", "Zero placation, raw facts only..."],
  },
  {
    letter: "E",
    name: "Execution",
    description: "Specify the exact deliverable. What format, length, structure do you need?",
    examples: ["Provide a 3-paragraph analysis...", "Create a table with columns...", "List the top 5 risks in bullet points..."],
  },
]

export default function ForgePage() {
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
            <span className="text-xs font-mono text-teal">FORGE READY</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-b from-[#0a0a0f] to-background px-6 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.3em] text-gold mb-4">FORGE</h1>
        <p className="text-lg md:text-xl text-foreground/70 tracking-wider">Prompt Engineering Framework</p>
        <p className="mt-4 text-sm text-teal/70">CREATE Methodology • Systematic Prompting • Quality Assurance</p>
      </div>

      {/* CREATE Framework */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">The CREATE Framework</h2>
        <p className="text-center text-foreground/70 mb-12 max-w-2xl mx-auto">
          Six elements that transform vague requests into precise, actionable prompts. 
          Each element adds structure and reduces ambiguity.
        </p>

        <div className="space-y-6">
          {createFramework.map((item, i) => (
            <div key={i} className="bg-card/50 border border-teal/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] px-6 py-4 border-b border-teal/20 flex items-center gap-4">
                <span className="text-4xl font-extralight text-gold">{item.letter}</span>
                <div>
                  <h3 className="text-xl font-medium text-foreground">{item.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-foreground/80 mb-4">{item.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-teal/70 uppercase tracking-wider">Examples:</p>
                  {item.examples.map((ex, j) => (
                    <div key={j} className="bg-background/50 border border-teal/10 rounded px-3 py-2">
                      <code className="text-sm text-foreground/60 italic">{ex}</code>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Scoring */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">CREATE Quality Score</h2>
        <div className="bg-card/30 border border-teal/20 rounded p-6">
          <p className="text-foreground/70 mb-6 text-center">
            Rate each CREATE element 0-2. Total score indicates prompt quality:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-red-500/10 border border-red-500/30 rounded p-4">
              <p className="text-2xl font-mono text-red-400">0-4</p>
              <p className="text-sm text-foreground/60 mt-1">Weak — Revise heavily</p>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-4">
              <p className="text-2xl font-mono text-yellow-400">5-8</p>
              <p className="text-sm text-foreground/60 mt-1">Adequate — Minor tweaks</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded p-4">
              <p className="text-2xl font-mono text-green-400">9-12</p>
              <p className="text-sm text-foreground/60 mt-1">Strong — Ready to deploy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Anti-Patterns */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">Anti-Patterns to Avoid</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            ["Vague Requests", "\"Tell me about stocks\" → No context, role, or execution spec"],
            ["Missing Constraints", "\"Write something long\" → No format, no audience, no tone"],
            ["Assumed Knowledge", "\"Do that thing we discussed\" → AI has no memory between sessions"],
            ["Overloading", "\"Do A, B, C, D, E, F all at once\" → Break into sequential prompts"],
            ["No Examples", "\"Format it nicely\" → Nice means nothing without examples"],
            ["Implicit Expectations", "\"You know what I mean\" → AI cannot read minds"],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-red-500/5 border border-red-500/20 rounded p-4">
              <h3 className="text-red-400 font-medium mb-1">{title}</h3>
              <p className="text-sm text-foreground/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CAKE Integration */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-light tracking-wider text-teal mb-8 text-center">Additional Standards</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card/50 border border-teal/20 rounded p-6">
            <h3 className="text-gold font-mono text-lg mb-4">CAKE Standards</h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-teal">C</span>
                <span>Clarity — Unambiguous language</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal">A</span>
                <span>Actionable — Clear next steps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal">K</span>
                <span>Knowledge-grounded — Factual basis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal">E</span>
                <span>Efficient — Minimal token waste</span>
              </li>
            </ul>
          </div>
          <div className="bg-card/50 border border-teal/20 rounded p-6">
            <h3 className="text-gold font-mono text-lg mb-4">RAW Mode</h3>
            <p className="text-sm text-foreground/70 mb-4">
              For rapid iteration when CREATE is overkill:
            </p>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <span className="text-teal">R</span>
                <span>Role — Quick persona assignment</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal">A</span>
                <span>Action — Single clear command</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal">W</span>
                <span>What — Expected output format</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-xl font-light text-foreground/70 mb-6">
          "The quality of your output is directly proportional to the quality of your input."
        </p>
        <p className="text-teal tracking-widest text-sm">— FORGE PRINCIPLE #1</p>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground">
        <p>© 2026 Ashes2Echoes LLC. FORGE Framework v1.0</p>
      </footer>
    </main>
  )
}
