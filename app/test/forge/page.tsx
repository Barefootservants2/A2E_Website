"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface TestCase {
  name: string
  input: string
  expectedScore: { min: number; max: number }
  expectedElements: string[]
}

interface TestResult {
  testCase: TestCase
  actualScore: number
  passed: boolean
  elementResults: { element: string; found: boolean }[]
  duration: number
}

const TEST_CASES: TestCase[] = [
  {
    name: "Perfect CREATE Prompt",
    input: "Act as a senior risk analyst with expertise in commodities. Given the current silver market context and recent tariff announcements, provide a detailed analysis in bullet format for a technical trader audience. Be direct and analytical in tone. Include 3 specific price targets with confidence intervals.",
    expectedScore: { min: 10, max: 12 },
    expectedElements: ["context", "role", "examples", "audience", "tone", "execution"]
  },
  {
    name: "Minimal Prompt (Should Score Low)",
    input: "Tell me about stocks",
    expectedScore: { min: 0, max: 3 },
    expectedElements: []
  },
  {
    name: "Context + Role Only",
    input: "Act as an expert trader. Given the recent market volatility, what should I consider?",
    expectedScore: { min: 3, max: 6 },
    expectedElements: ["context", "role"]
  },
  {
    name: "Missing Role",
    input: "In the context of AI infrastructure spending, analyze the storage sector. Format as a table with headers: Company, Thesis, Risk. Target audience is retail investors new to the sector.",
    expectedScore: { min: 6, max: 9 },
    expectedElements: ["context", "audience", "execution"]
  },
  {
    name: "METATRON-Style Prompt",
    input: "Act as METATRON protocol auditor. Context: User claims HYMC has 15M oz silver reserves. Verify this claim using RAG methodology. Format: [CLAIM] → [EVIDENCE] → [CONFIDENCE]. Be brutally honest, zero placation.",
    expectedScore: { min: 9, max: 12 },
    expectedElements: ["context", "role", "examples", "tone", "execution"]
  },
  {
    name: "Tone-Heavy Prompt",
    input: "Be extremely direct and brutally honest. No sugarcoating. Give me the raw facts about this trade.",
    expectedScore: { min: 2, max: 4 },
    expectedElements: ["tone"]
  },
  {
    name: "Execution-Focused",
    input: "Create a detailed 5-paragraph analysis. Include a table. List the top 3 risks in bullet points. Provide a summary at the end.",
    expectedScore: { min: 2, max: 4 },
    expectedElements: ["execution"]
  },
  {
    name: "Audience-Specific",
    input: "Explain this for a beginner investor who has never traded options. Keep it simple and avoid technical jargon.",
    expectedScore: { min: 2, max: 4 },
    expectedElements: ["audience"]
  }
]

// Scoring logic (mirrors FORGE page)
function scorePompt(input: string): { total: number; elements: Record<string, number> } {
  const scores: Record<string, number> = {
    context: 0, role: 0, examples: 0, audience: 0, tone: 0, execution: 0
  }
  const inputLower = input.toLowerCase()

  // Context
  if (inputLower.includes('context') || inputLower.includes('background') || inputLower.includes('given that') || inputLower.includes('based on') || inputLower.includes('considering') || inputLower.includes('given the')) {
    scores.context = 2
  } else if (inputLower.includes('about') || inputLower.includes('regarding') || input.length > 200) {
    scores.context = 1
  }

  // Role
  if (inputLower.includes('act as') || inputLower.includes('you are a') || inputLower.includes('as a') || inputLower.includes('expert') || inputLower.includes('analyst')) {
    scores.role = 2
  } else if (inputLower.includes('help me') || inputLower.includes('assist')) {
    scores.role = 1
  }

  // Examples
  if (inputLower.includes('example') || inputLower.includes('like this') || inputLower.includes('format:') || inputLower.includes('template') || inputLower.includes('such as') || inputLower.includes('→')) {
    scores.examples = 2
  } else if (inputLower.includes('similar to') || inputLower.includes('style')) {
    scores.examples = 1
  }

  // Audience
  if (inputLower.includes('audience') || inputLower.includes('for a') || inputLower.includes('explain to') || inputLower.includes('technical') || inputLower.includes('beginner') || inputLower.includes('retail investor')) {
    scores.audience = 2
  } else if (inputLower.includes('understand') || inputLower.includes('simple')) {
    scores.audience = 1
  }

  // Tone
  if (inputLower.includes('tone') || inputLower.includes('direct') || inputLower.includes('formal') || inputLower.includes('casual') || inputLower.includes('professional') || inputLower.includes('brutally') || inputLower.includes('analytical')) {
    scores.tone = 2
  } else if (inputLower.includes('friendly') || inputLower.includes('clear')) {
    scores.tone = 1
  }

  // Execution
  if (inputLower.includes('format') || inputLower.includes('list') || inputLower.includes('table') || inputLower.includes('paragraph') || inputLower.includes('bullet') || inputLower.includes('steps') || inputLower.includes('include')) {
    scores.execution = 2
  } else if (inputLower.includes('brief') || inputLower.includes('detailed') || inputLower.includes('short')) {
    scores.execution = 1
  }

  const total = Object.values(scores).reduce((a, b) => a + b, 0)
  return { total, elements: scores }
}

export default function ForgeTestPage() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [customInput, setCustomInput] = useState("")
  const [customResult, setCustomResult] = useState<{ total: number; elements: Record<string, number> } | null>(null)

  const runTests = async () => {
    setIsRunning(true)
    const newResults: TestResult[] = []

    for (const testCase of TEST_CASES) {
      const start = Date.now()
      await new Promise(r => setTimeout(r, 100)) // Simulate processing

      const { total, elements } = scorePompt(testCase.input)
      
      const elementResults = testCase.expectedElements.map(el => ({
        element: el,
        found: elements[el] > 0
      }))

      const scoreInRange = total >= testCase.expectedScore.min && total <= testCase.expectedScore.max
      const elementsMatch = testCase.expectedElements.every(el => elements[el] > 0)
      
      newResults.push({
        testCase,
        actualScore: total,
        passed: scoreInRange && (testCase.expectedElements.length === 0 || elementsMatch),
        elementResults,
        duration: Date.now() - start
      })
    }

    setResults(newResults)
    setIsRunning(false)
  }

  const testCustom = () => {
    if (!customInput.trim()) return
    setCustomResult(scorePompt(customInput))
  }

  const passedCount = results.filter(r => r.passed).length
  const failedCount = results.filter(r => !r.passed).length

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-[#0a0a0f] border-b border-teal/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/test" className="flex items-center gap-3 group">
            <div className="relative w-[50px] h-[50px]">
              <Image src="/images/metatron-logo.png" alt="Logo" fill className="object-contain"
                style={{ filter: 'brightness(1.5) saturate(1.5) drop-shadow(0 0 15px rgba(0,206,209,1))' }} quality={100} />
            </div>
            <span className="text-teal group-hover:text-gold transition-colors">← Test Harness</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gold">🔥 FORGE TESTS</span>
            <span className="text-xs font-mono text-teal/60">CREATE Framework</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Control Panel */}
        <div className="bg-[#0d1117] border border-teal/20 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-mono text-gold">FORGE CREATE Tests</h1>
              <p className="text-sm text-muted-foreground mt-1">Validate CREATE scoring accuracy with {TEST_CASES.length} test cases</p>
            </div>
            <button
              onClick={runTests}
              disabled={isRunning}
              className="px-6 py-3 bg-gold/20 border border-gold/50 rounded-lg text-gold font-mono hover:bg-gold/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isRunning ? (
                <><div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />RUNNING...</>
              ) : (
                <>🔥 RUN FORGE TESTS</>
              )}
            </button>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded p-3 text-center">
                <div className="text-2xl font-mono text-green-400">{passedCount}</div>
                <div className="text-xs text-green-400/70">Passed</div>
              </div>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3 text-center">
                <div className="text-2xl font-mono text-red-400">{failedCount}</div>
                <div className="text-xs text-red-400/70">Failed</div>
              </div>
              <div className="bg-background/50 border border-teal/20 rounded p-3 text-center">
                <div className="text-2xl font-mono text-teal">{Math.round((passedCount / TEST_CASES.length) * 100)}%</div>
                <div className="text-xs text-muted-foreground">Pass Rate</div>
              </div>
            </div>
          )}
        </div>

        {/* Custom Test */}
        <div className="bg-[#0d1117] border border-teal/20 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-mono text-teal mb-4">Custom Prompt Test</h2>
          <textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter a prompt to test CREATE scoring..."
            className="w-full h-32 bg-background/50 border border-teal/30 rounded p-4 text-sm font-mono text-foreground/90 focus:border-teal/60 focus:outline-none resize-none"
          />
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={testCustom}
              disabled={!customInput.trim()}
              className="px-4 py-2 bg-teal/20 border border-teal/50 rounded text-teal font-mono hover:bg-teal/30 disabled:opacity-50"
            >
              Test Prompt
            </button>
            {customResult && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">Score:</span>
                <span className={`text-xl font-mono ${
                  customResult.total <= 4 ? 'text-red-400' : 
                  customResult.total <= 8 ? 'text-yellow-400' : 'text-green-400'
                }`}>{customResult.total}/12</span>
                <div className="flex gap-1">
                  {Object.entries(customResult.elements).map(([key, val]) => (
                    <span key={key} className={`text-[10px] px-1.5 py-0.5 rounded ${val > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {key.charAt(0).toUpperCase()}:{val}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-mono text-gold">Test Results</h2>
            {results.map((result, i) => (
              <div key={i} className={`bg-[#0d1117] border rounded-lg overflow-hidden ${
                result.passed ? 'border-green-500/30' : 'border-red-500/30'
              }`}>
                <div className={`px-4 py-3 flex items-center justify-between ${
                  result.passed ? 'bg-green-500/5' : 'bg-red-500/5'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className={result.passed ? 'text-green-400' : 'text-red-400'}>
                      {result.passed ? '✓' : '✗'}
                    </span>
                    <span className="font-mono text-foreground">{result.testCase.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                      Expected: {result.testCase.expectedScore.min}-{result.testCase.expectedScore.max}
                    </span>
                    <span className={`text-sm font-mono ${
                      result.actualScore >= result.testCase.expectedScore.min && 
                      result.actualScore <= result.testCase.expectedScore.max 
                        ? 'text-green-400' : 'text-red-400'
                    }`}>
                      Actual: {result.actualScore}/12
                    </span>
                    <span className="text-[10px] font-mono text-teal/60">{result.duration}ms</span>
                  </div>
                </div>
                <div className="px-4 py-3 border-t border-teal/10">
                  <p className="text-xs text-muted-foreground mb-2">Input:</p>
                  <p className="text-sm text-foreground/70 font-mono line-clamp-2">{result.testCase.input}</p>
                  {result.elementResults.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {result.elementResults.map((er, j) => (
                        <span key={j} className={`text-[10px] px-1.5 py-0.5 rounded ${
                          er.found ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {er.element}: {er.found ? '✓' : '✗'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CREATE Reference */}
        <div className="mt-8 bg-[#0d1117] border border-teal/20 rounded-lg p-6">
          <h2 className="text-lg font-mono text-gold mb-4">CREATE Scoring Reference</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Context', 'Role', 'Examples', 'Audience', 'Tone', 'Execution'].map((el, i) => (
              <div key={i} className="bg-background/30 border border-teal/10 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl font-light text-gold">{el.charAt(0)}</span>
                  <span className="text-sm text-foreground">{el}</span>
                </div>
                <div className="text-[10px] text-muted-foreground">0 = Missing | 1 = Partial | 2 = Strong</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-red-500/30" />
              <span className="text-muted-foreground">0-4: Weak</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-yellow-500/30" />
              <span className="text-muted-foreground">5-8: Adequate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded bg-green-500/30" />
              <span className="text-muted-foreground">9-12: Strong</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 flex gap-4">
          <Link href="/forge" className="flex-1 bg-[#0d1117] border border-teal/20 rounded-lg p-4 hover:border-teal/40 transition-colors text-center">
            <span className="text-gold font-mono">🔥 Live FORGE</span>
          </Link>
          <Link href="/test/oracle" className="flex-1 bg-[#0d1117] border border-teal/20 rounded-lg p-4 hover:border-teal/40 transition-colors text-center">
            <span className="text-gold font-mono">🔱 Oracle Tests</span>
          </Link>
          <Link href="/test" className="flex-1 bg-[#0d1117] border border-teal/20 rounded-lg p-4 hover:border-teal/40 transition-colors text-center">
            <span className="text-gold font-mono">🧪 All Tests</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-teal/20 py-6 text-center text-sm text-muted-foreground mt-8">
        <p>© 2026 Ashes2Echoes LLC. FORGE Test Suite v1.0</p>
      </footer>
    </main>
  )
}
