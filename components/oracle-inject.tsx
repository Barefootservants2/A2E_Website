"use client"

import { useState, useEffect, useRef } from "react"

interface GateStatus {
  gate: string
  name: string
  status: 'pending' | 'pass' | 'fail' | 'warning' | 'processing'
}

interface SavedAnalysis {
  id: string
  timestamp: string
  input: string
  output: string
  thesis: string
  recommendation: string
  regulatoryStatus: string
  tags: string[]
}

const INITIAL_GATES: GateStatus[] = [
  { gate: '0', name: 'Self-Verification', status: 'pending' },
  { gate: '0.5', name: 'Premise Challenge', status: 'pending' },
  { gate: '1', name: 'RAG', status: 'pending' },
  { gate: '2', name: 'Authority', status: 'pending' },
  { gate: '3', name: 'Chain', status: 'pending' },
  { gate: '4', name: 'Schema', status: 'pending' },
  { gate: '5', name: 'Gap Documentation', status: 'pending' },
  { gate: '5.5', name: 'Catalyst Freshness', status: 'pending' },
  { gate: '6', name: 'Consensus', status: 'pending' },
  { gate: '7', name: 'Confidence', status: 'pending' },
  { gate: '7.5', name: 'Counter-Thesis', status: 'pending' },
  { gate: '8', name: 'Methodology', status: 'pending' },
  { gate: '8.5', name: 'Regulatory Shock', status: 'pending' },
  { gate: '9', name: 'Security', status: 'pending' },
  { gate: '10', name: 'Agent Sync', status: 'pending' },
  { gate: '11', name: 'HUNTER Scan', status: 'pending' },
]

const STORAGE_KEY = 'metatron_analyses'

export function OracleInject() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState("")
  const [gates, setGates] = useState<GateStatus[]>(INITIAL_GATES)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'MARKET_WATCH' | 'ORACLE' | 'SCAN' | 'REG_SCAN'>('MARKET_WATCH')
  const [apiStatus, setApiStatus] = useState<'unknown' | 'online' | 'offline'>('unknown')
  
  // Save feature states
  const [savedAnalyses, setSavedAnalyses] = useState<SavedAnalysis[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null)
  
  const responseRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Load saved analyses on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        setSavedAnalyses(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load saved analyses:', e)
    }
  }, [])

  // Check API status on mount
  useEffect(() => {
    fetch('/api/oracle')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'online') {
          setApiStatus('online')
        }
      })
      .catch(() => setApiStatus('offline'))
  }, [])

  // Parse gate status from response text
  const parseGateStatus = (text: string) => {
    const newGates = [...INITIAL_GATES]
    
    newGates.forEach((gate, index) => {
      const passPattern = new RegExp(`Gate ${gate.gate}.*\\[PASS\\]`, 'i')
      const failPattern = new RegExp(`Gate ${gate.gate}.*\\[FAIL\\]`, 'i')
      const warningPattern = new RegExp(`Gate ${gate.gate}.*\\[⚠️\\]|\\[WARNING\\]`, 'i')
      
      if (passPattern.test(text)) {
        newGates[index] = { ...gate, status: 'pass' }
      } else if (failPattern.test(text)) {
        newGates[index] = { ...gate, status: 'fail' }
      } else if (warningPattern.test(text)) {
        newGates[index] = { ...gate, status: 'warning' }
      }
    })
    
    setGates(newGates)
  }

  // Extract thesis from response
  const extractThesis = (text: string): string => {
    const thesisMatch = text.match(/\*\*THESIS:\*\*\s*([^\n]+)/i)
    return thesisMatch ? thesisMatch[1].trim() : 'Analysis complete'
  }

  // Extract recommendation from response
  const extractRecommendation = (text: string): string => {
    const recMatch = text.match(/Position Tier:\s*([^\n]+)/i)
    return recMatch ? recMatch[1].trim() : 'See analysis'
  }

  // Extract regulatory status
  const extractRegulatoryStatus = (text: string): string => {
    const regMatch = text.match(/Regulatory Status:\s*([^\n]+)/i)
    return regMatch ? regMatch[1].trim() : 'UNKNOWN'
  }

  // Save analysis to localStorage
  const saveAnalysis = () => {
    if (!response) return

    const analysis: SavedAnalysis = {
      id: currentAnalysisId || `analysis_${Date.now()}`,
      timestamp: new Date().toISOString(),
      input: input,
      output: response,
      thesis: extractThesis(response),
      recommendation: extractRecommendation(response),
      regulatoryStatus: extractRegulatoryStatus(response),
      tags: extractTags(input)
    }

    const updated = currentAnalysisId 
      ? savedAnalyses.map(a => a.id === currentAnalysisId ? analysis : a)
      : [analysis, ...savedAnalyses].slice(0, 50)

    setSavedAnalyses(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    setCurrentAnalysisId(analysis.id)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  // Extract tags from input (tickers, sectors)
  const extractTags = (text: string): string[] => {
    const tickerPattern = /\b[A-Z]{2,5}\b/g
    const matches = text.match(tickerPattern) || []
    return [...new Set(matches)].slice(0, 10)
  }

  // Load a saved analysis
  const loadAnalysis = (analysis: SavedAnalysis) => {
    setInput(analysis.input)
    setResponse(analysis.output)
    setCurrentAnalysisId(analysis.id)
    parseGateStatus(analysis.output)
    setShowHistory(false)
  }

  // Delete a saved analysis
  const deleteAnalysis = (id: string) => {
    const updated = savedAnalyses.filter(a => a.id !== id)
    setSavedAnalyses(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    if (currentAnalysisId === id) {
      setCurrentAnalysisId(null)
    }
  }

  // Export analysis as markdown
  const exportAsMarkdown = () => {
    if (!response) return
    
    const md = `# METATRON v7.7 Analysis\n**Date:** ${new Date().toISOString()}\n**Mode:** ${mode}\n\n## Input\n\`\`\`\n${input}\n\`\`\`\n\n## Analysis\n${response}\n`
    const blob = new Blob([md], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `metatron_analysis_${Date.now()}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Export analysis as JSON
  const exportAsJSON = () => {
    if (!response) return
    
    const data = {
      version: 'METATRON v7.7',
      timestamp: new Date().toISOString(),
      mode: mode,
      input: input,
      output: response,
      gates: gates,
      thesis: extractThesis(response),
      recommendation: extractRecommendation(response),
      regulatoryStatus: extractRegulatoryStatus(response)
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `metatron_analysis_${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const runProtocol = async () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    setError(null)
    setResponse("")
    setCurrentAnalysisId(null)
    setGates(INITIAL_GATES.map(g => ({ ...g, status: 'processing' })))
    
    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, mode })
      })

      if (!res.ok) {
        const errData = await res.json()
        throw new Error(errData.error || 'Failed to process')
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ""

      if (reader) {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          
          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')
          
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.text) {
                  fullText += data.text
                  setResponse(fullText)
                  parseGateStatus(fullText)
                  
                  if (responseRef.current) {
                    responseRef.current.scrollTop = responseRef.current.scrollHeight
                  }
                }
              } catch (e) {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      }
      
    } catch (err: any) {
      setError(err.message || 'Protocol execution failed')
      setGates(INITIAL_GATES.map(g => ({ ...g, status: 'fail' })))
    } finally {
      setIsProcessing(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      runProtocol()
    }
  }

  const getGateColor = (status: GateStatus['status']) => {
    switch (status) {
      case 'pass': return 'bg-green-500'
      case 'fail': return 'bg-red-500'
      case 'warning': return 'bg-yellow-500'
      case 'processing': return 'bg-yellow-500 animate-pulse'
      default: return 'bg-gray-600'
    }
  }

  const passedGates = gates.filter(g => g.status === 'pass').length
  const failedGates = gates.filter(g => g.status === 'fail').length
  const warningGates = gates.filter(g => g.status === 'warning').length

  return (
    <section className="w-full bg-[#0a0a0f] border-t border-teal/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`} />
            <h2 className="text-lg font-mono text-gold tracking-[0.2em]">ORACLE</h2>
            <span className="text-xs text-muted-foreground">METATRON v7.7 Protocol Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-[10px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors flex items-center gap-1"
            >
              📚 HISTORY ({savedAnalyses.length})
            </button>
            <span className="text-[10px] font-mono text-teal/60">16 GATES | 14 HUNTER</span>
          </div>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="mb-4 p-4 bg-[#0d1117] border border-teal/30 rounded-lg max-h-64 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-mono text-gold">Saved Analyses</span>
              <button onClick={() => setShowHistory(false)} className="text-xs text-teal/60 hover:text-teal">✕ Close</button>
            </div>
            {savedAnalyses.length === 0 ? (
              <p className="text-xs text-muted-foreground">No saved analyses yet</p>
            ) : (
              <div className="space-y-2">
                {savedAnalyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${currentAnalysisId === analysis.id ? 'border-gold/50 bg-gold/5' : 'border-teal/20 hover:border-teal/40'}`}
                    onClick={() => loadAnalysis(analysis)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-mono text-foreground/90 line-clamp-1">{analysis.thesis}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] text-muted-foreground">{new Date(analysis.timestamp).toLocaleString()}</span>
                          <span className={`text-[9px] px-1 rounded ${analysis.regulatoryStatus === 'CLEAR' ? 'bg-green-500/20 text-green-400' : analysis.regulatoryStatus === 'ALERT' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{analysis.regulatoryStatus}</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {analysis.tags.slice(0, 5).map(tag => (
                            <span key={tag} className="text-[8px] px-1 bg-teal/10 text-teal/70 rounded">{tag}</span>
                          ))}
                        </div>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteAnalysis(analysis.id); }} className="text-red-400/50 hover:text-red-400 text-xs ml-2">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Mode Selector */}
        <div className="flex items-center gap-2 mb-4">
          {(['MARKET_WATCH', 'ORACLE', 'SCAN', 'REG_SCAN'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-[10px] font-mono rounded border transition-all ${mode === m ? 'bg-gold/20 border-gold/50 text-gold' : 'border-teal/30 text-teal/60 hover:border-teal/50'}`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
          <span className="text-[9px] text-muted-foreground ml-2">
            {mode === 'MARKET_WATCH' && '→ Full protocol + AIORA sizing'}
            {mode === 'ORACLE' && '→ Context package only'}
            {mode === 'SCAN' && '→ Quick catalyst scan'}
            {mode === 'REG_SCAN' && '→ Regulatory focus (Gate 8.5)'}
          </span>
        </div>

        {/* Gate Status Grid */}
        <div className="mb-4 p-3 bg-[#0d1117] border border-teal/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-teal/70">GATE STATUS (v7.7)</span>
            {(passedGates > 0 || failedGates > 0 || warningGates > 0) && (
              <span className="text-[10px] font-mono">
                <span className="text-green-400">{passedGates} PASS</span>
                {warningGates > 0 && <span className="text-yellow-400 ml-2">{warningGates} ⚠️</span>}
                {failedGates > 0 && <span className="text-red-400 ml-2">{failedGates} FAIL</span>}
              </span>
            )}
          </div>
          <div className="grid grid-cols-8 md:grid-cols-16 gap-1">
            {gates.map((gate) => (
              <div key={gate.gate} className="group relative" title={`Gate ${gate.gate}: ${gate.name}`}>
                <div className={`h-6 rounded ${getGateColor(gate.status)} flex items-center justify-center ${gate.gate === '8.5' ? 'ring-1 ring-gold/50' : ''}`}>
                  <span className="text-[7px] font-mono text-white/80">{gate.gate}</span>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black/90 border border-teal/30 rounded text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {gate.name}{gate.gate === '8.5' && ' ★ NEW'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-teal/70">DATA INJECTION</span>
            <span className="text-[9px] font-mono text-muted-foreground/50"><kbd className="bg-teal/10 px-1 rounded text-teal/70">Ctrl+Enter</kbd> to run</span>
          </div>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste news, 13F filings, analyst reports, trade alerts, or any market data..."
            className="w-full h-32 bg-[#0d1117] border border-teal/20 rounded-lg px-4 py-3 text-sm font-mono text-foreground/90 placeholder:text-muted-foreground/40 focus:border-teal/50 focus:outline-none resize-y"
            disabled={isProcessing}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={runProtocol}
            disabled={isProcessing || !input.trim() || apiStatus === 'offline'}
            className="px-6 py-2.5 bg-gold/20 border border-gold/50 rounded-lg text-sm font-mono text-gold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isProcessing ? (<><div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />PROCESSING...</>) : (<>🔱 RUN PROTOCOL</>)}
          </button>
          
          {response && (
            <>
              <button onClick={saveAnalysis} className={`px-4 py-2.5 border rounded-lg text-sm font-mono transition-all flex items-center gap-2 ${saveSuccess ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-teal/10 border-teal/30 text-teal hover:bg-teal/20'}`}>
                {saveSuccess ? '✓ SAVED' : '💾 SAVE'}
              </button>
              <button onClick={exportAsMarkdown} className="px-3 py-2.5 border border-teal/30 rounded-lg text-xs font-mono text-teal/70 hover:text-teal hover:border-teal/50 transition-all">📄 MD</button>
              <button onClick={exportAsJSON} className="px-3 py-2.5 border border-teal/30 rounded-lg text-xs font-mono text-teal/70 hover:text-teal hover:border-teal/50 transition-all">📋 JSON</button>
            </>
          )}
          
          {apiStatus === 'offline' && <span className="text-xs text-red-400">API offline</span>}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="text-sm font-mono text-red-400">⚠️ {error}</span>
          </div>
        )}

        {/* Response Area */}
        {response && (
          <div className="border border-teal/30 rounded-lg overflow-hidden">
            <div className="bg-[#0d1117] border-b border-teal/20 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs font-mono text-teal/70">METATRON v7.7 ANALYSIS</span>
                {currentAnalysisId && <span className="text-[9px] text-gold/60 ml-2">Saved ✓</span>}
              </div>
              <button onClick={() => navigator.clipboard.writeText(response)} className="text-[10px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors">COPY</button>
            </div>
            <div ref={responseRef} className="bg-[#0a0a0f] p-4 max-h-[500px] overflow-y-auto">
              <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap break-words">{response}</pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-[9px] font-mono text-muted-foreground/50 flex items-center justify-between">
          <div>Triggers: <code className="text-gold/60">MARKET WATCH</code> | <code className="text-gold/60">ORACLE</code> | <code className="text-gold/60">SCAN</code> | <code className="text-gold/60">REG SCAN</code></div>
          <div>METATRON v7.7 | Uriel Covenant AI Collective | {savedAnalyses.length} saved</div>
        </div>
      </div>
    </section>
  )
}
