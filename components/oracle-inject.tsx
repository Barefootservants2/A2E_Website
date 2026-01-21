"use client"

import { useState, useEffect, useRef } from "react"

interface GateStatus {
  gate: string
  name: string
  status: 'pending' | 'pass' | 'fail' | 'processing'
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
  { gate: '9', name: 'Security', status: 'pending' },
  { gate: '10', name: 'Agent Sync', status: 'pending' },
  { gate: '11', name: 'HUNTER Scan', status: 'pending' },
]

export function OracleInject() {
  const [input, setInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [response, setResponse] = useState("")
  const [gates, setGates] = useState<GateStatus[]>(INITIAL_GATES)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'MARKET_WATCH' | 'ORACLE' | 'SCAN'>('MARKET_WATCH')
  const [apiStatus, setApiStatus] = useState<'unknown' | 'online' | 'offline'>('unknown')
  
  const responseRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
      // Look for patterns like "Gate 0 [PASS]" or "Gate 0.5 [FAIL]"
      const passPattern = new RegExp(`Gate ${gate.gate}.*\\[PASS\\]`, 'i')
      const failPattern = new RegExp(`Gate ${gate.gate}.*\\[FAIL\\]`, 'i')
      
      if (passPattern.test(text)) {
        newGates[index] = { ...gate, status: 'pass' }
      } else if (failPattern.test(text)) {
        newGates[index] = { ...gate, status: 'fail' }
      }
    })
    
    setGates(newGates)
  }

  const runProtocol = async () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    setError(null)
    setResponse("")
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

      // Handle streaming response
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
                  
                  // Auto-scroll
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
      case 'processing': return 'bg-yellow-500 animate-pulse'
      default: return 'bg-gray-600'
    }
  }

  const passedGates = gates.filter(g => g.status === 'pass').length
  const failedGates = gates.filter(g => g.status === 'fail').length

  return (
    <section className="w-full bg-[#0a0a0f] border-t border-teal/20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${apiStatus === 'online' ? 'bg-green-500' : apiStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'} animate-pulse`} />
            <h2 className="text-lg font-mono text-gold tracking-[0.2em]">ORACLE</h2>
            <span className="text-xs text-muted-foreground">METATRON v7.6 Protocol Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-teal/60">15 GATES</span>
            <span className="text-[10px] font-mono text-teal/60">|</span>
            <span className="text-[10px] font-mono text-teal/60">12 HUNTER MODULES</span>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 mb-4">
          {(['MARKET_WATCH', 'ORACLE', 'SCAN'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-[10px] font-mono rounded border transition-all ${
                mode === m 
                  ? 'bg-gold/20 border-gold/50 text-gold' 
                  : 'border-teal/30 text-teal/60 hover:border-teal/50'
              }`}
            >
              {m.replace('_', ' ')}
            </button>
          ))}
          <span className="text-[9px] text-muted-foreground ml-2">
            {mode === 'MARKET_WATCH' && '→ Full protocol + AIORA sizing'}
            {mode === 'ORACLE' && '→ Context package only'}
            {mode === 'SCAN' && '→ Quick catalyst scan'}
          </span>
        </div>

        {/* Gate Status Grid */}
        <div className="mb-4 p-3 bg-[#0d1117] border border-teal/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-teal/70">GATE STATUS</span>
            {(passedGates > 0 || failedGates > 0) && (
              <span className="text-[10px] font-mono">
                <span className="text-green-400">{passedGates} PASS</span>
                {failedGates > 0 && <span className="text-red-400 ml-2">{failedGates} FAIL</span>}
              </span>
            )}
          </div>
          <div className="grid grid-cols-5 md:grid-cols-15 gap-1">
            {gates.map((gate) => (
              <div
                key={gate.gate}
                className="group relative"
                title={`Gate ${gate.gate}: ${gate.name}`}
              >
                <div className={`h-6 rounded ${getGateColor(gate.status)} flex items-center justify-center`}>
                  <span className="text-[8px] font-mono text-white/80">{gate.gate}</span>
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 bg-black/90 border border-teal/30 rounded text-[9px] font-mono text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  {gate.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-teal/70">DATA INJECTION</span>
            <span className="text-[9px] font-mono text-muted-foreground/50">
              Press <kbd className="bg-teal/10 px-1 rounded text-teal/70">Ctrl+Enter</kbd> to run protocol
            </span>
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

        {/* Action Button */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={runProtocol}
            disabled={isProcessing || !input.trim() || apiStatus === 'offline'}
            className="px-6 py-2.5 bg-gold/20 border border-gold/50 rounded-lg text-sm font-mono text-gold hover:bg-gold/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                PROCESSING...
              </>
            ) : (
              <>
                🔱 RUN PROTOCOL
              </>
            )}
          </button>
          
          {apiStatus === 'offline' && (
            <span className="text-xs text-red-400">API offline - check ANTHROPIC_API_KEY</span>
          )}
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
                <span className="text-xs font-mono text-teal/70">METATRON v7.6 ANALYSIS</span>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="text-[10px] font-mono text-teal/60 hover:text-teal border border-teal/30 px-2 py-1 rounded transition-colors"
              >
                COPY
              </button>
            </div>
            <div 
              ref={responseRef}
              className="bg-[#0a0a0f] p-4 max-h-[500px] overflow-y-auto"
            >
              <pre className="text-sm font-mono text-foreground/90 whitespace-pre-wrap break-words">
                {response}
              </pre>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 text-[9px] font-mono text-muted-foreground/50 flex items-center justify-between">
          <div>
            Triggers: <code className="text-gold/60">MARKET WATCH</code> full protocol | <code className="text-gold/60">ORACLE</code> context only | <code className="text-gold/60">SCAN</code> quick analysis
          </div>
          <div>
            METATRON v7.6 | Uriel Covenant AI Collective
          </div>
        </div>
      </div>
    </section>
  )
}
