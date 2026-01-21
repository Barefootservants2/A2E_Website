"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

interface CreateScore {
  context: number
  role: number
  examples: number
  audience: number
  tone: number
  execution: number
}

interface SavedPrompt {
  id: string
  timestamp: string
  input: string
  output: string
  scores: CreateScore
  totalScore: number
  quality: 'weak' | 'adequate' | 'strong'
}

const STORAGE_KEY = 'forge_library'

const createFramework = [
  {
    letter: "C",
    key: "context" as keyof CreateScore,
    name: "Context",
    description: "Set the stage. What background information does the AI need to understand your request?",
    hints: ["Background info", "Domain knowledge", "Relevant constraints", "Prior context"],
    examples: ["You are analyzing Q3 financial reports...", "Given the current market conditions...", "In the context of our trading strategy..."],
  },
  {
    letter: "R",
    key: "role" as keyof CreateScore,
    name: "Role",
    description: "Define who the AI should be. What expertise, perspective, or persona should it adopt?",
    hints: ["Expert persona", "Specific viewpoint", "Professional role", "Skill set"],
    examples: ["Act as a senior risk analyst...", "You are a skeptical investor...", "Respond as a METATRON protocol auditor..."],
  },
  {
    letter: "E",
    key: "examples" as keyof CreateScore,
    name: "Examples",
    description: "Show, don't just tell. Provide concrete examples of the output format or style you want.",
    hints: ["Output format", "Sample structure", "Reference style", "Template"],
    examples: ["Format like: TICKER | THESIS | RISK LEVEL", "Similar to how Warren Buffett would analyze...", "Use this template: [CLAIM] → [EVIDENCE] → [CONFIDENCE]"],
  },
  {
    letter: "A",
    key: "audience" as keyof CreateScore,
    name: "Audience",
    description: "Who is the output for? This shapes complexity, tone, and assumed knowledge level.",
    hints: ["Knowledge level", "Technical depth", "Familiarity", "Use case"],
    examples: ["For a technical trader familiar with options...", "Explain to someone new to investing...", "For internal team review..."],
  },
  {
    letter: "T",
    key: "tone" as keyof CreateScore,
    name: "Tone",
    description: "How should the response feel? Direct, analytical, conversational, formal?",
    hints: ["Communication style", "Formality level", "Emotional register", "Directness"],
    examples: ["Be direct and brutally honest...", "Maintain professional skepticism...", "Zero placation, raw facts only..."],
  },
  {
    letter: "E",
    key: "execution" as keyof CreateScore,
    name: "Execution",
    description: "Specify the exact deliverable. What format, length, structure do you need?",
    hints: ["Output format", "Length/scope", "Structure", "Deliverable type"],
    examples: ["Provide a 3-paragraph analysis...", "Create a table with columns...", "List the top 5 risks in bullet points..."],
  },
]

export default function ForgePage() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [scores, setScores] = useState<CreateScore>({
    context: 0, role: 0, examples: 0, audience: 0, tone: 0, execution: 0
  })
  const [library, setLibrary] = useState<SavedPrompt[]>([])
  const [sessionHistory, setSessionHistory] = useState<SavedPrompt[]>([])
  const [showLibrary, setShowLibrary] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState<'analyze' | 'improve'>('analyze')

  // Load library on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setLibrary(JSON.parse(saved))
    } catch (e) {
      console.error('Failed to load library:', e)
    }
  }, [])

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
  const quality: 'weak' | 'adequate' | 'strong' = totalScore <= 4 ? 'weak' : totalScore <= 8 ? 'adequate' : 'strong'

  const analyzePrompt = async () => {
    if (!input.trim()) return
    setIsAnalyzing(true)
    setOutput("")

    // Analyze the prompt against CREATE framework
    const newScores: CreateScore = { context: 0, role: 0, examples: 0, audience: 0, tone: 0, execution: 0 }
    const inputLower = input.toLowerCase()

    // Context detection
    if (inputLower.includes('context') || inputLower.includes('background') || inputLower.includes('given that') || inputLower.includes('based on') || inputLower.includes('considering')) {
      newScores.context = 2
    } else if (inputLower.includes('about') || inputLower.includes('regarding') || input.length > 200) {
      newScores.context = 1
    }

    // Role detection
    if (inputLower.includes('act as') || inputLower.includes('you are a') || inputLower.includes('as a') || inputLower.includes('expert') || inputLower.includes('analyst')) {
      newScores.role = 2
    } else if (inputLower.includes('help me') || inputLower.includes('assist')) {
      newScores.role = 1
    }

    // Examples detection
    if (inputLower.includes('example') || inputLower.includes('like this') || inputLower.includes('format:') || inputLower.includes('template') || inputLower.includes('such as')) {
      newScores.examples = 2
    } else if (inputLower.includes('similar to') || inputLower.includes('style')) {
      newScores.examples = 1
    }

    // Audience detection
    if (inputLower.includes('audience') || inputLower.includes('for a') || inputLower.includes('explain to') || inputLower.includes('technical') || inputLower.includes('beginner')) {
      newScores.audience = 2
    } else if (inputLower.includes('understand') || inputLower.includes('simple')) {
      newScores.audience = 1
    }

    // Tone detection
    if (inputLower.includes('tone') || inputLower.includes('direct') || inputLower.includes('formal') || inputLower.includes('casual') || inputLower.includes('professional') || inputLower.includes('brutally')) {
      newScores.tone = 2
    } else if (inputLower.includes('friendly') || inputLower.includes('clear')) {
      newScores.tone = 1
    }

    // Execution detection
    if (inputLower.includes('format') || inputLower.includes('list') || inputLower.includes('table') || inputLower.includes('paragraph') || inputLower.includes('bullet') || inputLower.includes('steps')) {
      newScores.execution = 2
    } else if (inputLower.includes('brief') || inputLower.includes('detailed') || inputLower.includes('short')) {
      newScores.execution = 1
    }

    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 800))
    setScores(newScores)

    const total = Object.values(newScores).reduce((a, b) => a + b, 0)
    const qual = total <= 4 ? 'weak' : total <= 8 ? 'adequate' : 'strong'

    // Generate improvement suggestions
    let analysis = `## CREATE ANALYSIS\n\n**Total Score: ${total}/12** — ${qual.toUpperCase()}\n\n`
    
    createFramework.forEach(item => {
      const score = newScores[item.key]
      const status = score === 0 ? '❌ MISSING' : score === 1 ? '⚠️ PARTIAL' : '✅ STRONG'
      analysis += `### ${item.letter} — ${item.name}: ${status} (${score}/2)\n`
      
      if (score < 2) {
        analysis += `**Suggestion:** ${item.description}\n`
        analysis += `*Try adding:* "${item.examples[0]}"\n\n`
      } else {
        analysis += `Well defined in your prompt.\n\n`
      }
    })

    if (total <= 4) {
      analysis += `\n---\n⚠️ **REVISION REQUIRED** — This prompt lacks structure. Add explicit Context, Role, and Execution specifications before deployment.`
    } else if (total <= 8) {
      analysis += `\n---\n📝 **MINOR TWEAKS** — Good foundation. Consider strengthening the weakest elements identified above.`
    } else {
      analysis += `\n---\n✅ **READY TO DEPLOY** — This prompt demonstrates strong CREATE adherence. Expected high-quality output.`
    }

    setOutput(analysis)
    setIsAnalyzing(false)

    // Add to session history (keep last 5)
    const newEntry: SavedPrompt = {
      id: `session_${Date.now()}`,
      timestamp: new Date().toISOString(),
      input,
      output: analysis,
      scores: newScores,
      totalScore: total,
      quality: qual
    }
    setSessionHistory(prev => [newEntry, ...prev].slice(0, 5))
  }

  const saveToLibrary = () => {
    if (!output) return

    const entry: SavedPrompt = {
      id: `lib_${Date.now()}`,
      timestamp: new Date().toISOString(),
      input,
      output,
      scores,
      totalScore,
      quality
    }

    const updated = [entry, ...library].slice(0, 50)
    setLibrary(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const loadFromLibrary = (entry: SavedPrompt) => {
    setInput(entry.input)
    setOutput(entry.output)
    setScores(entry.scores)
    setShowLibrary(false)
  }

  const deleteFromLibrary = (id: string) => {
    const updated = library.filter(e => e.id !== id)
    setLibrary(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const getScoreColor = (score: number) => {
    if (score === 0) return 'bg-red-500/20 border-red-500/50 text-red-400'
    if (score === 1) return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
    return 'bg-green-500/20 border-green-500/50 text-green-400'
  }

  const getQualityColor = (q: string) => {
    if (q === 'weak') return 'text-red-400'
    if (q === 'adequate') return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-[60px] h-[60px]">
              <Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 20px rgba(0,206,209,1))' }} quality={100} />
              <div className="absolute inset-[-4px] rounded-full border border-teal/50 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Command Center</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowLibrary(!showLibrary)}
              className="text-xs font-mono text-teal/60 hover:text-teal border border-teal/30 px-3 py-1.5 rounded transition-colors">
              📚 LIBRARY ({library.length})
            </button>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-teal">FORGE ACTIVE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Library Panel */}
        {showLibrary && (
          <div className="mb-6 p-4 bg-[#0d1117] border border-teal/30 rounded-lg max-h-80 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-mono text-gold">Prompt Library</span>
              <button onClick={() => setShowLibrary(false)} className="text-teal/60 hover:text-teal">✕</button>
            </div>
            {library.length === 0 ? (
              <p className="text-sm text-muted-foreground">No saved prompts yet. Analyze a prompt and save it to build your library.</p>
            ) : (
              <div className="space-y-2">
                {library.map(entry => (
                  <div key={entry.id} className="p-3 bg-background/50 border border-teal/20 rounded cursor-pointer hover:border-teal/40"
                    onClick={() => loadFromLibrary(entry)}>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-foreground/90 line-clamp-1 flex-1">{entry.input.slice(0, 80)}...</p>
                      <div className="flex items-center gap-2 ml-2">
                        <span className={`text-xs font-mono ${getQualityColor(entry.quality)}`}>{entry.totalScore}/12</span>
                        <button onClick={(e) => { e.stopPropagation(); deleteFromLibrary(entry.id); }} 
                          className="text-red-400/50 hover:text-red-400">🗑️</button>
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">{new Date(entry.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] px-4 py-3 border-b border-teal/20 flex items-center justify-between">
                <span className="text-sm font-mono text-teal">PROMPT INPUT</span>
                <div className="flex gap-2">
                  <button onClick={() => setActiveTab('analyze')}
                    className={`px-3 py-1 text-xs font-mono rounded ${activeTab === 'analyze' ? 'bg-gold/20 text-gold' : 'text-teal/60 hover:text-teal'}`}>
                    ANALYZE
                  </button>
                  <button onClick={() => setActiveTab('improve')}
                    className={`px-3 py-1 text-xs font-mono rounded ${activeTab === 'improve' ? 'bg-gold/20 text-gold' : 'text-teal/60 hover:text-teal'}`}>
                    IMPROVE
                  </button>
                </div>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your prompt here for CREATE analysis..."
                className="w-full h-48 bg-transparent px-4 py-3 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:outline-none resize-y"
              />
              <div className="px-4 py-3 border-t border-teal/20 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{input.length} characters</span>
                <div className="flex gap-2">
                  <button onClick={() => setInput('')} className="px-3 py-1.5 text-xs font-mono text-teal/60 hover:text-teal border border-teal/30 rounded">
                    CLEAR
                  </button>
                  <button onClick={analyzePrompt} disabled={isAnalyzing || !input.trim()}
                    className="px-4 py-1.5 text-xs font-mono bg-gold/20 text-gold border border-gold/50 rounded hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                    {isAnalyzing ? <><div className="w-3 h-3 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />ANALYZING...</> : '🔥 FORGE ANALYZE'}
                  </button>
                </div>
              </div>
            </div>

            {/* Output */}
            {output && (
              <div className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
                <div className="bg-[#0a0a0f] px-4 py-3 border-b border-teal/20 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm font-mono text-teal">CREATE ANALYSIS</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={saveToLibrary}
                      className={`px-3 py-1 text-xs font-mono rounded border transition-colors ${saveSuccess ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'border-teal/30 text-teal/60 hover:text-teal'}`}>
                      {saveSuccess ? '✓ SAVED' : '💾 SAVE'}
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(output)}
                      className="px-3 py-1 text-xs font-mono text-teal/60 hover:text-teal border border-teal/30 rounded">
                      COPY
                    </button>
                  </div>
                </div>
                <div className="p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap">{output}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Scoring Column */}
          <div className="space-y-4">
            {/* Live CREATE Score */}
            <div className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] px-4 py-3 border-b border-teal/20">
                <span className="text-sm font-mono text-gold">CREATE SCORE</span>
              </div>
              <div className="p-4 space-y-3">
                {createFramework.map(item => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-light text-gold">{item.letter}</span>
                      <span className="text-xs text-foreground/70">{item.name}</span>
                    </div>
                    <div className={`px-2 py-0.5 text-xs font-mono rounded border ${getScoreColor(scores[item.key])}`}>
                      {scores[item.key]}/2
                    </div>
                  </div>
                ))}
                <div className="pt-3 mt-3 border-t border-teal/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-foreground/70">TOTAL</span>
                    <span className={`text-xl font-mono ${getQualityColor(quality)}`}>{totalScore}/12</span>
                  </div>
                  <div className="mt-2 h-2 bg-background/50 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-500 ${quality === 'weak' ? 'bg-red-500' : quality === 'adequate' ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${(totalScore / 12) * 100}%` }} />
                  </div>
                  <p className={`text-center text-xs mt-2 font-mono ${getQualityColor(quality)}`}>
                    {quality === 'weak' ? 'WEAK — Revise heavily' : quality === 'adequate' ? 'ADEQUATE — Minor tweaks' : 'STRONG — Ready to deploy'}
                  </p>
                </div>
              </div>
            </div>

            {/* Session History */}
            <div className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] px-4 py-3 border-b border-teal/20">
                <span className="text-sm font-mono text-teal">SESSION HISTORY</span>
              </div>
              <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
                {sessionHistory.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-4">No analyses this session</p>
                ) : (
                  sessionHistory.map((entry, i) => (
                    <div key={entry.id} onClick={() => { setInput(entry.input); setOutput(entry.output); setScores(entry.scores); }}
                      className="p-2 bg-background/30 border border-teal/10 rounded cursor-pointer hover:border-teal/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground/70 line-clamp-1">{entry.input.slice(0, 40)}...</span>
                        <span className={`text-[10px] font-mono ${getQualityColor(entry.quality)}`}>{entry.totalScore}/12</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="bg-[#0d1117] border border-teal/20 rounded-lg overflow-hidden">
              <div className="bg-[#0a0a0f] px-4 py-3 border-b border-teal/20">
                <span className="text-sm font-mono text-teal">QUICK REFERENCE</span>
              </div>
              <div className="p-3 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-red-500/30" />
                  <span className="text-foreground/60">0-4: Weak — Major revision needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-yellow-500/30" />
                  <span className="text-foreground/60">5-8: Adequate — Minor adjustments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-green-500/30" />
                  <span className="text-foreground/60">9-12: Strong — Deploy ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CREATE Framework Reference */}
        <div className="mt-8">
          <h2 className="text-xl font-mono text-gold mb-4">CREATE Framework Reference</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {createFramework.map(item => (
              <div key={item.key} className="bg-[#0d1117] border border-teal/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-light text-gold">{item.letter}</span>
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <p className="text-xs text-foreground/60 mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.hints.map((hint, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-teal/10 text-teal/70 rounded">{hint}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground mt-8">
        <p>© 2026 Ashes2Echoes LLC. FORGE Framework v1.0</p>
        <p className="text-xs text-foreground/40 mt-1">METATRON v7.7 Integration</p>
      </footer>
    </main>
  )
}
